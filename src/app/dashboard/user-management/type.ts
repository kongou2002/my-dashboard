export type User = {
  status: UserStatus;
  id: number;
  first_name: string;
  last_name: string;
  is_active: boolean;
  username: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  date_joined: string;
  is_staff: boolean;
};

type UserAccountDetail = {
  id: number;
  email: string;
  orders: unknown[]; // You need to know what type will be inside orders array
};

export type UserServer = {
  id: number;
  status: string;
  account_detail: UserAccountDetail;
  password: string;
  last_login: null | Date;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  created: string;
  updated: string;
  groups: unknown[];
  user_permissions: unknown[];
};

export type UserStatus = "active" | "inactive";
