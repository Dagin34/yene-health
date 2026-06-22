import type { PageLoad } from './$types';
import { featuredProducts } from '$lib/data/products';
import type { PharmacyProduct } from '$lib/data/products';

/**
 * Load function for the Shop page.
 * Fetches the entire pharmacy product catalog from `/api/products` with robust fallback logic.
 */
export const load: PageLoad = async ({ fetch }) => {
    try {
        const response = await fetch('/api/products');
        
        if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
        }
        
        const data = await response.json();
        
        const products: PharmacyProduct[] = (data.products || []).map((item: any): PharmacyProduct => {
            return {
                id: String(item.id || ''),
                title: String(item.title || item.name || ''),
                description: String(item.description || ''),
                price: Number(item.price || item.priceETB || 0),
                category: item.category || 'Wellness & Supplements',
                status: item.status || 'In Stock',
                imageUrl: String(item.imageUrl || item.imageSrc || ''),
                isRx: Boolean(item.isRx || item.requiresPrescription || false)
            };
        });

        return {
            products
        };
    } catch (error) {
        console.warn('[YeneHealth Shop] Failed to load dynamic product data, using static database:', error);
        return {
            products: featuredProducts,
            isFallback: true
        };
    }
};
