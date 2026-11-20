import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { SEED_DEMO_ORDERS } from '../data/siteContent';
import type { CartItem, CustomerDetails, DemoOrder, OrderStatus, PaymentMethod } from '../types';
import { generateDemoOrderReference } from '../utils/formatters';

const ORDERS_STORAGE_KEY = 'nexora_demo_orders_v1';

interface CreateOrderInput {
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
}

interface OrderContextValue {
  orders: DemoOrder[];
  lastOrder: DemoOrder | null;
  createDemoOrder: (input: CreateOrderInput) => DemoOrder;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderByReference: (reference: string) => DemoOrder | undefined;
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

function loadInitialOrders(): DemoOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return SEED_DEMO_ORDERS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_DEMO_ORDERS;
    return parsed as DemoOrder[];
  } catch {
    return SEED_DEMO_ORDERS;
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<DemoOrder[]>(loadInitialOrders);
  const [lastOrder, setLastOrder] = useState<DemoOrder | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  const createDemoOrder = useCallback((input: CreateOrderInput): DemoOrder => {
    const newOrder: DemoOrder = {
      id: `demo-ord-${Date.now()}`,
      reference: generateDemoOrderReference(),
      createdAt: new Date().toISOString(),
      customer: input.customer,
      items: input.items,
      subtotal: input.subtotal,
      discountTotal: input.discountTotal,
      shipping: input.shipping,
      total: input.total,
      paymentMethod: input.paymentMethod,
      status: 'Processing',
      isDemo: true,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  }, []);

  const getOrderByReference = useCallback(
    (reference: string) => orders.find((o) => o.reference === reference),
    [orders]
  );

  return (
    <OrderContext.Provider
      value={{ orders, lastOrder, createDemoOrder, updateOrderStatus, getOrderByReference }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within an OrderProvider');
  return ctx;
}
