import { addons } from 'storybook/manager-api';
import { STORY_PREPARED } from 'storybook/internal/core-events';

// The bottom panel opens only for a story with controls to set: the Communications pieces with their copy and
// formats. The other pages (the Introduction, the logo overview, the type and the colours) are pages to read, and
// the panel would only cover them. It can still be opened by hand (⌥A), until the next story.
addons.register('llama-brand/panel', (api) => {
	api.on(
		STORY_PREPARED,
		({
			args,
			parameters
		}: {
			args?: Record<string, unknown>;
			parameters?: Record<string, any>;
		}) => {
			const hasControls = !parameters?.controls?.disable && Object.keys(args ?? {}).length > 0;

			api.togglePanel(hasControls);
		}
	);
});
