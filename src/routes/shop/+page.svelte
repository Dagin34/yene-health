<!-- src/routes/shop/+page.svelte -->
<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import Footer from "$lib/components/footer.svelte";
    import { 
        Search, 
        SlidersHorizontal, 
        Heart, 
        ShoppingCart, 
        CheckCircle2, 
        FileText,
        Baby, 
        ShieldCheck, 
        PlusSquare, 
        Package,
        X,
        ChevronDown
    } from "@lucide/svelte";
    import type { PharmacyProduct, ProductCategory } from "$lib/data/products";

    // Receive loaded products array from loader
    let { data } = $props();
    let allProducts = $derived(data.products as PharmacyProduct[]);

    // Filters and search states
    let searchQuery = $state("");
    let selectedCategory = $state<ProductCategory | "All">("All");
    let selectedRxFilter = $state<"All" | "OTC" | "Rx">("All");
    let sortBy = $state<"default" | "price-asc" | "price-desc" | "name-asc">("default");

    // Favorited products state
    let favorites = $state(new Set<string>());
    function toggleFavorite(id: string) {
        if (favorites.has(id)) {
            favorites.delete(id);
        } else {
            favorites.add(id);
        }
        favorites = favorites;
    }

    // Cart loading and success animation states
    let loadingCartId = $state<string | null>(null);
    let successCartIds = $state(new Set<string>());

    function handleAddToCart(id: string) {
        if (loadingCartId || successCartIds.has(id)) return;
        loadingCartId = id;
        setTimeout(() => {
            loadingCartId = null;
            successCartIds.add(id);
            successCartIds = successCartIds;
            setTimeout(() => {
                successCartIds.delete(id);
                successCartIds = successCartIds;
            }, 1500);
        }, 600);
    }

    // Derived filtered and sorted products list
    let filteredProducts = $derived.by(() => {
        let result = [...allProducts];

        // Search term filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(
                (p) => 
                    p.title.toLowerCase().includes(query) || 
                    p.description.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
            );
        }

        // Category vertical filter
        if (selectedCategory !== "All") {
            result = result.filter((p) => p.category === selectedCategory);
        }

        // Rx filter
        if (selectedRxFilter === "OTC") {
            result = result.filter((p) => !p.isRx);
        } else if (selectedRxFilter === "Rx") {
            result = result.filter((p) => p.isRx);
        }

        // Sort application
        if (sortBy === "price-asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "name-asc") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }

        return result;
    });

    const categories: (ProductCategory | "All")[] = [
        "All",
        "Maternal Health",
        "Sexual Health & Family Planning",
        "Personal Care & Hygiene",
        "Mommy & Baby",
        "Medical Health",
        "Beauty & Cosmetics",
        "Vitamins & Supplements",
        "Wellness & Supplements",
    ];

    function clearFilters() {
        searchQuery = "";
        selectedCategory = "All";
        selectedRxFilter = "All";
        sortBy = "default";
    }
</script>

<svelte:head>
    <title>YeneHealth Pharmacy | Women's Digital Health Catalog</title>
    <meta name="description" content="Browse and filter trusted women's health products, prenatal vitamins, contraceptives, and wellness diagnostics on Ethiopia's leading pharmacy platform." />
</svelte:head>

