import type { Preview } from '@storybook/sveltekit';
import '../src/app.css';
import './docs.css';
import { applyColorScheme } from './color-scheme';
import ModeWatcherDecorator from './decorators/ModeWatcherDecorator.svelte';
import TooltipProviderDecorator from './decorators/TooltipProviderDecorator.svelte';

applyColorScheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyColorScheme);

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},

		backgrounds: {
			disabled: true
		},

		options: {
			// sidebar sections: the introduction, the brand book for agents, the brand (logo, type, colour),
			// communications, then the scrapbook of proposals
			storySort: {
				order: [
					'Introduction',
					'Agents',
					['Brand guidelines'],
					'Brand',
					[
						'Logo',
						[
							'Overview',
							'Icon',
							'Lockup',
							'Usage',
							'Assets',
							['Logo', 'Social profiles', 'App icons']
						],
						'Typography',
						[
							'Tester',
							'Llama Sans',
							['Overview', 'User Interface', 'Running text', 'Display', 'Glyphs'],
							'Llama Mono',
							['Overview', 'Terminal', 'User Interface', 'Logs', 'Diff', 'Key visuals', 'Glyphs']
						],
						'Colors',
						['Palette']
					],
					'Communications',
					[
						'Direction',
						['Principles', 'Mood board', 'Specimen boards'],
						'Foundations',
						['Formats and grid', 'Grounds', 'Type'],
						'Elements',
						['Header and footer', 'Chips and labels', 'Figures and commands', 'Motifs', 'The app'],
						'Modules',
						['Headline blocks', 'Model cards', 'Stat cards', 'Product shot'],
						'Key visuals',
						['Statement', 'Product', 'Roster', 'Bulletin', 'Numeral', 'Receipt'],
						'Applications',
						[
							'Model drop',
							"What's new",
							'Link previews',
							'Open models poster',
							'Microsoft Store',
							'Mac App Store',
							'Store scenes',
							'Swag'
						]
					],
					'Scrapbook',
					['Communications']
				]
			}
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo'
		}
	},
	globalTypes: {
		// the light surface theme: Paper (white panels on a grey page) or Matte (grey glass on white)
		surface: {
			description: 'Light surface theme',
			toolbar: {
				dynamicTitle: true,
				icon: 'paintbrush',
				items: [
					{ title: 'Paper', value: 'paper' },
					{ title: 'Matte', value: 'matte' }
				],
				title: 'Surface'
			}
		}
	},
	initialGlobals: {
		surface: 'paper'
	},
	decorators: [
		(story, context) => {
			document.documentElement.classList.toggle('theme-matte', context.globals.surface === 'matte');

			return story();
		},
		// `parameters.colorScheme` fixes a story to light or dark, whatever the viewer chose
		(story, context) => ({
			Component: ModeWatcherDecorator,
			props: {
				children: story,
				forced: context.parameters.colorScheme
			}
		}),
		(story) => ({
			Component: TooltipProviderDecorator,
			props: {
				children: story
			}
		})
	]
};

export default preview;
