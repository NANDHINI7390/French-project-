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
