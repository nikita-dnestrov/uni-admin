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
