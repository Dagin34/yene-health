<!-- src/routes/product-details/[id]/+page.svelte -->
<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import Footer from "$lib/components/footer.svelte";
    import { 
        Heart, 
        ShoppingCart, 
        CheckCircle2, 
        FileText,
        Baby, 
        ShieldCheck, 
        PlusSquare, 
        Package,
        ArrowLeft,
        Minus,
        Plus,
        AlertCircle,
        Check
    } from "@lucide/svelte";
    import type { PharmacyProduct } from "$lib/data/products";

    // Receive data from +page.ts loader
    let { data } = $props();
    const product = $derived(data.product as PharmacyProduct);
    const recommendations = $derived(data.recommendations as PharmacyProduct[]);

    // Quantity selector state
    let quantity = $state(1);
    
    // Active tab state
    let activeTab = $state<"overview" | "usage" | "composition" | "safety">("overview");

    // Wishlist favorited state
    let favorited = $state(false);

    // Cart loading and success animation states
    let loadingCart = $state(false);
    let successAdded = $state(false);

    function handleAddToCart() {
        if (loadingCart || successAdded) return;
        loadingCart = true;
        
        setTimeout(() => {
            loadingCart = false;
            successAdded = true;
            
            setTimeout(() => {
                successAdded = false;
            }, 1800);
        }, 700);
    }

    // Reset details states when product changes
    $effect(() => {
        // Triggered on product.id changes
        const currentId = product.id;
        quantity = 1;
        favorited = false;
        activeTab = "overview";
    });

    // Clinical specifications mapping lookup
    const clinicalDetails = {
        "yh-prod-101": { // Pregnacare Plus
            usage: "Take one tablet (blue blister) and one capsule (pink blister) per day with your main meal. Swallow with water or a cold drink. Do not chew. Only to be taken on a full stomach.",
            ingredients: "Vitamins (D3, E, C, B1, B2, B3, B6, Folic Acid, B12), Minerals (Biotin, Pantothenic Acid, Magnesium, Iron, Zinc, Copper, Manganese, Selenium, Iodine), plus Omega-3 Fish Oil (DHA, EPA).",
            safety: "Do not exceed the recommended intake. To be taken on a full stomach. Food supplements must not replace a varied and balanced diet and a healthy lifestyle."
        },
        "yh-prod-102": { // Postinor-2
            usage: "Take the first tablet as soon as possible after unprotected intercourse (preferably within 12 hours, and no later than 72 hours). Take the second tablet exactly 12 hours after the first tablet.",
            ingredients: "Each tablet contains 0.75 mg of Levonorgestrel (a synthetic progestogen).",
            safety: "Postinor-2 is an emergency contraceptive and does not replace regular contraceptive methods. It will not terminate an existing pregnancy. Side effects may include nausea, fatigue, abdominal pain, and headache."
        },
        "yh-prod-103": { // Amaryl 2mg
            usage: "Take exactly as prescribed by your doctor. Typically taken once daily with breakfast or the first main meal of the day. Do not crush or chew the tablet.",
            ingredients: "Each tablet contains 2 mg of Glimepiride.",
            safety: "Prescription required. Monitor blood sugar regularly. Risk of hypoglycemia (low blood sugar). Symptoms include dizziness, sweating, confusion. Inform your doctor if you take other medications."
        },
        "yh-prod-104": { // Tampax Super
            usage: "Read enclosed leaflet for instructions on insertion, removal, and hygiene. Always use the lowest absorbency necessary for your flow. Change tampons every 4-8 hours.",
            ingredients: "Cotton, Rayon, Polyester, Polypropylene (applicator).",
            safety: "Tampons are associated with Toxic Shock Syndrome (TSS), a rare but serious illness. Read and save the leaflet inside the box for details."
        },
        "yh-prod-105": { // Kuri Mint Lactation Tea
            usage: "Brew 1 tea bag in 1 cup of boiling water for 5-10 minutes. For optimal results, drink 2-3 cups daily. Can be served hot or cold.",
            ingredients: "Organic Fennel Seed, Organic Anise Seed, Organic Coriander Seed, Organic Fenugreek Seed, Spearmint Leaf.",
            safety: "Consult your healthcare provider before use during pregnancy. Fennel and Fenugreek may cause mild digestive changes in sensitive individuals."
        },
        "yh-prod-106": { // Salbutol Inhaler
            usage: "Shake well before each use. Inhale 1 to 2 puffs as needed for sudden asthma symptoms. Wait 1 minute between puffs if taking two.",
            ingredients: "Each actuation delivers 100 mcg of Salbutol (Albuterol) sulfate.",
            safety: "Prescription required. Side effects may include rapid heart rate, tremors, headache, or throat irritation. Seek immediate medical attention if breathing difficulties worsen after inhalation."
        }
    };

    const details = $derived(
        clinicalDetails[product.id as keyof typeof clinicalDetails] || {
            usage: "Refer to packaging for exact usage instructions.",
            ingredients: "Active medicinal formulations.",
            safety: "Keep out of reach of children. Store in a cool, dry place. Consult a doctor before use."
        }
    );
