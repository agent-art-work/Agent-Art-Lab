#!/usr/bin/env python3
"""Verify the site's complete document exports offline against canonical bytes."""

import argparse
import hashlib
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit


REPOSITORY = "https://github.com/agent-art-work/Agent-Art-Lab"
ROUTES = {
    "GUIDANCE.md": "guidance/",
    "findings/REGISTER.md": "findings/",
    "CONTRIBUTING.md": "contribute/",
    "research/README.md": "research/",
    "docs/BOUNDARIES.md": "boundaries/",
    "docs/AGENT_ACCESS.md": "agent-access/",
    "templates/PROJECT.md": "templates/project.html",
    "templates/STUDY.md": "templates/study.html",
    "projects/thought/README.md": "projects/thought/",
    "projects/pulse/README.md": "projects/pulse/",
    "projects/agent-handoff/README.md": "projects/agent-handoff/",
}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def document_id(source):
    return source.removesuffix(".md").replace("/", "-").replace("_", "-").lower()


def source_catalogue(root):
    """Keep exports bounded to reading sources, never arbitrary repository files."""
    routes = dict(ROUTES)
    studies = {}
    catalogue = json.loads((root / "site/studies.json").read_text(encoding="utf-8"))
    for study in catalogue:
        source = study["source"]
        if not re.fullmatch(r"projects/(?:thought|pulse|agent-handoff)/studies/[A-Za-z0-9_-]+\.md", source):
            raise ValueError(f"study source is outside the publication allowlist: {source!r}")
        if source in routes:
            raise ValueError(f"duplicate study source: {source}")
        routes[source] = source.removesuffix(".md") + ".html"
        studies[source] = {key: study[key] for key in ("project", "date", "status", "evidence")}
    return routes, studies


def public_agent_files(root):
    routes, _ = source_catalogue(root)
    return {Path("agent-index.json"), Path("llms.txt")} | {
        Path("documents") / f"{document_id(source)}.json" for source in routes
    }


