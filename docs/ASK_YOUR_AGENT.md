# What is Ask your Agent?

Ask your Agent takes a website's context into a conversation with an Agent you
choose. The mark, label and ⓘ explain the component; **ChatGPT**, **Claude** and
**Copy** are separate ways to take that context with you.

## Take the Lab into your conversation

On this site, the context is a public reading invitation and a link to the Lab's
document index. You can inspect the [complete invitation](AGENT_ACCESS.md#a-prompt-to-use)
or expand “Copy the original reading prompt” on the homepage before using it.
The handoff does not include every article or your private conversation history.

Without a question, the invitation asks your Agent for a short introduction
based on the index. Add a question to explore a topic: it asks the Agent to fetch
relevant complete sources, cite them and explain any access or verification
limits. The Agent needs its own permitted tools to retrieve those sources.

## Choose where to continue

**ChatGPT** and **Claude** request a new conversation through desktop app links.
They need compatible installed apps. **Copy** gives you the same invitation to
paste into another app, an existing conversation or a particular mode you choose.
If copying is blocked, select the original prompt and copy it manually.

Your questions and the Agent's answers stay in the conversation you choose.
This site's component does not receive that conversation. The app and its provider
handle it under their own settings and policies.

The receiving app controls its tools, permissions, mode and submission behavior.
Check its actual state after opening a link: do not assume that the invitation
is waiting as a draft or that a particular mode was selected. A link click alone
does not confirm arrival, reading or an answer. If the app asks for permission,
review that request there; the invitation does not grant it.

## For website authors

The Agent Art protocol supplies the component's mark, structure and handoff
builders. Each site owns its context, content, theme and placement. The component
does not supply an answering model or decide what an Agent concludes.

The Lab is one implementation. See its [integration notes](../site/README.md#agent-document-access)
for the pinned SDK and site adapter, and the [agent access guide](AGENT_ACCESS.md)
for its source and verification contract. Other sites must describe the context
they share and keep their own permission boundaries explicit.

A successful handoff does not establish accurate answers or intentional
participation in an artwork.
