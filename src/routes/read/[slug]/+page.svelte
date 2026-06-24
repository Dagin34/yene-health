<!-- src/routes/read/[slug]/+page.svelte -->
<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import Footer from "$lib/components/footer.svelte";
    import { 
        ChevronLeft, 
        Heart, 
        Share2, 
        Bookmark, 
        Mail, 
        Calendar, 
        Clock, 
        CheckCircle2, 
        BookOpen,
        ChevronRight
    } from "@lucide/svelte";
    import type { LearningMaterial } from "$lib/data/learningMaterials";
    import Seo from "$lib/components/seo.svelte";

    // Receive data loaded from page loader
    let { data } = $props();
    let material = $derived(data.material as LearningMaterial);
    let parsedHtml = $derived(data.parsedHtml as string);
    let recommendations = $derived(data.recommendations as LearningMaterial[]);

    // Sticky widget states
    let liked = $state(false);
    let likeCount = $state(42);
    let bookmarked = $state(false);
    let newsletterEmail = $state("");
    let newsletterSuccess = $state(false);
    let sharingTooltip = $state(false);

    function toggleLike() {
        if (liked) {
            liked = false;
            likeCount--;
        } else {
            liked = true;
            likeCount++;
        }
    }

    function toggleBookmark() {
        bookmarked = !bookmarked;
    }

    function handleNewsletterSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (!newsletterEmail.trim()) return;
        newsletterSuccess = true;
        setTimeout(() => {
            newsletterEmail = "";
        }, 3000);
    }

    function handleShare() {
        if (navigator.share) {
            navigator.share({
                title: material.title,
                text: material.shortDescription,
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback: Copy link to clipboard
            navigator.clipboard.writeText(window.location.href);
            sharingTooltip = true;
            setTimeout(() => {
                sharingTooltip = false;
            }, 2000);
        }
    }
</script>

<svelte:head>
    <Seo title="{material.title} | YeneHealth Learn | Women's Digital Health Catalog" />
</svelte:head>

<div class="min-h-screen bg-background flex flex-col relative overflow-x-hidden selection:bg-accent/20 selection:text-primary">
    <!-- Navigation -->
    <Navbar />

    <!-- Space for fixed header -->
    <div class="h-24"></div>

    <!-- Article Content Wrapper -->
    <main class="w-full py-8 pb-24 grow">
        <div class="w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16">
            <!-- Back navigation link -->
            <a 
                href="/learn" 
                class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral/50 hover:text-accent tracking-wider uppercase transition-colors duration-200 mb-8"
            >
                <ChevronLeft size={16} />
                Back to Learning Portal
            </a>

            <!-- Header Title Area -->
            <header class="max-w-240 flex flex-col gap-4 mb-10">
                <span class="inline-flex self-start bg-secondary text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {material.category}
                </span>
                
                <h1 class="font-extrabold text-[2.2rem] sm:text-[3rem] leading-[1.15] tracking-[-0.03em] text-neutral">
                    {material.title}
                </h1>

                <!-- Meta row -->
                <div class="flex items-center flex-wrap gap-4 text-neutral/50 text-xs font-semibold mt-2">
                    <span class="flex items-center gap-1.5">
                        <Calendar size={14} />
                        Posted: {material.datePosted}
                    </span>
                    <span class="w-1 h-1 rounded-full bg-neutral-300"></span>
                    <span class="flex items-center gap-1.5">
                        <Clock size={14} />
                        {material.readDuration}
                    </span>
                    <span class="w-1 h-1 rounded-full bg-neutral-300"></span>
                    <span class="bg-[#ECF7ED] text-[#2E7D32] px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide">
                        Clinically Reviewed
                    </span>
                </div>
            </header>

            <!-- 2-Column Detail Layout -->
            <div class="flex flex-col lg:flex-row gap-10 justify-between items-start">
                <!-- Left Column: Poster & Article Body -->
                <div class="w-full lg:w-[68%] flex flex-col">
                    <!-- Poster Image -->
                    <div class="w-full aspect-video bg-[#F4EBE3] rounded-[28px] overflow-hidden shadow-sm mb-10">
                        <img 
                            src={material.imageUrl} 
                            alt={material.title}
                            class="w-full h-full object-cover"
                        />
                    </div>

                    <!-- Rendered HTML Content -->
                    <article class="prose prose-stone max-w-none">
                        {@html parsedHtml}
                    </article>
                </div>

                <!-- Right Column: Sticky actions & newsletter sidebar -->
                <aside class="w-full lg:w-[28%] flex flex-col gap-6 lg:sticky lg:top-28">
                    <!-- Engagement / Action panel -->
                    <div class="bg-white border border-secondary/60 rounded-[24px] p-6 shadow-[0_4px_20px_rgba(20,61,58,0.012)]">
                        <h4 class="text-xs font-bold text-neutral/45 uppercase tracking-wider mb-4">
                            Article Engagement
                        </h4>
                        
                        <div class="flex items-center justify-between gap-2">
                            <!-- Like button -->
                            <button 
                                type="button" 
                                onclick={toggleLike}
                                class="flex-1 py-3 px-4 rounded-xl border border-secondary hover:border-neutral/30 flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 active:scale-95 {liked ? 'bg-accent/10 border-accent/20 text-accent' : 'text-neutral/70 bg-white'}"
                            >
                                <Heart size={16} class={liked ? 'fill-accent' : ''} />
                                <span>{likeCount} Likes</span>
                            </button>

                            <!-- Bookmark button -->
                            <button 
                                type="button" 
                                onclick={toggleBookmark}
                                class="p-3 rounded-xl border border-secondary hover:border-neutral/30 flex items-center justify-center transition-all duration-200 active:scale-95 {bookmarked ? 'bg-primary text-white border-primary' : 'text-neutral/70 bg-white'}"
                                aria-label="Bookmark article"
                                title="Bookmark"
                            >
                                <Bookmark size={16} class={bookmarked ? 'fill-white' : ''} />
                            </button>

                            <!-- Share button with Copy feedback tooltip -->
                            <div class="relative">
                                <button 
                                    type="button" 
                                    onclick={handleShare}
                                    class="p-3 rounded-xl border border-secondary hover:border-neutral/30 flex items-center justify-center text-neutral/70 bg-white transition-all duration-200 active:scale-95"
                                    aria-label="Share article"
                                    title="Share"
                                >
                                    <Share2 size={16} />
                                </button>
                                {#if sharingTooltip}
                                    <span class="absolute right-0 bottom-full mb-2 bg-neutral text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap animate-fade-in z-20">
                                        Link Copied!
                                    </span>
                                {/if}
                            </div>
                        </div>
                    </div>

                    <!-- Newsletter box -->
                    <div class="bg-primary text-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(20,61,58,0.15)] flex flex-col gap-4 relative overflow-hidden">
                        <!-- Abstract radial gradient background for depth -->
                        <div class="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-accent/20 blur-xl pointer-events-none"></div>
                        <div class="absolute -left-16 -bottom-16 w-36 h-36 rounded-full bg-secondary/10 blur-xl pointer-events-none"></div>

                        <div class="relative z-10 flex flex-col gap-3">
                            <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-accent">
                                <Mail size={18} />
                            </div>
                            
                            <h4 class="font-bold text-[1.2rem] leading-snug tracking-tight text-white mt-1">
                                Stay Informed.
                            </h4>
                            
                            <p class="text-[0.78rem] text-white/70 leading-[1.65]">
                                Subscribe to YeneHealth's weekly newsletter for wellness guides, product updates, and digital health alerts.
                            </p>

                            {#if newsletterSuccess}
                                <div class="bg-white/10 border border-white/20 rounded-xl p-3 flex items-center gap-2 mt-2 animate-scale-in">
                                    <CheckCircle2 size={16} class="text-accent shrink-0" />
                                    <span class="text-[0.75rem] font-semibold text-white">Subscribed successfully!</span>
                                </div>
                            {:else}
                                <form onsubmit={handleNewsletterSubmit} class="flex flex-col gap-2 mt-2 w-full">
                                    <input 
                                        type="email" 
                                        required
                                        placeholder="Enter your email" 
                                        bind:value={newsletterEmail}
                                        class="w-full px-4 py-2.5 bg-white/10 border border-white/15 rounded-xl text-white text-[0.8rem] placeholder-white/55 focus:outline-none focus:bg-white/15 focus:border-accent transition-all duration-200"
                                    />
                                    <button 
                                        type="submit" 
                                        class="w-full bg-accent hover:bg-accent/90 text-white font-bold text-xs py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            {/if}
                        </div>
                    </div>
                </aside>
            </div>

            <!-- Recommended Articles bottom grid -->
            {#if recommendations.length > 0}
                <section class="w-full flex flex-col gap-6">
                    <h2 class="font-bold text-2xl tracking-tight text-neutral mt-8">
                        Recommended Articles
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {#each recommendations as rec (rec.id)}
                            <article class="group bg-white border border-secondary/60 rounded-3xl overflow-hidden pb-5 shadow-[0_4px_20px_rgba(20,61,58,0.012)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(20,61,58,0.03)] hover:border-secondary">
                                <div class="aspect-16/10 bg-[#F4EBE3] overflow-hidden flex items-center justify-center relative">
                                    <img 
                                        src={rec.imageUrl} 
                                        alt={rec.title} 
                                        class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                                <div class="p-5 flex flex-col gap-2 justify-between">
                                    <div class="flex flex-col gap-1">
                                        <span class="text-[9px] font-bold uppercase tracking-wider text-neutral/40">
                                            {rec.category}
                                        </span>
                                        <a href={`/read/${rec.slug}`} class="focus:outline-none">
                                            <h3 class="text-[0.98rem] font-bold text-neutral leading-snug tracking-tight transition-colors duration-200 hover:text-primary line-clamp-2" title={rec.title}>
                                                {rec.title}
                                            </h3>
                                        </a>
                                    </div>
                                    <a 
                                        href={`/read/${rec.slug}`}
                                        class="inline-flex items-center gap-0.5 text-[0.78rem] font-bold text-accent hover:text-accent/90 transition-colors mt-3"
                                    >
                                        Read Article
                                        <ChevronRight size={12} class="transition-transform duration-200 group-hover:translate-x-0.5" />
                                    </a>
                                </div>
                            </article>
                        {/each}
                    </div>
                </section>
            {/if}
        </div>
    </main>

    <!-- Footer -->
    <Footer />
</div>

<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fadeIn 0.2s ease-out forwards;
    }
    @keyframes scaleIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    .animate-scale-in {
        animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
</style>