<div class="min-h-screen bg-background flex flex-col relative overflow-x-hidden selection:bg-accent/20 selection:text-primary">
    <!-- Navigation -->
    <Navbar />

    <!-- Space for fixed header -->
    <div class="h-24"></div>

    <!-- Shop Hero Section -->
    <section class="w-full py-10 md:py-16 text-left">
        <div class="w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-4">
            <span class="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
                YeneHealth Pharmacy Store
            </span>
            <h1 class="font-bold text-[2.8rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.03em] text-neutral">
                Wellness, delivered.
            </h1>
            <p class="text-[0.95rem] text-neutral/70 leading-[1.65] max-w-180">
                Explore our curated digital health verticals. Filter clinically-vetted medicines, diagnostics, maternal aids, and family planning solutions directly sourced from verified pharmacy providers.
            </p>
        </div>
    </section>

    <!-- Filters and Search Bar Container -->
    <section class="w-full pb-8 border-b border-secondary/40">
        <div class="w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-6">
            <!-- Search & Quick Options Row -->
            <div class="flex flex-col lg:flex-row gap-4 justify-between items-center w-full">
                <!-- Search bar input -->
                <div class="relative w-full lg:max-w-130 group">
                    <Search size={18} class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40 transition-colors group-focus-within:text-accent" />
                    <input 
                        type="text" 
                        bind:value={searchQuery}
                        placeholder="Search products, ingredients, clinical names..." 
                        class="w-full pl-12 pr-10 py-3.5 bg-white border border-secondary rounded-2xl text-[0.9rem] focus:outline-none focus:border-accent focus:shadow-[0_4px_20px_rgba(231,110,88,0.08)] transition-all duration-200"
                    />
                    {#if searchQuery}
                        <button 
                            type="button"
                            onclick={() => searchQuery = ""}
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/40 hover:text-neutral/80"
                            aria-label="Clear search"
                        >
                            <X size={16} />
                        </button>
                    {/if}
                </div>

                <!-- Sorting and Rx filters -->
                <div class="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <!-- Prescription Filter -->
                    <div class="inline-flex rounded-xl bg-white border border-secondary p-1">
                        <button 
                            type="button"
                            onclick={() => selectedRxFilter = "All"}
                            class="px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all {selectedRxFilter === 'All' ? 'bg-primary text-white' : 'text-neutral/60 hover:text-neutral'}"
                        >
                            All Products
                        </button>
                        <button 
                            type="button"
                            onclick={() => selectedRxFilter = "OTC"}
                            class="px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all {selectedRxFilter === 'OTC' ? 'bg-primary text-white' : 'text-neutral/60 hover:text-neutral'}"
                        >
                            OTC Only
                        </button>
                        <button 
                            type="button"
                            onclick={() => selectedRxFilter = "Rx"}
                            class="px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all {selectedRxFilter === 'Rx' ? 'bg-primary text-white' : 'text-neutral/60 hover:text-neutral'}"
                        >
                            Rx Required
                        </button>
                    </div>

                    <!-- Sort Dropdown -->
                    <div class="relative w-full sm:w-auto grow sm:grow-0">
                        <SlidersHorizontal size={14} class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
                        <select 
                            bind:value={sortBy}
                            class="w-full sm:w-auto pl-10 pr-10 py-3 bg-white border border-secondary rounded-xl text-xs font-semibold text-neutral/70 appearance-none focus:outline-none focus:border-accent"
                        >
                            <option value="default">Sort: Recommended</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A-Z</option>
                        </select>
                        <ChevronDown size={14} class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/40 pointer-events-none" />
                    </div>
                </div>
            </div>

            <!-- Category Filtering Row -->
            <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-6 px-6 lg:mx-0 lg:px-0">
                {#each categories as category}
                    <button 
                        type="button"
                        onclick={() => selectedCategory = category}
                        class="px-5 py-2.5 rounded-full text-xs font-semibold tracking-tight whitespace-nowrap border transition-all duration-200 {selectedCategory === category ? 'bg-accent text-white border-accent shadow-sm' : 'bg-white text-neutral/70 border-secondary hover:border-neutral/30 hover:text-neutral'}"
                    >
                        {category}
                    </button>
                {/each}
            </div>
        </div>
    </section>

    <!-- Active Filters Summary & Products Counter -->
    <section class="w-full pt-6 pb-2">
        <div class="w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
            <span class="text-xs font-bold text-neutral/40 uppercase tracking-wider">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
            </span>

            {#if selectedCategory !== 'All' || searchQuery !== '' || selectedRxFilter !== 'All' || sortBy !== 'default'}
                <button 
                    type="button" 
                    onclick={clearFilters}
                    class="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                >
                    Clear active filters
                </button>
            {/if}
        </div>
    </section>

    <!-- Products Grid Section -->
    <main class="w-full py-6 pb-24 grow">
        <div class="w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16">
            {#if filteredProducts.length === 0}
                <!-- Empty State -->
                <div class="w-full py-20 flex flex-col items-center justify-center gap-4 text-center">
                    <div class="w-16 h-16 rounded-full bg-secondary/35 flex items-center justify-center text-neutral/40">
                        <Package size={28} />
                    </div>
                    <h3 class="font-bold text-[1.2rem] text-neutral mt-2">No products match your filters</h3>
                    <p class="text-[0.88rem] text-neutral/60 max-w-90 leading-relaxed">
                        Try clearing your current search term, choosing another health category, or showing both OTC and prescription products.
                    </p>
                    <button 
                        type="button"
                        onclick={clearFilters}
                        class="bg-primary text-white text-xs font-bold px-6 py-3 rounded-full mt-2 hover:bg-primary/95 transition-all"
                    >
                        Reset All Filters
                    </button>
                </div>
            {:else}
                <!-- Catalog Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {#each filteredProducts as product (product.id)}
                        <div 
                            class="group relative flex flex-col bg-white border border-secondary/60 rounded-3xl overflow-hidden pb-6 shadow-[0_4px_20px_rgba(20,61,58,0.012)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(20,61,58,0.04)] hover:border-secondary"
                        >
                            <!-- Image area & badges -->
                            <div class="relative w-full aspect-230/190 bg-[#F4EBE3] overflow-hidden flex items-center justify-center">
                                <!-- Availability / Rx Badges in top-left -->
                                <div class="absolute top-3 left-3 flex flex-col gap-1 items-start z-10 pointer-events-none">
                                    {#if product.isRx}
                                        <span class="bg-accent text-white px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-0.5">
                                            <FileText size={8} strokeWidth={3} /> Rx
                                        </span>
                                    {/if}
                                    
                                    {#if product.status === 'In Stock'}
                                        <span class="bg-[#ECF7ED] text-[#2E7D32] border border-[#A5D6A7]/30 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider shadow-sm">
                                            In Stock
                                        </span>
                                    {:else if product.status === 'Prescription Required'}
                                        <span class="bg-[#FFF8E1] text-[#F57F17] border border-[#FFE082]/30 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider shadow-sm">
                                            Rx Required
                                        </span>
                                    {:else if product.status === 'In-Store Pickup Only'}
                                        <span class="bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]/30 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider shadow-sm">
                                            Pickup Only
                                        </span>
                                    {:else}
                                        <span class="bg-[#F5F5F5] text-[#616161] border border-[#E0E0E0]/30 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider shadow-sm">
                                            Out of Stock
                                        </span>
                                    {/if}
                                </div>

                                <!-- Image & fallbacks -->
                                {#if !product.imageUrl}
                                    <div class="text-neutral/25 transition-transform duration-500 group-hover:scale-110">
                                        {#if product.category === 'Maternal Health'}
                                            <Baby size={44} strokeWidth={1.2} />
                                        {:else if product.category === 'Sexual Health & Family Planning'}
                                            <ShieldCheck size={44} strokeWidth={1.2} />
                                        {:else if product.category === 'Wellness & Supplements'}
                                            <PlusSquare size={44} strokeWidth={1.2} />
                                        {:else}
                                            <Package size={44} strokeWidth={1.2} />
                                        {/if}
                                    </div>
                                {:else}
                                    <img 
                                        src={product.imageUrl} 
                                        alt={product.title}
                                        class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                                        loading="lazy"
                                        onerror={(e) => {
                                            const target = e.currentTarget as HTMLImageElement;
                                            target.style.display = 'none';
                                            const sibling = target.nextElementSibling as HTMLElement;
                                            if (sibling) sibling.classList.remove('hidden');
                                        }}
                                    />
                                    <!-- Fallback svg if load fails -->
                                    <div class="hidden text-neutral/25 transition-transform duration-500 group-hover:scale-110 absolute">
                                        {#if product.category === 'Maternal Health'}
                                            <Baby size={44} strokeWidth={1.2} />
                                        {:else if product.category === 'Sexual Health & Family Planning'}
                                            <ShieldCheck size={44} strokeWidth={1.2} />
                                        {:else if product.category === 'Wellness & Supplements'}
                                            <PlusSquare size={44} strokeWidth={1.2} />
                                        {:else}
                                            <Package size={44} strokeWidth={1.2} />
                                        {/if}
                                    </div>
                                {/if}

                                <!-- Favorite Heart -->
                                <button 
                                    type="button"
                                    onclick={() => toggleFavorite(product.id)}
                                    class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm text-neutral/70 border border-neutral/5 transition-all duration-200 hover:bg-white hover:scale-110 active:scale-95"
                                    aria-label="Add to wishlist"
                                >
                                    <Heart 
                                        size={16} 
                                        strokeWidth={2.2} 
                                        class="transition-colors duration-200 {favorites.has(product.id) ? 'fill-accent text-accent' : 'text-neutral/70'}" 
                                    />
                                </button>
                            </div>

                            <!-- Details -->
                            <div class="flex flex-col grow p-5 pb-2 justify-between">
                                <div class="flex flex-col gap-1">
                                    <span class="text-[9px] font-bold uppercase tracking-wider text-neutral/40">
                                        {product.category}
                                    </span>
                                    <a href={`/product-details/${product.id}`} class="focus:outline-none">
                                        <h3 class="text-[1rem] font-bold text-neutral tracking-tight transition-colors duration-200 hover:text-primary line-clamp-1" title={product.title}>
                                            {product.title}
                                        </h3>
                                    </a>
                                    <p class="text-[0.78rem] text-neutral/60 line-clamp-2 mt-1 leading-snug">
                                        {product.description}
                                    </p>
                                </div>

                                <div class="flex justify-between items-center pt-4 mt-auto">
                                    <span class="text-[1rem] font-bold text-neutral/80">
                                        {product.price.toLocaleString()} <span class="text-[0.7rem] font-medium text-neutral/50 ml-0.5">ETB</span>
                                    </span>
                                    
                                    <button 
                                        type="button"
                                        onclick={() => handleAddToCart(product.id)}
                                        disabled={loadingCartId === product.id}
                                        class="inline-flex items-center justify-center gap-1.5 bg-accent text-white font-semibold text-[0.85rem] px-4 py-2.5 rounded-[14px] min-w-30 transition-all duration-200 hover:bg-accent/90 hover:shadow-[0_4px_12px_rgba(168,76,59,0.2)] active:scale-95 disabled:opacity-80"
                                    >
                                        {#if successCartIds.has(product.id)}
                                            <span class="inline-flex items-center gap-1 animate-scale-in">
                                                <CheckCircle2 size={14} strokeWidth={2.5} />
                                                Added
                                            </span>
                                        {:else}
                                            <span class="inline-flex items-center gap-1.5 {loadingCartId === product.id ? 'animate-pulse' : ''}">
                                                <ShoppingCart size={14} strokeWidth={2.2} />
                                                {loadingCartId === product.id ? 'Adding...' : 'Add to Cart'}
                                            </span>
                                        {/if}
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </main>

    <!-- Footer -->
    <Footer />
</div>

<style>
    @keyframes scaleIn {
        from { transform: scale(0.92); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    .animate-scale-in {
        animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    .scrollbar-none::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-none {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
