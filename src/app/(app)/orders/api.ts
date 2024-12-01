import { api } from "../../../lib/utils";

type Address = {
  id: string;
  city: string;
  street: string;
  userId: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: Address;
};

type Product = {
  id: string;
  name: string;
  brand: string;
  description: string;
  isArchived: boolean;
  material: string;
  gender: string;
  category: string;
};

type Color = {
  id: string;
  color: string;
  productId: string;
};

type Size = {
  id: string;
  size: number;
  stock: number;
  price: number;
  colorId: string;
};

type OrderDetail = {
  id: string;
  amount: number;
  productId: string;
  colorId: string;
  sizeId: string;
  orderId: string;
  product: Product;
  color: Color;
  size: Size;
};

type Order = {
  id: string;
  date: string;
  status: number;
  userId: string;
  user: User;
  orderDetails: OrderDetail[];
};

const getOrders = async (query: string) => (await api.get(`/orders/admin/all${query}`)).data;
const updateOrderStatus = async (orderId: string, status: number) =>
  (await api.put(`/orders/${orderId}`, { status })).data;

export const orderPageApiService = { getOrders, updateOrderStatus };
