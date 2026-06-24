<script lang="ts">
    import AppBanner from "$lib/components/app-banner.svelte";
    import Ecosystem from "$lib/components/ecosystem.svelte";
    import Footer from "$lib/components/footer.svelte";
	import Hero from "$lib/components/hero.svelte";
	import Navbar from "$lib/components/navbar.svelte";
    import ProductsShowcase from "$lib/components/products-showcase.svelte";
    import Seo from "$lib/components/seo.svelte";

    // Receive data loaded from +page.ts using Svelte 5 runes
    let { data } = $props();
</script>

<svelte:head>
    <Seo title="YeneHealth | Women's Digital Health Catalog" />
</svelte:head>

<div
	class="min-h-screen bg-background flex flex-col relative overflow-x-hidden selection:bg-accent/20 selection:text-primary"
>
	<Navbar />

	<!-- Main layout area -->
	<main class="grow flex flex-col items-center justify-start w-full">
		<Hero />
		<Ecosystem />
		<ProductsShowcase products={data.products} />
		<AppBanner />
	</main>
	<Footer />
</div>