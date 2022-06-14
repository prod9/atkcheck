<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export function load({ error, status }) {
		return {
			props: {
				status: status,
				message: error.message
			}
		};
	}
</script>

<script>
	export let status, message;
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.style.background = 'linear-gradient(180deg, #e9fbff 0%, #2e12c4 65.62%)';
	});
</script>

<div class="flex flex-col items-center">
	<img
		alt="sorry"
		src="https://media2.giphy.com/media/JRP94VfPBWm40CKYMO/giphy.gif?cid=ecf05e47031uvfhipo4ysczdt4do97kh1evw0k6ryaesolkk&rid=giphy.gif&ct=s"
	/>
	<div class="text-center">
		<h1>{status}</h1>
		<p>{message}</p>
	</div>
</div>
