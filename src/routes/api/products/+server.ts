import { json } from '@sveltejs/kit';
import { featuredProducts } from '$lib/data/products';
import type { RequestHandler } from './$types';

/**
 * GET handler returning YeneHealth Pharmacy products.
 * Simulates a backend query or live scraper database return.
 */
export const GET: RequestHandler = async () => {
    // In production, this can connect directly to a live scraper scheduler or inventory DB
    return json({ products: featuredProducts });
};
