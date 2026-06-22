import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { featuredProducts } from '$lib/data/products';
import type { PharmacyProduct } from '$lib/data/products';

/**
 * Page loader for a single product detail view.
 * Searches the pharmacy catalog for the target product and selects related items for recommendations.
 */
export const load: PageLoad = async ({ params, fetch }) => {
    let products: PharmacyProduct[] = [];
    
    try {
        const response = await fetch('/api/products');
        if (response.ok) {
            const data = await response.json();
            products = (data.products || []).map((item: any): PharmacyProduct => ({
                id: String(item.id || ''),
                title: String(item.title || item.name || ''),
                description: String(item.description || ''),
                price: Number(item.price || item.priceETB || 0),
                category: item.category || 'Wellness & Supplements',
                status: item.status || 'In Stock',
                imageUrl: String(item.imageUrl || item.imageSrc || ''),
                isRx: Boolean(item.isRx || item.requiresPrescription || false)
            }));
        } else {
            products = featuredProducts;
        }
    } catch (e) {
        console.warn('[YeneHealth Details] API query error, using static fallback:', e);
        products = featuredProducts;
    }

    const product = products.find((p) => p.id === params.id);
    
    if (!product) {
        throw error(404, {
            message: `Pharmacy product with ID '${params.id}' was not found.`
        });
    }

    // Identify up to 3 recommendations (excluding the active product)
    // Preference is given to items matching the same clinical vertical
    const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
    const otherCategories = products.filter((p) => p.category !== product.category && p.id !== product.id);
    const recommendations = [...sameCategory, ...otherCategories].slice(0, 3);

    return {
        product,
        recommendations
    };
};
