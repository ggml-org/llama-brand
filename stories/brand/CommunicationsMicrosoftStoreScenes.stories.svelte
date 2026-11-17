<script lang="ts" module>
	import { MAC_SCENES, SCENES } from './communications/store/scenes';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	// The app scenes the store screenshots frame: the real Llama Chat with everyday content, as Llama for Windows shows
	// it in its quick chat (dark, with conversation tabs) and Llama for Mac in a Safari web app and on a phone (light).
	// They are images of the scenes llama.cpp's Storybook renders from the app itself, at the size the screenshots'
	// windows show them; re-capture them there when the app changes.
	const { Story } = defineMeta({
		parameters: {
			controls: { disable: true },
			layout: 'fullscreen'
		},
		title: 'Communications/Applications/Store scenes'
	});
</script>

{#snippet scene(src: string, alt: string, width: number)}
	<img {alt} class="block h-auto max-w-full" {src} style:width="{width}px" />
{/snippet}

<Story asChild name="Chat">
	{@render scene(SCENES.chat, 'A note to the landlord, in Llama for Windows', 1126)}
</Story>

<Story asChild name="Document">
	{@render scene(SCENES.document, 'A lease to read, in Llama for Windows', 1126)}
</Story>

<Story asChild name="Screenshot">
	{@render scene(SCENES.screenshot, 'A notification explained, in Llama for Windows', 1126)}
</Story>

<Story asChild name="Quick chat">
	{@render scene(SCENES.quick, 'A line made friendlier through Alt + Space', 1126)}
</Story>

<Story asChild name="Chat on Mac">
	{@render scene(MAC_SCENES.chat, 'A note to the landlord, in Llama for Mac', 1159)}
</Story>

<Story asChild name="Document on Mac">
	{@render scene(MAC_SCENES.document, 'A lease to read, in Llama for Mac', 1159)}
</Story>

<Story asChild name="Chat on a phone">
	{@render scene(MAC_SCENES.phone, 'Llama Chat on a phone, in Safari', 367)}
</Story>
