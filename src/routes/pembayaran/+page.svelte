<script lang="ts">
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import { goto } from '$app/navigation';

	const paymentTypes = [
		{ id: 'kasir', label: 'Pembayaran via Kasir', icon: '💰' },
		{ id: 'supir', label: 'Pembayaran via Supir', icon: '🚚' }
	];

	function handlePaymentTypeSelect(type: string) {
		goto(`/pembayaran/${type}`);
	}
</script>

<svelte:head>
	<title>Laporin - Pembayaran</title>
	<meta name="description" content="Aplikasi pelaporan pembayaran tempe" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
	<NavigationBar />

	<main>
		<div class="content">
			<h1>Pilih Jenis Pembayaran</h1>
			<div class="payment-types-grid">
				{#each paymentTypes as type}
					<button 
						class="payment-type-card"
						on:click={() => handlePaymentTypeSelect(type.id)}
					>
						<span class="payment-icon">{type.icon}</span>
						<h2>{type.label}</h2>
					</button>
				{/each}
			</div>
		</div>
	</main>

	<footer>
		<p>© 2025 Laporin - Aplikasi Pelaporan Pembayaran</p>
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

	.payment-types-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.payment-type-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background-color: var(--background-color);
		border: 1px solid var(--border-color);
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
	}

	.payment-type-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-color: var(--primary-color);
	}

	.payment-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.payment-type-card h2 {
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

		.payment-types-grid {
			grid-template-columns: 1fr;
		}

		.payment-type-card {
			padding: 1.5rem;
		}
	}
</style> 