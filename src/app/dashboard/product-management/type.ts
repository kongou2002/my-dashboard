export type Product = {
  id: number;
  name: string;
  price: string; // Keeping it as string, since it's passed as string in the example
  quantity: number;
  slug: string;
  description?: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  images: { image: string }[]; // Array of image objects, assuming it's an array of URLs
  category: {
    id: number;
    name: string;
    slug: string;
    is_deleted: boolean;
  };
};
