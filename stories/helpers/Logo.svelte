<script>
	import icon from '../../logo/svg/icon/icon-light.svg?raw';

	// the icon as this repository draws it, in currentColor so it follows the text colour
	const logoMark = icon.replace(/fill="#[0-9a-f]{3,8}"/gi, 'fill="currentColor"');

	let { class: className = '', style = '' } = $props();
</script>

<div class={className} {style}>
	{@html logoMark}
</div>

<style>
	div :global(svg) {
		width: var(--size, 1rem);
		height: var(--size, 1rem);
	}
</style>
