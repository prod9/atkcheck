<script context="module">
	import getDataFromSheet from '$lib/utils/getDataFromSheet';
	import { user, confirmPicture, isLoading } from '$lib/shared/store';
	import { get } from 'svelte/store';

	export const load = async ({}) => {
		const profile = get(user);
		isLoading.set(true);

		const res = await getDataFromSheet(profile.email);
		if (res.length >= 0) {
			isLoading.set(false);
		}

		return {
			props: {
				history: res
			}
		};
	};
</script>

<script>
	import { onMount } from 'svelte';
	import Uppy from '@uppy/core';
	import Transloadit from '@uppy/transloadit';
	import dayjs from 'dayjs';
	import { goto } from '$app/navigation';
	import { variables } from '$lib/shared/variables';

	export let history;

	onMount(async () => {
		document.body.style.background = 'linear-gradient(180deg, #e9fbff 0%, #2e12c4 65.62%)';

		if (history.length > 0) {
			goto('/thankyou');
		}
	});

	let fileinput;
	const watermarkName = $user.name;
	const watermarkDate = dayjs().format('DD/MM/YYYY HH:mm:ss');
	const uppy = new Uppy();
	uppy
		.use(Transloadit, {
			waitForEncoding: true,
			params: {
				auth: { key: variables.transloaditAuth },
				steps: {
					':original': {
						robot: '/upload/handle'
					},
					date_watermarked: {
						use: ':original',
						robot: '/image/resize',
						width: 1280,
						height: 720,
						text: [
							{
								text: `${watermarkName} \n ${watermarkDate}`,
								size: 36,
								font: 'Work-Sans-ExtraBold',
								color: '#FFFFFF',
								stroke_width: 1,
								stroke_color: '#000000',
								valign: 'bottom',
								align: 'right',
								x_offset: 16,
								y_offset: -10
							}
						]
					},
					optimized: {
						use: 'date_watermarked',
						robot: '/image/optimize'
					},
					converted: {
						use: 'optimized',
						robot: '/image/resize',
						format: 'jpg',
						imagemagick_stack: 'v2.0.7'
					},
					export: {
						use: 'converted',
						robot: '/minio/store',
						credentials: 'minio_bucket_credentials'
					}
				}
			}
		})
		.on('transloadit:result', (stepName, result) => {
			$confirmPicture = result.url;
			goto('/confirm');
		});

	const onFileUpload = (event) => {
		const files = Array.from(event.target.files);
		$isLoading = true;

		files.forEach((file) => {
			try {
				uppy.addFile({
					source: 'file input',
					name: file.name,
					type: file.type,
					data: file
				});

				uppy.upload().then((result) => {
					$isLoading = false;

					if (result.failed.length > 0) {
						console.error('Errors:');
						result.failed.forEach((file) => {
							console.error(file.error);
						});
					}
				});
			} catch (err) {
				if (err.isRestriction) {
					console.log('Restriction error:', err);
				} else {
					console.error(err);
				}
			}
		});
	};
</script>

<svelte:head>
	<meta name="theme-color" content="#e9fbff" />
</svelte:head>

<section class="flex flex-col h-full justify-between">
	<div class="flex justify-center mt-20">
		<img class="avatar" src="atkIcon.svg" alt="ATK-Icon" />
	</div>
	<div>
		<div class="mb-4">
			<p class="font-bold">Step 2 of 3</p>
			<p>Tap the button below to take a photo of your ATK test.</p>
		</div>
		<button
			on:click={() => {
				fileinput.click();
			}}>Take or Upload photo</button
		>
		<input
			name="ATK"
			style="display:none"
			type="file"
			accept=".jpg, .jpeg, .png"
			on:change={(e) => onFileUpload(e)}
			bind:this={fileinput}
			required
		/>
	</div>
</section>
