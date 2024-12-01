export type TOrder = {
  userInformation: TUser;
  product: TProduct;
  status: number;
  date: number;
};

export type TAddress = {
  city: string;
  street: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: TAddress;
};

export type TProduct = {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  isArchived: boolean;
};
