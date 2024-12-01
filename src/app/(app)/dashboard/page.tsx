"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import { Progress } from "../../../components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { TOrder } from "../../../types/Order";

export default function Page() {
  const chartData = [
    { month: "January", users: 186, revenue: 80 },
    { month: "February", users: 305, revenue: 200 },
    { month: "March", users: 237, revenue: 120 },
    { month: "April", users: 73, revenue: 190 },
    { month: "May", users: 209, revenue: 130 },
    { month: "June", users: 214, revenue: 140 },
  ];

  const chartConfig = {
    users: {
      label: "Users",
      color: "#2563eb",
    },
    revenue: {
      label: "Revenue",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  const orders: TOrder[] = [
    {
      userInformation: {
        id: "",
        name: "Olha Ivanenko",
        email: "olhaivanenko@test.ua",
        phoneNumber: "380631234567",
        address: { city: "Kyiv", street: "Khreshchatyk 1" },
      },
      product: { name: "Item A", price: 500, description: "", isArchived: false, stock: 0, id: "" },
      status: 1,
      date: 1729617616000,
    },
    {
      userInformation: {
        id: "",
        name: "Andriy Petrenko",
        email: "andriypetrenko@test.ua",
        phoneNumber: "380679876543",
        address: { city: "Lviv", street: "Shevchenka 22" },
      },
      product: { name: "Item B", price: 1200, description: "", isArchived: false, stock: 0, id: "" },
      status: 2,
      date: 1729518616000,
    },
    {
      userInformation: {
        id: "",
        name: "Tetiana Hryshchenko",
        email: "tetianah@test.ua",
        phoneNumber: "380507654321",
        address: { city: "Odesa", street: "Deribasivska 5" },
      },
      product: { name: "Item C", price: 750, description: "", isArchived: false, stock: 0, id: "" },
      status: 0,
      date: 1729218616000,
    },
    {
      userInformation: {
        id: "",
        name: "Volodymyr Koval",
        email: "volodymyrkoval@test.ua",
        phoneNumber: "380980112233",
        address: { city: "Dnipro", street: "Gagarina 15" },
      },
      product: { name: "Item D", price: 1100, description: "", isArchived: false, stock: 0, id: "" },
      status: 1,
      date: 1729318616000,
    },
    {
      userInformation: {
        id: "",
        name: "Natalia Bondar",
        email: "natalia.bondar@test.ua",
        phoneNumber: "380668899223",
        address: { city: "Kharkiv", street: "Sumska 33" },
      },
      product: { name: "Item E", price: 450, description: "", isArchived: false, stock: 0, id: "" },
      status: -1,
      date: 1729418616000,
    },
  ];

  const statusMap = (
    status: number
  ): { text: string; variant: "default" | "secondary" | "outline" | "destructive" } => {
    switch (status) {
      case 0:
        return { text: "New", variant: "default" };
      case 1:
        return { text: "Processing", variant: "secondary" };
      case 2:
        return { text: "Finished", variant: "outline" };
      case -1:
        return { text: "Canceled", variant: "destructive" };
      default:
        return { text: "Undefined", variant: "destructive" };
    }
  };

  return (
    <>
      <div className="text-slate-700 font-bold text-2xl mb-4">Dashboard</div>
      <div className="flex gap-10 justify-between">
        <div className="w-full flex flex-col gap-5">
          <div className="flex gap-5">
            <Card className="w-full">
              <CardHeader className="pb-2">
                <CardDescription>Overall revenue</CardDescription>
                <CardTitle className="text-4xl">$1,329</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">+25% from last week</div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>

            <Card className="w-full">
              <CardHeader className="pb-2">
                <CardDescription>Overall users</CardDescription>
                <CardTitle className="text-4xl">329</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">+25% from last week</div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
          </div>

          <Card className="w-full">
            <CardHeader className="pb-2">
              <CardDescription>Monthly chart</CardDescription>
              <CardTitle className="text-2xl">Users and Revenue per month</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[200px] ">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="users" fill="var(--color-users)" radius={4} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="w-full">
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Item</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((el) => {
                  return (
                    <TableRow className="bg-accent">
                      <TableCell>
                        <div className="font-medium">{el.userInformation.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">{el.userInformation.email}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{el.product.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant={statusMap(el.status).variant}>
                          {statusMap(el.status).text}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
