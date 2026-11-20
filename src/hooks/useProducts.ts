import { useCallback, useEffect, useState } from 'react';
import { fetchAllProducts } from '../services/productApi';
import type { Product } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usedFallback, setUsedFallback] = useState<boolean>(false);

  const loadProducts = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    const result = await fetchAllProducts(forceRefresh);
    setProducts(result.products);
    setUsedFallback(result.usedFallback);
    if (result.usedFallback && result.errorMessage) {
      setError(result.errorMessage);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    fetchAllProducts().then((result) => {
      if (!active) return;
      setProducts(result.products);
      setUsedFallback(result.usedFallback);
      if (result.usedFallback && result.errorMessage) {
        setError(result.errorMessage);
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error, usedFallback, reload: () => loadProducts(true) };
}