class Discovery(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.alternates = []
        self.anchors = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == "link" and "alternate" in attrs.get("rel", "").split():
            self.alternates.append((attrs.get("href"), attrs.get("type"), attrs.get("title")))
        if tag == "a":
            self.anchors.append(attrs.get("href"))

    handle_startendtag = handle_starttag


def read_json(path):
    def unique_pairs(pairs):
        result = {}
        for key, value in pairs:
            if key in result:
                raise ValueError(f"duplicate JSON key: {key}")
            result[key] = value
        return result

    def reject_constant(value):
        raise ValueError(f"nonfinite JSON value: {value}")

    raw = path.read_bytes()
    return raw, json.loads(raw.decode("utf-8"), object_pairs_hook=unique_pairs, parse_constant=reject_constant)


def check_agent_documents(root, base=""):
    output = root / "_site"
    errors = []
    try:
        routes, studies = source_catalogue(root)
        _, index = read_json(output / "agent-index.json")
        if not isinstance(index, dict) or set(index) != {"schema", "scope", "access", "documents", "revision"}:
            raise ValueError("index fields differ from agent-art-lab.index/v1")
        if index["schema"] != "agent-art-lab.index/v1" or any(
            not isinstance(index[key], dict) or not index[key] for key in ("scope", "access")
        ):
            errors.append("agent index: missing schema, scope or access contract")
        unsigned = {key: value for key, value in index.items() if key != "revision"}
        serialized = (json.dumps(unsigned, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
        if index["revision"] != "sha256:" + digest(serialized):
            errors.append("agent index: revision does not match serialized discovery contract")
        descriptors = index["documents"]
        if not isinstance(descriptors, list) or not all(isinstance(item, dict) for item in descriptors):
            raise ValueError("agent index documents must be descriptor objects")
        entries = {item["id"]: item for item in descriptors}
        expected_ids = {document_id(source) for source in routes}
        if len(entries) != len(descriptors) or set(entries) != expected_ids:
            errors.append("agent index: duplicate, missing or unexpected document IDs")
    except (OSError, UnicodeError, ValueError, TypeError, KeyError) as exc:
        return [f"cannot verify agent index: {exc}"]

    for source, route in routes.items():
        identifier = document_id(source)
        try:
            source_bytes = (root / source).read_bytes()
            content = source_bytes.decode("utf-8", errors="strict")
            title_match = re.search(r"^# (.+)$", content.lstrip("\ufeff"), re.MULTILINE)
            if title_match is None:
                raise ValueError("canonical source has no H1 title")
            title = title_match[1].rstrip("\r")
            identity = {
                "id": identifier,
                "title": title,
                "page": f"{base}/{route}",
                "revision": "sha256:" + digest(source_bytes),
                "source": {
                    "path": source,
                    "url": f"{REPOSITORY}/blob/main/{source}",
                    "sha256": digest(source_bytes),
                    "byteLength": len(source_bytes),
                },
            }
            if source in studies:
                identity["study"] = studies[source]
            raw, document = read_json(output / "documents" / f"{identifier}.json")
            expected_document = {
                "schema": "agent-art-lab.document/v1", **identity,
                "contentFormat": "markdown", "content": content, "assets": [],
            }
            if document != expected_document:
                errors.append(f"agent document differs from complete canonical source/metadata: {source}")
            expected_descriptor = {
                **identity,
                "download": {
                    "url": f"{base}/documents/{identifier}.json",
                    "mediaType": "application/json",
                    "sha256": digest(raw),
                    "byteLength": len(raw),
                },
            }
            if entries.get(identifier) != expected_descriptor:
                errors.append(f"agent descriptor metadata, bytes or hashes differ: {source}")
            page_path = output / route
            if route.endswith("/"):
                page_path /= "index.html"
            page = Discovery()
            page.feed(page_path.read_text(encoding="utf-8"))
            target = expected_descriptor["download"]["url"]
            if (target, "application/json", "Complete document") not in page.alternates:
                errors.append(f"missing complete-document alternate: {route}")
            if target not in page.anchors:
                errors.append(f"missing visible complete-document link: {route}")
        except (OSError, UnicodeError, ValueError, TypeError, KeyError) as exc:
            errors.append(f"cannot verify agent document {source}: {exc}")

    for path in output.rglob("*.html"):
        try:
            page = Discovery()
            page.feed(path.read_text(encoding="utf-8"))
            if (f"{base}/agent-index.json", "application/json", "Agent document index") not in page.alternates:
                errors.append(f"missing global agent-index alternate: {path.relative_to(output)}")
        except (OSError, UnicodeError, ValueError) as exc:
            errors.append(f"cannot verify agent discovery in {path.relative_to(output)}: {exc}")
    try:
        discovery = (output / "llms.txt").read_text(encoding="utf-8")
        required = [f"{base}/agent-index.json"] + [
            f"{base}/documents/{identifier}.json" for identifier in expected_ids
        ]
        if any(target not in discovery for target in required):
            errors.append("llms.txt omits the index or a complete document URL")
        for href in re.findall(r"\[[^\]]*\]\(([^\s)]+)\)", discovery):
            parsed = urlsplit(href)
            if parsed.scheme or parsed.netloc:
                continue
            requested = unquote(parsed.path)
            if not requested.startswith(base + "/"):
                errors.append(f"llms.txt link is outside the configured base path: {href}")
                continue
            target = (output / requested[len(base):].lstrip("/")).resolve()
            if not target.is_relative_to(output.resolve()):
                errors.append(f"llms.txt link escapes generated site: {href}")
                continue
            if target.is_dir():
                target /= "index.html"
            if not target.is_file():
                errors.append(f"llms.txt link target is missing: {href}")
    except (OSError, UnicodeError) as exc:
        errors.append(f"cannot verify llms.txt: {exc}")
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-path", default=os.environ.get("SITE_BASE_PATH", ""))
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent
    errors = check_agent_documents(root, args.base_path)
    for error in errors:
        print(error, file=sys.stderr)
    print(json.dumps({"status": "FAIL" if errors else "PASS", "errors": len(errors), "network_requests": 0}))
    return bool(errors)


if __name__ == "__main__":
    raise SystemExit(main())
