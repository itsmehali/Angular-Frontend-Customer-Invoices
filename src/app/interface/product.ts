import { Category } from './category';

export interface Product {
  id: number;
  productName: string;
  description: string;
  country: string;
  createdAt: Date;
  category: Category;
}
