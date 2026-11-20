import type { NexoraCategory } from '../types';

export const NEXORA_CATEGORIES: NexoraCategory[] = [
  'Smartphones',
  'Laptops',
  'Headphones',
  'Smartwatches',
  'Accessories',
  'Gaming',
];

export function mapRawCategoryToNexora(rawCategory: string, title = '', tags: string[] = []): NexoraCategory | null {
  const cat = rawCategory.toLowerCase();
  const text = `${title} ${tags.join(' ')}`.toLowerCase();

  if (cat === 'smartphones') return 'Smartphones';
  if (cat === 'laptops') return 'Laptops';
  if (cat === 'mens-watches' || cat === 'womens-watches' || text.includes('watch')) {
    return 'Smartwatches';
  }
  if (
    text.includes('headphone') ||
    text.includes('earbud') ||
    text.includes('airpod') ||
    text.includes('audio') ||
    text.includes('speaker')
  ) {
    return 'Headphones';
  }
  if (text.includes('gaming') || text.includes('console') || text.includes('controller')) {
    return 'Gaming';
  }
  if (cat === 'mobile-accessories' || cat === 'tablets') {
    return 'Accessories';
  }
  return null;
}
