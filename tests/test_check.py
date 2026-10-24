"""Synthetic packaging checks only; no Agent, network or project runtime."""
import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

SPEC = importlib.util.spec_from_file_location(
    "lab_check", Path(__file__).resolve().parents[1] / "scripts/check.py")
CHECK = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(CHECK)

class PackageChecks(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="Agent-Art-Lab-check-")
        self.root = Path(self.temp.name)
        self.addCleanup(self.temp.cleanup)

    def put(self, name, content):
        target = self.root / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
        return target

    def errors(self):
        return CHECK.check_tree(self.root, require_layout=False)[0]

    def test_portable_links_and_exact_integer_json(self):
        self.put("README.md", "# Example\n\n[record](record.json)\n")
        self.put("record.json", '{"integer":9007199254740993}\n')
        self.assertEqual(self.errors(), [])

    def test_missing_link(self):
        self.put("README.md", "[missing](missing.md)\n")
        self.assertTrue(any("missing local" in e for e in self.errors()))

    def test_escape(self):
        self.put("README.md", "[outside](../outside.md)\n")
        self.assertTrue(any("out-of-repository" in e for e in self.errors()))

    def test_private_path(self):
        self.put("README.md", "/Users/example/private-file\n")
        self.assertTrue(any("personal path" in e for e in self.errors()))

    def test_root_local_qa_is_not_part_of_package(self):
        self.put("README.md", "# Public source\n")
        for index in range(CHECK.MAX_FILES + 1):
            self.put(f"local/qa/{index}.md", "[snapshot link](missing.md)\n")
        self.put("local/qa/context.json", '{"path":"/Users/example/local-only"}\n')
        errors, count, _ = CHECK.check_tree(self.root, require_layout=False)
        self.assertEqual(errors, [])
        self.assertEqual(count, 1)

    def test_source_cannot_depend_on_local_qa(self):
        self.put("local/qa/record.md", "# Local\n")
        self.put("README.md", "[private artifact](local/qa/record.md)\n")
        self.assertTrue(any("link to local-only artifact" in e for e in self.errors()))

    def test_nested_local_source_is_still_checked(self):
        self.put("docs/local/record.md", "[missing](missing.md)\n")
        self.put("docs/local/.env", "SYNTHETIC=example\n")
        errors = self.errors()
        self.assertTrue(any("missing local link" in e for e in errors))
        self.assertTrue(any("credential-file" in e for e in errors))

    def test_relative_home_component_is_not_a_personal_path(self):
        self.put("README.md", "Sources: `apps/home/src/docs.ts` and `apps/home/node_modules`.\n")
        self.assertEqual(self.errors(), [])

    def test_absolute_home_path_and_file_uri_are_rejected(self):
        for location in ("/home/example/file", "file:///Users/example/file"):
            with self.subTest(location=location):
                self.put("README.md", f"Source: `{location}`.\n")
                self.assertTrue(any("personal path" in e for e in self.errors()))

    def test_document_count_limit_still_applies_to_sources(self):
        for index in range(3):
            self.put(f"docs/{index}.md", "# Source\n")
        with patch.object(CHECK, "MAX_FILES", 2):
            self.assertIn("document-file bound exceeded", self.errors())

    def test_document_size_limit_still_applies_to_sources(self):
        self.put("docs/large.md", "# Source is too large for this test\n")
        with patch.object(CHECK, "MAX_BYTES", 8):
            self.assertTrue(any("document size bound exceeded" in e for e in self.errors()))

    def test_duplicate_json(self):
        self.put("record.json", '{"key":1,"key":2}\n')
        self.assertTrue(any("invalid strict JSON" in e for e in self.errors()))

    def test_nonfinite_json(self):
        self.put("record.json", '{"key":NaN}\n')
        self.assertTrue(any("invalid strict JSON" in e for e in self.errors()))

    def test_symlink(self):
        self.put("target.md", "# Target\n")
        (self.root / "link.md").symlink_to("target.md")
        self.assertTrue(any("symlink file" in e for e in self.errors()))

    def test_credential_value(self):
        self.put("README.md", "Bearer " + "A" * 24 + "\n")
        self.assertTrue(any("credential-like" in e for e in self.errors()))

    def test_required_layout(self):
        self.assertTrue(CHECK.check_tree(self.root)[0])

    def test_credential_filename(self):
        self.put(".env", "SYNTHETIC=example\n")
        self.assertTrue(any("credential-file" in e for e in self.errors()))

if __name__ == "__main__":
    unittest.main()
