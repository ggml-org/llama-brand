// Exports the Microsoft Store Spotlight and AI Hub pictures from a running Storybook, at their exact sizes: each
// piece is laid out at 1920 × 1080 (the "Export" story, at its real size) and screenshotted at 1x and 2x, once per
// use case. The Spotlight heroes are written as JPEG (Microsoft caps them at 2 MB) and PNG; the AI Hub pictures as
// PNG with their transparency. With Storybook running (npm run storybook):
//
//   npm run export:ms-spotlight -- [storybook url] [out dir]
import { mkdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const positional = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const base = positional[0] ?? 'http://localhost:6006';
const out = resolve(positional[1] ?? 'design-exports/ms-store-spotlight');
const id = 'communications-applications-microsoft-store-spotlight--export';

// the use cases, the bank statement first: the one sent to Microsoft
const useCases = [
	['bank-statement', 'statement'],
	['meeting-notes', 'notes'],
	['cover-letter', 'cv'],
	['note-to-manager', 'leave'],
	['note-to-landlord', 'chat']
];
const pieces = useCases.flatMap(([name, scene]) => [
	{ name: `spotlight-hero-${name}`, piece: 'hero', scene },
	{ name: `ai-hub-inline-${name}`, piece: 'aihub', scene }
]);

mkdirSync(out, { recursive: true });

const browser = await chromium.launch();

for (const scale of [1, 2]) {
	const context = await browser.newContext({
		deviceScaleFactor: scale,
		viewport: { height: 1200, width: 2000 }
	});
	const page = await context.newPage();

	for (const p of pieces) {
		const args = `piece:${p.piece};scene:${p.scene}`;

		await page.goto(`${base}/iframe.html?id=${id}&viewMode=story&args=${args}`);
		// nothing behind the piece but what it draws itself
		await page.addStyleTag({
			content:
				'html, body, #storybook-root { background: transparent !important; } .fit { border-radius: 0 !important; box-shadow: none !important; }'
		});
		const piece = page.locator('article.post').first();

		await piece.waitFor();
		await page.evaluate(() => document.fonts.ready);
		// the quick chat's Llama Chat is an image: wait for it to load
		await page.waitForLoadState('networkidle');
		await page.waitForTimeout(500);

		const size = scale === 2 ? '3840x2160' : '1920x1080';
		const file = `${out}/llama-${p.name}-${size}`;

		if (p.piece === 'hero') {
			await piece.screenshot({ path: `${file}.jpg`, quality: 90, type: 'jpeg' });
			await piece.screenshot({ path: `${file}.png`, type: 'png' });
		} else {
			await piece.screenshot({ omitBackground: true, path: `${file}.png`, type: 'png' });
		}

		for (const ext of p.piece === 'hero' ? ['jpg', 'png'] : ['png']) {
			const kb = Math.round(statSync(`${file}.${ext}`).size / 1024);

			console.log(`${file}.${ext}  ${kb} KB`);
		}
	}

	await context.close();
}

await browser.close();
