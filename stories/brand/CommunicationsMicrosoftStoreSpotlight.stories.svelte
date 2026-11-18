<script lang="ts" module>
	import StateGallery from '../helpers/StateGallery.svelte';
	import StateGalleryItem from '../helpers/StateGalleryItem.svelte';
	import aiHubInline from './communications/store/spotlight/ai-hub-inline.png';
	import spotlightHero from './communications/store/spotlight/spotlight-hero.png';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	// The Microsoft Store's Spotlight and AI Hub placements, and its Ignite 2026 collection, as the pictures were sent:
	// a laptop with Llama under a glass dome, offline and locked, with a model chosen on Hugging Face beside it. The
	// Spotlight hero keeps to the right of a dark ground, since the Store sets the app's name and a short line in white
	// over its left part; the AI Hub's picture is the same scene on a transparent ground, the Store's copy beside it
	const { Story } = defineMeta({
		parameters: {
			controls: { disable: true },
			layout: 'fullscreen'
		},
		title: 'Communications/Applications/Microsoft Store Spotlight'
	});

	const pieces = [
		{
			alt: 'A laptop running Llama under a glass dome, offline and locked, with a model chosen on Hugging Face beside it, on a dark ground',
			file: 'llama-ms-spotlight-hero.png',
			label: 'Spotlight hero',
			note: 'The Store sets the name and a line in white over the left',
			src: spotlightHero
		},
		{
			alt: 'The same scene on a transparent ground',
			file: 'llama-ms-ai-hub-inline.png',
			label: 'AI Hub inline',
			note: 'Transparent: the Store lays its copy beside it',
			src: aiHubInline
		}
	];
</script>

<Story asChild name="Sent">
	<StateGallery itemWidth="55rem" width="113.5rem">
		{#each pieces as p (p.label)}
			<StateGalleryItem label={p.label} note={p.note}>
				<a download={p.file} href={p.src} class="block">
					<img alt={p.alt} src={p.src} class="checker block w-full rounded-xl" />
				</a>
			</StateGalleryItem>
		{/each}
	</StateGallery>
</Story>

<style>
	/* the AI Hub picture is transparent: a checkerboard behind both shows where */
	.checker {
		background: repeating-conic-gradient(#d4d4d4 0 25%, #f5f5f5 0 50%) 0 0 / 32px 32px;
	}
</style>
