"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";

import { adminPageApiService } from "./api";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Page() {
  const [users, setUsers] = useState<any[]>([]);

  const [isEditing, setIsEditing] = useState<{
    open: boolean;
    populationData: any;
  }>({
    open: false,
    populationData: null,
  });

  const [search, setSearch] = useState("");

  const [isCreating, setIsCreating] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");
  const [passwordInputConfirm, setPasswordInputConfirm] = useState("");

  const [passwordEdit, setPasswordEdit] = useState(false);

  type Inputs = {
    email: string;
    password: string;
    passwordConfirm: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(async (data) => {
    await adminPageApiService.createAdmin({ email: data.email, password: data.password });
    setIsCreating(false);
    reset();
    const queryObj: any = { limit: 999, page: 1 };

    //@ts-ignore
    const query = new URLSearchParams(queryObj);
    const adminsData = await adminPageApiService.getAdmins(`?${query.toString()}`);

    setUsers(adminsData.admins);
  }, []);

  useEffect(() => {
    (async () => {
      const queryObj: any = { limit: 10, page: 1 };

      //@ts-ignore
      const query = new URLSearchParams(queryObj);
      const data = await adminPageApiService.getAdmins(`?${query.toString()}`);

      setUsers(data.admins);
    })();
  }, []);

  const handleEditingComponent = (open: boolean, populationData: null | any) => {
    setIsEditing({ open, populationData });
  };

  const handleUpdatePassword = useCallback(async () => {
    await adminPageApiService.updateAdminPassword(isEditing.populationData.id, passwordInput);
    setPasswordInput("");
    setPasswordInputConfirm("");
    setIsEditing({ open: false, populationData: null });
  }, [passwordInput, isEditing]);

  const handleSearch = useCallback(async () => {
    const queryObj: any = { limit: 10, page: 1, search };

    //@ts-ignore
    const query = new URLSearchParams(queryObj);
    const data = await adminPageApiService.getAdmins(`?${query.toString()}`);

    setUsers(data.admins);
  }, [search]);

  return (
    <>
      <div className="text-slate-700 font-bold text-2xl mb-4">Orders</div>
      <div className="flex gap-10 justify-between">
        <Card className="w-full">
          <CardHeader className="px-7 flex justify-between flex-row">
            <div>
              <CardTitle>Admins</CardTitle>
              <CardDescription>List of admins</CardDescription>
            </div>
            <div className="flex gap-5">
              <Button disabled={isEditing.open} onClick={() => setIsCreating(true)} variant="outline">
                Create new
              </Button>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={handleSearch} variant="outline">
                Search
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="table-cell">Email</TableHead>
                  <TableHead className="table-cell">Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((el) => {
                  return (
                    <TableRow className="bg-accent">
                      <TableCell className="hidden sm:table-cell">
                        <div className="font-medium">{el.email}</div>
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <Button
                          disabled={isCreating}
                          onClick={() => handleEditingComponent(true, el)}
                          variant="outline"
                        >
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
              <CardTitle className="flex flex-col gap-5">
                <div>User Details</div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={passwordEdit}
                    onCheckedChange={() => setPasswordEdit((prev) => !prev)}
                    id="airplane-mode"
                  />
                  <Label htmlFor="airplane-mode">Enable password edit</Label>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex justify-between">
                <div>Email</div>
                <div>{isEditing.populationData.email}</div>
              </div>
              {passwordEdit && (
                <div className="flex flex-col gap-2">
                  <div>
                    <Label>Password</Label>
                    <Input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                  </div>
                  <div>
                    <Label>Password confirm</Label>
                    <Input
                      type="password"
                      value={passwordInputConfirm}
                      onChange={(e) => setPasswordInputConfirm(e.target.value)}
                    />
                  </div>
                  {passwordInput !== passwordInputConfirm && <div className="text-red-600">Passwords should match</div>}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-5 mt-auto">
              <Button onClick={() => handleEditingComponent(false, null)}>Close</Button>

              <Button disabled={!passwordEdit && passwordInput !== passwordInputConfirm} onClick={handleUpdatePassword}>
                Update
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <></>
        )}

        {isCreating ? (
          <Card className="w-1/2 h-full">
            <CardHeader className="px-7 flex justify-between flex-row">
              <CardTitle>Admin Details</CardTitle>
            </CardHeader>{" "}
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 flex-col items-center w-full">
              <CardContent className="flex flex-col gap-5 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <div>
                    <Label htmlFor="email">Email {errors.email && <span className="text-red-500">*</span>}</Label>
                    <Input {...register("email", { required: true })} />
                  </div>
                  <div>
                    <Label htmlFor="password">
                      Password {errors.password && <span className="text-red-500">*</span>}
                    </Label>
                    <Input type="password" {...register("password", { required: true })} />
                  </div>
                  <div>
                    <Label htmlFor="passwordConfirm">
                      Password confirmation {errors.passwordConfirm && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      type="password"
                      {...register("passwordConfirm", {
                        required: true,
                        validate: (value) => value === watch("password") || "Passwords do not match",
                      })}
                    />
                    {errors.passwordConfirm && <span className="text-red-500">{errors.passwordConfirm.message}</span>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-5 mt-auto w-full">
                <Button type="button" onClick={() => setIsCreating(false)}>
                  Close
                </Button>

                <Button type="submit">Create</Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
