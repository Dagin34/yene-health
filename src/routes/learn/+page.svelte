<!-- src/routes/learn/+page.svelte -->
<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import Footer from "$lib/components/footer.svelte";
    import { 
        Search, 
        LayoutGrid, 
        List, 
        Calendar, 
        Clock, 
        ChevronRight, 
        X,
        BookOpen
    } from "@lucide/svelte";
    import type { LearningMaterial, ArticleCategory } from "$lib/data/learningMaterials";

    // Receive loaded learning materials list from page loader
    let { data } = $props();
    let allMaterials = $derived(data.materials as LearningMaterial[]);

    // Search and category filter states
    let searchQuery = $state("");
    let selectedCategory = $state<ArticleCategory | "All">("All");
    let viewMode = $state<"grid" | "list">("grid");

    // Derived filtered learning materials
    let filteredMaterials = $derived.by(() => {
        let result = [...allMaterials];

        // Search text filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(
                (m) => 
                    m.title.toLowerCase().includes(query) || 
                    m.shortDescription.toLowerCase().includes(query) ||
                    m.category.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== "All") {
            result = result.filter((m) => m.category === selectedCategory);
        }

        return result;
    });

    const categories: (ArticleCategory | "All")[] = [
        "All",
        "Family Planning",
        "Maternal and Nursing",
        "Sexual and Reproductive Health",
        "Products",
        "Free Resources"
    ];

    function clearFilters() {
        searchQuery = "";
        selectedCategory = "All";
    }
</script>

<svelte:head>
    <title>YeneHealth Learn | Women's Educational Health Portal</title>
    <meta name="description" content="Explore clinical guides, sexual health education, family planning advice, and maternal health articles curated by YeneHealth's medical experts." />
</svelte:head>

