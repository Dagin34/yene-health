// $lib/data/products.ts

/**
 * Product category verticals found on the YeneHealth Pharmacy platform
 */
export type ProductCategory =
    | 'Maternal Health'
    | 'Sexual Health & Family Planning'
    | 'Personal Care & Hygiene'
    | 'Wellness & Supplements';

/**
 * Representation of a product card on the YeneHealth Pharmacy store
 */
export interface PharmacyProduct {
    id: string;
    title: string;
    description: string;
    price: number; // Stated in Ethiopian Birr (ETB)
    category: ProductCategory;
    status: 'In Stock' | 'Prescription Required' | 'In-Store Pickup Only' | 'Out of Stock';
    imageUrl: string; // Absolute CDN URL or relative asset path
    isRx: boolean; // Prescription requirement flag (Rx vs OTC)
}

/**
 * Live inventory dataset scraped from the YeneHealth Pharmacy platform (https://yenehealth.com/pharmacy)
 */
export const featuredProducts: PharmacyProduct[] = [
    {
        id: "yh-prod-101",
        title: "Pregnacare Plus Omega-3",
        description: "Specially formulated prenatal multivitamins with Omega-3 DHA to support healthy maternal nutrition and fetal development.",
        price: 1980,
        category: "Maternal Health",
        status: "In Stock",
        imageUrl: "/images/products/pregnacare-plus.png",
        isRx: false
    },
    {
        id: "yh-prod-102",
        title: "Postinor-2 (Levonorgestrel)",
        description: "Emergency oral contraceptive pill designed to prevent pregnancy when taken within 72 hours of unprotected sexual intercourse.",
        price: 250,
        category: "Sexual Health & Family Planning",
        status: "In Stock",
        imageUrl: "/images/products/postinor.png",
        isRx: false
    },
    {
        id: "yh-prod-103",
        title: "Amaryl 2mg (Glimepiride)",
        description: "Prescription-only oral hypoglycemic agent used to control blood sugar levels in patients diagnosed with Type 2 Diabetes.",
        price: 480,
        category: "Wellness & Supplements",
        status: "Prescription Required",
        imageUrl: "/images/products/amaryl.png",
        isRx: true
    },
    {
        id: "yh-prod-104",
        title: "Tampax Super Tampons",
        description: "Premium cotton tampons with a smooth protective applicator providing reliable absorbency and security.",
        price: 1650,
        category: "Personal Care & Hygiene",
        status: "In Stock",
        imageUrl: "/images/products/tampax-super.png",
        isRx: false
    },
    {
        id: "yh-prod-105",
        title: "Kuri Mint Lactation Tea",
        description: "Natural organic herbal tea blend formulated with traditional ingredients to support breast milk flow and production.",
        price: 500,
        category: "Maternal Health",
        status: "In Stock",
        imageUrl: "/images/products/lactation-tea.png",
        isRx: false
    },
    {
        id: "yh-prod-106",
        title: "Salbutol Inhaler (Albuterol)",
        description: "Prescription bronchodilator providing rapid relief from asthma attacks, wheezing, and breathing difficulties.",
        price: 350,
        category: "Wellness & Supplements",
        status: "Prescription Required",
        imageUrl: "/images/products/salbutol-inhaler.png",
        isRx: true
    }
];