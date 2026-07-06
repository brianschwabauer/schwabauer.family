<script lang="ts">
	// Base design tokens the @delightstack components rely on (shadows, muted
	// text, surface/border colors, radius scale). Imported first so our own
	// palette bridge in global.css still wins for brand colors.
	import '@delightstack/styles/tokens.css';
	import '$lib/styles/global.css';
	const { children } = $props();
</script>

<svelte:head>
	<title>The Schwabauer Family</title>
	<meta
		name="description"
		content="The Schwabauer family — a small corner of the internet for our people." />
</svelte:head>

{@render children()}
