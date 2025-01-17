import type { Product } from "../product-management/type";

export type Category = {
  id: number;
  products: Product[];
  is_deleted: boolean;
  name: string;
  slug: string;
};
