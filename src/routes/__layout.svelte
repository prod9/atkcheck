<script context="module">
	import getGoogleUser from '$lib/utils/getGoogleUser';
	import { idToken, isLoading, user, result } from '$lib/shared/store.js';
	import { browser } from '$app/env';
	import { get } from 'svelte/store';

	export const load = async ({ url }) => {
		let isAuthorized = false;
		const currrentPath = url.pathname;
		const token = get(idToken);
		isLoading.set(true);

		if (token !== null) {
			const res = await getGoogleUser(token);
			if (res.error == 'invalid_token') {
				isAuthorized = false;
			} else {
				isAuthorized = true;
				user.set({ id: res.id, name: res.name, email: res.email, picture: res.picture });
			}

			if (browser) {
				if (isAuthorized && currrentPath === '/') {
					isLoading.set(false);
					return {
						status: 302,
						redirect: '/upload'
					};
				} else if (isAuthorized && currrentPath !== '/') {
					isLoading.set(false);
					return { status: 200 };
				} else if (!isAuthorized && currrentPath !== '/') {
					isLoading.set(false);
					return {
						status: 302,
						redirect: '/'
					};
				} else {
					isLoading.set(false);
					return {};
				}
			}
		} else {
			return {
				status: 302,
				redirect: '/'
			};
		}

		return {};
	};
</script>

<script>
	import '../app.css';
	import { navigating } from '$app/stores';
	import LoadingPage from '$lib/pages/LoadingPage.svelte';
	import SuccessPage from '../lib/pages/SuccessPage.svelte';
	import ErrorPage from '../lib/pages/ErrorPage.svelte';
</script>

<main class="w-full flex">
	<div class="w-full pt-10 pb-24">
		{#if $navigating || $isLoading}
			<LoadingPage />
		{:else if $result.success}
			<SuccessPage />
		{:else if $result.error}
			<ErrorPage />
		{:else}
			<slot />
		{/if}
	</div>
</main>

<style>
	main {
		height: calc(100vh - var(--space-margin));
	}
</style>
