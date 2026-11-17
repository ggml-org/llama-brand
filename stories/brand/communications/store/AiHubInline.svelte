<!--
	The Microsoft Store AI Hub's inline spotlight: a centre-focused picture on a transparent ground, which the Store
	sets on its page with the app's name, its line of copy and a button beside it. Laid out at 1920 × 1080 and
	exported at 2x for 3840 × 2160. The page behind it may be light or dark, so the picture is Llama for Windows' own
	dark UI with the light app tile, which read on either.

	The same parts as the Spotlight hero, without what needs a desktop under it: the quick chat with a real Llama Chat
	conversation (a Store scene), the app tile on its corner, and the privacy card in front of its lower right corner.
-->
<script lang="ts">
	import AppIcon from '../posts/AppIcon.svelte';
	import { FORMATS } from '../posts/post';
	import PostFrame from '../posts/PostFrame.svelte';
	import PrivacyCard, { type PrivacyCardKind } from './PrivacyCard.svelte';
	import QuickChat from './QuickChat.svelte';
	import type { QuickChatScene as Scene } from './scenes';

	interface Props {
		/** shown at its real size, for an export */
		actual?: boolean;
		card?: PrivacyCardKind;
		/** the conversation the quick chat shows */
		scene?: Scene;
	}

	let { actual = false, card = 'picture', scene = 'statement' }: Props = $props();

	const format = FORMATS.msAiHub;
	const unit = format.height / 24;
</script>

<!-- the night ground's inks for the tile (light, with the dark icon), its background left out -->
<PostFrame {actual} {format} label="AI Hub inline, {scene}" tone="night" transparent>
	<div style:margin="{-unit * 2}px" class="stage">
		<div style:left="430px" style:top="230px"><QuickChat {scene} width={730} /></div>

		<div style:left="1090px" style:top="640px"><PrivacyCard kind={card} /></div>

		<div style:left="360px" style:top="160px" class="tile"><AppIcon size={170 / unit} /></div>
	</div>
</PostFrame>

<style>
	.stage {
		position: relative;
		flex: 1;
	}
	.stage > * {
		position: absolute;
	}
	.tile {
		filter: drop-shadow(0 20px 28px rgb(0 0 0 / 0.4));
	}
</style>
