import { mountReading } from './agent-art-sdk/reading-ui.mjs';
import work from './agent-art-reading-work.mjs';

const element = document.querySelector('#ask-your-agent');
if (element) mountReading(element, { work, evidence: false });
