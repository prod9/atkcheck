<svelte:head>
	<meta name="theme-color" content="#000000" />
</svelte:head>

<div class="flex justify-center items-center h-full">
	<div class="flex flex-col items-center">
		<div class="waviy text-4xl font-bold mb-5">
			<span style="--i:1">T</span>
			<span style="--i:2">H</span>
			<span style="--i:3">A</span>
			<span style="--i:4">N</span>
			<span style="--i:5">K</span>
			<span style="--i:6">Y</span>
			<span style="--i:7">O</span>
			<span style="--i:8">U</span>
		</div>
		<p>You already sent ATK for today</p>
	</div>
</div>

<style>
	.waviy {
		position: relative;
		-webkit-box-reflect: below -20px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
	}
	.waviy span {
		position: relative;
		display: inline-block;
		color: #fff;
		text-transform: uppercase;
		animation: waviy 2s infinite;
		animation-delay: calc(0.15s * var(--i));
	}
	@keyframes waviy {
		0%,
		40%,
		100% {
			transform: translateY(0);
		}
		20% {
			transform: translateY(-15px);
		}
	}
</style>
