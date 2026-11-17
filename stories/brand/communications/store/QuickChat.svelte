<!--
	Llama for Windows' quick chat for the Store's Spotlight and AI Hub pictures: Windows' dark frame, the running
	model in a pill, the real Llama Chat inside (an image of a Store scene, laid out 788 × 660, the narrowest it keeps
	its desktop layout, captured in llama.cpp's Storybook) and Esc to close it. `width` is its width in the piece's pixels: the frame is laid out 820 wide and zoomed
	to it. Place it with a wrapper, since zoom scales an element's own offsets too.
-->
<script lang="ts">
	import { ICON } from '../posts/post';
	import { QUICK_CHAT_SCENES, type QuickChatScene, SCENE_MODEL_ID } from './scenes';

	interface Props {
		/** the conversation it shows */
		scene: QuickChatScene;
		/** its width in the piece's pixels */
		width: number;
	}

	let { scene, width }: Props = $props();

	const chat = { height: 660, width: 788 };
</script>

<div style:width="{chat.width + 32}px" style:zoom={width / (chat.width + 32)} class="window">
	<div class="head">
		<span class="app-icon">{ICON}</span>

		<span class="pill"><i class="dot"></i>{SCENE_MODEL_ID}</span>
	</div>

	<img
		style:height="{chat.height}px"
		alt="Llama, {scene}"
		class="scene"
		src={QUICK_CHAT_SCENES[scene]}
	/>

	<p class="dismiss"><kbd>Esc</kbd> to dismiss</p>
</div>

<style>
	.window {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		overflow: hidden;
		border: 1px solid rgb(255 255 255 / 0.12);
		border-radius: 10px;
		background: #202020;
		color: #fff;
		font:
			400 13px / 1 'Segoe UI Variable',
			'Segoe UI',
			var(--sans);
		box-shadow:
			0 60px 110px -36px rgb(0 0 0 / 0.7),
			0 4px 16px rgb(0 0 0 / 0.3);
	}
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 48px;
		padding: 0 12px 0 18px;
	}
	.app-icon {
		font: 700 18px / 1 var(--sans);
	}
	.pill {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 7px 12px;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.06);
	}
	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #3fb950;
	}
	.scene {
		display: block;
		flex: none;
		width: calc(100% - 32px);
		margin: 0 16px;
		border: 0;
		border-radius: 4px;
		background: #0a0a0a;
		object-fit: cover;
	}
	.dismiss {
		margin: 0;
		padding: 10px 0 12px;
		color: rgb(255 255 255 / 0.6);
		font-size: 12px;
		text-align: center;
	}
	.dismiss kbd {
		color: rgb(255 255 255 / 0.85);
		font: inherit;
	}
</style>
