import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const isLoading = writable(false);

export const user = writable({});

export const confirmPicture = writable(null);

export const result = writable({
	success: false,
	error: false
});

export const idToken = writable(browser && (localStorage.getItem('idToken') || null));
idToken.subscribe((value) => {
	browser && localStorage.setItem('idToken', value);
});
