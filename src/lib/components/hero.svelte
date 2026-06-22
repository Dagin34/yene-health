<script lang="ts">
    // Import Lucide icons
    import {
        Users,
        Star,
        ShieldCheck,
        Download,
        Play,
        Calendar,
        MessageSquare,
        ShoppingCart,
        FileText,
        ArrowRight
    } from "@lucide/svelte";
    import HeroImage from "$lib/assets/hero.png";

    // Stat items for the hero bottom stats row
    const stats = [
        {
            icon: Users,
            value: "50K+",
            label: "Women Trust Us",
        },
        {
            icon: Star,
            value: "4.8",
            label: "App Store Rating",
        },
        {
            icon: ShieldCheck,
            value: "100%",
            label: "Private & Secure",
        },
    ];

    // Bottom marquee feature tags
    const features = ["Track", "Consult", "Shop", "Learn"];
</script>

<section
    class="relative min-h-screen w-full overflow-hidden bg-[#FAF7F4] pb-0 pt-8 md:pt-24 flex flex-col justify-between selection:bg-accent/20"
    aria-label="Hero Introduction"
>
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div class="absolute -top-40 -left-40 w-175 h-175 rounded-full opacity-60 blur-[120px]"
            style="background: radial-gradient(circle, #EFE2D4 0%, transparent 70%);"></div>
        <div class="absolute top-1/4 -right-40 w-150 h-150 rounded-full opacity-40 blur-[100px]"
            style="background: radial-gradient(circle, #E76E58 20%, transparent 70%);"></div>
        <div class="absolute bottom-10 left-1/3 w-125 h-125 rounded-full opacity-30 blur-[120px]"
            style="background: radial-gradient(circle, #143D3A 0%, transparent 60%);"></div>
    </div>

    <div class="relative z-10 w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16 flex-1 flex items-center">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center w-full pt-20 lg:py-0">
            
            <div class="flex flex-col justify-center gap-8 lg:col-span-6 xl:col-span-5 text-left">
                
                <div class="inline-flex items-center gap-3 self-start bg-white/80 backdrop-blur-md border border-secondary rounded-full p-1.5 pr-4 shadow-[0_4px_18px_rgba(20,61,58,0.03)] transition-transform duration-300 hover:scale-[1.02]">
                    <span class="flex items-center gap-0.5 bg-[#FFF0ED] px-2.5 py-1 rounded-full" aria-label="5 stars">
                        {#each Array(5) as _}
                            <Star size={12} fill="#E76E58" stroke="none" aria-hidden="true" />
                        {/each}
                    </span>
                    <span class="text-[13px] font-semibold text-neutral/80 tracking-tight">Trusted by 50K+ Women</span>
                </div>

                <div class="flex flex-col gap-3">
                    <h1 class="font-bold uppercase text-[clamp(1.5rem,5vw,3rem)] leading-[1.05] tracking-[-0.03em] text-neutral text-balance">
                        The Care women <br />
                        <span class="italic font-serif text-accent font-normal">deserve,</span> <br />
                        wherever they are.
                    </h1>
                </div>

                <p class="text-[0.8rem] text-neutral/70 leading-[1.75] max-w-120 font-normal text-balance">
                    YeneHealth is Ethiopia's premier digital healthcare ecosystem engineered intentionally for women. Unlock seamless access to localized period tracking, clinical telehealth, and secure pharmacy fulfillment.
                </p>

                <div class="flex items-center gap-4 flex-wrap">
                    <a
                        href="#download"
                        class="inline-flex items-center gap-3 bg-primary hover:bg-[#15423F] text-white text-[0.95rem] font-semibold px-7 py-4 rounded-full transition-all duration-300 shadow-[0_10px_25px_rgba(20,61,58,0.2)] hover:shadow-[0_12px_30px_rgba(20,61,58,0.3)] hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Download size={18} strokeWidth={2} aria-hidden="true" />
                        Download App
                    </a>

                    <a
                        href="#learn-more"
                        class="inline-flex items-center gap-2.5 border border-neutral/15 bg-white/40 backdrop-blur-sm hover:bg-white text-neutral/80 hover:text-primary text-[0.95rem] font-semibold px-6 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <span class="w-5 h-5 rounded-full bg-neutral/5 flex items-center justify-center text-neutral/60">
                            <Play size={8} fill="currentColor" stroke="none" class="translate-x-[0.5px]" aria-hidden="true" />
                        </span>
                        Learn More
                    </a>
                </div>

                <div class="w-full h-px bg-linear-to-r from-accent/15 to-transparent pt-2"></div>
            </div>

            <div class="relative flex items-center justify-center lg:justify-end lg:col-span-6 xl:col-span-7 h-full min-h-120 lg:min-h-0">
                
                <div class="absolute top-1/2 left-1/2 lg:left-2/3 -translate-x-1/2 -translate-y-1/2 w-120 h-120 rounded-full bg-secondary/50 mix-blend-multiply filter blur-xl" aria-hidden="true"></div>

                <div class="relative z-10 w-[320px] sm:w-90 xl:w-100 mr-0 lg:mr-12">
                    
                    <div class="w-full aspect-3/4 rounded-3xl overflow-hidden border-8 border-white shadow-[0_32px_64px_rgba(20,61,58,0.12)] bg-neutral/5">
                        <img 
                            src={HeroImage}
                            alt="Smiling healthcare professional providing compassionate service" 
                            class="w-full h-full object-cover  contrast-105 hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>

                    <div class="absolute -left-12 top-12 z-20 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-[0_12px_32px_rgba(0,0,0,0.06)] border border-white flex items-center gap-3.5 animate-[floatA_6s_ease-in-out_infinite] hover:bg-white transition-colors duration-300">
                        <div class="w-10 h-10 rounded-xl bg-[#FFF0ED] flex items-center justify-center shrink-0 text-accent">
                            <Calendar size={20} strokeWidth={1.6} aria-hidden="true" />
                        </div>
                        <div>
                            <p class="text-[10px] text-neutral/50 font-bold uppercase tracking-wider mb-0.5">Next Cycle</p>
                            <p class="text-[16px] font-extrabold text-neutral leading-none">in 3 Days</p>
                            <div class="flex gap-1 mt-2">
                                {#each Array(6) as _, i}
                                    <div class="w-1.5 h-1.5 rounded-full transition-colors duration-300 {i < 4 ? 'bg-accent' : 'bg-neutral/15'}"></div>
                                {/each}
                            </div>
                        </div>
                    </div>

                    <div aria-hidden="true" class="absolute -right-8 top-[20%] z-20 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-[0_12px_32px_rgba(0,0,0,0.06)] border border-white min-w-37 animate-[floatB_7s_ease-in-out_infinite] hover:bg-white transition-colors duration-300">
                        <p class="text-[10px] text-neutral/50 font-bold uppercase tracking-wider mb-1">Cycle State</p>
                        <div class="flex items-center gap-2">
                            <span class="text-accent flex items-center justify-center animate-pulse">
                                <Star size={16} fill="#E76E58" stroke="none" />
                            </span>
                            <p class="text-[28px] font-extrabold text-neutral leading-none tracking-tight">12</p>
                        </div>
                        <p class="text-[11px] text-neutral/60 font-semibold mt-1.5 bg-[#FAF7F4] px-2 py-0.5 rounded-md inline-block">Follicular Phase</p>
                    </div>

                    <div class="absolute -bottom-5 -left-6 z-20 w-45 animate-[floatC_8s_ease-in-out_infinite]">
                        <div class="w-full rounded-2xl overflow-hidden bg-white shadow-[0_20px_50px_rgba(20,61,58,0.15)] border border-neutral/10">
                            <div class="bg-neutral px-3 py-1.5 flex items-center justify-between text-white/90">
                                <span class="text-[8px] font-bold tracking-tight">09:41</span>
                                <div class="w-2.5 h-1.5 rounded-xs bg-white/80"></div>
                            </div>
                            <div class="bg-white/95 p-3.5">
                                <p class="text-[10px] font-bold text-neutral">Hi, Selam 👋</p>
                                <p class="text-[8px] text-neutral/50 mb-3.5">Let's check your cycle status.</p>

                                <div class="flex justify-center mb-4">
                                    <div class="relative w-20 h-20">
                                        <svg viewBox="0 0 36 36" class="w-full h-full -rotate-90">
                                            <circle cx="18" cy="18" r="16" fill="none" stroke="#FAF7F4" stroke-width="3.5"/>
                                            <circle cx="18" cy="18" r="16" fill="none" stroke="#E76E58" stroke-width="3.5" stroke-dasharray="100" stroke-dashoffset="30" stroke-linecap="round"/>
                                        </svg>
                                        <div class="absolute inset-0 flex flex-col items-center justify-center leading-none">
                                            <span class="text-[6px] text-neutral/40 uppercase font-bold tracking-wider mb-0.5">Day</span>
                                            <span class="text-[15px] font-extrabold text-neutral">12</span>
                                        </div>
                                    </div>
                                </div>

                                <button class="w-full bg-accent hover:bg-[#D35943] text-white text-[8.5px] font-bold py-2 rounded-full transition-colors duration-200 shadow-sm" tabindex="-1">
                                    Log Symptoms
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>

    <div class="relative z-10 w-full mt-auto">
        <div class="w-full overflow-hidden leading-0" aria-hidden="true">
            <svg viewBox="0 0 1440 40" preserveAspectRatio="none" class="w-full h-20 md:h-40" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,25 C280,45 520,5 720,25 C920,45 1160,5 1440,25 L1440,40 L0,40 Z" fill="#E76E58" opacity="0.1"/>
                <path d="M0,32 C280,42 520,18 720,32 C920,42 1160,18 1440,32 L1440,40 L0,40 Z" fill="#E76E58" opacity="0.1"/>
            </svg>
        </div>

        <div class="bg-accent/20">
            <div class="max-w-350 mx-auto px-6 py-5 flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-between">
                <p class="text-neutral font-bold text-sm tracking-tight flex items-center gap-2 text-center md:text-left">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
                    Unified Clinical Ecosystem For Every Phase Of Your Journey
                </p>
                <div class="max-md:hidden flex items-center gap-5 flex-wrap justify-center bg-[#FAF7F4] px-5 py-2.5 rounded-full border border-neutral/15">
                    {#each features as feature, i}
                        <div class="flex items-center gap-5">
                            <span class="text-[0.85rem] font-bold text-neutral/70 flex items-center gap-2 hover:text-primary transition-colors duration-200 cursor-pointer">
                                {#if feature === "Track"}
                                    <Calendar size={14} strokeWidth={2} class="text-primary" />
                                {:else}
                                    {#if feature === "Consult"}
                                        <MessageSquare size={14} strokeWidth={2} class="text-primary" />
                                    {:else if feature === "Shop"}
                                        <ShoppingCart size={14} strokeWidth={2} class="text-primary" />
                                    {:else}
                                        <FileText size={14} strokeWidth={2} class="text-primary" />
                                    {/if}
                                {/if}
                                {feature}
                            </span>
                            {#if i < features.length - 1}
                                <span class="text-neutral/20 text-xs font-light select-none" aria-hidden="true">/</span>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    @keyframes floatA {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-10px) scale(1.02); }
    }
    @keyframes floatB {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-7px) rotate(1deg); }
    }
    @keyframes floatC {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        50% { transform: translateY(-12px) translateX(4px); }
    }
</style>