</script>

<svelte:head>
    <title>{product.title} - YeneHealth Pharmacy</title>
    <meta name="description" content={product.description} />
</svelte:head>

<div class="min-h-screen bg-background flex flex-col relative overflow-x-hidden selection:bg-accent/20 selection:text-primary">
    <!-- Header -->
    <Navbar />

    <!-- Space for fixed header -->
    <div class="h-24"></div>

    <!-- Main Container -->
    <main class="grow w-full py-8 md:py-16">
        <div class="w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-8">
            
            <!-- Breadcrumbs / Back button -->
            <div class="flex flex-wrap items-center justify-between gap-4">
                <nav class="flex items-center gap-2 text-xs font-semibold text-neutral/45" aria-label="Breadcrumb">
                    <a href="/" class="hover:text-accent transition-colors">Home</a>
                    <span>/</span>
                    <a href="/shop" class="hover:text-accent transition-colors">Pharmacy</a>
                    <span>/</span>
                    <span class="text-neutral/70 line-clamp-1">{product.title}</span>
                </nav>

                <a 
                    href="/shop" 
                    class="inline-flex items-center gap-1.5 text-xs font-bold text-accent transition-all duration-200 hover:text-accent/85 group"
                >
                    <ArrowLeft size={14} class="transition-transform group-hover:-translate-x-1" />
                    Back to Pharmacy Catalog
                </a>
            </div>

            <!-- Product detail wrapper -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 bg-white border border-secondary/60 rounded-3xl p-6 md:p-10 shadow-[0_8px_32px_rgba(20,61,58,0.015)]">
                
                <!-- Column Left: Image Showcase -->
                <div class="lg:col-span-5 flex flex-col gap-4">
                    <div class="relative w-full aspect-square bg-[#F4EBE3] rounded-2xl overflow-hidden flex items-center justify-center border border-secondary/40 shadow-inner group">
                        
                        <!-- Badges top-left -->
                        <div class="absolute top-4 left-4 flex flex-col gap-2 items-start z-10 pointer-events-none">
                            {#if product.isRx}
                                <span class="bg-accent text-white px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1">
                                    <FileText size={9} strokeWidth={3} /> Prescription Required
                                </span>
                            {/if}

                            <span class="bg-white/90 backdrop-blur-sm border border-neutral/5 text-neutral px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm">
                                {product.category}
                            </span>
                        </div>

                        <!-- Image Render -->
                        {#if !product.imageUrl}
                            <div class="text-neutral/25 transition-transform duration-500 group-hover:scale-105">
                                {#if product.category === 'Maternal Health'}
                                    <Baby size={92} strokeWidth={1} />
                                {:else if product.category === 'Sexual Health & Family Planning'}
                                    <ShieldCheck size={92} strokeWidth={1} />
                                {:else if product.category === 'Wellness & Supplements'}
                                    <PlusSquare size={92} strokeWidth={1} />
                                {:else}
                                    <Package size={92} strokeWidth={1} />
                                {/if}
                            </div>
                        {:else}
                            <img 
                                src={product.imageUrl} 
                                alt={product.title}
                                class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                                onerror={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.style.display = 'none';
                                    const sibling = target.nextElementSibling as HTMLElement;
                                    if (sibling) sibling.classList.remove('hidden');
                                }}
                            />
                            <!-- Fallback icon -->
                            <div class="hidden text-neutral/25 transition-transform duration-500 group-hover:scale-105 absolute">
                                {#if product.category === 'Maternal Health'}
                                    <Baby size={92} strokeWidth={1} />
                                {:else if product.category === 'Sexual Health & Family Planning'}
                                    <ShieldCheck size={92} strokeWidth={1} />
                                {:else if product.category === 'Wellness & Supplements'}
                                    <PlusSquare size={92} strokeWidth={1} />
                                {:else}
                                    <Package size={92} strokeWidth={1} />
                                {/if}
                            </div>
                        {/if}
                    </div>
                </div>

                <!-- Column Right: Product Details & Buy Box -->
                <div class="lg:col-span-7 flex flex-col justify-between gap-6">
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center gap-2">
                            <!-- Category and stock indicator -->
                            {#if product.status === 'In Stock'}
                                <span class="inline-flex items-center gap-1 text-xs font-bold text-[#2E7D32] bg-[#ECF7ED] px-3 py-1 rounded-full">
                                    <span class="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-pulse"></span>
                                    In Stock (Verified)
                                </span>
                            {:else if product.status === 'Prescription Required'}
                                <span class="inline-flex items-center gap-1 text-xs font-bold text-[#F57F17] bg-[#FFF8E1] px-3 py-1 rounded-full">
                                    Rx Required
                                </span>
                            {:else if product.status === 'In-Store Pickup Only'}
                                <span class="inline-flex items-center gap-1 text-xs font-bold text-[#1A73E8] bg-[#E8F0FE] px-3 py-1 rounded-full">
                                    In-Store Pickup Only
                                </span>
                            {:else}
                                <span class="inline-flex items-center gap-1 text-xs font-bold text-[#616161] bg-[#F5F5F5] px-3 py-1 rounded-full">
                                    Out of Stock
                                </span>
                            {/if}

                            {#if !product.isRx}
                                <span class="text-xs font-bold text-primary bg-secondary/40 px-3 py-1 rounded-full">
                                    Over-the-Counter (OTC)
                                </span>
                            {/if}
                        </div>

                        <!-- Product Title -->
                        <h2 class="font-bold text-[2rem] md:text-[2.5rem] leading-[1.15] text-neutral tracking-tight">
                            {product.title}
                        </h2>

                        <!-- Product Price in ETB -->
                        <div class="flex items-baseline gap-1 py-1">
                            <span class="text-[1.8rem] font-black text-neutral">
                                {product.price.toLocaleString()}
                            </span>
                            <span class="text-[0.85rem] font-bold text-neutral/50 uppercase tracking-wider">
                                ETB
                            </span>
                        </div>

                        <!-- Short Description -->
                        <p class="text-[0.92rem] text-neutral/70 leading-[1.6] border-t border-secondary/40 pt-4">
                            {product.description}
                        </p>
                    </div>

                    <!-- Buy Box Card -->
                    <div class="bg-secondary/25 border border-secondary/40 rounded-2xl p-5 flex flex-col gap-4">
                        
                        {#if product.isRx}
                            <!-- Prescription Warning Alert Box -->
                            <div class="bg-[#FFF8E1] border border-[#FFE082] rounded-xl p-3 flex gap-3 text-xs text-[#5D4037] leading-[1.45]">
                                <AlertCircle size={18} class="text-[#F57F17] shrink-0 mt-0.5" />
                                <div>
                                    <strong class="font-bold block mb-0.5">Clinical Classification: Prescription (Rx) Only</strong>
                                    This medicine requires a valid clinical prescription written by a licensed healthcare practitioner. You will need to upload a digital prescription during the delivery checkout process.
                                </div>
                            </div>
                        {/if}

                        <div class="flex flex-wrap items-center justify-between gap-4">
                            <!-- Quantity Selector -->
                            <div class="flex items-center gap-3">
                                <span class="text-xs font-bold text-neutral/60 uppercase tracking-wider">Quantity</span>
                                <div class="flex items-center bg-white border border-secondary rounded-xl p-1 shadow-sm">
                                    <button 
                                        type="button"
                                        onclick={() => quantity = Math.max(1, quantity - 1)}
                                        disabled={quantity <= 1}
                                        class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-neutral-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span class="w-10 text-center font-bold text-sm text-neutral">{quantity}</span>
                                    <button 
                                        type="button"
                                        onclick={() => quantity = Math.min(9, quantity + 1)}
                                        disabled={quantity >= 9}
                                        class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-neutral-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>

                            <!-- Buy button actions -->
                            <div class="flex items-center gap-3 grow sm:grow-0 justify-end">
                                <!-- Favorite Heart -->
                                <button 
                                    type="button"
                                    onclick={() => favorited = !favorited}
                                    class="w-12 h-12 rounded-xl bg-white border border-secondary/70 flex items-center justify-center text-neutral/70 shadow-sm transition-all duration-200 hover:bg-neutral-50 hover:scale-105 active:scale-95"
                                    aria-label="Toggle wishlist"
                                >
                                    <Heart size={20} class="transition-colors {favorited ? 'fill-accent text-accent' : 'text-neutral/70'}" />
                                </button>

                                <button 
                                    type="button"
                                    onclick={handleAddToCart}
                                    disabled={loadingCart || successAdded}
                                    class="inline-flex items-center justify-center gap-2 bg-accent hover:bg-[#d9604a] text-white font-bold text-[0.92rem] px-8 py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_8px_20px_rgba(231,110,88,0.25)] active:scale-[0.98] disabled:opacity-90 grow sm:grow-0"
                                >
                                    {#if successAdded}
                                        <span class="inline-flex items-center gap-1.5 animate-scale-in">
                                            <CheckCircle2 size={16} strokeWidth={2.5} />
                                            Added to Cart
                                        </span>
                                    {:else}
                                        <span class="inline-flex items-center gap-2 {loadingCart ? 'animate-pulse' : ''}">
                                            <ShoppingCart size={16} strokeWidth={2.2} />
                                            {loadingCart ? 'Adding...' : 'Add to Delivery'}
                                        </span>
                                    {/if}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Product Information Accordions / Tabs (Clinical Focus) -->
            <div class="flex flex-col gap-6 bg-white border border-secondary/60 rounded-3xl p-6 md:p-10 shadow-[0_8px_32px_rgba(20,61,58,0.015)]">
                <!-- Navigation Tabs -->
                <div class="flex border-b border-secondary/40 overflow-x-auto scrollbar-none gap-6 pb-0.5">
                    <button 
                        type="button"
                        onclick={() => activeTab = "overview"}
                        class="pb-3 text-sm font-bold border-b-2 tracking-tight transition-all whitespace-nowrap {activeTab === 'overview' ? 'text-accent border-accent' : 'text-neutral/40 border-transparent hover:text-neutral/80'}"
                    >
                        Description & Indications
                    </button>
                    <button 
                        type="button"
                        onclick={() => activeTab = "usage"}
                        class="pb-3 text-sm font-bold border-b-2 tracking-tight transition-all whitespace-nowrap {activeTab === 'usage' ? 'text-accent border-accent' : 'text-neutral/40 border-transparent hover:text-neutral/80'}"
                    >
                        Usage & Directions
                    </button>
                    <button 
                        type="button"
                        onclick={() => activeTab = "composition"}
                        class="pb-3 text-sm font-bold border-b-2 tracking-tight transition-all whitespace-nowrap {activeTab === 'composition' ? 'text-accent border-accent' : 'text-neutral/40 border-transparent hover:text-neutral/80'}"
                    >
                        Active Ingredients
                    </button>
                    <button 
                        type="button"
                        onclick={() => activeTab = "safety"}
                        class="pb-3 text-sm font-bold border-b-2 tracking-tight transition-all whitespace-nowrap {activeTab === 'safety' ? 'text-accent border-accent' : 'text-neutral/40 border-transparent hover:text-neutral/80'}"
                    >
                        Safety, Warnings & Side Effects
                    </button>
                </div>

                <!-- Tab Content Panel -->
                <div class="pt-2 text-[0.93rem] text-neutral/80 leading-[1.65] min-h-32">
                    {#if activeTab === "overview"}
                        <div class="flex flex-col gap-3 animate-fade-in">
                            <h4 class="font-bold text-neutral">Indications</h4>
                            <p>{product.description}</p>
                            <p class="mt-2">This healthcare item belongs to the <strong>{product.category}</strong> digital vertical. It meets international GMP storage standards and is verified for quality and compliance in Ethiopia by YeneHealth clinical pharmacy specialists.</p>
                        </div>
                    {:else if activeTab === "usage"}
                        <div class="flex flex-col gap-3 animate-fade-in">
                            <h4 class="font-bold text-neutral">Dosage & Directions</h4>
                            <p>{details.usage}</p>
                            <div class="mt-4 bg-secondary/20 rounded-xl p-4 flex gap-3 text-xs text-neutral/70">
                                <Check size={14} class="text-primary shrink-0 mt-0.5" />
                                Always follow the dosage prescribed by your medical doctor or details in the patient leaflet. Do not modify dose amounts without consulting a pharmacist.
                            </div>
                        </div>
                    {:else}
                        {#if activeTab === "composition"}
                            <div class="flex flex-col gap-3 animate-fade-in">
                                <h4 class="font-bold text-neutral">Active Ingredients / Composition</h4>
                                <p>{details.ingredients}</p>
                            </div>
                        {:else}
                            <div class="flex flex-col gap-3 animate-fade-in">
                                <h4 class="font-bold text-error">Warnings, Side Effects & Precautions</h4>
                                <p class="text-neutral/90">{details.safety}</p>
                                <div class="mt-4 bg-error/5 border border-error/15 rounded-xl p-4 flex gap-3 text-xs text-error">
                                    <AlertCircle size={16} class="shrink-0 mt-0.5" />
                                    <span>
                                        <strong>Emergency Note:</strong> If you suspect a severe allergic reaction or overdose, stop taking the medication immediately and seek help at the nearest clinic or dial national health response numbers.
                                    </span>
                                </div>
                            </div>
                        {/if}
                    {/if}
                </div>
            </div>

            <!-- Recommendations Section -->
            <section class="w-full mt-10">
                <div class="flex justify-between items-center border-b border-secondary/40 pb-4 mb-6">
                    <h3 class="text-[1.2rem] font-bold text-neutral tracking-tight">
                        Related Health Products
                    </h3>
                    <a 
                        href="/shop" 
                        class="text-xs font-bold text-accent hover:underline"
                    >
                        View Store Catalog
                    </a>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each recommendations as item (item.id)}
                        <div 
                            class="group relative flex flex-col bg-white border border-secondary/60 rounded-3xl overflow-hidden pb-6 shadow-[0_4px_20px_rgba(20,61,58,0.012)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(20,61,58,0.04)]"
                        >
                            <!-- Image / Link -->
                            <div class="relative w-full aspect-230/190 bg-[#F4EBE3] overflow-hidden flex items-center justify-center">
                                <!-- Badges -->
                                <div class="absolute top-3 left-3 flex flex-col gap-1 items-start z-10 pointer-events-none">
                                    {#if item.isRx}
                                        <span class="bg-accent text-white px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-wider">
                                            Rx
                                        </span>
                                    {/if}
                                    <span class="bg-white/90 backdrop-blur-sm border border-neutral/5 text-neutral px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider">
                                        {item.status}
                                    </span>
                                </div>

                                {#if !item.imageUrl}
                                    <div class="text-neutral/25 transition-transform duration-500 group-hover:scale-105">
                                        {#if item.category === 'Maternal Health'}
                                            <Baby size={38} strokeWidth={1.2} />
                                        {:else if item.category === 'Sexual Health & Family Planning'}
                                            <ShieldCheck size={38} strokeWidth={1.2} />
                                        {:else if item.category === 'Wellness & Supplements'}
                                            <PlusSquare size={38} strokeWidth={1.2} />
                                        {:else}
                                            <Package size={38} strokeWidth={1.2} />
                                        {/if}
                                    </div>
                                {:else}
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title}
                                        class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                                        loading="lazy"
                                        onerror={(e) => {
                                            const target = e.currentTarget as HTMLImageElement;
                                            target.style.display = 'none';
                                            const sibling = target.nextElementSibling as HTMLElement;
                                            if (sibling) sibling.classList.remove('hidden');
                                        }}
                                    />
                                    <div class="hidden text-neutral/25 transition-transform duration-500 group-hover:scale-105 absolute">
                                        {#if item.category === 'Maternal Health'}
                                            <Baby size={38} strokeWidth={1.2} />
                                        {:else if item.category === 'Sexual Health & Family Planning'}
                                            <ShieldCheck size={38} strokeWidth={1.2} />
                                        {:else if item.category === 'Wellness & Supplements'}
                                            <PlusSquare size={38} strokeWidth={1.2} />
                                        {:else}
                                            <Package size={38} strokeWidth={1.2} />
                                        {/if}
                                    </div>
                                {/if}
                            </div>

                            <!-- Details -->
                            <div class="flex flex-col grow p-5 pb-2 justify-between">
                                <div class="flex flex-col gap-1">
                                    <span class="text-[9px] font-bold uppercase tracking-wider text-neutral/40">
                                        {item.category}
                                    </span>
                                    <!-- Using rel="external" or normal links so SvelteKit handles route navigation -->
                                    <a href={`/product-details/${item.id}`} class="focus:outline-none">
                                        <h4 class="text-[0.95rem] font-bold text-neutral tracking-tight transition-colors duration-200 hover:text-primary line-clamp-1">
                                            {item.title}
                                        </h4>
                                    </a>
                                </div>
                                <div class="flex justify-between items-center pt-3 mt-auto">
                                    <span class="text-[0.9rem] font-bold text-neutral/80">
                                        {item.price.toLocaleString()} <span class="text-[0.65rem] font-medium text-neutral/50 ml-0.5">ETB</span>
                                    </span>
                                    <a 
                                        href={`/product-details/${item.id}`} 
                                        class="bg-primary text-white font-bold text-[0.75rem] px-3.5 py-2 rounded-lg hover:bg-primary/90 transition-all active:scale-95"
                                    >
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </section>

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
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fadeIn 0.3s ease-out forwards;
    }

    .scrollbar-none::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-none {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
