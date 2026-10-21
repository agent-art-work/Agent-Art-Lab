#!/usr/bin/env python3
"""Check generated public pages and local navigation without network access."""

import argparse
from collections import Counter
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

from check_agent_documents import check_agent_documents, public_agent_files, source_catalogue


VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
    "meta", "param", "source", "track", "wbr",
}
PUBLIC_TYPES = {".html", ".css", ".svg"}
PUBLIC_SCRIPTS = {
    Path("assets/copy-prompt.js"), Path("assets/style-demo.js"),
    Path("assets/agent-art-reading.mjs"),
    Path("assets/agent-art-reading-work.mjs"),
    *(Path("assets/agent-art-sdk") / name for name in (
        "index.mjs", "clients.mjs", "reading.mjs", "reading-ui.mjs",
    )),
}
PRIVATE_FOLDERS = {"private", "local", "tmp", "node_modules", "__pycache__"}


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.ids = Counter()
        self.h1s = 0
        self.mains = 0
        self.navs = 0
        self.stylesheets = []
        self.links = []
        self.title = []
        self.text = []
        self.evidence = []
        self.visible_anchors = []
        self.agent_prompts = []

    def record_start(self, tag, attrs, closed=False):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids[attrs["id"]] += 1
        self.h1s += tag == "h1"
        self.mains += tag == "main" or attrs.get("role") == "main"
        self.navs += tag == "nav"
        if tag == "link" and "stylesheet" in (attrs.get("rel") or "").split():
            self.stylesheets.append(attrs.get("href"))
        in_nav = tag == "nav" or any(item[0] == "nav" for item in self.stack)
        hidden = (tag in {"head", "script", "style", "template"}
                  or "hidden" in attrs or attrs.get("aria-hidden", "").lower() == "true"
                  or bool(re.search(r"(?:display\s*:\s*none|visibility\s*:\s*hidden)",
                                    attrs.get("style", ""), re.IGNORECASE))
                  or any(item[2] for item in self.stack))
        anchor = None
        if tag == "a" and "href" in attrs and not hidden:
            anchor = len(self.visible_anchors)
            self.visible_anchors.append((attrs["href"], []))
        prompt = None
        if tag == "pre" and attrs.get("id") == "agent-prompt" and not hidden:
            prompt = len(self.agent_prompts)
            self.agent_prompts.append([])
        for attribute in ("href", "src"):
            if attribute in attrs:
                self.links.append((attrs[attribute] or "", in_nav, attribute))
        if tag not in VOID_TAGS and not closed:
            self.stack.append((tag, "evidence-banner" in (attrs.get("class") or "").split(),
                               hidden, anchor, prompt))

    def handle_starttag(self, tag, attrs):
        self.record_start(tag, attrs)

    def handle_startendtag(self, tag, attrs):
        self.record_start(tag, attrs, closed=True)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        self.text.append(data)
        if any(item[0] == "title" for item in self.stack):
            self.title.append(data)
        if any(item[1] for item in self.stack):
            self.evidence.append(data)
        if not any(item[2] for item in self.stack):
            for item in self.stack:
                if item[3] is not None:
                    self.visible_anchors[item[3]][1].append(data)
                if item[4] is not None:
                    self.agent_prompts[item[4]].append(data)


def normalized(parts):
    return " ".join(" ".join(parts).split())


def canonical_agent_prompt(root):
    text = (root / "docs/AGENT_ACCESS.md").read_bytes().decode("utf-8")
    sections = re.findall(r"^## A prompt to use\s*\n(.*?)(?=^## |\Z)", text, re.MULTILINE | re.DOTALL)
    if len(sections) != 1:
        raise ValueError("expected one 'A prompt to use' section")
    prompts = re.findall(r"^```text\r?\n(.*?)\r?\n```[ \t]*$", sections[0], re.MULTILINE | re.DOTALL)
    if len(prompts) != 1 or not prompts[0].strip():
        raise ValueError("expected one nonempty text code block in the prompt section")
    return prompts[0]


def local_target(href, source, output, base):
    """Return (file, fragment), None for external URLs, or raise ValueError."""
    parsed = urlsplit(href)
    if parsed.scheme or parsed.netloc:
        return None
    requested = unquote(parsed.path)
    if requested.startswith("/"):
        if base and requested != base and not requested.startswith(base + "/"):
            raise ValueError("root-relative URL is outside the configured base path")
        target = output / requested[len(base):].lstrip("/")
    elif requested:
        target = source.parent / requested
    else:
        target = source
    target = target.resolve()
    try:
        target.relative_to(output)
    except ValueError as exc:
        raise ValueError("URL escapes the generated site") from exc
    if target.is_dir():
        target /= "index.html"
    return target, unquote(parsed.fragment).split(":~:", 1)[0]


