<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { factories } from '$lib/customers';
	import type { Factory } from '$lib/types';

	let selectedFactory: Factory | null = null;

	function selectFactory(factory: Factory) {
		selectedFactory = factory;
		// Store the selected factory in localStorage for persistence
		localStorage.setItem('selectedFactory', JSON.stringify(factory));
		// Navigate to the orders page with the factory ID as a parameter
		goto(`/orders/${factory.id}`);
	}

	// Check if a factory was previously selected
	onMount(() => {
		const storedFactory = localStorage.getItem('selectedFactory');
		if (storedFactory) {
			try {
				const factory = JSON.parse(storedFactory) as Factory;
				// Auto-select the factory if it exists in our list
				if (factories.some(f => f.id === factory.id)) {
					selectedFactory = factory;
				}
			} catch (e) {
				console.error('Error parsing stored factory:', e);
			}
		}
	});
</script>

<svelte:head>
	<title>Laporin - Pilih Pabrik</title>
	<meta name="description" content="Pilih pabrik untuk melanjutkan ke halaman pesanan" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
	<header>
		<div class="logo">
			<span class="logo-text">Laporin</span>
			<span class="logo-dot"></span>
		</div>
		<h1>Pilih Pabrik</h1>
		<p class="subtitle">Silakan pilih pabrik untuk melanjutkan ke halaman pesanan</p>
	</header>

	<main>
		<div class="factories-grid">
			{#each factories as factory}
				<button 
					class="factory-card card" 
					on:click={() => selectFactory(factory)}
					class:selected={selectedFactory?.id === factory.id}
				>
					<h2>{factory.name}</h2>
					<p>Klik untuk melihat pesanan pabrik {factory.name}</p>
				</button>
			{/each}
		</div>
	</main>

	<footer>
		<p>© 2025 Laporin - Aplikasi Pelaporan Pesanan Tahu</p>
	</footer>
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

	header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.logo-text {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--primary-color);
	}

	.logo-dot {
		width: 12px;
		height: 12px;
		background-color: var(--accent-color);
		border-radius: 50%;
		margin-left: 4px;
	}

	h1 {
		font-size: 2rem;
		color: var(--text-color);
		margin-bottom: 0.5rem;
	}

	.subtitle {
		font-size: 1.1rem;
		color: var(--text-light);
		margin-bottom: 1rem;
	}

	main {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.factories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 2rem;
		width: 100%;
		max-width: 900px;
	}

	.factory-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		text-align: center;
		cursor: pointer;
		transition: all 0.3s ease;
		border: 2px solid var(--border-color);
	}

	.factory-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px var(--shadow-color);
		border-color: var(--primary-light);
	}

	.factory-card.selected {
		border-color: var(--primary-color);
		background-color: rgba(76, 175, 80, 0.05);
	}

	.factory-card h2 {
		font-size: 1.5rem;
		color: var(--primary-color);
		margin-bottom: 1rem;
	}

	.factory-card p {
		color: var(--text-light);
		font-size: 0.9rem;
	}

	footer {
		text-align: center;
		margin-top: 3rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-color);
		color: var(--text-light);
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.factories-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.factory-card {
			padding: 1.5rem;
		}
	}
</style>
