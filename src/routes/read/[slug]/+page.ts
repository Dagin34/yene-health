import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { learningMaterials } from "$lib/data/learningMaterials";
import { parseMarkdown } from "$lib/utils/markdown";

export const load: PageLoad = async ({ params }) => {
    const material = learningMaterials.find((m) => m.slug === params.slug);

    if (!material) {
        throw error(404, {
            message: `Learning material with slug '${params.slug}' was not found.`
        });
    }

    // Parse the markdown body content into styled HTML
    const parsedHtml = parseMarkdown(material.body);

    // Identify up to 3 related article recommendations (excluding the current one)
    // Preference is given to articles sharing the same category
    const sameCategory = learningMaterials.filter((m) => m.category === material.category && m.id !== material.id);
    const otherCategories = learningMaterials.filter((m) => m.category !== material.category && m.id !== material.id);
    const recommendations = [...sameCategory, ...otherCategories].slice(0, 3);

    return {
        material,
        parsedHtml,
        recommendations
    };
};
