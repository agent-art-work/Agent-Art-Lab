"""Synthetic export corruption checks; no build, network or Agent is needed."""

import hashlib
from html import escape
import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from check_agent_documents import REPOSITORY, ROUTES, check_agent_documents, document_id
from check_site import check_site


BASE = "/Agent-Art-Lab"
PROMPT = 'Read the source <carefully> & preserve its limits.\nCite the URL and revision.'


def serialized(value):
    return (json.dumps(value, ensure_ascii=False, indent=2) + "\n").encode("utf-8")


def digest(value):
    return hashlib.sha256(value).hexdigest()


class AgentDocumentFixture:
    def setUp(self):
        temp = tempfile.TemporaryDirectory(prefix="Agent-Art-Lab-export-check-")
        self.addCleanup(temp.cleanup)
        self.root = Path(temp.name)
        self.put("site/studies.json", b"[]\n")
        self.put("_site/.nojekyll", b"")
        self.put("_site/style.css", b"body { color: black; }\n")
        self.entries = []
        for source, route in ROUTES.items():
            source_bytes = b"# Record\n\nObservation.\n\n## Limits\nUnverified, not a reliability result.\n"
            if source == "docs/AGENT_ACCESS.md":
                source_bytes += ("\n## A prompt to use\n\n```text\n" + PROMPT + "\n```\n").encode()
            self.put(source, source_bytes)
            identifier = document_id(source)
            identity = {
                "id": identifier, "title": "Record", "page": f"{BASE}/{route}",
                "revision": "sha256:" + digest(source_bytes),
                "source": {"path": source, "url": f"{REPOSITORY}/blob/main/{source}",
                           "sha256": digest(source_bytes), "byteLength": len(source_bytes)},
            }
            document = {"schema": "agent-art-lab.document/v1", **identity,
                        "contentFormat": "markdown", "content": source_bytes.decode(), "assets": []}
            raw = serialized(document)
            self.put(f"_site/documents/{identifier}.json", raw)
            target = f"{BASE}/documents/{identifier}.json"
            self.entries.append({**identity, "download": {"url": target, "mediaType": "application/json",
                                                          "sha256": digest(raw), "byteLength": len(raw)}})
            self.put(f"_site/{route}{'index.html' if not route or route.endswith('/') else ''}", self.page(target))
        self.put("_site/index.html", self.page(f"{BASE}/documents/docs-manifesto.json", prompt=PROMPT))
        for route in ("blog/index.html", "lab/index.html", "lessons/index.html", "studies/index.html", "404.html", "style-demo/index.html", "icon-demo/index.html", "manifesto/index.html"):
            self.put(f"_site/{route}", self.page())
        self.put("_site/llms.txt", (f"[Index]({BASE}/agent-index.json)\n" + "".join(
            f"[Record]({entry['download']['url']})\n" for entry in self.entries)).encode())
        self.write_index()

    def put(self, name, data):
        target = self.root / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        return target

    def page(self, target=None, prompt=None):
        alternate = f'<link rel="alternate" type="application/json" title="Complete document" href="{target}">' if target else ""
        anchor = f'<a href="{target}">Complete document</a>' if target else ""
        prompt_html = f'<pre id="agent-prompt">{escape(prompt)}</pre>' if prompt is not None else ""
        return (f'<html><head><title>Record</title><link rel="stylesheet" href="{BASE}/style.css">'
                f'<link rel="alternate" type="application/json" title="Agent document index" href="{BASE}/agent-index.json">'
                f'{alternate}</head><body><nav><a href="{BASE}/">Home</a><a href="{BASE}/guidance/">Guidance</a></nav>'
                f'<main><h1>Record</h1>{anchor}{prompt_html}</main>'
                f'<footer><a href="{BASE}/agent-index.json">Document index (JSON)</a></footer></body></html>').encode()

    def write_index(self):
        index = {"schema": "agent-art-lab.index/v1", "scope": {"includes": "Synthetic text"},
                 "access": {"methods": ["GET", "HEAD"]}, "documents": self.entries}
        index["revision"] = "sha256:" + digest(serialized(index))
        self.put("_site/agent-index.json", serialized(index))

    def errors(self):
        return check_agent_documents(self.root, BASE)


class AgentDocumentChecks(AgentDocumentFixture, unittest.TestCase):
    def test_intact_fixture_passes_both_checkers(self):
        self.assertEqual(self.errors(), [])
        self.assertEqual(check_site(self.root, BASE)[0], [])

    def test_truncated_envelope_is_rejected(self):
        target = self.root / "_site/documents/guidance.json"
        target.write_bytes(target.read_bytes()[:-10])
        self.assertTrue(any("cannot verify agent document GUIDANCE.md" in error for error in self.errors()))

    def test_omitted_limits_fail_even_when_download_and_index_are_rehashed(self):
        target = self.root / "_site/documents/guidance.json"
        document = json.loads(target.read_bytes())
        document["content"] = "# Record\n\nObservation.\n"
        raw = serialized(document)
        target.write_bytes(raw)
        self.entries[0]["download"].update(sha256=digest(raw), byteLength=len(raw))
        self.write_index()
        self.assertTrue(any("differs from complete canonical source" in error for error in self.errors()))

    def test_wrong_download_hash_is_rejected(self):
        self.entries[0]["download"]["sha256"] = "0" * 64
        self.write_index()
        self.assertTrue(any("descriptor metadata, bytes or hashes differ" in error for error in self.errors()))

    def test_missing_document_discovery_is_rejected(self):
        self.put("_site/guidance/index.html", self.page())
        self.assertTrue(any("missing complete-document alternate: guidance/" in error for error in self.errors()))

    def test_extra_json_export_is_not_public(self):
        self.put("_site/documents/unlisted.json", b"{}\n")
        self.assertTrue(any("non-public output file: documents/unlisted.json" in error
                            for error in check_site(self.root, BASE)[0]))


if __name__ == "__main__":
    unittest.main()
