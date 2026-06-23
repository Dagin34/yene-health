import type { PageLoad } from "./$types";
import { learningMaterials } from "$lib/data/learningMaterials";

export const load: PageLoad = async () => {
    return {
        materials: learningMaterials
    };
};
