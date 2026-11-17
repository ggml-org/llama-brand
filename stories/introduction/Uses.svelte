<!--
	What this Storybook is for, as four tiles: making a post or a poster from Communications, taking the logo's files,
	setting text in the brand's type and handing over to agents. Each has its icon, its name and one line.
-->
<script lang="ts">
	import { Download, Megaphone, Send, Type } from '@lucide/svelte';

	const uses = [
		{
			icon: Megaphone,
			line: 'Make a post, a poster or a link preview from the real formats',
			name: 'Communicating'
		},
		{
			icon: Download,
			line: 'Take the icon, a lockup or an app icon, in SVG, WebP or PNG',
			name: 'Taking the logo'
		},
		{
			icon: Type,
			line: 'Set and test Llama Sans and Llama Mono at any size',
			name: 'Setting type'
		},
		{
			icon: Send,
			line: 'The rules export as the design system for Claude Design',
			name: 'Handing over'
		}
	];
</script>

<div class="uses">
	{#each uses as use (use.name)}
		<section class="use card-surface rounded-card">
			<span class="glyph rounded-control bg-surface-lifted elevated-control">
				<use.icon aria-hidden="true" size={18} />
			</span>

			<h3>{use.name}</h3>

			<p>{use.line}</p>
		</section>
	{/each}
</div>

<style>
	.uses {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 8px;
	}

	.use {
		display: grid;
		gap: 8px;
		align-content: start;
		padding: 16px;
	}

	.glyph {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		margin-bottom: 4px;
	}

	h3 {
		margin: 0;
		font-size: 16px;
		font-weight: 600;
	}

	p {
		margin: 0;
		color: var(--figure-muted);
		font-size: 13px;
		line-height: 1.45;
	}
</style>
