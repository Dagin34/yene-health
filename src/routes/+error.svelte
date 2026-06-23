<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import Footer from "$lib/components/footer.svelte";
    import { page } from "$app/stores";
    import { ArrowLeft, Home, ShoppingBag } from "@lucide/svelte";

    // Subscribing to SvelteKit page store for error/status context
    const status = $derived($page.status);
    const error = $derived($page.error);

    function goBack() {
        if (typeof window !== 'undefined') {
            window.history.back();
        }
    }
</script>

<svelte:head>
    <title>{status === 404 ? 'Feature Under Development - YeneHealth' : `Error ${status} - YeneHealth`}</title>
</svelte:head>

<div class="h-screen bg-neutral-50 flex flex-col relative overflow-x-hidden selection:bg-accent/20 selection:text-primary">
    <Navbar />

    <main class="grow w-full flex items-center justify-center py-16 md:py-24 px-6">
        <div class="w-full max-w-[540px] mx-auto text-center flex flex-col items-center">
            
            <div class="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center shrink-0 mb-4">
                <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                    <circle cx="140" cy="140" r="110" stroke="url(#ringGradient)" stroke-width="2" stroke-dasharray="8 8" class="animate-slow-spin origin-center" />
                    
                    <circle cx="140" cy="140" r="80" fill="url(#bgRadial)" opacity="0.15" />
                    
                    <g filter="url(#dropShadow)" class="animate-float">
                        <polygon points="140,45 220,90 220,180 140,225 60,180 60,90" fill="white" fill-opacity="0.75" stroke="#EFE2D4" stroke-width="1.5" class="backdrop-blur-sm" />
                        
                        <line x1="140" y1="45" x2="140" y2="225" stroke="#EFE2D4" stroke-width="1" stroke-dasharray="3 3" />
                        <line x1="60" y1="135" x2="220" y2="135" stroke="#EFE2D4" stroke-width="1" stroke-dasharray="3 3" />

                        <path d="M140 180 C 140 150, 160 130, 175 125" stroke="#143D3A" stroke-width="3" stroke-linecap="round" class="animate-draw-path" />
                        <path d="M140 180 C 140 155, 120 140, 105 135" stroke="#143D3A" stroke-width="3" stroke-linecap="round" class="animate-draw-path-left" />
                        
                        <path d="M175 125 C 185 115, 185 100, 170 105 C 160 110, 165 120, 175 125 Z" fill="#6bb578" opacity="0.9" class="origin-[175px_125px] animate-sway-leaf-right" />
                        <path d="M105 135 C 95 125, 95 110, 110 115 C 120 120, 115 130, 105 135 Z" fill="#143D3A" opacity="0.85" class="origin-[105px_135px] animate-sway-leaf-left" />
                        
                        <g class="animate-bob-capsule origin-center">
                            <path d="M140 90 L140 115 C140 125, 155 125, 155 115 L155 90 Z" fill="#E76E58" transform="rotate(-30 147.5 105)" />
                            <path d="M140 90 L140 65 C140 55, 155 55, 155 65 L155 90 Z" fill="#143D3A" transform="rotate(-30 147.5 105)" stroke="white" stroke-width="0.75" />
                            <line x1="131" y1="85" x2="157" y2="100" stroke="white" stroke-width="1.5" />
                        </g>

                        <path d="M140 148 C140 148 135 142 130 142 C125 142 122 146 122 150 C122 157 140 168 140 168 C140 168 158 157 158 150 C158 146 155 142 150 142 C145 142 140 148 140 148 Z" fill="#E76E58" class="animate-heartbeat origin-[140px_152px]" />

                        <path d="M85 70 L87 75 L92 77 L87 79 L85 84 L83 79 L78 77 L83 75 Z" fill="#E76E58" class="animate-twinkle" style="animation-delay: 0.2s" />
                        <path d="M195 190 L196 193 L199 194 L196 195 L195 198 L194 195 L191 194 L194 193 Z" fill="#6bb578" class="animate-twinkle" style="animation-delay: 0.7s" />
                        <path d="M205 75 L206.5 79.5 L211 81 L206.5 82.5 L205 87 L203.5 82.5 L199 81 L203.5 79.5 Z" fill="#143D3A" class="animate-twinkle" style="animation-delay: 1.2s" />
                    </g>

                    <defs>
                        <linearGradient id="ringGradient" x1="30" y1="30" x2="250" y2="250" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stop-color="#E76E58" />
                            <stop offset="50%" stop-color="#EFE2D4" />
                            <stop offset="100%" stop-color="#143D3A" />
                        </linearGradient>
                        <radialGradient id="bgRadial" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#E76E58" />
                            <stop offset="100%" stop-color="transparent" />
                        </radialGradient>
                        <filter id="dropShadow" x="40" y="30" width="200" height="220" filterUnits="userSpaceOnUse">
                            <shadow font-family="sans-serif">
                                <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#143D3A" flood-opacity="0.08" />
                            </shadow>
                        </filter>
                    </defs>
                </svg>
            </div>

            <div class="flex flex-col gap-3.5 mb-8">
                <div>
                    <span class="inline-flex items-center gap-1.5 bg-accent/10 text-accent border border-accent/10 px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                        <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                        {status === 404 ? 'Coming Soon' : `Status Error ${status}`}
                    </span>
                </div>

                <h2 class="font-bold text-2xl md:text-3xl text-neutral-900 tracking-tight">
                    {status === 404 ? 'Crafting a New Experience' : 'Unexpected Encounter'}
                </h2>

                <p class="text-sm md:text-base text-neutral-500 leading-relaxed max-w-md mx-auto">
                    {#if status === 404}
                        This section of our digital wellness platform is currently under active development as we build personalized resources for your health journey.
                    {:else if error?.message}
                        {error.message}
                    {:else}
                        We encountered an unexpected error while loading this page. Please try again or head back to your workspace.
                    {/if}
                </p>
            </div>

            <div class="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
                <button 
                    onclick={goBack}
                    class="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50 font-semibold text-sm px-6 py-3 rounded-2xl transition-all duration-200 active:scale-[0.98]"
                >
                    <ArrowLeft size={16} />
                    Go Back
                </button>

                <a 
                    href="/shop"
                    class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/95 text-white font-semibold text-sm px-6 py-3 rounded-2xl transition-all duration-200 hover:shadow-[0_4px_12px_rgba(231,110,88,0.15)] active:scale-[0.98]"
                >
                    <ShoppingBag size={16} />
                    Explore Pharmacy
                </a>

                <a 
                    href="/"
                    class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white font-semibold text-sm px-6 py-3 rounded-2xl transition-all duration-200 hover:shadow-[0_4px_12px_rgba(20,61,58,0.12)] active:scale-[0.98]"
                >
                    <Home size={16} />
                    Home Portal
                </a>
            </div>

        </div>
    </main>

    <Footer />
</div>

<style>
    /* Illustration Smooth Keyframe Rules */
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
    }
    .animate-float {
        animation: float 5s ease-in-out infinite;
    }

    @keyframes slowSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .animate-slow-spin {
        animation: slowSpin 35s linear infinite;
    }

    @keyframes bobCapsule {
        0%, 100% { transform: translateY(0) rotate(5deg); }
        50% { transform: translateY(-6px) rotate(-5deg); }
    }
    .animate-bob-capsule {
        animation: bobCapsule 4s ease-in-out infinite;
    }

    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.1); }
        40% { transform: scale(1.05); }
        55% { transform: scale(1.15); }
    }
    .animate-heartbeat {
        animation: heartbeat 3s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
    }

    @keyframes swayLeafRight {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(12deg); }
    }
    .animate-sway-leaf-right {
        animation: swayLeafRight 6s ease-in-out infinite;
    }

    @keyframes swayLeafLeft {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-10deg); }
    }
    .animate-sway-leaf-left {
        animation: swayLeafLeft 6s ease-in-out infinite;
    }

    @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.25); }
    }
    .animate-twinkle {
        animation: twinkle 2.5s ease-in-out infinite;
    }

    @keyframes drawPath {
        from { stroke-dashoffset: 50; }
        to { stroke-dashoffset: 0; }
    }
    .animate-draw-path {
        stroke-dasharray: 50;
        stroke-dashoffset: 0;
        animation: drawPath 2s ease-out forwards;
    }
    .animate-draw-path-left {
        stroke-dasharray: 40;
        stroke-dashoffset: 0;
        animation: drawPath 2.2s ease-out forwards;
    }
</style>