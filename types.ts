
export type Language = 'ru' | 'uz';

export interface Attribute {
  key: string;
  label: { ru: string; uz: string };
  value: string;
  isPrimary: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  date: string;
  isVerified: boolean;
  pros: string;
  cons: string;
  comment: string;
  photos?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: { ru: string; uz: string };
  category: string;
  description: { ru: string; uz: string };
  priceRetail: number;
  priceWholesale: number;
  wholesaleMinQty: number;
  image: string;
  sellerId: string;
  rating: number;
  totalReviews: number;
  soldLastMonth: number;
  stock: number;
  attributes: Attribute[];
  isFavorite?: boolean; // Новое поле
}

export interface CartItem extends Product {
  quantity: number;
  isWholesale: boolean;
}

export interface SchemaTable {
  name: string;
  description: string;
  columns: {
    name: string;
    type: string;
    key?: 'PK' | 'FK';
    description: string;
  }[];
}
