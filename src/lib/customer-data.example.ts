import type { Customer, Factory } from './types';

// Factory data
export const factories: Factory[] = [
    { id: 'saelus', name: 'Saelus' },
    { id: 'buaji', name: 'Buaji' },
    { id: 'sekar', name: 'Sekar' },
    { id: 'ceningan', name: 'Ceningan' }
];

// Customer data by factory
export const customersByFactory: Record<string, Customer[]> = {
    saelus: [
        { id: 'saelus-1', name: 'Pelanggan Saelus 1' },
        { id: 'saelus-2', name: 'Pelanggan Saelus 2' },
        { id: 'saelus-3', name: 'Pelanggan Saelus 3' },
        { id: 'saelus-4', name: 'Pelanggan Saelus 4' },
        { id: 'saelus-5', name: 'Pelanggan Saelus 5' }
    ],
    buaji: [
        { id: 'buaji-1', name: 'Pelanggan Buaji 1' },
        { id: 'buaji-2', name: 'Pelanggan Buaji 2' },
        { id: 'buaji-3', name: 'Pelanggan Buaji 3' },
        { id: 'buaji-4', name: 'Pelanggan Buaji 4' },
        { id: 'buaji-5', name: 'Pelanggan Buaji 5' }
    ],
    sekar: [
        { id: 'sekar-1', name: 'Pelanggan Sekar 1' },
        { id: 'sekar-2', name: 'Pelanggan Sekar 2' },
        { id: 'sekar-3', name: 'Pelanggan Sekar 3' },
        { id: 'sekar-4', name: 'Pelanggan Sekar 4' },
        { id: 'sekar-5', name: 'Pelanggan Sekar 5' }
    ],
    ceningan: [
        { id: 'ceningan-1', name: 'Pelanggan Ceningan 1' },
        { id: 'ceningan-2', name: 'Pelanggan Ceningan 2' },
        { id: 'ceningan-3', name: 'Pelanggan Ceningan 3' },
        { id: 'ceningan-4', name: 'Pelanggan Ceningan 4' },
        { id: 'ceningan-5', name: 'Pelanggan Ceningan 5' }
    ]
}; 