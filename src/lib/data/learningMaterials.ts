// $lib/data/learningMaterials.ts
import whyYoureNotGainingWeightMd from "./articles/why-youre-not-gaining-weight.md?raw";
import contraceptionOptionsExplainedMd from "./articles/contraception-options-explained.md?raw";
import maternalHealthAndNutritionMd from "./articles/maternal-health-and-nutrition.md?raw";

import whyYoureNotGainingWeightImg from "$lib/assets/learn/not-gaining-weight.png";
import contraceptionOptionsExplainedImg from "$lib/assets/learn/contraception-options.png";
import maternalHealthAndNutritionImg from "$lib/assets/learn/maternal-health-nutrition.png";

export type ArticleCategory =
    | "Family Planning"
    | "Maternal and Nursing"
    | "Sexual and Reproductive Health"
    | "Products"
    | "Free Resources";

export interface LearningMaterial {
    id: string;
    slug: string;
    title: string;
    category: ArticleCategory;
    shortDescription: string;
    body: string; // Compiled raw markdown content
    readDuration: string; // read-duration (e.g. "6 min read")
    datePosted: string; // date-posted (e.g. "Aug 04, 2025")
    markdownPath: string; // Path to md file
    imageUrl: string; // Path to the poster image
}

export const learningMaterials: LearningMaterial[] = [
    {
        id: "lm-101",
        slug: "why-you-re-not-gaining-weight--even-when-eating-more-",
        title: "Why You're Not Gaining Weight (Even When Eating More)",
        category: "Sexual and Reproductive Health",
        shortDescription: "Eating more but not seeing any progress? Learn the physiological and lifestyle reasons behind weight gain resistance and how to build muscle effectively.",
        body: whyYoureNotGainingWeightMd,
        readDuration: "6 min read",
        datePosted: "Aug 04, 2025",
        markdownPath: "$lib/data/articles/why-youre-not-gaining-weight.md",
        imageUrl: whyYoureNotGainingWeightImg
    },
    {
        id: "lm-102",
        slug: "contraception-options-explained",
        title: "Understanding Your Contraception Options: A Full Guide",
        category: "Family Planning",
        shortDescription: "Explore the different types of contraception available, including long-acting reversible options (IUDs, implants) and daily hormonal methods, to find what fits you best.",
        body: contraceptionOptionsExplainedMd,
        readDuration: "8 min read",
        datePosted: "Jul 15, 2025",
        markdownPath: "$lib/data/articles/contraception-options-explained.md",
        imageUrl: contraceptionOptionsExplainedImg
    },
    {
        id: "lm-103",
        slug: "maternal-health-and-nutrition",
        title: "Essential Maternal Health & Nutrition for a Healthy Pregnancy",
        category: "Maternal and Nursing",
        shortDescription: "A healthy pregnancy starts with what you eat. Discover the essential vitamins, mineral requirements, and dietary guidelines to support yourself and your baby.",
        body: maternalHealthAndNutritionMd,
        readDuration: "10 min read",
        datePosted: "Jun 20, 2025",
        markdownPath: "$lib/data/articles/maternal-health-and-nutrition.md",
        imageUrl: maternalHealthAndNutritionImg
    }
];
