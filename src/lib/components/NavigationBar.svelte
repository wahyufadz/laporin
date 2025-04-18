<script lang="ts">
	import { page } from '$app/stores';
	
	// Define the navigation items
	const navItems = [
		{ href: '/', icon: '🏭', label: 'Laporan Tahu' },
		{ href: '#', icon: '📦', label: 'Laporan Produk', disabled: true },
		{ href: '#', icon: '📊', label: 'Laporan Keuangan', disabled: true },
		{ href: '/about', icon: 'ℹ️', label: 'Tentang' }
	];
</script>

<nav class="navigation-bar">
	<div class="nav-container">
		<div class="logo">
			<span class="logo-text">Laporin</span>
			<span class="logo-dot"></span>
		</div>
		<div class="nav-links">
			{#each navItems as item}
				<a 
					href={item.href} 
					class="nav-link {item.disabled ? 'disabled' : ''} {$page.url.pathname === item.href ? 'active' : ''}"
				>
					<span class="nav-icon">{item.icon}</span>
					{item.label}
				</a>
			{/each}
		</div>
	</div>
</nav>

<style>
	.navigation-bar {
		background-color: var(--background-color);
		border-bottom: 1px solid var(--border-color);
		padding: 0.5rem 1rem;
		margin: -2rem -1rem 2rem -1rem;
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	.nav-container {
		display: flex;
		align-items: center;
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.logo-text {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-color);
	}

	.logo-dot {
		width: 8px;
		height: 8px;
		background-color: var(--accent-color);
		border-radius: 50%;
	}

	.nav-links {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		flex: 1;
	}

	.nav-links::-webkit-scrollbar {
		display: none;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		color: var(--text-color);
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.nav-link:hover {
		background-color: var(--border-color);
	}

	.nav-link.active {
		background-color: var(--primary-color);
		color: white;
	}

	.nav-link.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.nav-link.disabled:hover {
		background-color: transparent;
	}

	.nav-icon {
		font-size: 1.2rem;
	}

	@media (max-width: 768px) {
		.navigation-bar {
			margin: -1rem -1rem 1rem -1rem;
			padding: 0.5rem;
		}

		.nav-container {
			gap: 1rem;
		}

		.logo-text {
			font-size: 1.2rem;
		}

		.nav-link {
			padding: 0.5rem 0.75rem;
			font-size: 0.9rem;
		}
	}
</style> 