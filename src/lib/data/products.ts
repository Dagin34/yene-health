// $lib/data/products.ts

export interface Product {
    id: string;
    title: string;
    category: string;
    priceETB: number;
    imageSrc: string;
    isPlaceholder?: boolean;
    placeholderIcon?: 'medical' | 'shield' | 'baby' | 'default';
    href: string;
}

export const featuredProducts: Product[] = [
    {
        id: "yh-prod-001",
        title: "Prenatal Multivitamins",
        category: "Supplements",
        priceETB: 450,
        imageSrc: "/images/products/prenatal-multivitamins.png", // Replace with your static asset or Cloudinary link
        href: "/products/prenatal-multivitamins"
    },
    {
        id: "yh-prod-002",
        title: "Gentle Cleansing Wash",
        category: "Personal Care",
        priceETB: 320,
        imageSrc: "", // Empty or missing triggers the elegant UI placeholder block
        isPlaceholder: true,
        placeholderIcon: "medical",
        href: "/products/gentle-cleansing-wash"
    },
    {
        id: "yh-prod-003",
        title: "Daily Probiotics",
        category: "Wellness",
        priceETB: 580,
        imageSrc: "",
        isPlaceholder: true,
        placeholderIcon: "shield",
        href: "/products/daily-probiotics"
    },
    {
        id: "yh-prod-004",
        title: "Organic Cotton Swaddle",
        category: "Mother & Baby",
        priceETB: 850,
        imageSrc: "",
        isPlaceholder: true,
        placeholderIcon: "baby",
        href: "/products/organic-cotton-swaddle"
    }
];