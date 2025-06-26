<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { OrderInput, WhatsAppMessage, Customer, Factory } from '$lib/types';
	import { env } from '$env/dynamic/public';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import NumberInput, { keydownHandleNumberInputOnly, focusHandleSelectAllText } from '$lib/components/NumberInput.svelte';
	import { SvelteMap } from 'svelte/reactivity';

	const { data } = $props();
	const { factories, customersByFactory } = data;

	// Get the factory ID from the URL
	const factoryId = $page.params.factoryId;
	
	// Find the selected factory
	const selectedFactory = factories.find(f => f.id === factoryId);
	
	// If factory not found, redirect to home
	if (!selectedFactory) {
		goto('/tahu');
	}
	
	// Get customers for the selected factory
	const initialCustomers = customersByFactory[factoryId] || [];
	
	// Create a reactive customers array
	let customers: Customer[] = $state([...initialCustomers]);
	
	// let orders: Map<string, number> = $state(new Map()); // customerId -> quantity
	let orders: {[key:string]:number} = $state({});
	let inputBy = $state('');
	let showNewCustomerForm = $state(false);
	let newCustomer: Customer = $state({
		id: '',
		name: ''
	});

	function addOrder(customerId: string, quantity: number) {
		if (quantity > 0) {
			orders[customerId]=quantity;
			// orders = orders; // trigger reactivity
		} else {
			removeOrder(customerId);
		}
	}

	function removeOrder(customerId: string) {
		orders = Object.fromEntries(Object.entries(orders).filter(([id]) => id !== customerId));
		// orders = orders; // trigger reactivity
	}

	function addNewCustomer() {
		if (newCustomer.name) {
			const id = `${factoryId}-${customers.length + 1}`;
			const customerToAdd = {
				...newCustomer,
				id
			};
			
			// Add the new customer to our reactive array
			customers = [...customers, customerToAdd];
			
			showNewCustomerForm = false;
			newCustomer = {
				id: '',
				name: ''
			};
		}
	}

	let daftarPengeluaran = new SvelteMap<string, {label: string, value: number}>();
	
	function addNewPengeluaran() {
		daftarPengeluaran.set(Date.now().toString(), {label: '', value: 0});
	}

	function addPengeluaran(id: string, label: string, value: number) {
		daftarPengeluaran.set(id, {label, value});
	}

	function removePengeluaran(id: string) {
		daftarPengeluaran.delete(id);
	}

	let totalPengeluaran = $derived([...daftarPengeluaran.values()].reduce((sum, pengeluaran) => sum + pengeluaran.value, 0));

	function generateWhatsAppLink(): string {
		const today = new Date();
		const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
		const dayName = days[today.getDay()];
		const formattedDate = `${dayName} ${today.toLocaleDateString('id-ID')}`;

		const message: WhatsAppMessage = {
			date: formattedDate,
			inputBy,
			orders: customers.map(customer => ({
				customerName: customer.name,
				quantity: orders[customer.id] || 0
			}))
		};

		let messageText = `*Laporan Pesanan Tahu - ${selectedFactory?.name || 'Unknown'}*\n\n` +
			`Tanggal: ${message.date}\n` +
			`Input oleh: ${message.inputBy}\n\n` +
			`*Ringkasan:*\n` +
			`• Total Pesanan: ${totalOrders} pcs\n` +
			`• Total Masak: ${totalMasak} masak\n` +
			`• Jumlah Pelanggan: ${Object.keys(orders).length} pelanggan\n\n` +
			`*Daftar Pesanan:*\n` +
			message.orders.map(order => 
				`${order.customerName}\t\t${order.quantity}`
			).join('\n');

		if (totalPengeluaran > 0) {
			messageText += '\n\n' +
				`*Daftar Pengeluaran:*\n` +
				[...daftarPengeluaran.values()].map(pengeluaran => 
					`${pengeluaran.label}\t${pengeluaran.value.toLocaleString()}`
				).join('\n')+
				`\nTotal Pengeluaran: ${totalPengeluaran.toLocaleString()}`;
		}

		return `https://wa.me/${env.PUBLIC_ADMIN_WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(messageText)}`;
	}

	let totalOrders = $derived(Object.values(orders).reduce((sum, qty) => sum + qty, 0));
	let totalMasak = $derived(totalOrders / 4); // Calculate total in "masak" format (with decimals)
	let isTotalMasakWhole = $derived(Number.isInteger(totalMasak)); // Check if total masak is a whole number
</script>

