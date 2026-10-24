import { mountReading } from './agent-art-sdk/0.1.5-flat-label.1/reading-ui.mjs';
import work from './agent-art-reading-work.mjs';

const element = document.querySelector('#ask-your-agent');
if (element) {
  mountReading(element, { work, evidence: false });
  // The compact control supplies Copy and its own manual fallback. Keep the
  // original disclosure available when scripts or the SDK cannot load.
  const fallback = document.querySelector('#agent-prompt-disclosure');
  if (fallback) fallback.hidden = true;
}
