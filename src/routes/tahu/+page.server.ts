import { error } from '@sveltejs/kit';
import { get } from "@vercel/edge-config";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    try {
        const factories = await get('factories');
        
        if (!factories) {
            throw error(404, 'Factories data not found');
        }

        return {
            factories
        };
    } catch (e) {
        console.error('Error loading factories:', e);
        throw error(500, 'Failed to load factories data');
    }
};