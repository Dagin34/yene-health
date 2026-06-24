<script lang="ts">
    // Import Lucide icons
    import {
        Calendar,
        Stethoscope,
        ShoppingBag,
        GraduationCap,
        ArrowRight,
    } from "@lucide/svelte";

    // Ecosystem services data structure
    const services = [
        {
            icon: Calendar,
            title: "Period Tracking",
            description:
                "Understand your cycle with precision and personalized health insights.",
            href: "/about",
            iconBg: "bg-[#FFF0ED]",
            iconColor: "text-accent",
        },
        {
            icon: Stethoscope,
            title: "Telehealth",
            description:
                "Connect with certified specialists from the comfort of your home.",
            href: "/about",
            iconBg: "bg-[#E6ECEB]",
            iconColor: "text-primary",
        },
        {
            icon: ShoppingBag,
            title: "E-Pharmacy",
            description:
                "Discreet delivery of essential wellness and medical products.",
            href: "/about",
            iconBg: "bg-[#E6ECEB]",
            iconColor: "text-primary",
        },
        {
            icon: GraduationCap,
            title: "Education",
            description:
                "Expert-verified content to empower your health decisions.",
            href: "/about",
            iconBg: "bg-neutral/5",
            iconColor: "text-neutral/75",
        },
    ];
</script>

<section
    class="w-full bg-primary py-24 md:py-32 overflow-hidden selection:bg-accent/20"
    aria-labelledby="ecosystem-heading"
>
    <div
        class="w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-16"
    >
        <div class="flex flex-col gap-3 max-w-155 text-left">
            <span
                id="ecosystem-subheading"
                class="text-[11px] font-bold uppercase tracking-[0.15em] text-accent"
            >
                Our Ecosystem
            </span>
            <h2
                id="ecosystem-heading"
                class="font-bold text-[clamp(2.2rem,4vw,3.2rem)] leading-none tracking-[-0.03em] text-white/90 text-balance"
            >
                Everything you need in one place.
            </h2>
            <p
                class="text-[1.05rem] text-white/70 leading-[1.65] mt-2 font-normal text-balance"
            >
                We've built a holistic healthcare experience tailored for the
                modern woman's journey.
            </p>
        </div>

        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8"
        >
            {#each services as service}
                {@const Icon = service.icon}

                <div
                    class="group relative flex flex-col justify-between bg-white/10 border border-secondary/10 rounded-3xl p-8 xl:p-9 shadow-[0_4px_20px_rgba(20,61,58,0.02)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(20,61,58,0.06)] hover:border-secdonary"
                >
                    <div
                        class="absolute inset-0 rounded-3xl bg-linear-to-br from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        aria-hidden="true"
                    ></div>

                    <div class="flex flex-col gap-6 relative z-10">
                        <div
                            class="w-12 h-12 rounded-[20px] flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 {service.iconBg} {service.iconColor}"
                        >
                            <Icon size={22} strokeWidth={1.8} />
                        </div>

                        <div class="flex flex-col gap-2.5">
                            <h3
                                class="text-[1.35rem] font-bold text-white/80 tracking-tight"
                            >
                                {service.title}
                            </h3>
                            <p
                                class="text-[0.95rem] text-white/50 leading-[1.6] font-normal"
                            >
                                {service.description}
                            </p>
                        </div>
                    </div>

                    <div class="pt-8 relative z-10">
                        <a
                            href={service.href}
                            class="inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-accent transition-colors duration-200 group/link"
                        >
                            Explore
                            <ArrowRight
                                size={15}
                                strokeWidth={2.2}
                                class="transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/link:translate-x-1"
                            />
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
