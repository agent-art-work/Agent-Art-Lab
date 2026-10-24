#!/usr/bin/env python3
"""Offline package checks; not a complete secret scanner or evidence verifier."""
import json
import os
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

REQUIRED = (
    "README.md", "AGENTS.md", "GUIDANCE.md", "HANDOFF.md", "CONTRIBUTING.md",
    "PROVENANCE.json", "docs/BOUNDARIES.md", "templates/PROJECT.md",
    "docs/AGENT_ART_WORK.md", "docs/PROTOCOL.md", "docs/ASK_YOUR_AGENT.md",
    "docs/MANIFESTO.md", "docs/AGENT_ART.md", "docs/WORKS.md",
    "templates/STUDY.md", "research/README.md", "findings/REGISTER.md",
    "projects/thought/README.md",
    "projects/thought/studies/2026-09-20-model-acquisition.md",
)
LINK = re.compile(r"\]\(([^)\n]+)\)")
PRIVATE_PATH = re.compile(r"(?<![A-Za-z0-9_.-])/(?:Users|home)/[^\s/]+|[A-Za-z]:\\\\Users\\\\")
PRIVATE_ID = re.compile(r"(?i)\b[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}\b")
TOKEN = re.compile(r"(?i)\bBearer\s+[A-Za-z0-9._~+/-]{20,}|\b(?:sk-|ghp_|github_pat_)[A-Za-z0-9_]{20,}")
TEXT_TYPES = {".md", ".json", ".yml", ".yaml"}
# Root-only, gitignored QA artifacts are not part of the portable package.
# Do not ignore arbitrary Git patterns or same-named folders within source trees.
LOCAL_ONLY_DIRS = {"local"}
MAX_FILES = 200
MAX_BYTES = 1024 * 1024

def unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError("duplicate JSON key")
        result[key] = value
    return result

def invalid_constant(value):
    raise ValueError("nonfinite JSON constant")

def check_tree(root, require_layout=True):
    root = Path(root).resolve()
    errors = []
    checked = 0
    links = 0
    if require_layout:
        for item in REQUIRED:
            if not (root / item).is_file():
                errors.append(f"missing required file: {item}")
    for folder, dirs, names in os.walk(root, followlinks=False):
        dirs[:] = sorted(d for d in dirs
                         if d not in {".git", "__pycache__", "node_modules", "_site"}
                         and not (Path(folder) == root and d in LOCAL_ONLY_DIRS))
        for name in list(dirs):
            path = Path(folder) / name
            if path.is_symlink():
                errors.append(f"symlink directory: {path.relative_to(root)}")
                dirs.remove(name)
        for name in sorted(names):
            path = Path(folder) / name
            rel = path.relative_to(root)
            if path.is_symlink():
                errors.append(f"symlink file: {rel}")
                continue
            if name == ".env" or name.startswith(".env.") or path.suffix in {".key", ".pem"}:
                errors.append(f"excluded credential-file name: {rel}")
                continue
            if path.suffix not in TEXT_TYPES:
                continue
            checked += 1
            if checked > MAX_FILES:
                errors.append("document-file bound exceeded")
                return errors, checked, links
            if path.stat().st_size > MAX_BYTES:
                errors.append(f"document size bound exceeded: {rel}")
                continue
            try:
                content = path.read_text(encoding="utf-8")
            except (OSError, UnicodeError):
                errors.append(f"unreadable UTF-8 document: {rel}")
                continue
            if not content.endswith("\n") or re.search(r"[ \t]+$", content, re.M):
                errors.append(f"whitespace/final-LF problem: {rel}")
            for label, pattern in (
                ("personal path", PRIVATE_PATH), ("private source ID", PRIVATE_ID),
                ("credential-like value", TOKEN),
            ):
                if pattern.search(content):
                    errors.append(f"{label}: {rel}")
            if path.suffix == ".json":
                try:
                    json.loads(content, object_pairs_hook=unique_object,
                               parse_constant=invalid_constant)
                except (ValueError, TypeError):
                    errors.append(f"invalid strict JSON: {rel}")
            if path.suffix == ".md":
                for match in LINK.finditer(content):
                    href = match.group(1)
                    parsed = urlsplit(href)
                    if parsed.scheme in {"http", "https", "mailto"}:
                        continue
                    if parsed.scheme or parsed.netloc or parsed.path.startswith("/"):
                        errors.append(f"nonportable link: {rel}")
                        continue
                    if not parsed.path:
                        continue
                    target = (path.parent / unquote(parsed.path)).resolve()
                    links += 1
                    try:
                        target.relative_to(root)
                    except ValueError:
                        errors.append(f"out-of-repository link: {rel}")
                        continue
                    if target.relative_to(root).parts and target.relative_to(root).parts[0] in LOCAL_ONLY_DIRS:
                        errors.append(f"link to local-only artifact: {rel}")
                    elif not target.exists():
                        errors.append(f"missing local link target: {rel}")
    return errors, checked, links

def main():
    root = Path(__file__).resolve().parent.parent
    errors, documents, links = check_tree(root)
    for error in errors:
        print(error, file=sys.stderr)
    print(json.dumps({"status": "FAIL" if errors else "PASS",
                      "documents": documents, "local_links": links,
                      "errors": len(errors), "network_requests": 0}))
    return 1 if errors else 0

if __name__ == "__main__":
    raise SystemExit(main())
