import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Product } from '../types';
import { useToast } from './ToastContext';

const WISHLIST_STORAGE_KEY = 'nexora_wishlist_v1';

interface WishlistContextValue {
  items: Product[];
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

function loadInitialWishlist(): Product[] {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is Product => item && typeof item.id === 'number');
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(loadInitialWishlist);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items]);

  const isInWishlist = useCallback(
    (productId: number) => items.some((item) => item.id === productId),
    [items]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      setItems((prev) => {
        const exists = prev.some((p) => p.id === product.id);
        if (exists) {
          showToast('info', 'Removed from wishlist', product.title);
          return prev.filter((p) => p.id !== product.id);
        }
        showToast('success', 'Saved to wishlist', product.title);
        return [product, ...prev];
      });
    },
    [showToast]
  );

  const removeFromWishlist = useCallback(
    (productId: number) => {
      setItems((prev) => prev.filter((p) => p.id !== productId));
      showToast('info', 'Removed from wishlist');
    },
    [showToast]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{ items, isInWishlist, toggleWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
