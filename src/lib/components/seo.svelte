<script lang="ts">
    interface SEOProps {
        title?: string | null;
        description?: string | null;
        image?: string | null;
        url?: string | null;
    }

    let {
        title = "YeneHealth | Women's Digital Health Catalog",
        description = "Women's Digital Health Catalog",
        image = "https://yene-health-dnb.vercel.app/thumbnail.png",
        url = "https://yene-health-dnb.vercel.app",
    }: SEOProps = $props();

    const displayTitle = $derived(title ?? "YeneHealth");
    const displayDescription = $derived(
        description ?? "Women's Digital Health Catalog",
    );
    const displayImage = $derived(
        image ?? "https://yene-health-dnb.vercel.app/thumbnail.png",
    );
    const displayUrl = $derived(url ?? "https://yene-health-dnb.vercel.app");
</script>

<svelte:head>
    <title>{displayTitle}</title>

    <meta name="description" content={displayDescription} />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={displayUrl} />
    <meta property="og:title" content={displayTitle} />
    <meta property="og:description" content={displayDescription} />
    <meta property="og:image" content={displayImage} />
    <meta property="og:image:alt" content={displayTitle} />
    <meta property="og:image:width" content="1906" />
    <meta property="og:image:height" content="908" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content={displayTitle} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={displayUrl} />
    <meta name="twitter:title" content={displayTitle} />
    <meta name="twitter:description" content={displayDescription} />
    <meta name="twitter:image" content={displayImage} />

    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    <link rel="canonical" href={displayUrl} />

    <link
        rel="sitemap"
        type="application/xml"
        title="Sitemap"
        href="{displayUrl}/sitemap.xml"
    />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#E76E58" />
    <meta name="mobile-web-app-capable" content="yes" />

    <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-2TPHF7027V"
    ></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-2TPHF7027V", {
            anonymize_ip: true,
        });
    </script>

    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "DigitalHealth",
                    "@id": "https://yene-health-dnb.vercel.app/#organization",
                    "name": "YeneHealth",
                    "url": "https://yene-health-dnb.vercel.app/",
                    "image": "https://yene-health-dnb.vercel.app/logo.png",
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "ET"
                    }
                },
                {
                    "@type": "WebSite",
                    "@id": "https://yene-health-dnb.vercel.app/",
                    "url": "https://yene-health-dnb.vercel.app/",
                    "name": "YeneHealth",
                    "publisher": {
                        "@id": "https://dagmawi.et/"
                    }
                }
            ]
        }
    </script>
</svelte:head>