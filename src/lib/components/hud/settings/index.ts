import { writable } from "svelte/store";

import SettingsModal from "./SettingsModal.svelte";
import SettingsToggle from "./SettingsToggle.svelte";
export { SettingsModal, SettingsToggle };

export const openSettings = writable(false);
