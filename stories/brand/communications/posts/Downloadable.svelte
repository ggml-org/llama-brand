<!--
	A piece with buttons under it to download it as WebP or PNG (or JPEG, where a format asks for it), like the brand's
	asset files, but rendered from the page as it stands (its copy and ground as set in the controls) at the piece's
	real size, or at `scale` times it, by modern-screenshot. Its fonts and images are embedded.
-->
<script lang="ts">
	import { Button } from '@ggml-org/llama-ui/ui/button';
	import { Download, LoaderCircle } from '@lucide/svelte';
	import { domToJpeg, domToPng, domToWebp } from 'modern-screenshot';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		/** the formats it offers, WebP and PNG unless set */
		formats?: Format[];
		/** the file's name, without its extension */
		name: string;
		/** pixels per pixel of the piece: 2 draws a 1920 × 1080 piece at 3840 × 2160 */
		scale?: number;
	}

	type Format = 'jpeg' | 'png' | 'webp';

	let { children, formats: offered = ['webp', 'png'], name, scale = 1 }: Props = $props();

	const LABELS: Record<Format, string> = { jpeg: 'JPEG', png: 'PNG', webp: 'WebP' };
	const formats = $derived(offered.map((format) => ({ format, label: LABELS[format] })));
	const EXTENSIONS: Record<Format, string> = { jpeg: 'jpg', png: 'png', webp: 'webp' };

	let box = $state<HTMLDivElement>();
	let busy = $state<Format | null>(null);

	async function download(format: Format) {
		// the piece, drawn at its real size under the scale that fits it to the column
		const piece = box?.querySelector<HTMLElement>('article.post');

		if (!piece || busy) return;

		busy = format;

		try {
			const options = {
				height: piece.offsetHeight,
				scale,
				style: { transform: 'none' },
				width: piece.offsetWidth
			};
			const src =
				format === 'png'
					? await domToPng(piece, options)
					: format === 'jpeg'
						? await domToJpeg(piece, { ...options, quality: 0.9 })
						: await domToWebp(piece, { ...options, quality: 0.95 });
			// a link that is never in the page, so its click doesn't reach the window, where @storybook/sveltekit's
			// MockProvider cancels link clicks to log them as navigation
			const link = document.createElement('a');

			link.download = `${name}${scale === 1 ? '' : `@${scale}x`}.${EXTENSIONS[format]}`;
			link.href = src;
			link.click();
		} finally {
			busy = null;
		}
	}
</script>

<div bind:this={box} class="grid gap-2">
	{@render children()}

	<span class="flex flex-wrap gap-1">
		{#each formats as { format, label } (format)}
			<Button
				class="h-6 px-1.5 font-mono text-xs text-muted-foreground has-[>svg]:px-1.5"
				disabled={busy !== null}
				onclick={() => download(format)}
				size="sm"
				variant="ghost"
			>
				{#if busy === format}<LoaderCircle class="size-3 animate-spin" />{:else}<Download
						class="size-3"
					/>{/if}{label}
			</Button>
		{/each}
	</span>
</div>
