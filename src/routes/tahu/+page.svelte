<script lang="ts">
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	
	const { data } = $props();
	const { factories } = data;
</script>

<svelte:head>
	<title>Laporin - Pilih Pabrik</title>
	<meta name="description" content="Pilih pabrik untuk melihat laporan pesanan tahu" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
	<NavigationBar />

	<main>
		<div class="content">
			<h1>Pilih Pabrik</h1>
			<div class="factories-grid">
				{#each factories as factory}
					<a href="/tahu/{factory.id}" class="factory-card">
						<span class="factory-icon">🏭</span>
						<h2>{factory.name}</h2>
					</a>
				{/each}
			</div>
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

	main {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 2rem 0;
	}

	.content {
		width: 100%;
		max-width: 800px;
	}

	h1 {
		font-size: 2rem;
		color: var(--primary-color);
		margin-bottom: 2rem;
		text-align: center;
	}

	.factories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.factory-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background-color: var(--background-color);
		border: 1px solid var(--border-color);
		border-radius: 12px;
		text-decoration: none;
		color: var(--text-color);
		transition: all 0.2s ease;
	}

	.factory-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-color: var(--primary-color);
	}

	.factory-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.factory-card h2 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
		text-align: center;
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
		.app-container {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.factories-grid {
			grid-template-columns: 1fr;
		}

		.factory-card {
			padding: 1.5rem;
		}
	}
</style> 