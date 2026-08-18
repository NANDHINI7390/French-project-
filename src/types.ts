export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  unit: string;
  unitPriceComparison?: string;
  image: string;
  origin?: string;
  badge?: string;
  isTodayMarket?: boolean;
  description: string;
  inStock: boolean;
  storeAvailability: {
    goussainville: boolean;
    sarcelles: boolean;
  };
  tags?: string[];
  nutriScore?: 'A' | 'B' | 'C' | 'D' | 'E';
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  titleLight: string;
  titleAccent: string;
  subtitle: string;
  ctaText: string;
  badgeText: string;
  badgeHighlight: string;
  image: string;
  categorySlug?: string;
}

export type StoreId = 'goussainville' | 'sarcelles';

export type PageType =
  | 'home'
  | 'all-categories'
  | 'category'
  | 'product-detail'
  | 'search'
  | 'search-results'
  | 'promotions'
  | 'stores'
  | 'checkout'
  | 'order-confirmation'
  | 'account'
  | 'orders'
  | 'about'
  | 'contact'
  | 'help';

export type DeliveryMethod = 'delivery' | 'collect';

export interface TimeSlot {
  id: string;
  day: string;
  date: string;
  timeRange: string;
  available: boolean;
  isRushHour?: boolean;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  postalCode: string;
  city: string;
  instructions?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'en_preparation' | 'expediee' | 'livree' | 'prete_retrait' | 'annulee';
  deliveryMethod: DeliveryMethod;
  store: StoreId;
  timeSlot: string;
  customer: CustomerInfo;
  paymentMethod: string;
}

export interface StoreInfo {
  id: StoreId;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  hours: string;
  status: string;
  image: string;
  distance?: string;
}

