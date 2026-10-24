"""Persistent site-content checks against synthetic files, without a build or network."""

import unittest

from test_agent_documents import AgentDocumentFixture, BASE, PROMPT
from check_site import check_site


class SiteContentChecks(AgentDocumentFixture, unittest.TestCase):
    def site_errors(self):
        return check_site(self.root, BASE)[0]

    def replace(self, route, old, new):
        path = self.root / "_site" / route
        content = path.read_text(encoding="utf-8")
        self.assertIn(old, content)
        path.write_text(content.replace(old, new), encoding="utf-8")

    def test_complete_inventory_and_exact_decoded_prompt_pass(self):
        self.assertEqual(self.site_errors(), [])

    def test_missing_unlinked_404_page_is_rejected(self):
        (self.root / "_site/404.html").unlink()
        self.assertIn("missing generated page: 404.html", self.site_errors())

    def test_missing_summary_page_is_rejected(self):
        (self.root / "_site/lessons/index.html").unlink()
        self.assertIn("missing generated page: lessons/index.html", self.site_errors())

    def test_missing_blog_or_legacy_lab_route_is_rejected(self):
        for route in ("blog/index.html", "lab/index.html"):
            with self.subTest(route=route):
                page = self.root / "_site" / route
                original = page.read_bytes()
                page.unlink()
                self.assertIn(f"missing generated page: {route}", self.site_errors())
                page.write_bytes(original)

    def test_public_protocol_and_umbrella_pages_are_required(self):
        for route in ("protocol/index.html", "about/index.html"):
            with self.subTest(route=route):
                page = self.root / "_site" / route
                original = page.read_bytes()
                page.unlink()
                self.assertIn(f"missing generated page: {route}", self.site_errors())
                page.write_bytes(original)

    def test_unlisted_html_page_is_rejected(self):
        self.put("_site/extra.html", self.page())
        self.assertIn("unexpected generated page: extra.html", self.site_errors())

    def test_prompt_mutation_or_omission_is_rejected(self):
        for prompt in (PROMPT + " ", PROMPT.replace("\n", " "), "Different prompt.", None):
            with self.subTest(prompt=prompt):
                self.put("_site/index.html", self.page(prompt=prompt))
                self.assertIn("homepage agent prompt differs from canonical access-guide code block",
                              self.site_errors())

    def test_missing_canonical_prompt_is_rejected(self):
        self.put("docs/AGENT_ACCESS.md", b"# Record\n\nNo canonical prompt.\n")
        self.assertTrue(any(error.startswith("cannot verify canonical agent prompt:")
                            for error in self.site_errors()))

    def test_duplicate_homepage_prompt_is_rejected(self):
        self.replace("index.html", "</main>", '<pre id="agent-prompt">Another prompt</pre></main>')
        self.assertIn("homepage agent prompt differs from canonical access-guide code block", self.site_errors())

    def test_alternate_metadata_does_not_replace_visible_index_link(self):
        self.replace("404.html", f'<a href="{BASE}/agent-index.json">Document index (JSON)</a>', "")
        self.assertIn("missing visible document-index link: 404.html", self.site_errors())

    def test_pages_can_reach_index_through_ask_your_agent(self):
        anchor = f'<a href="{BASE}/agent-index.json">Document index (JSON)</a>'
        for route in ("index.html", "404.html"):
            self.replace(route, anchor, f'<a href="{BASE}/ask-your-agent/">Ask your Agent</a>')
        self.assertEqual(self.site_errors(), [])
        self.replace("ask-your-agent/index.html", anchor, "")
        self.assertIn("missing visible document-index link: index.html", self.site_errors())

    def test_hidden_or_unlabelled_index_links_are_rejected(self):
        original = self.page().decode()
        anchor = f'<a href="{BASE}/agent-index.json">Document index (JSON)</a>'
        for replacement in (
            anchor.replace("<a ", "<a hidden "),
            '<div aria-hidden="true">' + anchor + "</div>",
            '<div style="display: none">' + anchor + "</div>",
            "<template>" + anchor + "</template>",
            f'<a href="{BASE}/agent-index.json"></a>',
        ):
            with self.subTest(replacement=replacement):
                self.put("_site/404.html", original.replace(anchor, replacement).encode())
                self.assertIn("missing visible document-index link: 404.html", self.site_errors())


if __name__ == "__main__":
    unittest.main()
