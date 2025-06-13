<script context="module">

	export function keydownHandleNumberInputOnly(e: KeyboardEvent) {
		// Allow: backspace, delete, tab, escape, enter, decimal point
		const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'];
		
		// Allow numbers
		if (/^\d$/.test(e.key)) {
			return true;
		}
		
		// Allow allowed keys
		if (allowedKeys.includes(e.key)) {
			return true;
		}
		
		// Prevent all other keys
		e.preventDefault();
	}

	export function focusHandleSelectAllText(e: Event) {
		const target = e.target as HTMLInputElement;
		target.select();
	}

</script>

<script lang="ts">
	export let id: string;
	export let label: string;
	export let value: string;
	export let placeholder = '0';
	export let className: string = 'input-field';

	// Fungsi untuk memformat angka dengan titik
	function formatNumber(value: string): string {
		return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}

	// Fungsi untuk menghapus format titik saat input
	function unformatNumber(value: string): string {
		return value.replace(/\./g, "");
	}

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const unformattedValue = unformatNumber(target.value);
		
		// Only allow digits
		if (/^\d*$/.test(unformattedValue)) {
			value = formatNumber(unformattedValue);
		} else {
			// If invalid input, revert to previous valid value
			target.value = value;
		}
	}
	
	function pasteHandleNumberInputOnly(e: ClipboardEvent) {
		e.preventDefault();
		const pastedText = e.clipboardData?.getData('text');
		if (pastedText && /^\d+$/.test(pastedText)) {
			value = formatNumber(pastedText);
		}
	}
</script>

<div class="input-group">
	<label for={id}>{label}</label>
	<input
		{id}
		type="text"
		inputmode="numeric"
		pattern="[0-9]*"
		bind:value
		{placeholder}
		class={className}
		onfocus={focusHandleSelectAllText}
		oninput={handleInput}
		onkeydown={keydownHandleNumberInputOnly}
		onpaste={pasteHandleNumberInputOnly}
	/>
</div>

<style>
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
</style> 