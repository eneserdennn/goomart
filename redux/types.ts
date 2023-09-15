export interface ProductType {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface SubCategory {
  id: number;
  name: string;
  description: string;
  image: string;
  ProductType: ProductType[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  SubCategory: SubCategory[];
}

export type Categories = Category[];
