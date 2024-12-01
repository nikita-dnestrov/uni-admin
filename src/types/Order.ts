import { TProduct } from "./Product";
import { TUser } from "./User";

type TOrderDetails = { amount: number; productDetails: TProduct }[];

export type TOrder = {
  userInformation: TUser;
  orderDetails: TOrderDetails;
  status: number;
  date: number;
};