<svelte:head>
	<title>Laporin - Pesanan {selectedFactory?.name}</title>
	<meta name="description" content="Aplikasi pelaporan pesanan tahu untuk pabrik {selectedFactory?.name}" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
	<NavigationBar />

	<header>
		<div class="header-content">
			<h1>Laporan Pesanan Tahu</h1>
			<h2 class="factory-name">{selectedFactory?.name}</h2>
		</div>
		<BackButton backUrl="/tahu" />
	</header>

	<main>
		<section class="input-section card">
			<div class="input-group">
				<label for="input-by">Nama Input</label>
				<input
					id="input-by"
					type="text"
					bind:value={inputBy}
					placeholder="Masukkan nama Anda"
					class="input-field"
				/>
			</div>
		</section>

		<section class="customers-section">
			{#if !inputBy}
				<div class="empty-state card">
					<p>Silakan masukkan nama Anda di atas untuk melihat daftar pelanggan.</p>
				</div>
			{:else}
				<div class="section-header">
					<h2>Daftar Pelanggan</h2>
					<button 
						onclick={() => showNewCustomerForm = !showNewCustomerForm}
						class="btn btn-accent"
					>
						{showNewCustomerForm ? 'Batal' : '+ Tambah'}
					</button>
				</div>

				{#if showNewCustomerForm}
					<div class="new-customer-form card">
						<h3>Tambah Pelanggan Baru</h3>
						<div class="input-group">
							<label for="new-customer-name">Nama Pelanggan</label>
							<input
								id="new-customer-name"
								type="text"
								bind:value={newCustomer.name}
								placeholder="Nama Pelanggan Baru"
								class="input-field"
							/>
						</div>
						<button onclick={addNewCustomer} class="btn btn-primary">
							Simpan Pelanggan
						</button>
					</div>
				{/if}
				<div class="customers-list">
					{#each customers as customer}
						<div class="customer-row card">
							<div class="customer-info">
								<h3>{customer.name}</h3>
							</div>
							<div class="order-input">
								<div class="input-group">
									{#if orders[customer.id]}
										<button 
											onclick={() => removeOrder(customer.id)}
											class="btn btn-danger"
										>
											Hapus
										</button>
									{/if}
									<input
										id="quantity-{customer.id}"
										type="number"
										min="0"
										placeholder="0"
										value={orders[customer.id] || 0}
										oninput={(e) => addOrder(customer.id, parseInt(e.currentTarget.value) || 0)}
										onfocus={focusHandleSelectAllText}
										onkeydown={keydownHandleNumberInputOnly}
										class="quantity-input"
									/>
								</div>
							</div>
						</div>
					{/each}
				</div>
				<div class="pengeluaran">
					{#each [...daftarPengeluaran.entries()] as [key, pengeluaran]}
						<div class="pengeluaran-row card">
							<div class="pengeluaran-label">
								<input
									id="pengeluaran-label-{key}"
									type="text"
									placeholder="Pengeluaran"
									value={pengeluaran.label}
									oninput={(e) => addPengeluaran(key, e.currentTarget.value, pengeluaran.value)}
									class="pengeluaran-label"
								/>
							</div>
							<div class="pengeluaran-value">
								<input
									id="pengeluaran-value-{key}"
									type="number"
									min="0"
									placeholder="0"
									value={pengeluaran.value}
									oninput={(e) => addPengeluaran(key, pengeluaran.label, parseInt(e.currentTarget.value) || 0)}
									onfocus={focusHandleSelectAllText}
									onkeydown={keydownHandleNumberInputOnly}
									class="pengeluaran-value"
								/>
							</div>
							<div class="pengeluaran-hapus">
								<button onclick={() => removePengeluaran(key)} class="btn btn-danger">
									Hapus
								</button>
							</div>
						</div>
					{/each}

					<button onclick={addNewPengeluaran} class="btn btn-primary">
						Tambah Pengeluaran
					</button>
				</div>
			{/if}
		</section>

		{#if inputBy}
			<section class="summary-section card">
				<h2>Ringkasan Pesanan</h2>
				<div class="summary-stats">
					<div class="stat-item">
						<span class="stat-value">{totalOrders}</span>
						<span class="stat-label">Total Pesanan (pcs)</span>
						{#if !isTotalMasakWhole}
							<span class="stat-label warning">Total pesanan kurang {Math.ceil(totalMasak)*4 - totalOrders} pcs</span>
						{/if}
					</div>
					<div class="stat-item">
						<span class="stat-value">
							{Math.ceil(totalMasak)}
						</span>
						<span class="stat-label">Total Pesanan (masak)</span>
						{#if !isTotalMasakWhole}
						<span class="stat-label warning">Total pesanan kurang {Math.ceil(totalMasak)*4 - totalOrders} pcs</span>
						{/if}
					</div>
					<div class="stat-item">
						<span class="stat-value">{Object.keys(orders).length}</span>
						<span class="stat-label">Jumlah Pelanggan</span>
					</div>
				</div>
				{#if totalPengeluaran > 0}
					<div class="stat-item">
						<span class="stat-value">{totalPengeluaran.toLocaleString()}</span>
						<span class="stat-label">Total Pengeluaran</span>
					</div>
				{/if}
			</section>

			<a 
				href={Object.keys(orders).length > 0 && isTotalMasakWhole ? generateWhatsAppLink() : '#'} 
				target="_blank" 
				class="whatsapp-button btn btn-primary {!Object.keys(orders).length || !isTotalMasakWhole ? 'disabled' : ''}"
				aria-disabled={!Object.keys(orders).length || !isTotalMasakWhole}
			>
				{Object.keys(orders).length > 0 && isTotalMasakWhole ? 'Kirim ke WhatsApp' : 'Lengkapi data terlebih dahulu'}
			</a>
		{/if}
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
		margin-bottom: 2rem;
		position: relative;
		padding-top: 2.5rem;
	}

	.header-content {
		margin-bottom: 1rem;
	}

	.back-button {
		display: none; /* Hide the old back button styles */
	}

	h1 {
		font-size: 1.5rem;
		color: var(--text-color);
		margin-bottom: 0.5rem;
	}

	.factory-name {
		font-size: 1.2rem;
		color: var(--primary-color);
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 1.25rem;
		color: var(--text-color);
		margin-bottom: 1rem;
	}

	h3 {
		font-size: 1.1rem;
		color: var(--text-color);
		margin-bottom: 1rem;
	}

	main {
		flex: 1;
	}

	.input-section {
		margin-bottom: 2rem;
	}

	.input-group {
		margin-bottom: 1rem;
	}

	.input-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: var(--text-light);
	}

	.input-field {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		font-size: 1rem;
		transition: all 0.2s ease;
	}

	.input-field:focus {
		border-color: var(--primary-light);
		box-shadow: 0 0 0 2px rgba(139, 195, 74, 0.2);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.customers-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
		width: 100%;
	}

	.customer-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		width: 100%;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		background-color: var(--background-color);
	}

	.customer-info {
		flex: 1;
		min-width: 0;
	}

	.customer-info h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--primary-color);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.customer-info p {
		margin: 0.25rem 0 0;
		color: var(--text-light);
		font-size: 0.9rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.order-input {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		margin-left: 1rem;
		flex-shrink: 0;
	}

	.quantity-input {
		width: 80px;
		padding: 0.75rem;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		font-size: 1.2rem;
		font-weight: 600;
		text-align: center;
	}

	.quantity-input::-webkit-outer-spin-button,
	.quantity-input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.quantity-input[type=number] {
		-moz-appearance: textfield;
	}

	.btn-danger {
		padding: 0.5rem 1rem;
		font-size: 1.1rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.new-customer-form {
		margin-bottom: 2rem;
	}

	.summary-section {
		margin: 2rem 0;
	}

	.summary-stats {
		display: flex;
		gap: 2rem;
		margin-top: 1rem;
		flex-wrap: wrap;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		flex: 1;
		min-width: 120px;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--primary-color);
	}

	.stat-label {
		font-size: 0.9rem;
		color: var(--text-light);
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

	.warning-text {
		color: var(--accent-color);
		font-size: 0.8rem;
		margin-top: 0.25rem;
		font-style: italic;
	}

	.empty-state {
		text-align: center;
		padding: 2rem;
		color: var(--text-light);
	}

	.stat-label.warning {
		color: var(--primary-color);
		font-weight: 600;
		font-style: italic;
	}

	@media (max-width: 768px) {
		.app-container {
			padding: 1rem;
		}

		header {
			padding-top: 3rem;
		}

		.customer-row {
			flex-direction: row;
			padding: 0.75rem;
		}

		.customer-info {
			max-width: 60%;
		}

		.order-input {
			margin-left: 0.5rem;
			justify-content: flex-end;
		}

		.quantity-input {
			width: 70px;
			padding: 0.5rem;
		}

		.btn-danger {
			padding: 0.5rem 0.75rem;
		}

		.summary-stats {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 1rem;
		}

		.stat-item {
			flex: 1 1 calc(50% - 1rem);
			min-width: 120px;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
	}

	@media (max-width: 480px) {
		.customer-row {
			flex-direction: row;
			padding: 0.5rem;
		}

		.customer-info {
			max-width: 50%;
		}

		.customer-info h3 {
			font-size: 1rem;
		}

		.customer-info p {
			font-size: 0.8rem;
		}

		.quantity-input {
			width: 60px;
			padding: 0.4rem;
		}

		.btn-danger {
			padding: 0.4rem 0.6rem;
			font-size: 0.8rem;
		}

		.summary-stats {
			flex-direction: column;
			gap: 1rem;
		}

		.stat-item {
			flex: 1 1 100%;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			text-align: left;
		}
		.pengeluaran-row {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

		}
		.pengeluaran-label {
			flex: 1;
		}
		.pengeluaran-value {
			flex: 5;	
		}
		.pengeluaran-hapus {
			flex: 1;
		}
	}
</style> 