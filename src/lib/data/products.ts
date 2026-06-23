// $lib/data/products.ts
import Guallac1 from "$lib/assets/products/guallac-1.png";
import Guallac2 from "$lib/assets/products/guallac-2.png";
import Aquafor from "$lib/assets/products/aquaphor.png";
import VitaminGummie from "$lib/assets/products/vitamin-gummie.png";
import TrojanCondom from "$lib/assets/products/trojan-condom.png";
import Tilla from "$lib/assets/products/tilla.png";
import SelfTest from "$lib/assets/products/self-test.jpg";

export type ProductCategory =
    | 'Maternal Health'
    | 'Sexual Health & Family Planning'
    | 'Personal Care & Hygiene'
    | 'Mommy & Baby'
    | 'Medical Health'
    | 'Beauty & Cosmetics'
    | 'Vitamins & Supplements'
    | 'Wellness & Supplements';

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

export const featuredProducts: PharmacyProduct[] = [
    {
        id: "yh-prod-101",
        title: "Gaullac 1 Infant Formula",
        description: `Gaullac 1 Infant Formula is specially developed for newborns and infants from birth to 6 months when breastfeeding is unavailable or insufficient. The formula is designed to provide balanced daily nutrition that supports healthy growth and early development. It contains whey protein, DHA, ARA, nucleotides, taurine, choline, lutein, vitamins, and essential minerals.
The formula uses 100% lactose as the main carbohydrate source and contains prebiotics such as GOS and FOS to help support digestion and gut health.`,
        price: 1000,
        category: "Mommy & Baby",
        status: "In Stock",
        imageUrl: Guallac1,
        isRx: false
    },
    {
        id: "yh-prod-106",
        title: "Gaullac 2 Follow-On Formula",
        description: `Gaullac 2 Follow-On Formula is intended for babies aged 6 to 12 months as part of a mixed weaning diet. This stage formula is designed to support the nutritional needs of older infants during rapid growth and development.
It contains skimmed milk, demineralized whey, vegetable oils, DHA, ARA, nucleotides, taurine, L-carnitine, lutein, and prebiotics including fructo-oligosaccharides and galacto-oligosaccharides. The formula also includes iron, calcium, zinc, and a complete vitamin profile to help support bone development, immunity, and brain growth.`,
        price: 1000,
        category: "Mommy & Baby",
        status: "Prescription Required",
        imageUrl: Guallac2,
        isRx: true
    },
    {
        id: "yh-prod-102",
        title: "Aquaphor Healing Ointment for Baby",
        description: `Aquaphor Healing Ointment for Baby is a gentle, pediatrician-recommended skin protectant designed to soothe and protect delicate baby skin. It helps treat and prevent diaper rash, relieve dryness, and protect minor irritations by forming a breathable barrier that locks in moisture and supports natural healing. The fragrance-free and preservative-free formula is safe for everyday use on sensitive skin, keeping your baby soft, smooth, and comfortable.`,
        price: 6109,
        category: "Mommy & Baby",
        status: "In Stock",
        imageUrl: Aquafor,
        isRx: false
    },
    {
        id: "yh-prod-107",
        title: "Natures Bounty Hair, Skin and Nails Biotin Gummie",
        description: `Support your daily wellness with delicious mixed berry and raspberry-flavored gummies. Formulated with over 10 essential vitamins and minerals, these gummies help support energy metabolism, immune health, bone strength, healthy skin, hair, and nails. 
They contain Vitamins A, C, D, E, B-complex vitamins, Zinc, Calcium, Biotin, and Collagen, making them an easy and tasty addition to your daily routine. `,
        price: 3000,
        category: "Vitamins & Supplements",
        status: "In Stock",
        imageUrl: VitaminGummie,
        isRx: false
    },
    {
        id: "yh-prod-103",
        title: "Trojan Ultra Ribbed Condom",
        description: `Condoms with a distinctive shape and ribbed texture for enhanced enjoyment, made for maximum pleasure. moisturized and composed of premium latex for increased comfort and protection. It is important to use this as directed in order to avoid pregnancy and STDs. lubricant that is silky smooth for pleasure and feeling unique reservoir end for added security Quality latex lowers the chance of getting STIs and becoming pregnant. Every condom undergoes an electrical test to guarantee dependability.`,
        price: 350,
        category: "Sexual Health & Family Planning",
        status: "Prescription Required",
        imageUrl: TrojanCondom,
        isRx: true
    },
    {
        id: "yh-prod-104",
        title: "Tilla Cocoa Butter 200ml",
        description: `Tilla Cocoa Butter is a rich and intensive body moisturizer specially formulated for very dry and rough skin. 
Enriched with cocoa butter, sesame oil, and lanolin, it deeply nourishes the skin, improves elasticity, and helps reduce the appearance of stretch marks and scars. 
Its dermatologically tested and paraben-free formula leaves the skin soft, smooth, and hydrated for long-lasting comfort and care.`,
        price: 1020,
        category: "Beauty & Cosmetics",
        status: "In Stock",
        imageUrl: Tilla,
        isRx: false
    },
    {
        id: "yh-prod-105",
        title: "Prodigy Autocode Blood Sugar Machine",
        description: `Easy, accurate, and voice-guided—Prodigy makes blood sugar testing simple. Ideal for home use, it requires no coding, delivers fast results in just seconds, and features audio instructions for added support. Perfect for daily diabetes management.`,
        price: 1131,
        category: "Medical Health",
        status: "In Stock",
        imageUrl: SelfTest,
        isRx: false
    },
];