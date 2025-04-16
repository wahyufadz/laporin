import type { Customer, Factory } from './types';
import { factories, customersByFactory } from './sensitive-data';

// Re-export the data
export { factories, customersByFactory }; 