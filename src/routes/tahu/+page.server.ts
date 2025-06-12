
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getEdgeConfig } from '$lib/edge-config-helper';

export const load: PageServerLoad = async () => {
    try {
        const factories = await getEdgeConfig('factories');

        return {
            factories
        };
    } catch (e) {
        console.error('Error loading factories:', e);
        throw error(500, 'Failed to load factories data');
    }
};