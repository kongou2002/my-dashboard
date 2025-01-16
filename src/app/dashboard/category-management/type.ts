import type { Product } from "../product-management/type";

export type Category = {
  id: number;
  products: Product[];
  is_delete: boolean;
  name: string;
  slug: string;
};
