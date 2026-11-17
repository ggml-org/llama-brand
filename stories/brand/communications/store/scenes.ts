// The app scenes the store screenshots show: the real Llama Chat with everyday content (a note to write, a lease to
// read, a notification to understand, a line made friendlier from another app through Alt + Space), as Llama for
// Windows shows it in dark mode and Llama for Mac in light mode, in a Safari web app and on a phone. They are stories
// of llama.cpp's Storybook (Communications' Store scenes there render the app), captured as images at the size their
// frame shows them, at three times its pixels: re-capture them there when the app changes.
import chatOnAPhone from './app/scenes/chat-on-a-phone.png';
import chatOnMac from './app/scenes/chat-on-mac.png';
import chat from './app/scenes/chat.png';
import documentOnMac from './app/scenes/document-on-mac.png';
import document from './app/scenes/document.png';
import quickChat from './app/scenes/quick-chat.png';
import screenshot from './app/scenes/screenshot.png';
import quickChatChat from './app/scenes/quick-chat/chat.png';
import quickChatCv from './app/scenes/quick-chat/cv.png';
import quickChatLeave from './app/scenes/quick-chat/leave.png';
import quickChatNotes from './app/scenes/quick-chat/notes.png';
import quickChatStatement from './app/scenes/quick-chat/statement.png';

/** the model the chat runs: a small one from llama.app's catalog, the kind an ordinary PC runs well */
export const SCENE_MODEL_ID = 'ggml-org/gemma-4-E4B-it-GGUF:Q4_K_M';

/** the scenes in Llama for Windows' quick chat */
export const SCENES = { chat, document, quick: quickChat, screenshot } as const;

export type Scene = keyof typeof SCENES;

/** the scenes as Llama for Mac shows them: the same conversations in light mode, in a Safari web app */
export const MAC_SCENES = {
	chat: chatOnMac,
	document: documentOnMac,
	phone: chatOnAPhone
} as const;

export type MacScene = keyof typeof MAC_SCENES;

/**
 * the conversations the Store's Spotlight and AI Hub pictures show in the quick chat, captured at its 788 × 660 (a
 * bank statement, meeting notes, a CV, a note about time off, the note to a landlord): papers people would rather keep
 * on their own PC, and nothing about health or that reads as legal or financial advice
 */
export const QUICK_CHAT_SCENES = {
	chat: quickChatChat,
	cv: quickChatCv,
	leave: quickChatLeave,
	notes: quickChatNotes,
	statement: quickChatStatement
} as const;

export type QuickChatScene = keyof typeof QUICK_CHAT_SCENES;
