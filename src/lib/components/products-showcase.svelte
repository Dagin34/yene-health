<script lang="ts">
    import { 
        Heart, 
        ArrowRight, 
        PlusSquare, 
        ShieldCheck, 
        Baby, 
        Package,
        ShoppingCart,
        CheckCircle2,
        BrainCircuit,
        FileText
    } from "@lucide/svelte";
    import type { PharmacyProduct } from "$lib/data/products";
    import { learningMaterials } from "$lib/data/learningMaterials";

    // Receive products prop with Svelte 5 runes
    let { products = [] }: { products: PharmacyProduct[] } = $props();

    // Slice data directly to respect the layout restriction of the landing page grid (up to 4 products)
    let visibleProducts = $derived(products.slice(0, 4));

    // Track favorited product status dynamically
    let favorites = $state(new Set<string>());

    function toggleFavorite(id: string) {
        if (favorites.has(id)) {
            favorites.delete(id);
        } else {
            favorites.add(id);
        }
        favorites = favorites; // Trigger Svelte reactivity updates
    }

    // Add to cart loading/success states for the icon animation
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

    // Static Data Layer for the Learning Showcase Row (from image_8d2122.png)
    // Slice two articles from learningMaterials for Featured Learning
    const articles = learningMaterials.slice(0, 2).map((material) => ({
        id: material.id,
        title: material.title,
        category: material.category,
        description: material.shortDescription,
        imageSrc: material.imageUrl,
        hasCustomImage: !!material.imageUrl,
        href: `/read/${material.slug}`
    }));
</script>

<section 
    class="w-full bg-background py-18 md:py-24 selection:bg-accent/20"
    aria-labelledby="showcase-heading"