<div class="min-h-screen bg-background flex flex-col relative overflow-x-hidden selection:bg-accent/20 selection:text-primary">
    <!-- Navigation -->
    <Navbar />

    <!-- Space for fixed header -->
    <div class="h-24"></div>

    <!-- Learn Page Hero Section -->
    <section class="w-full py-10 md:py-16 text-left">
        <div class="w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-4">
            <span class="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
                YeneHealth Education Portal
            </span>
            <h1 class="font-bold text-[2.8rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.03em] text-neutral">
                Education for empowerment.
            </h1>
            <p class="text-[0.95rem] text-neutral/70 leading-[1.65] max-w-180">
                Access medically verified articles, personal guides, and reproductive health knowledge curated by expert healthcare providers to support your wellness journey.
            </p>
        </div>
    </section>

    <!-- Filters, Search & View Controls -->
    <section class="w-full pb-8 border-b border-secondary/40">
        <div class="w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-6">
            <!-- Search & Layout Toggle Row -->
            <div class="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
                <!-- Search bar input -->
                <div class="relative w-full md:max-w-130 group">
                    <Search size={18} class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40 transition-colors group-focus-within:text-accent" />
                    <input 
                        type="text" 
                        bind:value={searchQuery}
                        placeholder="Search articles, guides, topics..." 
                        class="w-full pl-12 pr-10 py-3.5 bg-white border border-secondary rounded-2xl text-[0.9rem] focus:outline-none focus:border-accent focus:shadow-[0_4px_20px_rgba(231,110,88,0.08)] transition-all duration-200"
                    />
                    {#if searchQuery}
                        <button 
                            type="button"
                            onclick={() => searchQuery = ""}
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/40 hover:text-neutral/85"
                            aria-label="Clear search"
                        >
                            <X size={16} />
                        </button>
                    {/if}
                </div>

                <!-- Grid vs List View Controls -->
                <div class="flex items-center gap-3 w-full md:w-auto justify-end">
                    <span class="text-xs font-bold text-neutral/40 uppercase tracking-wider hidden sm:inline">
                        Layout Options
                    </span>
                    <div class="inline-flex rounded-xl bg-white border border-secondary p-1">
                        <button 
                            type="button"
                            onclick={() => viewMode = "grid"}
                            class="p-2 rounded-lg transition-all duration-200 {viewMode === 'grid' ? 'bg-primary text-white' : 'text-neutral/60 hover:text-neutral hover:bg-secondary/20'}"
                            aria-label="Grid view"
                            title="Grid layout"
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button 
                            type="button"
                            onclick={() => viewMode = "list"}
                            class="p-2 rounded-lg transition-all duration-200 {viewMode === 'list' ? 'bg-primary text-white' : 'text-neutral/60 hover:text-neutral hover:bg-secondary/20'}"
                            aria-label="List view"
                            title="List layout"
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Category Filtering Pills -->
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

    <!-- Active Filters Summary & Count -->
    <section class="w-full pt-6 pb-2">
        <div class="w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
            <span class="text-xs font-bold text-neutral/40 uppercase tracking-wider">
                Showing {filteredMaterials.length} {filteredMaterials.length === 1 ? 'Article' : 'Articles'}
            </span>

            {#if selectedCategory !== 'All' || searchQuery !== ''}
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

    <!-- Learning Materials Showcase -->
    <main class="w-full py-6 pb-24 grow">
        <div class="w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16">
            {#if filteredMaterials.length === 0}
                <!-- Empty State -->
                <div class="w-full py-20 flex flex-col items-center justify-center gap-4 text-center">
                    <div class="w-16 h-16 rounded-full bg-secondary/35 flex items-center justify-center text-neutral/40">
                        <BookOpen size={28} />
                    </div>
                    <h3 class="font-bold text-[1.2rem] text-neutral mt-2">No articles match your search</h3>
                    <p class="text-[0.88rem] text-neutral/60 max-w-90 leading-relaxed">
                        Try clearing your current search term, choosing another category, or writing something else.
                    </p>
                    <button 
                        type="button"
                        onclick={clearFilters}
                        class="bg-primary text-white text-xs font-bold px-6 py-3 rounded-full mt-2 hover:bg-primary/95 transition-all"
                    >
                        Reset All Filters
                    </button>
                </div>
            {:else if viewMode === 'grid'}
                <!-- GRID VIEW LAYOUT -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {#each filteredMaterials as material (material.id)}
                        <article 
                            class="group relative flex flex-col bg-white border border-secondary/60 rounded-3xl overflow-hidden pb-6 shadow-[0_4px_20px_rgba(20,61,58,0.012)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(20,61,58,0.04)] hover:border-secondary"
                        >
                            <!-- Poster Image & Category Tag -->
                            <div class="relative w-full aspect-16/10 bg-[#F4EBE3] overflow-hidden flex items-center justify-center">
                                <img 
                                    src={material.imageUrl} 
                                    alt={material.title}
                                    class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                                    loading="lazy"
                                />
                                <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                    {material.category}
                                </span>
                            </div>

                            <!-- Content Details -->
                            <div class="flex flex-col grow p-6 pb-2 justify-between">
                                <div class="flex flex-col gap-2">
                                    <!-- Meta Row -->
                                    <div class="flex items-center gap-3 text-neutral/45 text-[11px] font-semibold">
                                        <span class="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {material.datePosted}
                                        </span>
                                        <span class="w-1 h-1 rounded-full bg-neutral-300"></span>
                                        <span class="flex items-center gap-1">
                                            <Clock size={12} />
                                            {material.readDuration}
                                        </span>
                                    </div>

                                    <a href={`/read/${material.slug}`} class="focus:outline-none block mt-1">
                                        <h3 class="text-[1.18rem] font-bold text-neutral leading-snug tracking-tight transition-colors duration-200 hover:text-primary line-clamp-2" title={material.title}>
                                            {material.title}
                                        </h3>
                                    </a>
                                    
                                    <p class="text-[0.82rem] text-neutral/60 line-clamp-3 mt-1.5 leading-relaxed">
                                        {material.shortDescription}
                                    </p>
                                </div>

                                <div class="pt-5 mt-auto flex justify-between items-center">
                                    <a 
                                        href={`/read/${material.slug}`}
                                        class="inline-flex items-center gap-1 text-[0.82rem] font-bold text-accent hover:text-accent/90 transition-colors"
                                    >
                                        Read Article
                                        <ChevronRight size={14} class="transition-transform duration-200 group-hover:translate-x-1" />
                                    </a>
                                </div>
                            </div>
                        </article>
                    {/each}
                </div>
            {:else}
                <!-- LIST VIEW LAYOUT -->
                <div class="flex flex-col gap-6">
                    {#each filteredMaterials as material (material.id)}
                        <article 
                            class="group relative flex flex-col lg:flex-row bg-white border border-secondary/60 rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(20,61,58,0.012)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(20,61,58,0.03)] hover:border-secondary"
                        >
                            <!-- Poster Image Area (Left on Desktop, Top on Mobile) -->
                            <div class="relative w-full lg:w-96 aspect-16/10 lg:aspect-square shrink-0 bg-[#F4EBE3] overflow-hidden flex items-center justify-center">
                                <img 
                                    src={material.imageUrl} 
                                    alt={material.title}
                                    class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-103"
                                    loading="lazy"
                                />
                                <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm lg:hidden">
                                    {material.category}
                                </span>
                            </div>

                            <!-- Details Column -->
                            <div class="flex flex-col grow p-6 sm:p-8 justify-between">
                                <div class="flex flex-col gap-2">
                                    <!-- Category Tag & Meta Row for Desktop -->
                                    <div class="flex flex-wrap items-center gap-3 text-neutral/45 text-[11px] font-semibold">
                                        <span class="hidden lg:inline bg-secondary text-primary px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                                            {material.category}
                                        </span>
                                        <span class="hidden lg:inline w-1 h-1 rounded-full bg-neutral-300"></span>
                                        <span class="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {material.datePosted}
                                        </span>
                                        <span class="w-1 h-1 rounded-full bg-neutral-300"></span>
                                        <span class="flex items-center gap-1">
                                            <Clock size={12} />
                                            {material.readDuration}
                                        </span>
                                    </div>

                                    <a href={`/read/${material.slug}`} class="focus:outline-none block mt-1.5">
                                        <h3 class="text-[1.3rem] sm:text-[1.5rem] font-bold text-neutral leading-tight tracking-tight transition-colors duration-200 hover:text-primary" title={material.title}>
                                            {material.title}
                                        </h3>
                                    </a>
                                    
                                    <p class="text-[0.88rem] text-neutral/60 mt-2 leading-relaxed max-w-220 line-clamp-2">
                                        {material.shortDescription}
                                    </p>
                                </div>

                                <div class="pt-6 mt-6 lg:mt-auto border-t border-secondary/20 flex justify-between items-center">
                                    <a 
                                        href={`/read/${material.slug}`}
                                        class="inline-flex items-center gap-1 text-[0.85rem] font-bold text-accent hover:text-accent/90 transition-colors"
                                    >
                                        Read Article
                                        <ChevronRight size={14} class="transition-transform duration-200 group-hover:translate-x-1" />
                                    </a>
                                </div>
                            </div>
                        </article>
                    {/each}
                </div>
            {/if}
        </div>
    </main>

    <!-- Footer -->
    <Footer />
</div>

<style>
    .scrollbar-none::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-none {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
