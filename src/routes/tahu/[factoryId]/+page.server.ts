import { error } from '@sveltejs/kit';
import { get } from "@vercel/edge-config";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    try {
        const factories = await get('factories');
        
        if (!factories) {
            throw error(404, 'Factories data not found');
        }
        
        const customersByFactory = await get('customersByFactory');
        
        if (!customersByFactory) {
            throw error(404, 'Customers by factory data not found');
        }   

        return {
            factories,
            customersByFactory
        };
    } catch (e) {
        console.error('Error loading factories or customers by factory:', e);
        throw error(500, 'Failed to load factories or customers by factory data');
    }

};