
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getEdgeConfig } from '$lib/edge-config-helper';
import type { Customer } from '$lib/types';

export const load: PageServerLoad = async () => {
    try {
        const customersSupir = await getEdgeConfig<Customer[]>('customersSupir');

        return {
            customersSupir
        };
    } catch (e) {
        console.error('Error loading factories:', e);
        throw error(500, 'Failed to load factories data');
    }
};