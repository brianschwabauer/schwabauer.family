<script lang="ts">
	import '$lib/styles/global.css';
	const { children } = $props();
</script>

<svelte:head>
	<title>The Schwabauer Family</title>
	<meta name="description" content="The Schwabauer family — a small corner of the internet for our people." />
</svelte:head>

{@render children()}
