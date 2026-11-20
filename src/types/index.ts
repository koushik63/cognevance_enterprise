export type NexoraCategory =
  | 'Smartphones'
  | 'Laptops'
  | 'Headphones'
  | 'Smartwatches'
  | 'Accessories'
  | 'Gaming';

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: NexoraCategory;
  rawCategory: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  sku: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  specs: ProductSpec[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFallback?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export type PaymentMethod = 'demo-card' | 'demo-wire' | 'demo-wallet';

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Pending Review';

export interface DemoOrder {
  id: string;
  reference: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  isDemo: true;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'discount-desc';

export interface ProductQueryParams {
  search?: string;
  category?: NexoraCategory | 'All';
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}
