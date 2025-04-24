<script lang="ts">
	import { goto } from '$app/navigation';
	export let backUrl = '/';
</script>

<button class="back-button" on:click={() => goto(backUrl)}>
	← Kembali
</button>

<style>
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

	.back-button:hover {
		background-color: var(--background-light);
		border-color: var(--primary-light);
	}

	@media (max-width: 768px) {
		.back-button {
			top: 0.25rem;
			padding: 0.4rem 0.75rem;
		}
	}
</style> 