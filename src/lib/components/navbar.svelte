<script lang="ts">
    import { onMount } from "svelte";
    import {
        X,
        Mail,
        Lock,
        User,
        Eye,
        EyeOff,
        ArrowRight,
    } from "@lucide/svelte";
    import LogoImage from "$lib/assets/logo.png";

    let scrolled = $state(false);
    let menuOpen = $state(false);

    // Auth Modal States
    let authModalOpen = $state(false);
    // Modes: 'signin' | 'signup' | 'forgot'
    let authMode = $state<"signin" | "signup" | "forgot">("signin");
    let showPassword = $state(false);

    const navLinks = [
        { label: "shop", href: "/shop" },
        { label: "learn", href: "/learn" },
        { label: "about us", href: "/about-us" },
        { label: "our services", href: "/our-services" },
    ];

    onMount(() => {
        const handleScroll = () => {
            scrolled = window.scrollY > 20;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    });

    function openAuth(mode: "signin" | "signup" | "forgot" = "signin") {
        authMode = mode;
        authModalOpen = true;
        menuOpen = false; // Close mobile nav if open
    }

    function closeAuth() {
        authModalOpen = false;
        showPassword = false;
    }
</script>

<header class="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5">
    <nav
        class="w-full md:max-w-[60vw] h-16 rounded-full flex items-center justify-between px-6 transition-all duration-300 {scrolled
            ? 'bg-black/10 backdrop-blur-sm shadow-[0_8px_32px_rgba(20,61,58,0.22)] border border-white/50'
            : 'bg-primary shadow-[0_4px_24px_rgba(20,61,58,0.13)]'}"
        aria-label="Main navigation"
    >
        <!-- Logo -->
        <a
            href="/"
            class="flex items-center gap-2.5 shrink-0 group"
            aria-label="YeneHealth home"
        >
            <span
                class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-200 text-accent"
            >
                <img src={LogoImage} alt="" />
            </span>
            <span
                class="text-white font-semibold text-[15px] leading-tight tracking-tight"
            >
                Yene<span class="text-accent font-bold">Health</span>
            </span>
        </a>

        <!-- Desktop nav links — centered -->
        <ul
            class="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
        >
            {#each navLinks as link}
                <li>
                    <a
                        href={link.href}
                        class="relative px-4 py-2 rounded-full capitalize text-sm font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 {scrolled
                            ? 'text-accent/75 hover:text-accent hover:bg-accent/10'
                            : 'text-white/75 hover:text-white hover:bg-white/10'}"
                    >
                        {link.label}
                    </a>
                </li>
            {/each}
        </ul>

        <!-- CTA Action -->
        <div class="flex items-center gap-3">
            <button
                onclick={() => openAuth("signin")}
                class="hidden md:inline-flex items-center gap-2 bg-accent hover:bg-[#d9604a] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-[0_2px_12px_rgba(231,110,88,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
                Sign In
            </button>

            <!-- Mobile hamburger -->
            <button
                class="md:hidden flex flex-col gap-1.25 p-2 rounded-full hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onclick={() => (menuOpen = !menuOpen)}
            >
                <span
                    class="block w-5 h-[1.5px] bg-white transition-all duration-200 {menuOpen
                        ? 'rotate-45 translate-y-[6.5px]'
                        : ''}"
                ></span>
                <span
                    class="block w-5 h-[1.5px] bg-white transition-all duration-200 {menuOpen
                        ? 'opacity-0 scale-x-0'
                        : ''}"
                ></span>
                <span
                    class="block w-5 h-[1.5px] bg-white transition-all duration-200 {menuOpen
                        ? '-rotate-45 translate-y-[-6.5px]'
                        : ''}"
                ></span>
            </button>
        </div>
    </nav>

    <!-- Mobile dropdown -->
    {#if menuOpen}
        <div
            class="md:hidden h-[86vh] absolute top-24 left-4 right-4 bg-primary rounded-3xl overflow-hidden shadow-[0_16px_48px_rgba(20,61,58,0.28)] flex flex-col justify-between py-4 animate-[fadeSlideDown_200ms_cubic-bezier(0.22,1,0.36,1)_both]"
            role="menu"
        >
            <div class="flex flex-col items-center justify-start">
                {#each navLinks as link}
                    <a
                        href={link.href}
                        class="capitalize px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 text-xl font-medium transition-colors duration-150"
                        role="menuitem"
                        onclick={() => (menuOpen = false)}
                    >
                        {link.label}
                    </a>
                {/each}
            </div>
            <div class="px-6 pt-3 pb-2">
                <button
                    onclick={() => openAuth("signin")}
                    class="w-full flex items-center justify-center bg-accent hover:bg-[#d9604a] text-white text-sm font-semibold px-5 py-3 rounded-full transition-all duration-200"
                >
                    Sign In
                </button>
            </div>
        </div>
    {/if}
</header>

{#if authModalOpen}
    <div
        class="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_200ms_ease-out_both]"
        onclick={closeAuth}
        onkeydown={(e) => e.key === "Escape" && closeAuth()}
        role="button"
        tabindex="-1"
        aria-label="Close modal background overlay"
    >
        <div
            class="relative w-full max-w-115 bg-white rounded-3xl p-8 sm:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.24)] border border-neutral-100 overflow-hidden animate-[modalScaleUp_300ms_cubic-bezier(0.34,1.56,0.64,1)_both]"
            onclick={(e) => e.stopPropagation()}
            onkeydown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            tabindex="0"
        >
            <button
                onclick={closeAuth}
                class="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 transition-colors duration-200"
                aria-label="Close authentication modal"
            >
                <X size={18} />
            </button>

            <div class="text-center mb-8">
                <div class="inline-flex items-center gap-1.5 mb-3">
                    <span class="text-primary font-bold text-lg">Yene</span
                    ><span class="text-accent font-black text-lg">Health</span>
                </div>

                {#if authMode === "signin"}
                    <h3
                        class="text-2xl font-bold text-neutral-900 tracking-tight"
                    >
                        Welcome back
                    </h3>
                    <p class="text-sm text-neutral-500 mt-1">
                        Access your personalized wellness portal
                    </p>
                {:else}
                    <h3
                        class="text-2xl font-bold text-neutral-900 tracking-tight"
                    >
                        {authMode === "signup"
                            ? "Create an account"
                            : "Reset password"}
                    </h3>
                    <p class="text-sm text-neutral-500 mt-1">
                        {authMode === "signup"
                            ? "Join thousands of women across Ethiopia"
                            : "We will send you a recovery sequence"}
                    </p>
                {/if}
            </div>

            <form onsubmit={(e) => e.preventDefault()} class="space-y-4">
                {#if authMode === "signup"}
                    <div class="space-y-1.5">
                        <label
                            for="reg-name"
                            class="text-xs font-semibold uppercase tracking-wider text-neutral-600"
                            >Full Name</label
                        >
                        <div class="relative">
                            <User
                                size={16}
                                class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                            />
                            <input
                                id="reg-name"
                                type="text"
                                placeholder="Dagmawi Bogale"
                                class="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:bg-white transition-all duration-200"
                            />
                        </div>
                    </div>
                {/if}

                <div class="space-y-1.5">
                    <label
                        for="auth-email"
                        class="text-xs font-semibold uppercase tracking-wider text-neutral-600"
                        >Email Address</label
                    >
                    <div class="relative">
                        <Mail
                            size={16}
                            class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                        />
                        <input
                            id="auth-email"
                            type="email"
                            placeholder="name@example.com"
                            class="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:bg-white transition-all duration-200"
                        />
                    </div>
                </div>

                {#if authMode !== "forgot"}
                    <div class="space-y-1.5">
                        <div class="flex items-center justify-between">
                            <label
                                for="auth-password"
                                class="text-xs font-semibold uppercase tracking-wider text-neutral-600"
                                >Password</label
                            >
                            {#if authMode === "signin"}
                                <button
                                    type="button"
                                    onclick={() => (authMode = "forgot")}
                                    class="text-xs font-medium text-accent hover:underline focus:outline-none"
                                >
                                    Forgot password?
                                </button>
                            {/if}
                        </div>
                        <div class="relative">
                            <Lock
                                size={16}
                                class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                            />
                            <input
                                id="auth-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••••••"
                                class="w-full pl-11 pr-12 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:bg-white transition-all duration-200"
                            />
                            <button
                                type="button"
                                onclick={() => (showPassword = !showPassword)}
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                            >
                                {#if showPassword}<EyeOff
                                        size={16}
                                    />{:else}<Eye size={16} />{/if}
                            </button>
                        </div>
                    </div>
                {/if}

                <div class="pt-2">
                    <button
                        type="button"
                        disabled
                        class="w-full flex items-center justify-center gap-2 bg-neutral-300 text-neutral-500 font-semibold py-3.5 rounded-2xl text-sm cursor-not-allowed shadow-none transition-all duration-150"
                    >
                        {#if authMode === "signin"}
                            Sign In to Portal
                        {:else if authMode === "signup"}
                            Register Account
                        {:else}
                            Send Reset Link
                        {/if}
                        <ArrowRight size={15} />
                    </button>
                </div>
            </form>

            <div
                class="mt-8 pt-5 border-t border-neutral-100 text-center text-xs text-neutral-500"
            >
                {#if authMode === "signin"}
                    Don't have an account yet?
                    <button
                        onclick={() => (authMode = "signup")}
                        class="text-accent font-semibold hover:underline focus:outline-none ml-1"
                        >Sign up</button
                    >
                {:else if authMode === "signup"}
                    Already have an account?
                    <button
                        onclick={() => (authMode = "signin")}
                        class="text-accent font-semibold hover:underline focus:outline-none ml-1"
                        >Sign in</button
                    >
                {:else}
                    Remembered your credentials?
                    <button
                        onclick={() => (authMode = "signin")}
                        class="text-accent font-semibold hover:underline focus:outline-none ml-1"
                        >Back to sign in</button
                    >
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    @keyframes fadeSlideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes modalScaleUp {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
</style>
