<script lang="ts">
	import { decreaser } from '$lib/transitions';
	import { onMount } from 'svelte';
	let counter = 175;
	let unique = {};
	onMount(() => {
		unique = {};
		document.getElementById('seconds')?.focus();
	});
</script>

{#key unique}
	<h1 in:decreaser>{counter}</h1>
{/key}
<input
	type="text"
	id="seconds"
	bind:value={counter}
	on:keypress={(e) => {
		if (isNaN(parseInt(e.key)) && e.key !== 'Backspace') e.preventDefault();
	}}
	on:keyup={() => {
		unique = {};
	}}
/>
