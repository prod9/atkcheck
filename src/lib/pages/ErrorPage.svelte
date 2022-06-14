<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		document.body.style.background = '#EF2220';
	});

	const onRetry = () => {
		goto('/');
	};
</script>

<section class="h-full flex flex-col justify-between items-center">
	<div class="h-full flex justify-center items-center">
		<div>
			<img src="wrong.gif" alt="error" width={222} />
		</div>
	</div>
	<div>
		<div class="mb-6 flex flex-col justify-center">
			<p class="font-montserrat font-semibold text-2xl text-center mb-6">ERROR !</p>
			<p class="text-base text-center">Someting wrong</p>
			<p class="text-base text-center">sent feedback to @yeen or retry</p>
		</div>
		<button
			class="font-montserrat"
			on:click={() => {
				onRetry();
			}}>RETRY</button
		>
	</div>
</section>
