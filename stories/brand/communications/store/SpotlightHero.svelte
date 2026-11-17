<!--
	The Microsoft Store's Spotlight hero: a picture oriented to the right, since the Store sets the app's header and
	subheader in white over the left part (left-justified, from the top twentieth down to about four fifths). So it
	stands on the night sky: Microsoft asks for no white or light background. Laid out at 1920 × 1080 and exported at
	2x for 3840 × 2160. The zones are the Store's own, from Microsoft's asset guide (its slide 6 overlay, measured): the
	text overlay over the left 45%, and the optimal logo placement at the centre right.

	It shows why to use Llama, not what it is: Llama for Windows' quick chat with a real Llama Chat conversation about
	something people would rather keep on their own PC (a Store scene), the app tile on its corner; the privacy card in
	the top right corner; and Llama's tray flyout open from the taskbar, where it opens in the app, all over the dot
	grid, which fades out towards the Store's text. `overlay` previews that text (the chosen header and subheader) and
	draws the Store's zones; it is never part of the export.
-->
<script lang="ts">
	import { WindowsTaskbar } from '../../../../.storybook/mockups';
	import { PATHS, SIZE } from '../../logo-showcase/lib/logo';
	import AppIcon from '../posts/AppIcon.svelte';
	import { FORMATS, grid } from '../posts/post';
	import PostFrame from '../posts/PostFrame.svelte';
	import PrivacyCard, { type PrivacyCardKind } from './PrivacyCard.svelte';
	import QuickChat from './QuickChat.svelte';
	import type { QuickChatScene as Scene } from './scenes';
	import WindowsTray from './WindowsTray.svelte';

	interface Props {
		/** shown at its real size, for an export */
		actual?: boolean;
		card?: PrivacyCardKind;
		header?: string;
		overlay?: boolean;
		/** the conversation the quick chat shows */
		scene?: Scene;
		subheader?: string;
	}

	let {
		actual = false,
		card = 'picture',
		header = 'Llama',
		overlay = false,
		scene = 'statement',
		subheader = ''
	}: Props = $props();

	const format = FORMATS.msSpotlight;
	const g = grid(format);
	// Microsoft's zones, in the piece's pixels: slide 6 of its Spotlight guide is 1456 × 819, so × 1920 / 1456
	const k = format.width / 1456;
	const textZone = { bottom: 648 * k, right: 653 * k, top: 40 * k };
	const logoZone = { bottom: 647 * k, left: 975 * k, right: 1393 * k, top: 138 * k };
	// the right column, 380 wide and 20 in from the edge: the privacy card over the tray flyout, which stands on the
	// taskbar as Windows sets it; the taskbar at 1.6 times, as the Store screenshots have it
	const column = { left: 1520, width: 380 };
	const desk = 1.6;
	const trayIcon = { paths: PATHS, viewBox: `0 0 ${SIZE} ${SIZE}` };
</script>

<PostFrame {actual} {format} label="Spotlight hero, {scene}" tone="night">
	<div style:margin="{-g.margin}px" class="stage">
		<div aria-hidden="true" class="dots"></div>

		<!-- the quick chat just past the Store's text zone, the app tile on its corner, clear of that zone -->
		<div style:left="890px" style:top="250px"><QuickChat {scene} width={608} /></div>

		<div style:left="{column.left}px" style:top="60px"><PrivacyCard kind={card} /></div>

		<div style:bottom="{48 * desk + 21}px" style:left="{column.left}px">
			<div style:zoom={column.width / 417}><WindowsTray /></div>
		</div>

		<div style:left="866px" style:top="180px" class="tile"><AppIcon size={150 / g.unit} /></div>

		<div style:width="{format.width}px" class="taskbar">
			<div style:width="{format.width / desk}px" style:zoom={desk}>
				<WindowsTaskbar clock={['10:24 AM', '11/18/2026']} mode="dark" {trayIcon} />
			</div>
		</div>

		{#if overlay}
			<!-- the Store's zones and its text, as a preview; never exported -->
			<div aria-hidden="true" class="zones">
				<i
					style:height="{textZone.bottom - textZone.top}px"
					style:top="{textZone.top}px"
					style:width="{textZone.right}px"
					class="text-zone"
				></i>

				<i
					style:height="{logoZone.bottom - logoZone.top}px"
					style:left="{logoZone.left}px"
					style:top="{logoZone.top}px"
					style:width="{logoZone.right - logoZone.left}px"
					class="logo-zone"
				></i>

				<div class="store-text">
					<p class="store-header">{header}</p>

					<p class="store-subheader">{subheader}</p>

					<span class="store-button">See details</span>
				</div>
			</div>
		{/if}
	</div>
</PostFrame>

<style>
	/* the whole piece, edge to edge: the hero places its parts by the Store's zones, not the post grid */
	.stage {
		position: relative;
		flex: 1;
	}
	.stage > * {
		position: absolute;
	}
	/* the dot grid, a dot a unit, fading out towards the Store's text on the left */
	.dots {
		inset: 0;
		background: radial-gradient(circle, rgb(250 250 250 / 0.26) 2.4px, transparent 2.9px) 22px
			22px / var(--u) var(--u);
		mask-image: linear-gradient(90deg, transparent 38%, #000 62%);
	}
	.tile {
		filter: drop-shadow(0 20px 26px rgb(0 0 0 / 0.45));
	}
	.taskbar {
		bottom: 0;
		left: 0;
	}

	/* Microsoft's overlay, as its guide draws it: the text zone in red, the logo zone outlined */
	.zones {
		inset: 0;
		pointer-events: none;
	}
	.zones i {
		position: absolute;
	}
	.text-zone {
		left: 0;
		background: rgb(200 30 40 / 0.28);
	}
	.logo-zone {
		outline: 2px dashed rgb(255 255 255 / 0.6);
	}
	/* the Store's text, white and left-justified, in Segoe UI where there is one */
	.store-text {
		position: absolute;
		top: 470px;
		left: 84px;
		display: grid;
		justify-items: start;
		gap: 10px;
		color: #fff;
		font-family: 'Segoe UI Variable Display', 'Segoe UI', system-ui, sans-serif;
	}
	.store-text p {
		margin: 0;
	}
	.store-header {
		font-size: 60px;
		font-weight: 600;
		line-height: 1.1;
	}
	.store-subheader {
		font-size: 26px;
		line-height: 1.3;
		opacity: 0.9;
	}
	.store-button {
		margin-top: 22px;
		padding: 10px 22px;
		border-radius: 6px;
		background: rgb(255 255 255 / 0.18);
		font-size: 20px;
	}
</style>
