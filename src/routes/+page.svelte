<script lang="ts">
	import { goto } from '$app/navigation';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/about');
	});
</script>

<svelte:head>
	<title>Laporin - Aplikasi Pelaporan Via Whatsapp</title>
	<meta name="description" content="Aplikasi pelaporan pesanan tahu" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
	<NavigationBar />
	<main>
		<div class="loading">
			<p>Mengalihkan ke halaman tentang...</p>
		</div>
	</main>
</div>

<style>
	.app-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loading {
		text-align: center;
		color: var(--text-light);
	}
</style>
