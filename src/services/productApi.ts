import { FALLBACK_PRODUCTS } from '../data/fallbackProducts';
import type { NexoraCategory, Product, ProductQueryParams, ProductSpec } from '../types';
import { mapRawCategoryToNexora } from '../utils/categoryMapper';
import { calculateDiscountedPrice } from '../utils/formatters';

const BASE_URL = 'https://dummyjson.com';
const REQUEST_TIMEOUT_MS = 6500;

interface DummyJsonReview {
  rating?: number;
  comment?: string;
  date?: string;
  reviewerName?: string;
}

interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: { width?: number; height?: number; depth?: number };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: DummyJsonReview[];
  thumbnail?: string;
  images?: string[];
}

interface DummyJsonListResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface CatalogResult {
  products: Product[];
  usedFallback: boolean;
  errorMessage?: string;
}

let catalogCache: Product[] | null = null;
let categoriesCache: string[] | null = null;

async function fetchWithTimeout<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    const data = (await response.json()) as T;
    return data;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function buildSpecsFromRaw(raw: DummyJsonProduct): ProductSpec[] {
  const specs: ProductSpec[] = [];
  if (raw.brand) specs.push({ label: 'Manufacturer', value: raw.brand });
  if (raw.sku) specs.push({ label: 'SKU', value: raw.sku });
  if (raw.weight !== undefined) specs.push({ label: 'Weight', value: `${raw.weight} oz` });
  if (raw.dimensions?.width && raw.dimensions?.height && raw.dimensions?.depth) {
    specs.push({
      label: 'Dimensions',
      value: `${raw.dimensions.width} × ${raw.dimensions.height} × ${raw.dimensions.depth} cm`,
    });
  }
  if (raw.warrantyInformation) specs.push({ label: 'Warranty', value: raw.warrantyInformation });
  if (raw.shippingInformation) specs.push({ label: 'Fulfillment', value: raw.shippingInformation });
  return specs;
}

export function normalizeDummyProduct(raw: DummyJsonProduct, forcedCategory?: NexoraCategory): Product | null {
  if (!raw || typeof raw.id !== 'number' || typeof raw.title !== 'string' || typeof raw.price !== 'number') {
    return null;
  }

  const tags = Array.isArray(raw.tags) ? raw.tags : [];
  const mappedCategory = forcedCategory ?? mapRawCategoryToNexora(raw.category || '', raw.title, tags);
  if (!mappedCategory) {
    return null;
  }

  const images = Array.isArray(raw.images) && raw.images.length > 0
    ? raw.images
    : raw.thumbnail
      ? [raw.thumbnail]
      : [];

  return {
    id: raw.id,
    title: raw.title,
    description: raw.description || 'Enterprise-grade hardware engineered for modern workflows.',
    price: raw.price,
    discountPercentage: typeof raw.discountPercentage === 'number' ? raw.discountPercentage : 0,
    rating: typeof raw.rating === 'number' ? raw.rating : 4.5,
    stock: typeof raw.stock === 'number' ? raw.stock : 15,
    brand: raw.brand || 'NEXORA Partner',
    category: mappedCategory,
    rawCategory: raw.category || 'electronics',
    thumbnail: raw.thumbnail || images[0] || '',
    images,
    tags,
    sku: raw.sku || `NX-${raw.id}`,
    warrantyInformation: raw.warrantyInformation || '1-year limited warranty',
    shippingInformation: raw.shippingInformation || 'Ships within 1–3 business days',
    availabilityStatus: raw.availabilityStatus || (raw.stock && raw.stock > 0 ? 'In Stock' : 'Out of Stock'),
    reviews: Array.isArray(raw.reviews)
      ? raw.reviews.map((r) => ({
          rating: typeof r.rating === 'number' ? r.rating : 5,
          comment: r.comment || '',
          date: r.date || new Date().toISOString(),
          reviewerName: r.reviewerName || 'Verified Buyer',
        }))
      : [],
    specs: buildSpecsFromRaw(raw),
    isBestSeller: (raw.rating ?? 0) >= 4.5,
    isNewArrival: raw.id % 3 === 0,
    isFallback: false,
  };
}

/**
 * Fetches tech-relevant categories from DummyJSON, normalizes them,
 * and merges with curated fallback products for full category coverage.
 */
