/**
 * The app icon values the usage page draws with, as Llama Chat sets them in llama.cpp
 * (ui/apps/chat/src/lib/constants/pwa.constants.ts): the grounds of its light and dark icons, and the
 * share of the canvas its favicon and splash screen leave around the icon.
 */
export const THEME_COLORS = {
	BACKGROUND_DARK: '#111111',
	BACKGROUND_LIGHT: 'white'
} as const;

export const PWA_ASSET_GENERATOR = {
	FAVICON_PADDING: 0,
	SPLASH_PADDING: 0.75
} as const;
