<script lang="ts" module>
	import StateGallery from '../helpers/StateGallery.svelte';
	import StateGalleryItem from '../helpers/StateGalleryItem.svelte';
	import Downloadable from './communications/posts/Downloadable.svelte';
	import { microsoftSpotlight } from './communications/posts/post';
	import AiHubInline from './communications/store/AiHubInline.svelte';
	import PrivacyCard, { type PrivacyCardKind } from './communications/store/PrivacyCard.svelte';
	import type { QuickChatScene as Scene } from './communications/store/scenes';
	import SpotlightHero from './communications/store/SpotlightHero.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	// The Microsoft Store's Spotlight and AI Hub placements, for Ignite 2026, after Microsoft's asset guides. The
	// Spotlight hero is oriented to the right: the Store sets the header and subheader in white over its left part, so
	// it stands on the night sky. The AI Hub's inline picture is centre-focused on a transparent ground, the Store's
	// copy laid out beside it. Both show why to use Llama (a private conversation, the privacy card), are laid out at
	// 1920 × 1080 and download at 2x, 3840 × 2160, as JPEG (the Spotlight, under the Store's 2 MB) or PNG (the AI Hub,
	// for its transparency). The bank statement is the one sent to Microsoft; the others are the same piece with
	// another everyday conversation, none about health and none that reads as legal advice
	const { Story } = defineMeta({
		parameters: {
			controls: { disable: true },
			layout: 'fullscreen'
		},
		title: 'Communications/Applications/Microsoft Store Spotlight'
	});

	const editable = { controls: { disable: false, expanded: true } };
	const gallery = { width: '113.5rem' };
	const copyIds = microsoftSpotlight.map((c) => c.id);
	const cards: PrivacyCardKind[] = ['picture', 'figure', 'checklist'];
	const cardControl = { control: 'inline-radio' as const, options: cards };
	const scaleControl = { control: 'inline-radio' as const, options: [1, 2] };
	const useCases: { name: string; note: string; scene: Scene }[] = [
		{ name: 'bank-statement', note: 'A bank statement: the one sent', scene: 'statement' },
		{ name: 'meeting-notes', note: 'Meeting notes into a to-do list', scene: 'notes' },
		{ name: 'cover-letter', note: 'A cover letter from a CV', scene: 'cv' },
		{ name: 'note-to-manager', note: 'A note to a manager about time off', scene: 'leave' },
		{ name: 'note-to-landlord', note: 'A note to a landlord', scene: 'chat' }
	];
	const backdrops = {
		checker: 'repeating-conic-gradient(#d4d4d4 0 25%, #f5f5f5 0 50%) 0 0 / 32px 32px',
		dark: '#1c1c1c',
		light: 'linear-gradient(135deg, #f1e8f6, #e3e6f8)'
	};

	interface HeroArgs {
		card: PrivacyCardKind;
		copy: string;
		overlay: boolean;
		scale: number;
	}

	interface HubArgs {
		backdrop: keyof typeof backdrops;
		card: PrivacyCardKind;
		scale: number;
	}

	interface ExportArgs {
		card: PrivacyCardKind;
		piece: 'aihub' | 'hero';
		scene: Scene;
	}
</script>

<Story asChild name="Copy">
	<section class="grid max-w-4xl gap-4 p-6 text-sm">
		<p class="m-0 text-muted-foreground">
			Microsoft measures the Spotlight's header and subheader in uppercase W's (12 and 16), so
			counts in characters are on the safe side. The AI Hub line is under 35 characters, spaces
			included. A is the recommended set.
		</p>

		<table class="w-full border-collapse">
			<thead class="text-left text-xs text-muted-foreground uppercase">
				<tr>
					<th class="py-2">Set</th><th>Header ≤ 12</th><th>Subheader ≤ 16</th><th>AI Hub &lt; 35</th
					><th>Leans on</th>
				</tr>
			</thead>

			<tbody>
				{#each microsoftSpotlight as c (c.id)}
					<tr class="border-t border-border">
						<td class="py-2 font-mono">{c.id}{c.id === 'A' ? ' ★' : ''}</td>
						<td
							>{c.header} <span class="font-mono text-muted-foreground">{c.header.length}</span></td
						>
						<td
							>{c.subheader}
							<span class="font-mono text-muted-foreground">{c.subheader.length}</span></td
						>
						<td>{c.aiHub} <span class="font-mono text-muted-foreground">{c.aiHub.length}</span></td>
						<td class="text-muted-foreground">{c.note}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</Story>

<Story
	argTypes={{
		card: cardControl,
		copy: { control: 'inline-radio', options: copyIds },
		scale: scaleControl
	}}
	args={{ card: 'picture', copy: 'A', overlay: false, scale: 2 }}
	name="Spotlight hero"
	parameters={editable}
>
	{#snippet template(args)}
		{@const { card, copy, overlay, scale } = args as HeroArgs}
		{@const c = microsoftSpotlight.find((s) => s.id === copy) ?? microsoftSpotlight[0]}
		<StateGallery itemWidth="55rem" width={gallery.width}>
			{#each useCases as u, i (u.scene)}
				<StateGalleryItem label="{i + 1}, {u.name}" note={u.note}>
					<Downloadable formats={['jpeg', 'png']} name="llama-spotlight-hero-{u.name}" {scale}>
						<SpotlightHero
							{card}
							header={c.header}
							{overlay}
							scene={u.scene}
							subheader={c.subheader}
						/>
					</Downloadable>
				</StateGalleryItem>
			{/each}
		</StateGallery>
	{/snippet}
</Story>

<Story
	argTypes={{
		backdrop: { control: 'inline-radio', options: Object.keys(backdrops) },
		card: cardControl,
		scale: scaleControl
	}}
	args={{ backdrop: 'checker', card: 'picture', scale: 2 }}
	name="AI Hub inline"
	parameters={editable}
>
	{#snippet template(args)}
		{@const { backdrop, card, scale } = args as HubArgs}
		<StateGallery itemWidth="55rem" width={gallery.width}>
			{#each useCases as u, i (u.scene)}
				<StateGalleryItem label="{i + 1}, {u.name}" note="{u.note} · transparent, on {backdrop}">
					<Downloadable formats={['png']} name="llama-ai-hub-inline-{u.name}" {scale}>
						<div style:background={backdrops[backdrop]} class="rounded-xl">
							<AiHubInline {card} scene={u.scene} />
						</div>
					</Downloadable>
				</StateGalleryItem>
			{/each}
		</StateGallery>
	{/snippet}
</Story>

<Story asChild name="Privacy card">
	<section class="post ground ground-night flex flex-wrap gap-8 p-8">
		{#each cards as kind (kind)}<PrivacyCard {kind} />{/each}
	</section>
</Story>

<!-- one piece at its real size, for the export script: no gallery, no overlay -->
<Story
	argTypes={{ card: cardControl, scene: { control: 'text' } }}
	args={{ card: 'picture', piece: 'hero', scene: 'statement' }}
	name="Export"
	parameters={editable}
	tags={['!autodocs']}
>
	{#snippet template(args)}
		{@const { card, piece, scene } = args as ExportArgs}
		{#if piece === 'hero'}
			<SpotlightHero actual {card} {scene} />
		{:else}
			<AiHubInline actual {card} {scene} />
		{/if}
	{/snippet}
</Story>