export async function fetchAllProducts(forceRefresh = false): Promise<CatalogResult> {
  if (catalogCache && !forceRefresh) {
    return { products: catalogCache, usedFallback: false };
  }

  const targetCategories = [
    'smartphones',
    'laptops',
    'mobile-accessories',
    'tablets',
    'mens-watches',
    'womens-watches',
  ];

  try {
    const responses = await Promise.all(
      targetCategories.map((cat) =>
        fetchWithTimeout<DummyJsonListResponse>(`${BASE_URL}/products/category/${cat}?limit=20`)
      )
    );

    const normalizedMap = new Map<number, Product>();

    for (const res of responses) {
      if (!res || !Array.isArray(res.products)) continue;
      for (const raw of res.products) {
        const normalized = normalizeDummyProduct(raw);
        if (normalized) {
          normalizedMap.set(normalized.id, normalized);
        }
      }
    }

    // Ensure Headphones & Gaming categories also have dedicated flagship entries
    for (const fallback of FALLBACK_PRODUCTS) {
      if (!normalizedMap.has(fallback.id)) {
        normalizedMap.set(fallback.id, fallback);
      }
    }

    const combined = Array.from(normalizedMap.values());
    if (combined.length === 0) {
      throw new Error('Empty normalized catalog');
    }

    catalogCache = combined;
    return { products: combined, usedFallback: false };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to reach product API';
    return {
      products: FALLBACK_PRODUCTS,
      usedFallback: true,
      errorMessage: message,
    };
  }
}

export async function fetchApiCategories(): Promise<string[]> {
  if (categoriesCache) return categoriesCache;
  try {
    const data = await fetchWithTimeout<Array<{ slug: string; name: string } | string>>(
      `${BASE_URL}/products/categories`
    );
    const slugs = data.map((item) => (typeof item === 'string' ? item : item.slug));
    categoriesCache = slugs;
    return slugs;
  } catch {
    return ['smartphones', 'laptops', 'mobile-accessories', 'tablets', 'mens-watches'];
  }
}

export async function searchProductsApi(query: string): Promise<CatalogResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    return fetchAllProducts();
  }

  try {
    const data = await fetchWithTimeout<DummyJsonListResponse>(
      `${BASE_URL}/products/search?q=${encodeURIComponent(trimmed)}&limit=30`
    );

    const apiMatches: Product[] = [];
    if (data && Array.isArray(data.products)) {
      for (const raw of data.products) {
        const normalized = normalizeDummyProduct(raw);
        if (normalized) {
          apiMatches.push(normalized);
        }
      }
    }

    // Also match against curated fallback products (e.g. Headphones, Gaming)
    const lower = trimmed.toLowerCase();
    const fallbackMatches = FALLBACK_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.toLowerCase().includes(lower))
    );

    const merged = new Map<number, Product>();
    for (const p of [...apiMatches, ...fallbackMatches]) {
      merged.set(p.id, p);
    }

    return { products: Array.from(merged.values()), usedFallback: false };
  } catch (error) {
    const lower = trimmed.toLowerCase();
    const localMatches = (catalogCache ?? FALLBACK_PRODUCTS).filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower)
    );

    return {
      products: localMatches,
      usedFallback: true,
      errorMessage: error instanceof Error ? error.message : 'Search API unavailable',
    };
  }
}

export async function fetchProductById(id: number): Promise<{ product: Product | null; usedFallback: boolean }> {
  // Check cache or fallback list first
  const fallbackMatch = FALLBACK_PRODUCTS.find((p) => p.id === id);
  if (fallbackMatch) {
    return { product: fallbackMatch, usedFallback: false };
  }

  if (catalogCache) {
    const cached = catalogCache.find((p) => p.id === id);
    if (cached) return { product: cached, usedFallback: false };
  }

  try {
    const raw = await fetchWithTimeout<DummyJsonProduct>(`${BASE_URL}/products/${id}`);
    const normalized = normalizeDummyProduct(raw) ?? normalizeDummyProduct(raw, 'Accessories');
    return { product: normalized, usedFallback: false };
  } catch {
    return { product: null, usedFallback: true };
  }
}

export function filterAndSortProducts(products: Product[], params: ProductQueryParams): Product[] {
  let result = [...products];

  if (params.category && params.category !== 'All') {
    result = result.filter((p) => p.category === params.category);
  }

  if (params.search && params.search.trim()) {
    const q = params.search.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  switch (params.sort) {
    case 'price-asc':
      result.sort(
        (a, b) =>
          calculateDiscountedPrice(a.price, a.discountPercentage) -
          calculateDiscountedPrice(b.price, b.discountPercentage)
      );
      break;
    case 'price-desc':
      result.sort(
        (a, b) =>
          calculateDiscountedPrice(b.price, b.discountPercentage) -
          calculateDiscountedPrice(a.price, a.discountPercentage)
      );
      break;
    case 'rating-desc':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'discount-desc':
      result.sort((a, b) => b.discountPercentage - a.discountPercentage);
      break;
    case 'featured':
    default:
      result.sort((a, b) => Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller)) || b.rating - a.rating);
      break;
  }

  return result;
}
