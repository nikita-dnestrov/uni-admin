"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";
import { TOrder } from "../../../types/Order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "../../../lib/utils";
import { Separator } from "../../../components/ui/separator";
import { orderPageApiService } from "./api";
import dayjs from "dayjs";

type TForm = {
  name: string;
  price: number;
  stock: number;
  description: string;
  isArchived: boolean;
};

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

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [isEditing, setIsEditing] = useState<{
    open: boolean;
    populationData: null | Order;
  }>({
    open: false,
    populationData: null,
  });

  const [statusFilter, setStatusFilter] = useState(null);

  const [editingForm, setEditingForm] = useState<TForm>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    isArchived: false,
  });

  useEffect(() => {
    (async () => {
      const queryObj: any = { limit: 10, page: 1 };

      if (statusFilter) {
        queryObj.status = statusFilter;
      }
      //@ts-ignore
      const query = new URLSearchParams(queryObj);
      const data = await orderPageApiService.getOrders(`?${query.toString()}`);

      setOrders(data.orders);
    })();
  }, []);

  useEffect(() => {}, [isEditing]);

  const handleFormInput = (name: keyof TForm, value: number | string | boolean) => {
    setEditingForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleEditingComponent = (open: boolean, populationData: null | any) => {
    setIsEditing({ open, populationData });
  };

  const handleOrderStatusUpdateState = useCallback((orderStatus: number) => {
    //@ts-ignore
    setIsEditing((prev) => ({ ...prev, populationData: { ...prev.populationData, status: orderStatus } }));
  }, []);

  const handleOrderStatusUpdate = useCallback(async () => {
    await orderPageApiService.updateOrderStatus(isEditing.populationData?.id!, isEditing.populationData?.status!);
    (async () => {
      const queryObj: any = { limit: 999, page: 1 };

      if (statusFilter) {
        queryObj.status = statusFilter;
      }
      //@ts-ignore
      const query = new URLSearchParams(queryObj);
      const data = await orderPageApiService.getOrders(`?${query.toString()}`);

      setOrders(data.orders);
    })();
    setIsEditing({ open: false, populationData: null });
  }, [isEditing]);

  const statuses = [
    { label: "Canceled", color: "bg-red-500", id: -1 },
    { label: "Open", color: "bg-blue-500", id: 0 },
    { label: "In Work", color: "bg-gray-500", id: 1 },
    { label: "Finished", color: "bg-green-500", id: 2 },
  ];

  return (
    <>
      <div className="text-slate-700 font-bold text-2xl mb-4">Orders</div>
      <div className="flex gap-10 justify-between">
        <Card className="w-full">
          <CardHeader className="px-7 flex justify-between flex-row">
            <div>
              <CardTitle>Orders</CardTitle>
              <CardDescription>List of orders</CardDescription>
            </div>
            <div className="flex gap-5">
              <Input />
              <Button variant="outline">Search</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead className="table-cell">Price</TableHead>
                  <TableHead className="table-cell">Status</TableHead>
                  <TableHead className="table-cell">Date</TableHead>
                  <TableHead className="table-cell">Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((el) => {
                  return (
                    <TableRow className="bg-accent">
                      <TableCell>
                        <div className="font-medium">{el.user.email}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {el.orderDetails.reduce((acc, el) => acc + el.size.price * el.amount, 0)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {statuses.find((fnd) => fnd.id === el.status)?.label}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{dayjs(el.date).format("DD-MM-YYYY")}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Button onClick={() => handleEditingComponent(true, el)} variant="outline">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {isEditing.open && isEditing.populationData ? (
          <Card className="w-1/2 h-full">
            <CardHeader className="px-7 flex justify-between flex-row">
              <div>
                <CardTitle>Review Order</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="font-bold">Shipping Information</div>
              <div className="flex justify-between">
                <div>Customer</div>
                <div>{isEditing.populationData.user.name}</div>
              </div>
              <div className="flex justify-between">
                <div>City</div>
                <div>{isEditing.populationData.user.address.city}</div>
              </div>
              <div className="flex justify-between">
                <div>Street</div>
                <div>{isEditing.populationData.user.address.street}</div>
              </div>
              <div className="flex justify-between">
                <div>Email</div>
                <div>{isEditing.populationData.user.email}</div>
              </div>
              <div className="flex justify-between">
                <div>Phone Number</div>
                <div>{isEditing.populationData.user.phoneNumber}</div>
              </div>

              <Separator className="my-4" />

              <div className="font-bold">Order Status</div>
              <div className="flex rounded-lg overflow-hidden">
                {statuses.map((status) => (
                  <div
                    key={status.id}
                    onClick={() => handleOrderStatusUpdateState(status.id)}
                    className={cn(
                      "flex-1 text-center py-2 font-bold text-white cursor-pointer transition-opacity",
                      isEditing.populationData?.status === status.id ? status.color : "bg-gray-300"
                    )}
                  >
                    {status.label}
                  </div>
                ))}
              </div>

              <Separator className="my-4" />
              <div className="font-bold">Order Details</div>
              {isEditing.populationData.orderDetails.map((el) => {
                return (
                  <div className="flex justify-between">
                    <div>
                      {el.product.name} x {el.amount}
                    </div>
                    <div>{el.amount * el.size.price}$</div>
                  </div>
                );
              })}
              <Separator className="my-4" />

              <div className="flex justify-between font-bold">
                <div>Total: </div>

                <div>
                  {isEditing.populationData.orderDetails.reduce((acc, el) => {
                    return acc + el.amount * el.size.price;
                  }, 0)}
                  $
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-5 mt-auto">
              <Button onClick={() => handleEditingComponent(false, null)} variant="destructive">
                Cancel
              </Button>
              <Button onClick={handleOrderStatusUpdate} type="button" variant="default">
                Submit
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
