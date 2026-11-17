<!--
	The privacy card of the Store's Spotlight and AI Hub pictures: why to use Llama, said so that it is got at a glance,
	on the night ground's card with cinder on the one thing that matters. `picture` is a PC with a chat on it and the
	way to the cloud closed, over one line; `figure` is a zero in cinder beside what it counts; `checklist` is what
	stays on the PC, ticked. Only what Llama for Windows does, from its README. Drawn in pixels of a 1920 × 1080 piece,
	380 wide.
-->
<script lang="ts" module>
	export type PrivacyCardKind = 'checklist' | 'figure' | 'picture';
</script>

<script lang="ts">
	interface Props {
		kind?: PrivacyCardKind;
	}

	let { kind = 'picture' }: Props = $props();

	const stays = ['Your prompts and replies', 'Your documents', 'Your models'];
</script>

<div class={['card', kind]}>
	{#if kind === 'picture'}
		<svg aria-hidden="true" class="pc" viewBox="0 0 324 120">
			<rect class="ink" height="86" rx="8" width="150" x="8" y="14" />

			<path class="ink" d="M2 110h162" />

			<rect class="bubble" height="14" rx="7" width="62" x="22" y="28" />

			<rect class="bubble reply" height="14" rx="7" width="84" x="60" y="50" />

			<rect class="bubble" height="14" rx="7" width="48" x="22" y="72" />

			<path class="way" d="M172 57h42" />

			<path class="closed" d="M226 45l24 24M250 45l-24 24" />

			<path
				class="cloud"
				d="M286 74a15 15 0 0 1 2-30 20 20 0 0 1 36 8 12 12 0 0 1-3 22z"
				transform="translate(-6 0)"
			/>
		</svg>

		<p class="line">Your chats stay on this PC</p>

		<p class="label">No account · Works offline</p>
	{:else if kind === 'figure'}
		<div class="count">
			<span class="zero">0</span>

			<span class="line">prompts, replies or files leave this PC</span>
		</div>

		<p class="label ruled">No account · No telemetry</p>
	{:else}
		<div class="head">
			<span class="badge">
				<svg aria-hidden="true" viewBox="0 0 24 24">
					<rect height="10" rx="2.5" width="15" x="4.5" y="10.5" />

					<path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
				</svg>
			</span>

			<span class="line">Stays on your PC</span>
		</div>

		{#each stays as item (item)}
			<p class="tick">
				<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>{item}
			</p>
		{/each}

		<p class="label ruled">No account · Works offline</p>
	{/if}
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 380px;
		box-sizing: border-box;
		padding: 24px 28px;
		border: 1px solid rgb(250 250 250 / 0.16);
		border-radius: 14px;
		background: #111a2a;
		color: #fafafa;
		font-family: var(--sans);
		box-shadow:
			0 40px 70px -30px rgb(0 0 0 / 0.75),
			0 4px 14px rgb(0 0 0 / 0.3);
	}
	.card p {
		margin: 0;
	}
	svg {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.line {
		font-size: 25px;
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}
	.label {
		color: rgb(250 250 250 / 0.66);
		font: 500 12.5px / 1.4 var(--mono);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.ruled {
		padding-top: 14px;
		border-top: 1px solid rgb(250 250 250 / 0.14);
	}

	/* the picture: the PC in ink, its chat as bubbles, the dotted way out, closed in cinder before the cloud */
	.pc {
		width: 324px;
		height: 120px;
	}
	.pc .ink {
		stroke: #fafafa;
		stroke-width: 3;
	}
	.pc .bubble {
		fill: rgb(250 250 250 / 0.28);
	}
	.pc .reply {
		fill: rgb(250 250 250 / 0.14);
	}
	.pc .way,
	.pc .cloud {
		stroke: rgb(250 250 250 / 0.5);
		stroke-width: 3;
	}
	.pc .way {
		stroke-dasharray: 2 9;
	}
	.pc .closed {
		stroke: var(--art-cinder);
		stroke-width: 5;
	}

	/* the figure: one number in cinder, and what it counts */
	.figure {
		gap: 14px;
	}
	.count {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	.count .line {
		line-height: 1.08;
	}
	.zero {
		color: var(--art-cinder);
		font-size: 132px;
		font-weight: 700;
		line-height: 0.82;
		letter-spacing: -0.04em;
	}

	/* the checklist: a lock on cinder, then what stays, ticked in ink */
	.checklist {
		gap: 13px;
	}
	.head {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 4px;
	}
	.head .line {
		font-size: 27px;
	}
	.badge {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 11px;
		background: var(--art-cinder);
	}
	.badge svg {
		width: 22px;
		height: 22px;
		stroke: #111a2a;
		stroke-width: 2.4;
	}
	.tick {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 20px;
	}
	.tick svg {
		width: 20px;
		height: 20px;
		stroke: #fafafa;
		stroke-width: 2.6;
	}
</style>