def check_site(root, base):
    if (root / "_site").is_symlink():
        return ["generated site directory must not be a symlink"], 0, 0, 0
    output = (root / "_site").resolve()
    errors = []
    pages = {}
    files = []
    links = 0
    if not output.is_dir():
        return ["missing _site directory; build the site first"], 0, 0, 0
    try:
        agent_files = public_agent_files(root)
        routes, _ = source_catalogue(root)
    except (OSError, UnicodeError, ValueError, TypeError, KeyError) as exc:
        return [f"cannot derive public document allowlist: {exc}"], 0, 0, 0

    for folder, directories, names in os.walk(output, followlinks=False):
        for name in sorted(directories):
            path = Path(folder) / name
            if path.is_symlink() or name.startswith(".") or name in PRIVATE_FOLDERS:
                errors.append(f"excluded directory: {path.relative_to(output)}")
                directories.remove(name)
        for name in sorted(names):
            path = Path(folder) / name
            relative = path.relative_to(output)
            if path.is_symlink():
                errors.append(f"symlink file: {relative}")
                continue
            if relative == Path(".nojekyll"):
                files.append(path)
                continue
            if name.startswith(".") or (path.suffix not in PUBLIC_TYPES and relative not in agent_files and relative not in PUBLIC_SCRIPTS):
                errors.append(f"non-public output file: {relative}")
                continue
            files.append(path)
            if path.suffix == ".html":
                page = Page()
                try:
                    page.feed(path.read_text(encoding="utf-8"))
                    page.close()
                except (OSError, UnicodeError, ValueError) as exc:
                    errors.append(f"cannot parse HTML: {relative}: {exc}")
                    continue
                pages[path] = page

    if not (output / ".nojekyll").is_file():
        errors.append("missing .nojekyll marker")
    if output / "index.html" not in pages:
        errors.append("missing readable homepage")
    expected_pages = {Path("index.html"), Path("lessons/index.html"),
                      Path("studies/index.html"), Path("404.html"), Path("style-demo/index.html"),
                      Path("icon-demo/index.html")} | {
        Path(route) / "index.html" if route.endswith("/") else Path(route)
        for route in routes.values()
    }
    actual_pages = {path.relative_to(output) for path in pages}
    for relative in sorted(expected_pages - actual_pages):
        errors.append(f"missing generated page: {relative}")
    for relative in sorted(actual_pages - expected_pages):
        errors.append(f"unexpected generated page: {relative}")
    try:
        prompt = canonical_agent_prompt(root)
        homepage = pages.get(output / "index.html")
        if homepage is not None and ["".join(parts) for parts in homepage.agent_prompts] != [prompt]:
            errors.append("homepage agent prompt differs from canonical access-guide code block")
    except (OSError, UnicodeError, ValueError) as exc:
        errors.append(f"cannot verify canonical agent prompt: {exc}")

    for source, page in sorted(pages.items()):
        relative = source.relative_to(output)
        if page.h1s != 1:
            errors.append(f"expected one h1, found {page.h1s}: {relative}")
        if not normalized(page.title):
            errors.append(f"empty or missing title: {relative}")
        if page.mains != 1:
            errors.append(f"expected one main landmark, found {page.mains}: {relative}")
        duplicates = [value for value, count in page.ids.items() if count > 1]
        if duplicates:
            errors.append(f"duplicate HTML ids: {relative}: {duplicates}")
        if not page.stylesheets or not any(
            href and re.search(r"\.css(?:[?#]|$)", href) for href in page.stylesheets
        ):
            errors.append(f"missing CSS stylesheet link: {relative}")

        valid_navigation = 0
        for href, in_nav, attribute in page.links:
            try:
                resolved = local_target(href, source, output, base)
            except ValueError as exc:
                errors.append(f"invalid {attribute}: {relative}: {href!r}: {exc}")
                continue
            if resolved is None:
                continue
            links += 1
            target, fragment = resolved
            if not target.is_file():
                errors.append(f"missing {attribute} target: {relative}: {href!r}")
                continue
            if target.suffix == ".html":
                target_page = pages.get(target)
                if target_page is None:
                    errors.append(f"unreadable HTML target: {relative}: {href!r}")
                elif fragment and fragment not in target_page.ids:
                    errors.append(f"missing fragment: {relative}: {href!r}")
                elif in_nav and target != source:
                    valid_navigation += 1
        if not page.navs or not valid_navigation:
            errors.append(f"missing working navigation to another page: {relative}")
        if not any(href == f"{base}/agent-index.json" and normalized(label)
                   for href, label in page.visible_anchors):
            errors.append(f"missing visible document-index link: {relative}")

    try:
        studies = json.loads((root / "site/studies.json").read_text(encoding="utf-8"))
        proposals = [study for study in studies if study["status"] == "Study proposal"
                     or Path(study["source"]).stem.endswith("-proposal")]
        for study in proposals:
            route = Path(study["source"]).with_suffix(".html")
            page = pages.get(output / route)
            if page is None:
                errors.append(f"missing proposal page: {route}")
                continue
            if not re.search(r"\bunrun\b", normalized(page.text), re.IGNORECASE):
                errors.append(f"proposal omits unrun status: {route}")
            if study["status"] != "Study proposal":
                errors.append(f"proposal has incorrect catalogue status: {route}")
            evidence = study.get("evidence", "").strip()
            if not evidence or evidence not in normalized(page.evidence):
                errors.append(f"proposal omits catalogue evidence metadata: {route}")
    except (OSError, UnicodeError, ValueError, TypeError, KeyError) as exc:
        errors.append(f"cannot verify study catalogue: {exc}")

    errors.extend(check_agent_documents(root, base))
    return errors, len(pages), len(files), links


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--base-path", default=os.environ.get("SITE_BASE_PATH", ""),
        help="published path prefix; pass an empty string for a domain root",
    )
    args = parser.parse_args()
    if args.base_path and not re.fullmatch(r"/[A-Za-z0-9_-]+(?:/[A-Za-z0-9_-]+)*", args.base_path):
        parser.error("base path must be empty or a path without a trailing slash")
    root = Path(__file__).resolve().parent.parent
    errors, pages, files, links = check_site(root, args.base_path)
    for error in errors:
        print(error, file=sys.stderr)
    print(json.dumps({
        "status": "FAIL" if errors else "PASS", "pages": pages,
        "public_files": files, "local_links": links,
        "errors": len(errors), "network_requests": 0,
    }))
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
