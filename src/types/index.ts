export type ProductCategory = 'bolos' | 'brigadeiros' | 'finos' | 'pote' | 'especiais';

export type ProductUnit = 'un' | 'caixa' | 'kg' | 'fatia';

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  unit: ProductUnit;
  unitLabel?: string;
  imageUrl: string;
  imageAlt?: string;
  additionalImages?: string[];
  isOnline: boolean;
  badge?: 'top1' | 'baixo' | 'limitada' | null;
  isInstantDelivery: boolean;
  isMadeToOrder: boolean;
  prepTime: string;
  tags: string[];
  isDraft?: boolean;
  salesToday?: number;
  createdAt?: string;
}

export type ActiveTab = 'produtos' | 'cadastrar' | 'estoque' | 'perfil';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  type: 'stock' | 'order' | 'info';
}
