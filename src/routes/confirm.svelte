<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { variables } from '$lib/shared/variables';
	import { confirmPicture, user, isLoading, result } from '$lib/shared/store';
	import sendDiscordMessage from '$lib/utils/sendDiscordMessage';

	onMount(() => {
		document.body.style.background = 'linear-gradient(180deg, #e9fbff 0%, #2e12c4 65.62%)';
		if (!$confirmPicture) {
			goto('/upload');
		}
	});

	const onSubmit = (e) => {
		e.preventDefault();
		const form = document.forms['atk-form'];
		const scriptURL = variables.googleSheetScriptUrl;

		$isLoading = true;

		const requestBody = new FormData(form);

		fetch(scriptURL, { method: 'POST', body: requestBody })
			.then((response) => {
				$isLoading = false;
				$result = {
					success: true,
					error: false
				};
				sendDiscordMessage($user.name, $confirmPicture);
			})
			.catch((err) => {
				$isLoading = false;
				$result = {
					success: false,
					error: true
				};
				throw Error('Submit GoogleSheet Error', err);
			});
	};
</script>

<svelte:head>
	<meta name="theme-color" content="#e9fbff" />
</svelte:head>

<section class="flex flex-col h-full justify-between">
	<div>
		<img class=" border-8 rounded" src={$confirmPicture} alt="ATK" />
	</div>

	<div class="mt-5">
		<div class="mb-4">
			<p class="font-bold">Step 3 of 3</p>
			<p>Check the information above and tap the button to confirm.</p>
		</div>

		<form name="atk-form" on:submit={(e) => onSubmit(e)}>
			<div class="hidden">
				<input name="Name" type="text" value={$user.name} />
				<input name="Email" type="text" value={$user.email} />
				<input name="ATK" type="text" value={$confirmPicture} />
			</div>
			<div class="flex flex-row items-center">
				<div>
					<img
						on:click={() => goto('/upload')}
						src="backIcon.png"
						alt="back"
						width={32}
						class="mr-4 cursor-pointer"
					/>
				</div>
				<button id="submit" type="submit">CONFIRM</button>
			</div>
		</form>
	</div>
</section>

<style>
	button {
		width: 100%;
		padding: 15px 0;
		color: #606060;
		background: #ffffff;
		border-radius: 8px;
		font-family: 'Montserrat', sans-serif;
	}
</style>
