import type { PageLoad } from './$types';
import { featuredProducts } from '$lib/data/products';
import type { PharmacyProduct } from '$lib/data/products';

/**
 * Page load function for YeneHealth homepage.
 * Attempts to load dynamic pharmacy inventory from an API, maps data structures
 * type-safely, and falls back gracefully to static scraped data on failure.
 */
export const load: PageLoad = async ({ fetch }) => {
    try {
        // Attempt to fetch from our API endpoint
        const response = await fetch('/api/products');
        
        if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Dynamic mapping of scraper/API json response to strict PharmacyProduct types.
        // This ensures the application remains resilient even if field names or nesting structures shift.
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
        // Fall back to static scraped data on network/response error to guarantee runtime stability
        console.warn('[YeneHealth] API fetch failed, loading static pharmacy data fallback:', error);
        return {
            products: featuredProducts,
            isFallback: true
        };
    }
};
