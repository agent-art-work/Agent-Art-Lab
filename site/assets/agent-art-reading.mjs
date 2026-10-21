import { mountReading } from './agent-art-sdk/0.1.2/reading-ui.mjs';
import work from './agent-art-reading-work.mjs';

const element = document.querySelector('#ask-your-agent');
if (element) mountReading(element, { work, evidence: false });
