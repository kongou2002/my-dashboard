type Image = {
  id: number;
  image: string;
  created_at: string;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  is_deleted: boolean;
};

type Product = {
  id: number;
  images: Image[];
  is_deleted: boolean;
  name: string;
  price: string;
  description: string;
  quantity: number;
  slug: string;
  created_at: string;
  is_active: boolean;
  category: Category;
};

type OrderDetail = {
  id: number;
  productId: Product;
  quantity: number;
  price: string;
  orderId: number;
};

type Account = {
  id: number;
  additional_info: string | null;
  user: number;
};

export type Order = {
  id: number;
  order_details: OrderDetail[];
  amount: string;
  status: string;
  description: string;
  content: string;
  notes: string;
  address: string | null;
  method: string;
  payment_url: string;
  redirect_url: string;
  order_uuid: string;
  accountId: Account;
};
