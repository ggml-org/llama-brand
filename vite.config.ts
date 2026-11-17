/// <reference types="vitest/config" />
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],

	test: {
		projects: [
			{
				extends: './vite.config.ts',
				plugins: [
					storybookTest({
						storybookScript: 'npm run storybook -- --no-open'
					})
				],
				test: {
					// CI runs the bundled Chromium without its sandbox, which the runners can't start;
					// locally, the installed (auto-updated) Chrome with its sandbox on
					browser: {
						enabled: true,
						instances: [{ browser: 'chromium', headless: true }],
						provider: playwright({
							launchOptions: process.env.CI
								? { args: ['--no-sandbox'] }
								: { channel: 'chrome', chromiumSandbox: true }
						})
					},
					name: 'ui'
				}
			}
		]
	}
});
