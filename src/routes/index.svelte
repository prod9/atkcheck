<script>
	import getGoogleOAuthUserURL from '$lib/utils/getGoogleOAuthUserURL';
	import getIdToken from '$lib/utils/getIdToken';
	import { result, idToken } from '$lib/shared/store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let params = null;

	onMount(() => {
		document.body.style.background = 'linear-gradient(180deg, #e9fbff 0%, #2e12c4 65.62%)';
		const searchParams = $page.url.search.substring(1) || null;

		if (searchParams) {
			const test = JSON.parse(
				'{"' +
					decodeURI(searchParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
					'"}'
			);
			params = test;
		}

		if (params) {
			handleGetIdToken();
		}
	});

	const handleGetIdToken = async () => {
		const res = await getIdToken(params.code);
		const { id_token } = res;
		if (id_token) {
			$idToken = res.id_token;
			goto('/upload');
		}
	};
</script>

<section class="flex flex-col h-full justify-between">
	<div>
		<img class="logo" src="logo.svg" alt="prodigy9-atk-check" />
		<h1>Antigen Test Kit Self-Report</h1>
	</div>
	<div>
		<div class="mb-4">
			<p class="font-bold">Step 1 of 3</p>
			<p>Please sign-in with your @prodigy9.co google account.</p>
		</div>
		<a
			href={getGoogleOAuthUserURL()}
			class="flex flex-row w-full bg-white justify-center items-center rounded-lg"
		>
			<div>
				<p class="font-montserrat text-sm text-medium-gray py-4">Sign in with Google</p>
			</div>
			<div class="pl-2">
				<img src="googleIcon.png" alt="google-logo" width={24} height={24} />
			</div>
		</a>
	</div>
</section>

<style>
	h1 {
		font-family: 'Orbitron', sans-serif;
		font-size: 26px;
		line-height: 33px;
	}

	a {
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.19);
	}

	a:hover {
		box-shadow: 0px 15px 20px rgba(26, 3, 156, 0.8);
	}

	.logo {
		margin-left: -30px;
	}
</style>
