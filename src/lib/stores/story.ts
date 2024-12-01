import type { Component } from "svelte";
import { writable, get } from "svelte/store";

export const storyComponent = writable<Component | null>(null);