>
    <div class="w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-4 md:gap-8">
        
        <div class="flex flex-col gap-3 max-w-155 text-left">
            <span 
                id="showcase-subheading" 
                class="text-[11px] font-bold uppercase tracking-[0.15em] text-accent"
            >
                Everything you need, in one place
            </span>
            <h2 
                id="showcase-heading"
                class="font-bold text-[2.8rem] leading-[1.15] tracking-[-0.03em] text-neutral text-balance"
            >
                Care beyond consultations.
            </h2>
            <p class="text-[0.9rem] text-neutral/70 leading-[1.65] mt-2 font-normal text-balance">
                Discover trusted health products, expert insights, and educational resources designed to support women throughout every stage of life.
            </p>
        </div>

        <!-- PRODUCT SECTION HEADER -->
        <div class="flex justify-between items-center border-b border-secondary/40 pb-4">
            <span class="text-[1.1rem] font-bold text-neutral tracking-tight">
                Featured Products
            </span>
            <a 
                href="/shop" 
                class="inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-accent transition-colors duration-200 hover:text-accent/80 group"
            >
                View All Products 
                <ArrowRight 
                    size={15} 
                    strokeWidth={2.2} 
                    class="transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1" 
                />
            </a>
        </div>

        <!-- PRODUCT GRID (YOUR EXACT STYLING) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 xl:gap-4">
            {#each visibleProducts as product (product.id)}
                <div 
                    class="group relative flex flex-col bg-white border border-secondary/60 rounded-3xl overflow-hidden pb-6 shadow-[0_4px_20px_rgba(20,61,58,0.015)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(20,61,58,0.05)] hover:border-secondary"
                >
                    <!-- Image container & badges -->
                    <div class="relative w-full aspect-230/190 rounded-t-3xl bg-[#F4EBE3] overflow-hidden flex items-center justify-center">
                        
                        <!-- Stock and Rx Status Badges in top-left -->
                        <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10 pointer-events-none">
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

                        <!-- Image Render / Category-based SVG Icon Fallback -->
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
                                    // Fallback if image fails to load
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.style.display = 'none';
                                    const sibling = target.nextElementSibling as HTMLElement;
                                    if (sibling) sibling.classList.remove('hidden');
                                }}
                            />
                            <!-- Backup icon if image load fails -->
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

                    <!-- Product Details and Price -->
                    <div class="flex flex-col grow p-5 pb-2 justify-between">
                        <div class="flex flex-col gap-1">
                            <span class="text-[9px] font-bold uppercase tracking-wider text-neutral/40">
                                {product.category}
                            </span>
                            <a href={`/products/${product.id}`} class="focus:outline-none">
                                <h3 class="text-[1rem] font-bold text-neutral tracking-tight transition-colors duration-200 hover:text-primary line-clamp-1" title={product.title}>
                                    {product.title}
                                </h3>
                            </a>
                            <!-- Short Description snippet -->
                            <p class="text-[0.78rem] text-neutral/60 line-clamp-2 mt-1 leading-snug">
                                {product.description}
                            </p>
                        </div>

                        <div class="flex justify-between items-center pt-4 mt-auto">
                            <span class="text-[1rem] font-bold text-neutral/80">
                                {product.price.toLocaleString()} <span class="text-[0.7rem] font-medium text-neutral/50 ml-0.5">ETB</span>
                            </span>
                            
                            <!-- Animated Cart Button with dynamic state feedback -->
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

        <!-- LEARNING SECTION HEADER (MATCHES IMAGE_8D2122.PNG) -->
        <div class="flex justify-between items-center border-b border-secondary/40 pb-4 mt-4">
            <span class="text-[1.1rem] font-bold text-neutral tracking-tight">
                Featured Learning
            </span>
            <a 
                href="/learn" 
                class="inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-primary transition-colors duration-200 hover:text-primary/80 group"
            >
                Explore Resources 
                <ArrowRight 
                    size={15} 
                    strokeWidth={2.2} 
                    class="transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1" 
                />
            </a>
        </div>

        <!-- LEARNING CARDS CONTAINER -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
            {#each articles as article (article.id)}
                <div 
                    class="group flex flex-col sm:flex-row bg-white border border-secondary/60 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(20,61,58,0.015)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(20,61,58,0.04)]"
                >
                    <!-- Media Area -->
                    <div class="w-full sm:w-[45%] aspect-240/190 sm:aspect-auto rounded-l-3xl overflow-hidden relative flex items-center justify-center shrink-0">
                        {#if article.hasCustomImage}
                            <img 
                                src={article.imageSrc} 
                                alt={article.title}
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                        {:else}
                            <div class="w-full h-full bg-[#ECF6F4] flex items-center justify-center relative">
                                <div class="text-primary/20 transition-transform duration-500 group-hover:scale-110">
                                    <BrainCircuit size={52} strokeWidth={1.2} />
                                </div>
                            </div>
                        {/if}

                        <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-bold text-primary uppercase tracking-wider shadow-sm border border-neutral/5">
                            {article.category}
                        </span>
                    </div>

                    <!-- Typography Box -->
                    <div class="flex flex-col justify-between p-6 sm:p-8 sm:pl-7 grow">
                        <div class="flex flex-col gap-3">
                            <a href={article.href} class="focus:outline-none">
                                <h3 class="text-[1.3rem] font-bold text-neutral leading-tight tracking-tight transition-colors duration-200 group-hover:text-primary line-clamp-2">
                                    {article.title}
                                </h3>
                            </a>
                            <p class="text-[0.92rem] text-neutral/60 leading-[1.55] line-clamp-3">
                                {article.description}
                            </p>
                        </div>

                        <div class="pt-6">
                            <a 
                                href={article.href}
                                class="inline-flex items-center gap-1.5 text-[0.9rem] font-bold text-primary transition-colors duration-200 group/link"
                            >
                                Read More
                                <ArrowRight 
                                    size={14} 
                                    strokeWidth={2.5} 
                                    class="transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/link:translate-x-1" 
                                />
                            </a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

    </div>
</section>

<style>
    @keyframes scaleIn {
        from { transform: scale(0.92); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    .animate-scale-in {
        animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
</style>