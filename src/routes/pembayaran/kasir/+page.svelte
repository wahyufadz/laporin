<script lang="ts">
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import BackButton from '$lib/components/BackButton.svelte';

	// Data sales
	const salesList = [
		{ id: '1', name: 'Sales 1' },
		{ id: '2', name: 'Sales 2' },
		{ id: '3', name: 'Sales 3' }
	];

	// State untuk form
	let selectedSales = '';
	let showForm = false;

	// State untuk pembayaran
	let bayarTempe = '';
	let bayarTahu = '';

	// State untuk retur
	let returTempeKecil = '';
	let returTempeBesar = '';
	let returTempePanjang = '';

	// State untuk pembelian
	let beliTempeKecil = '';
	let beliTempeBesar = '';
	let beliTempePanjang = '';

	function handleSalesSelect() {
		showForm = !!selectedSales;
	}

	function generateWhatsAppLink(): string {
		const today = new Date();
		const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
		const dayName = days[today.getDay()];
		const formattedDate = `${dayName} ${today.toLocaleDateString('id-ID')}`;

		const selectedSalesName = salesList.find(s => s.id === selectedSales)?.name || '';

		const messageText = 
			`${formattedDate}\n` +
			`${selectedSalesName}\n\n` +
			(bayarTempe ? `Pembayaran Tempe ${bayarTempe || '0'}\n` : `` )+
			(bayarTahu ? `Pembayaran Tahu ${bayarTahu || '0'}\n` : ``) +
			(returTempeKecil+returTempePanjang+returTempePanjang !== `` ? `Retur ${returTempeKecil || '0'}/${returTempeBesar || '0'}/${returTempePanjang || '0'}\n` : `` )+
			(beliTempeKecil+beliTempeBesar+beliTempePanjang !== `` ? `Pesanan ${beliTempeKecil || '0'}/${beliTempeBesar || '0'}/${beliTempePanjang || '0'}\n` : ``)+
			`\nTEMPE\n` +
            `${bayarTempe || '0'}\t${returTempeKecil || '0'}\t${returTempeBesar || '0'}\t${returTempePanjang || '0'}\t${beliTempeKecil || '0'}\t${beliTempeBesar || '0'}\t${beliTempePanjang || '0'}\n` +
            `\nTAHU\n` +
            `${bayarTahu || '0'}`;
			;

		return `https://wa.me/${env.PUBLIC_ADMIN_WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(messageText)}`;
	}

	// Validasi form
	$: isValidToSend = showForm && (
		(bayarTempe || bayarTahu || returTempeKecil || returTempeBesar || returTempePanjang || beliTempeKecil || beliTempeBesar || beliTempePanjang)
	);
</script>

<svelte:head>
	<title>Laporin - Pembayaran Kasir</title>
	<meta name="description" content="Aplikasi pelaporan pembayaran tempe via kasir" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
	<NavigationBar />

	<header>
		<div class="header-content">
			<h1>Laporan Pembayaran Kasir</h1>
		</div>
		<BackButton backUrl="/pembayaran" />
	</header>

	<main>
		<section class="input-section card">
			<div class="input-group">
				<label for="sales-select">Nama Sales</label>
				<select
					id="sales-select"
					bind:value={selectedSales}
					on:change={handleSalesSelect}
					class="input-field"
				>
					<option value="">Pilih Sales</option>
					{#each salesList as sales}
						<option value={sales.id}>{sales.name}</option>
					{/each}
				</select>
			</div>
		</section>


		{#if showForm}
			<section class="form-section">
				<div class="form-group card">
					<h2>Pembayaran</h2>
					<div class="input-group">
						<NumberInput
							id="bayar-tempe"
							label="Bayar Tempe"
							bind:value={bayarTempe}
						/>
					</div>
					<div class="input-group">
						<NumberInput
							id="bayar-tahu"
							label="Bayar Tahu"
							bind:value={bayarTahu}
						/>
					</div>
				</div>

				<div class="form-group card">
					<h2>Retur Tempe</h2>
					<div class="input-group">
						<NumberInput
							id="retur-tempe-kecil"
							label="Retur Tempe Kecil"
							bind:value={returTempeKecil}
						/>
					</div>
					<div class="input-group">
						<NumberInput
							id="retur-tempe-besar"
							label="Retur Tempe Besar"
							bind:value={returTempeBesar}
						/>
					</div>
					<div class="input-group">
						<NumberInput
							id="retur-tempe-panjang"
							label="Retur Tempe Panjang"
							bind:value={returTempePanjang}
						/>
					</div>
				</div>

				<div class="form-group card">
					<h2>Pembelian Tempe</h2>
					<div class="input-group">
						<NumberInput
							id="beli-tempe-kecil"
							label="Beli Tempe Kecil"
							bind:value={beliTempeKecil}
						/>
					</div>
					<div class="input-group">
						<NumberInput
							id="beli-tempe-besar"
							label="Beli Tempe Besar"
							bind:value={beliTempeBesar}
						/>
					</div>
					<div class="input-group">
						<NumberInput
							id="beli-tempe-panjang"
							label="Beli Tempe Panjang"
							bind:value={beliTempePanjang}
						/>
					</div>
				</div>
			</section>

			<a 
				href={isValidToSend ? generateWhatsAppLink() : '#'} 
				target="_blank" 
				class="whatsapp-button btn btn-primary {!isValidToSend ? 'disabled' : ''}"
				aria-disabled={!isValidToSend}
			>
				{isValidToSend ? 'Kirim ke WhatsApp' : 'Lengkapi data terlebih dahulu'}
			</a>
		{/if}
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

	header {
		text-align: center;
		margin-bottom: 2rem;
		position: relative;
		padding-top: 2.5rem;
	}

	.header-content {
		margin-bottom: 1rem;
	}

	.back-button {
		display: none;
	}

	h1 {
		font-size: 1.5rem;
		color: var(--text-color);
		margin-bottom: 0.5rem;
	}

	h2 {
		font-size: 1.25rem;
		color: var(--text-color);
		margin-bottom: 1rem;
	}

	main {
		flex: 1;
	}

	.input-section {
		margin-bottom: 2rem;
	}

	.form-section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.form-group {
		padding: 1.5rem;
	}

	.input-group {
		margin-bottom: 1rem;
	}

	.input-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: var(--text-light);
		font-size: 1.1rem;
	}

	.input-field {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		font-size: 1.2rem;
		transition: all 0.2s ease;
		text-align: right;
	}

	.input-field:focus {
		border-color: var(--primary-light);
		box-shadow: 0 0 0 2px rgba(139, 195, 74, 0.2);
		outline: none;
	}

	.whatsapp-button {
		display: block;
		text-align: center;
		margin: 2rem auto;
		max-width: 300px;
		transition: all 0.2s ease;
	}

	.whatsapp-button.disabled {
		opacity: 0.7;
		cursor: not-allowed;
		background-color: var(--border-color);
		color: var(--text-color);
	}

	.whatsapp-button.disabled:hover {
		transform: none;
		box-shadow: none;
		background-color: var(--border-color);
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

		header {
			padding-top: 3rem;
		}

		.form-section {
			gap: 1.5rem;
		}

		.form-group {
			padding: 1rem;
		}
	}
</style> 