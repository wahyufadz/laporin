<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import NavigationBar from '$lib/components/NavigationBar.svelte';

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

		const messageText = `${dayName} ${formattedDate}\n` +
			`${selectedSalesName}\n\n` +
			`PEMBAYARAN TEMPE\n` +
			`${bayarTempe || '0'}\t${returTempeKecil || '0'}\t${returTempeBesar || '0'}\t${returTempePanjang || '0'}\t${beliTempeKecil || '0'}\t${beliTempeBesar || '0'}\t${beliTempePanjang || '0'}\n\n` +
			`PEMBAYARAN TAHU\n` +
			`${bayarTahu || '0'}`;

		return `https://wa.me/${env.PUBLIC_ADMIN_WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(messageText)}`;
	}

	// Fungsi untuk memformat angka dengan titik
	function formatNumber(value: string): string {
		return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}

	// Fungsi untuk menghapus format titik saat input
	function unformatNumber(value: string): string {
		return value.replace(/\./g, "");
	}

	function goBack() {
		goto('/pembayaran');
	}

	// Validasi form
	$: isValid = showForm && (
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
		<button class="back-button" on:click={goBack}>
			← Kembali
		</button>
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
						<label for="bayar-tempe">Bayar Tempe</label>
						<input
							id="bayar-tempe"
							type="text"
							inputmode="numeric"
							bind:value={bayarTempe}
							placeholder="0"
							class="input-field"
							on:focus={(e) => e.target.select()}
							on:input={(e) => {
								const value = unformatNumber((e.target as HTMLInputElement).value);
								if (/^\d*$/.test(value)) {
									bayarTempe = formatNumber(value);
								}
							}}
						/>
					</div>
					<div class="input-group">
						<label for="bayar-tahu">Bayar Tahu</label>
						<input
							id="bayar-tahu"
							type="text"
							inputmode="numeric"
							bind:value={bayarTahu}
							placeholder="0"
							class="input-field"
							on:focus={(e) => e.target.select()}
							on:input={(e) => {
								const value = unformatNumber((e.target as HTMLInputElement).value);
								if (/^\d*$/.test(value)) {
									bayarTahu = formatNumber(value);
								}
							}}
						/>
					</div>
				</div>

				<div class="form-group card">
					<h2>Retur Tempe</h2>
					<div class="input-group">
						<label for="retur-tempe-kecil">Tempe Kecil</label>
						<input
							id="retur-tempe-kecil"
							type="text"
							inputmode="numeric"
							bind:value={returTempeKecil}
							placeholder="0"
							class="input-field"
							on:focus={(e) => e.target.select()}
							on:input={(e) => {
								const value = unformatNumber((e.target as HTMLInputElement).value);
								if (/^\d*$/.test(value)) {
									returTempeKecil = formatNumber(value);
								}
							}}
						/>
					</div>
					<div class="input-group">
						<label for="retur-tempe-besar">Tempe Besar</label>
						<input
							id="retur-tempe-besar"
							type="text"
							inputmode="numeric"
							bind:value={returTempeBesar}
							placeholder="0"
							class="input-field"
							on:focus={(e) => e.target.select()}
							on:input={(e) => {
								const value = unformatNumber((e.target as HTMLInputElement).value);
								if (/^\d*$/.test(value)) {
									returTempeBesar = formatNumber(value);
								}
							}}
						/>
					</div>
					<div class="input-group">
						<label for="retur-tempe-panjang">Tempe Panjang</label>
						<input
							id="retur-tempe-panjang"
							type="text"
							inputmode="numeric"
							bind:value={returTempePanjang}
							placeholder="0"
							class="input-field"
							on:focus={(e) => e.target.select()}
							on:input={(e) => {
								const value = unformatNumber((e.target as HTMLInputElement).value);
								if (/^\d*$/.test(value)) {
									returTempePanjang = formatNumber(value);
								}
							}}
						/>
					</div>
				</div>

				<div class="form-group card">
					<h2>Pembelian Tempe</h2>
					<div class="input-group">
						<label for="beli-tempe-kecil">Tempe Kecil</label>
						<input
							id="beli-tempe-kecil"
							type="text"
							inputmode="numeric"
							bind:value={beliTempeKecil}
							placeholder="0"
							class="input-field"
							on:focus={(e) => e.target.select()}
							on:input={(e) => {
								const value = unformatNumber((e.target as HTMLInputElement).value);
								if (/^\d*$/.test(value)) {
									beliTempeKecil = formatNumber(value);
								}
							}}
						/>
					</div>
					<div class="input-group">
						<label for="beli-tempe-besar">Tempe Besar</label>
						<input
							id="beli-tempe-besar"
							type="text"
							inputmode="numeric"
							bind:value={beliTempeBesar}
							placeholder="0"
							class="input-field"
							on:focus={(e) => e.target.select()}
							on:input={(e) => {
								const value = unformatNumber((e.target as HTMLInputElement).value);
								if (/^\d*$/.test(value)) {
									beliTempeBesar = formatNumber(value);
								}
							}}
						/>
					</div>
					<div class="input-group">
						<label for="beli-tempe-panjang">Tempe Panjang</label>
						<input
							id="beli-tempe-panjang"
							type="text"
							inputmode="numeric"
							bind:value={beliTempePanjang}
							placeholder="0"
							class="input-field"
							on:focus={(e) => e.target.select()}
							on:input={(e) => {
								const value = unformatNumber((e.target as HTMLInputElement).value);
								if (/^\d*$/.test(value)) {
									beliTempePanjang = formatNumber(value);
								}
							}}
						/>
					</div>
				</div>
			</section>

			<a 
				href={isValid ? generateWhatsAppLink() : '#'} 
				target="_blank" 
				class="whatsapp-button btn btn-primary {!isValid ? 'disabled' : ''}"
				aria-disabled={!isValid}
			>
				{isValid ? 'Kirim ke WhatsApp' : 'Lengkapi data terlebih dahulu'}
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
		position: absolute;
		top: 0.5rem;
		left: 0;
		padding: 0.5rem 1rem;
		background-color: var(--background-color);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		color: var(--text-color);
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s ease;
		z-index: 1;
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

		.back-button {
			top: 0.25rem;
			padding: 0.4rem 0.75rem;
		}

		.form-section {
			gap: 1.5rem;
		}

		.form-group {
			padding: 1rem;
		}
	}
</style> 