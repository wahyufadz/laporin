import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getEdgeConfig } from '$lib/edge-config-helper';
import type { Customer, Factory } from '$lib/types';

export const load: PageServerLoad = async () => {
    try {  
        const factories = await getEdgeConfig<Factory[]>('factories');
        const customersByFactory = await getEdgeConfig<Customer[]>('customersByFactory');

        return {
            factories,
            customersByFactory
        };
    } catch (e) {
        console.error('Error loading factories or customers by factory:', e);
        throw error(500, 'Failed to load factories or customers by factory data');
    }

};