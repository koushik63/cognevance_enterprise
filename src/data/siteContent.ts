import type { DemoOrder, NexoraCategory } from '../types';

export interface CategoryMeta {
  name: NexoraCategory;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  iconName: 'Smartphone' | 'Laptop' | 'Headphones' | 'Watch' | 'Cpu' | 'Gamepad2';
}

export const CATEGORY_METADATA: CategoryMeta[] = [
  {
    name: 'Smartphones',
    slug: 'smartphones',
    tagline: 'Flagship Mobile Computing',
    description: 'High-refresh OLED displays, 5G modems, and computational optics engineered for mobile productivity.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    iconName: 'Smartphone',
  },
  {
    name: 'Laptops',
    slug: 'laptops',
    tagline: 'Precision Workstations',
    description: 'Ultra-thin aluminum chassis, high-bandwidth memory, and calibrated displays for engineering and creative teams.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    iconName: 'Laptop',
  },
  {
    name: 'Headphones',
    slug: 'headphones',
    tagline: 'Reference Acoustics',
    description: 'Adaptive active noise cancellation and lossless wireless audio for focused deep work.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    iconName: 'Headphones',
  },
  {
    name: 'Smartwatches',
    slug: 'smartwatches',
    tagline: 'Connected Telemetry',
    description: 'Sapphire-crystal wearables delivering continuous biometric insights and multi-day battery autonomy.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    iconName: 'Watch',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    tagline: 'Modular Connectivity',
    description: 'Thunderbolt hubs, GaN power delivery, and precision peripherals that complete your desk ecosystem.',
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80',
    iconName: 'Cpu',
  },
  {
    name: 'Gaming',
    slug: 'gaming',
    tagline: 'Low-Latency Hardware',
    description: 'High-polling wireless peripherals and mechanical keyboards tuned for competitive responsiveness.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    iconName: 'Gamepad2',
  },
];

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  contextNote: string;
}

export const ILLUSTRATIVE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'Standardizing our engineering laptops and Thunderbolt docking stations through NEXORA streamlined our onboarding hardware provisioning.',
    author: 'Elena Rostova',
    role: 'VP of Infrastructure (Illustrative Profile)',
    contextNote: 'Illustrative customer feedback',
  },
  {
    id: 't2',
    quote:
      'The acoustic isolation on the Aether ANC headphones and crisp display calibration on the ProBook lineup noticeably improved our hybrid studio workflow.',
    author: 'Marcus Vance',
    role: 'Principal Product Designer (Illustrative Profile)',
    contextNote: 'Illustrative customer feedback',
  },
  {
    id: 't3',
    quote:
      'Clean procurement documentation, transparent hardware specs, and responsive support make NEXORA our preferred electronics storefront.',
    author: 'Claire Sterling',
    role: 'Operations Lead (Illustrative Profile)',
    contextNote: 'Illustrative customer feedback',
  },
];

export const SEED_DEMO_ORDERS: DemoOrder[] = [
  {
    id: 'demo-ord-1',
    reference: 'NX-DEMO-84A2-K9',
    createdAt: '2026-11-18T14:22:00Z',
    customer: {
      fullName: 'Jordan Mercer (Demo)',
      email: 'j.mercer@example.com',
      phone: '+1 (555) 234-8910',
      address: '450 Innovation Way, Suite 400',
      city: 'Austin',
      state: 'TX',
      postalCode: '78701',
    },
    items: [],
    subtotal: 1709.1,
    discountTotal: 189.9,
    shipping: 0,
    total: 1709.1,
    paymentMethod: 'demo-card',
    status: 'Delivered',
    isDemo: true,
  },
  {
    id: 'demo-ord-2',
    reference: 'NX-DEMO-71B9-M4',
    createdAt: '2026-11-19T09:45:00Z',
    customer: {
      fullName: 'Sora Takahashi (Demo)',
      email: 'sora.t@example.com',
      phone: '+1 (555) 892-3104',
      address: '1200 Market Street',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94103',
    },
    items: [],
    subtotal: 602.52,
    discountTotal: 65.48,
    shipping: 0,
    total: 602.52,
    paymentMethod: 'demo-wire',
    status: 'Shipped',
    isDemo: true,
  },
  {
    id: 'demo-ord-3',
    reference: 'NX-DEMO-55C1-P2',
    createdAt: '2026-11-20T11:10:00Z',
    customer: {
      fullName: 'Alexei Novak (Demo)',
      email: 'a.novak@example.com',
      phone: '+1 (555) 419-7721',
      address: '780 Mercer Ave',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98109',
    },
    items: [],
    subtotal: 269.0,
    discountTotal: 0,
    shipping: 0,
    total: 269.0,
    paymentMethod: 'demo-wallet',
    status: 'Processing',
    isDemo: true,
  },
];
