<script lang="ts">
  const exploreLinks = [
    { label: 'Services',  href: '#services'  },
    { label: 'Resources', href: '#resources' },
    { label: 'Community', href: '#community' },
    { label: 'Careers',   href: '#careers'   },
  ];

  const supportLinks = [
    { label: 'Help Center',     href: '#help'     },
    { label: 'Privacy Policy',  href: '#privacy'  },
    { label: 'Terms of Service',href: '#terms'    },
    { label: 'Cookie Policy',   href: '#cookies'  },
  ];

  const currentYear = new Date().getFullYear();
</script>

<footer class="relative bg-primary overflow-hidden" aria-label="Site footer">

  <!-- ── Main grid ── -->
  <div class="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 pt-20 pb-10">
    <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-16 md:gap-24">

      <!-- Brand column -->
      <div class="flex flex-col gap-6 max-w-[320px]">

        <!-- Logo -->
        <a href="/" aria-label="YeneHealth home" class="inline-flex items-center gap-2.5 self-start group">
          <span class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-200">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M11 3C11 3 6 7 6 12C6 14.8 8.2 17 11 17C13.8 17 16 14.8 16 12C16 7 11 3 11 3Z" fill="#E76E58" opacity="0.9"/>
              <path d="M11 3L11 17" stroke="#F8F3F1" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M11 9C11 9 8 7.5 7 5" stroke="#F8F3F1" stroke-width="1.1" stroke-linecap="round" opacity="0.55"/>
              <path d="M11 12C11 12 13.5 10 14.5 7.5" stroke="#F8F3F1" stroke-width="1.1" stroke-linecap="round" opacity="0.55"/>
            </svg>
          </span>
          <span class="text-white font-semibold text-[16px] tracking-tight">
            Yene<span class="text-accent font-bold">Health</span>
          </span>
        </a>

        <!-- Tagline -->
        <p class="text-white/40 text-[0.875rem] leading-[1.8] font-normal">
          Empowering Ethiopian women through accessible, personalized, and culturally-relevant digital health solutions.
        </p>

        <!-- Social icons -->
        <div class="flex items-center gap-3 mt-1">
          <!-- Globe / Website -->
          <a
            href="https://yenehealth.et"
            aria-label="YeneHealth website"
            class="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center
                   text-white/50 hover:text-white hover:border-white/40 hover:bg-white/8
                   transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/>
              <ellipse cx="8" cy="8" rx="2.8" ry="6" stroke="currentColor" stroke-width="1.3"/>
              <path d="M2 8H14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path d="M2.8 5.5H13.2M2.8 10.5H13.2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
            </svg>
          </a>

          <!-- Share / Social -->
          <a
            href="#social"
            aria-label="Follow YeneHealth on social media"
            class="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center
                   text-white/50 hover:text-white hover:border-white/40 hover:bg-white/8
                   transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12.5" cy="3.5" r="1.8" stroke="currentColor" stroke-width="1.3"/>
              <circle cx="3.5"  cy="8"   r="1.8" stroke="currentColor" stroke-width="1.3"/>
              <circle cx="12.5" cy="12.5" r="1.8" stroke="currentColor" stroke-width="1.3"/>
              <path d="M5.2 7.1L10.8 4.4M5.2 8.9L10.8 11.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </a>

          <!-- Instagram -->
          <a
            href="#instagram"
            aria-label="YeneHealth on Instagram"
            class="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center
                   text-white/50 hover:text-white hover:border-white/40 hover:bg-white/8
                   transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" stroke-width="1.3"/>
              <circle cx="8" cy="8" r="2.6" stroke="currentColor" stroke-width="1.3"/>
              <circle cx="11.5" cy="4.5" r="0.7" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Explore links -->
      <div class="flex flex-col gap-5">
        <h3 class="text-accent text-[0.8125rem] font-semibold tracking-widest uppercase">
          Explore
        </h3>
        <ul class="flex flex-col gap-3.5">
          {#each exploreLinks as link}
            <li>
              <a
                href={link.href}
                class="text-white/45 hover:text-white text-[0.9375rem] font-normal
                       transition-colors duration-200
                       focus-visible:outline-none focus-visible:text-white"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Support links -->
      <div class="flex flex-col gap-5">
        <h3 class="text-accent text-[0.8125rem] font-semibold tracking-widest uppercase">
          Support
        </h3>
        <ul class="flex flex-col gap-3.5">
          {#each supportLinks as link}
            <li>
              <a
                href={link.href}
                class="text-white/45 hover:text-white text-[0.9375rem] font-normal
                       transition-colors duration-200
                       focus-visible:outline-none focus-visible:text-white"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- ── Divider ── -->
    <div class="w-full h-px bg-white/10 mt-16 mb-8"></div>

    <!-- ── Bottom bar ── -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p class="text-white/25 text-[0.8125rem] font-normal">
        © {currentYear} YeneHealth. All rights reserved.
      </p>

      <!-- Watermark wordmark -->
      <span
        class="text-white/5.5 font-black text-[2.75rem] lg:text-[3.5rem] leading-none tracking-[-0.04em] uppercase select-none pointer-events-none"
        aria-hidden="true"
      >
        YeneHealth
      </span>
    </div>
  </div>

</footer>