<script>
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.style.background = '#2E12C4';
	});
</script>

<section class="h-full flex flex-col justify-between items-center">
	<div class="h-full flex justify-center items-center">
		<div>
			<img src="right.gif" alt="success" width={222} />
		</div>
	</div>
	<div class="px-2 text-center mb-12">
		<p class="font-montserrat font-semibold text-2xl mb-5">SUCCESS !</p>
		<p class="text-base">Thank you for the submission.</p>
		<p class="text-base whitespace-pre">
			{`Contact @jeab or @kachasmas \n if there is any questions.`}
		</p>
	</div>
</section>
