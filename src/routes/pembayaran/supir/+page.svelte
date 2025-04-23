<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import NavigationBar from '$lib/components/NavigationBar.svelte';

	// Data supir
	const supirList = [
		{ id: '1', name: 'Supir 1' },
		{ id: '2', name: 'Supir 2' },
		{ id: '3', name: 'Supir 3' }
	];

	// Data sales
	const salesList = [
		{ id: '1', name: 'Sales 1' },
		{ id: '2', name: 'Sales 2' },
		{ id: '3', name: 'Sales 3' }
	];

	// State untuk form
	let selectedSupir = '';
	let selectedSales = '';
	let showForm = false;

	// State untuk tanggal nota
	let notaDates: { id: number; date: string }[] = [];
	let nextNotaId = 1;

	// State untuk pembayaran
	let bayarNota = '';

	// State untuk potongan
	let potonganNota = '';

	function handleSupirSelect() {
		showForm = !!selectedSupir;
	}

	function addNotaDate() {
		notaDates = [...notaDates, { id: nextNotaId, date: '' }];
		nextNotaId++;
	}
	addNotaDate()

	function removeNotaDate(id: number) {
		notaDates = notaDates.filter(nota => nota.id !== id);
	}

	function generateWhatsAppLink(): string {
		const today = new Date();
		const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
		const dayName = days[today.getDay()];
		const formattedDate = `${dayName} ${today.toLocaleDateString('id-ID')}`;

		const selectedSupirName = supirList.find(s => s.id === selectedSupir)?.name || '';
		const selectedSalesName = salesList.find(s => s.id === selectedSales)?.name || '';
		const notaDatesText = notaDates.map(nota => nota.date).join(', ');

		const messageText = `${dayName} ${formattedDate}\n` +
			`${selectedSupirName}\n` +
			`${selectedSalesName}\n` +
			`Tanggal Nota: ${notaDatesText}\n\n` +
			`PEMBAYARAN\n` +
			`${bayarNota || '0'}\t${potonganNota || '0'}`;

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
	$: showPaymentForm = showForm && notaDates.length > 0;
	$: isValid = showPaymentForm && (bayarNota || potonganNota);
</script>

<svelte:head>
	<title>Laporin - Pembayaran Supir</title>
	<meta name="description" content="Aplikasi pelaporan pembayaran tempe via supir" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
	<NavigationBar />

	<header>
		<div class="header-content">
			<h1>Laporan Pembayaran Supir</h1>
		</div>
		<button class="back-button" on:click={goBack}>
			← Kembali
		</button>
	</header>

	<main>
		<section class="input-section card">
			<div class="input-group">
				<label for="supir-select">Nama Supir</label>
				<select
					id="supir-select"
					bind:value={selectedSupir}
					on:change={handleSupirSelect}
					class="input-field"
				>
					<option value="">Pilih Supir</option>
					{#each supirList as supir}
						<option value={supir.id}>{supir.name}</option>
					{/each}
				</select>
			</div>
			<div class="input-group">
				<label for="sales-select">Nama Sales</label>
				<select
					id="sales-select"
					bind:value={selectedSales}
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
					<h2>Tanggal Nota</h2>
					{#each notaDates as nota (nota.id)}
						<div class="input-group nota-date-group">
							<label for="nota-date-{nota.id}">Tanggal Nota {nota.id}</label>
							<div class="input-with-button">
								<input
									id="nota-date-{nota.id}"
									type="date"
									bind:value={nota.date}
									class="input-field"
								/>
								<button 
									class="remove-button" 
									on:click={() => removeNotaDate(nota.id)}
									aria-label="Hapus tanggal nota"
								>
									🗑️
								</button>
							</div>
						</div>
					{/each}
					<button class="add-button" on:click={addNotaDate}>
						+ Tambah Tanggal Nota
					</button>
				</div>

				{#if showPaymentForm}
					<div class="form-group card">
						<h2>Pembayaran</h2>
						<div class="input-group">
							<label for="bayar-nota">Bayar</label>
							<input
								id="bayar-nota"
								type="text"
								inputmode="numeric"
								bind:value={bayarNota}
								placeholder="0"
								class="input-field"
								on:focus={(e) => e.target.select()}
								on:input={(e) => {
									const value = unformatNumber((e.target as HTMLInputElement).value);
									if (/^\d*$/.test(value)) {
										bayarNota = formatNumber(value);
									}
								}}
							/>
						</div>
					</div>

					<div class="form-group card">
						<h2>Potongan</h2>
						<div class="input-group">
							<label for="potongan-nota">Potongan</label>
							<input
								id="potongan-nota"
								type="text"
								inputmode="numeric"
								bind:value={potonganNota}
								placeholder="0"
								class="input-field"
								on:focus={(e) => e.target.select()}
								on:input={(e) => {
									const value = unformatNumber((e.target as HTMLInputElement).value);
									if (/^\d*$/.test(value)) {
										potonganNota = formatNumber(value);
									}
								}}
							/>
						</div>
					</div>
				{/if}
			</section>

			{#if showForm}
				<div class="form-group card summary-section">
					<h2>Ringkasan</h2>
					<div class="summary-content">
						<p class="summary-line">
							<span class="label">Nama Supir:</span>
							<span class="value">{supirList.find(s => s.id === selectedSupir)?.name || ''}</span>
						</p>
						<p class="summary-line">
							<span class="label">Nama Sales:</span>
							<span class="value">{salesList.find(s => s.id === selectedSales)?.name || ''}</span>
						</p>
						<p class="summary-line">
							<span class="label">Tanggal:</span>
							<span class="value">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
						</p>
						<div class="nota-summary">
							<p class="summary-line">
								<span class="label">Pembayaran Nota:</span>
								<span class="value">
									{#each notaDates as nota}
										{new Date(nota.date).toLocaleDateString('id-ID', { year: '2-digit', month: 'long', day: 'numeric' })}
										<br>
									{/each}
								</span>
							</p>
							<p class="summary-line">
								<span class="label">Nominal Pembayaran:</span>
								<span class="value">{bayarNota || '0'}</span>
							</p>
							{#if potonganNota}
								<p class="summary-line">
									<span class="label">Potongan:</span>
									<span class="value">{potonganNota}</span>
								</p>
							{/if}
						</div>
					</div>
				</div>

				<a 
					href={isValid ? generateWhatsAppLink() : '#'} 
					target="_blank" 
					class="whatsapp-button btn btn-primary {!isValid ? 'disabled' : ''}"
					aria-disabled={!isValid}
				>
					{isValid ? 'Kirim ke WhatsApp' : 'Lengkapi data terlebih dahulu'}
				</a>
			{/if}
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

	.nota-date-group {
		margin-bottom: 1rem;
	}

	.input-with-button {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.input-with-button .input-field {
		flex: 1;
	}

	.remove-button {
		padding: 0.5rem;
		background-color: #ff4444;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1.2rem;
		line-height: 1;
		transition: all 0.2s ease;
		min-width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.remove-button:hover {
		background-color: #cc0000;
		transform: scale(1.05);
	}

	.add-button {
		width: 100%;
		padding: 0.75rem;
		background-color: var(--primary-light);
		color: var(--primary-color);
		border: 1px solid var(--primary-color);
		border-radius: 8px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease;
		margin-top: 1rem;
		font-size: 1rem;
	}

	.add-button:hover {
		background-color: var(--primary-color);
		color: white;
	}

	.summary-section {
		margin-top: 2rem;
	}

	.summary-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.summary-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border-color);
	}

	.summary-line:last-child {
		border-bottom: none;
	}

	.label {
		font-weight: 500;
		color: var(--text-light);
	}

	.value {
		font-weight: 600;
		color: var(--text-color);
	}

	.nota-summary {
		background-color: var(--background-light);
		padding: 1rem;
		border-radius: 8px;
		margin-top: 0.5rem;
	}

	.nota-summary .summary-line {
		border-bottom: 1px solid var(--border-light);
	}

	.nota-summary .summary-line:last-child {
		border-bottom: none;
	}
</style> 