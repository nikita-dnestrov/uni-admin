"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";

import { userPageApiService } from "./api";

type TForm = {
  name: string;
  price: number;
  stock: number;
  description: string;
  isArchived: boolean;
};

export default function Page() {
  const [users, setUsers] = useState<any[]>([]);

  const [isEditing, setIsEditing] = useState<{
    open: boolean;
    populationData: any;
  }>({
    open: false,
    populationData: null,
  });

  useEffect(() => {
    (async () => {
      const queryObj: any = { limit: 10, page: 1 };

      //@ts-ignore
      const query = new URLSearchParams(queryObj);
      const data = await userPageApiService.getUsers(`?${query.toString()}`);

      setUsers(data.users);
    })();
  }, []);

  const statuses = [
    { label: "Canceled", color: "bg-red-500", id: -1 },
    { label: "Open", color: "bg-blue-500", id: 0 },
    { label: "In Work", color: "bg-gray-500", id: 1 },
    { label: "Finished", color: "bg-green-500", id: 2 },
  ];

  const handleEditingComponent = (open: boolean, populationData: null | any) => {
    setIsEditing({ open, populationData });
  };

  return (
    <>
      <div className="text-slate-700 font-bold text-2xl mb-4">Orders</div>
      <div className="flex gap-10 justify-between">
        <Card className="w-full">
          <CardHeader className="px-7 flex justify-between flex-row">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>List of users</CardDescription>
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
                  <TableHead>Name</TableHead>
                  <TableHead className="table-cell">Email</TableHead>
                  <TableHead className="table-cell">Phone number</TableHead>
                  <TableHead className="table-cell">Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((el) => {
                  return (
                    <TableRow className="bg-accent">
                      <TableCell>
                        <div className="font-medium">{el.name}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="font-medium">{el.email}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="font-medium">{el.phoneNumber}</div>
                      </TableCell>
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
                <CardTitle>User Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex justify-between">
                <div>Customer</div>
                <div>{isEditing.populationData.name}</div>
              </div>
              <div className="flex justify-between">
                <div>City</div>
                <div>{isEditing.populationData.address.city}</div>
              </div>
              <div className="flex justify-between">
                <div>Street</div>
                <div>{isEditing.populationData.address.street}</div>
              </div>
              <div className="flex justify-between">
                <div>Email</div>
                <div>{isEditing.populationData.email}</div>
              </div>
              <div className="flex justify-between">
                <div>Phone Number</div>
                <div>{isEditing.populationData.phoneNumber}</div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-5 mt-auto">
              <Button onClick={() => handleEditingComponent(false, null)}>Close</Button>
            </CardFooter>
          </Card>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
