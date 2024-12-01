import type { Component } from "svelte";
import { writable, get } from "svelte/store";
import { Empty } from "$components/visual/story";

export const storyComponent = writable<Component | null>(null);
