<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="google-site-verification" content="" />

	<link rel="apple-touch-icon" href="/logo.png">

	<meta name="author" content="Dagmawi Napoleon Bogale" />
	<meta name="keywords" content="" />
	<meta name="theme-color" content="#E76E58" />
</svelte:head>
{@render children()}