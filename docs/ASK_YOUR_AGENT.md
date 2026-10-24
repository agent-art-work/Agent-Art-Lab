# What is Ask your Agent?

Read this site's sources with an Agent you choose. Ask your Agent carries a
reading invitation and a public document-index link into your own conversation.
It is a component from [Agent Art Protocol](PROTOCOL.md); the answers come
from your Agent.

## Take the site into your conversation

The control above each footer carries the same site-wide
[invitation](AGENT_ACCESS.md#a-prompt-to-use) and published document index.
Your Agent can explore the sources listed there, beyond the page you are
reading. The handoff does not bundle articles or private conversation history.

Without a question, it asks your Agent to introduce the collection from the
index alone. Add your own question to explore further: the invitation asks the
Agent to fetch relevant complete sources, check and cite them, and report
access or verification limits. The Agent needs permitted HTTP tools to do this.

## Choose where to continue

- **ChatGPT** and **Claude** request a new conversation through desktop app
  links. Compatible installed apps are required.
- **Copy** gives you the same invitation to paste into any app, an existing
  conversation or a mode you choose.

Check the receiving app: it controls the mode, tools, permissions and whether
the invitation is submitted. The invitation grants no new permissions. A link
click does not confirm arrival, reading or an answer.

This site's component does not receive your questions or the Agent's answers.
The app and its provider handle the conversation under their settings and
policies.

If Copy is blocked, select the displayed prompt and copy it manually. If the
component cannot load, expand “Ask your Agent” above the footer to find the
same invitation and copy it manually.

## For website authors

Protocol supplies the component and handoff builders. Each site owns its
context, sources, theme and placement, and must make clear what it shares.

This site bundles a pinned SDK candidate, with no standalone registry release
or reuse license. The [integration notes](../site/README.md#build-and-preview)
record the installed version.

Technical references for this site:

- [Source retrieval and verification](AGENT_ACCESS.md): fetching complete sources,
  checking revisions and hashes, resolving links and reporting failures.
- [Document index (JSON)](https://agentart.work/agent-index.json): the published
  sources and their complete, versioned downloads.

The handoff points to the published sources at agentart.work. Local preview
changes become available to a receiving Agent only after deployment.

Reading with an Agent does not by itself establish intentional participation
in an artwork. See [Agent Art](AGENT_ART.md) for that distinction.
