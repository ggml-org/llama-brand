import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

// SvelteKit is here for Storybook's SvelteKit framework only: there is no app to build.
// mdsvex compiles the .svx pages (the philosophy and the logo overview) into components.
/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: [vitePreprocess(), mdsvex()]
};

export default config;
