import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';
import { calculateDiscountedPrice } from '../utils/formatters';
import { useToast } from './ToastContext';

const CART_STORAGE_KEY = 'nexora_cart_v1';
const FREE_SHIPPING_THRESHOLD = 250;
const STANDARD_SHIPPING_FEE = 14.99;

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  rawSubtotal: number;
  discountTotal: number;
  subtotal: number;
  shipping: number;
  finalTotal: number;
  freeShippingThreshold: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function loadInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        item &&
        typeof item.quantity === 'number' &&
        item.quantity > 0 &&
        item.product &&
        typeof item.product.id === 'number'
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadInitialCart);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      if (product.stock <= 0 || product.availabilityStatus === 'Out of Stock') {
        showToast('warning', 'Product unavailable', `${product.title} is currently out of stock.`);
        return;
      }

      const safeQty = Math.max(1, Math.floor(quantity));

      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          const nextQty = Math.min(product.stock, existing.quantity + safeQty);
          return prev.map((i) => (i.product.id === product.id ? { ...i, quantity: nextQty } : i));
        }
        return [...prev, { product, quantity: Math.min(product.stock, safeQty) }];
      });

      showToast('success', 'Added to cart', `${product.title} (${safeQty}) added.`);
      setIsDrawerOpen(true);
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      showToast('info', 'Item removed', 'Product removed from your cart.');
    },
    [showToast]
  );

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (!Number.isFinite(quantity) || quantity < 1) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }

    setItems((prev) =>
      prev.map((i) => {
        if (i.product.id !== productId) return i;
        const maxStock = i.product.stock > 0 ? i.product.stock : 99;
        const clamped = Math.min(maxStock, Math.max(1, Math.floor(quantity)));
        return { ...i, quantity: clamped };
      })
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totals = useMemo(() => {
    let itemCount = 0;
    let rawSubtotal = 0;
    let subtotal = 0;

    for (const item of items) {
      itemCount += item.quantity;
      const unitRaw = item.product.price;
      const unitDiscounted = calculateDiscountedPrice(item.product.price, item.product.discountPercentage);
      rawSubtotal += unitRaw * item.quantity;
      subtotal += unitDiscounted * item.quantity;
    }

    rawSubtotal = Math.round(rawSubtotal * 100) / 100;
    subtotal = Math.round(subtotal * 100) / 100;
    const discountTotal = Math.max(0, Math.round((rawSubtotal - subtotal) * 100) / 100);
    const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    const finalTotal = Math.round((subtotal + shipping) * 100) / 100;

    return {
      itemCount,
      rawSubtotal,
      discountTotal,
      subtotal,
      shipping,
      finalTotal,
    };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        ...totals,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
