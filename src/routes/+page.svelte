<script lang="ts">
	import NavigationBar from '$lib/components/NavigationBar.svelte';
</script>

<svelte:head>
	<title>Laporin</title>
	<meta name="description" content="Tentang aplikasi Laporin - Aplikasi pelaporan pesanan tahu" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
	<NavigationBar />

	<main>
		<div class="about-content card">
			<h1>Tentang Laporin</h1>
			
			<section class="about-section">
				<h2>👋 Apa itu Laporin?</h2>
				<p>
					Laporin adalah aplikasi web yang dirancang untuk memudahkan pelaporan usaha. 
					Aplikasi ini membantu kita dalam mengelola dan melaporkan pesanan pelanggan 
					dengan lebih efisien dan terorganisir.
				</p>
			</section>

			<section class="about-section">
				<h2>✨ Fitur Utama</h2>
				<ul>
					<li>📱 Input pesanan yang mudah dan cepat</li>
					<li>📊 Ringkasan pesanan yang jelas</li>
					<li>📤 Kirim laporan langsung ke WhatsApp</li>
					<li>📋 Format yang mudah di-copy paste ke spreadsheet</li>
				</ul>
			</section>

			<section class="about-section">
				<h2>🚀 Keunggulan</h2>
				<ul>
					<li>💻 Bisa diakses dari mana saja</li>
					<li>📱 Responsif di semua perangkat</li>
					<li>⚡ Cepat dan ringan</li>
					<li>🔒 Data tersimpan dengan aman</li>
				</ul>
			</section>

			<section class="about-section">
				<h2>📞 Kontak</h2>
				<p>
					Jika Anda memiliki pertanyaan atau saran, silakan hubungi kami melalui:
				</p>
				<ul>
					<li>📧 Email: support@laporin.com</li>
					<li>📱 WhatsApp: +62 123 4567 890</li>
				</ul>
			</section>
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

	.about-content {
		max-width: 800px;
		width: 100%;
	}

	h1 {
		font-size: 2rem;
		color: var(--primary-color);
		margin-bottom: 2rem;
		text-align: center;
	}

	h2 {
		font-size: 1.5rem;
		color: var(--text-color);
		margin: 2rem 0 1rem;
	}

	.about-section {
		margin-bottom: 2rem;
	}

	p {
		color: var(--text-color);
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		color: var(--text-color);
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

		h2 {
			font-size: 1.25rem;
		}
	}
</style> 