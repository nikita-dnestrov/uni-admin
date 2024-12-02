"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";
import { TProduct, TProductPayload } from "../../../types/Product";
import { productPageApiService } from "./api";
import { ChevronLeft, X } from "lucide-react";
import { ProductForm } from "./components/ProductForm";
import { useRouter } from "next/navigation";
import { BASE_IMAGE_URL } from "../../../config/api/products";

export default function Page() {
  const [items, setItems] = useState<TProduct[]>([]);
  const [search, setSearch] = useState("");

  const router = useRouter();

  const [isEditing, setIsEditing] = useState<{ open: boolean; type: null | "new" | "edit"; populationData: any }>({
    open: false,
    type: null,
    populationData: null,
  });

  useEffect(() => {
    (async () => {
      const data = await productPageApiService.getProducts();

      setItems(data.data);
    })();
  }, []);

  const handleSearch = useCallback(async () => {
    const data = await productPageApiService.getProducts(search);

    setItems(data.data);
  }, [search]);

  const onProductDelete = useCallback(() => {
    productPageApiService.deleteProduct(isEditing.populationData.id);
  }, [isEditing]);

  return (
    <>
      <div className="text-slate-700 font-bold text-2xl mb-4">Products</div>
      <div className="flex gap-10 justify-between">
        <Card className="w-full">
          <CardHeader className="px-7 flex justify-between flex-row">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>List of products</CardDescription>
            </div>
            <div className="flex gap-5">
              <Button onClick={() => router.push("/products/new")} variant="ghost">
                Create New
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
                  <TableHead>Image</TableHead>
                  <TableHead className="table-cell">Name</TableHead>
                  <TableHead className="table-cell">Average Price</TableHead>
                  <TableHead className="table-cell">Is Archived</TableHead>
                  <TableHead className="table-cell">Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length &&
                  items.map((el) => {
                    return (
                      <TableRow key={el.id} className="bg-accent">
                        <TableCell>
                          {el.colors.length && el.colors[0].images.length ? (
                            <img width={100} height={100} src={`${BASE_IMAGE_URL}${el.colors[0].images[0].url}`} />
                          ) : (
                            <div></div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{el.name}</div>
                        </TableCell>

                        <TableCell className="hidden sm:table-cell">
                          {el.colors.reduce((acc, el) => {
                            const value = el.sizes.reduce((acc2, el2) => {
                              return acc2 + el2.price;
                            }, 0);

                            return acc + value;
                          }, 0) /
                            el.colors.reduce((acc, el) => {
                              return acc + el.sizes.length;
                            }, 0)}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{el.isArchived ? "Yes" : "No"}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Button onClick={() => router.push(`/products/${el.id}`)} variant="outline">
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

        {isEditing.open ? (
          // <Card className="w-1/2 h-full">
          //   <CardHeader className="px-7 flex justify-between flex-row items-center">
          //     <CardTitle>{isEditing.type === "new" ? "Create New Product" : "Edit Product"}</CardTitle>
          //     <X onClick={() => handleEditingComponent(false, "new", null)} style={{ margin: 0 }} />
          //   </CardHeader>
          //   <CardContent className="flex flex-col gap-5">
          //     <Input
          //       value={editingForm.name}
          //       onChange={(e) => handleFormInput("name", e.target.value)}
          //       placeholder="Name"
          //     />
          //     <Input
          //       value={editingForm.description}
          //       onChange={(e) => handleFormInput("description", e.target.value)}
          //       placeholder="Description"
          //     />
          //     <Input
          //       value={editingForm.price}
          //       onChange={(e) => handleFormInput("price", e.target.value)}
          //       placeholder="Price"
          //     />
          //     <Input
          //       value={editingForm.stock}
          //       onChange={(e) => handleFormInput("stock", e.target.value)}
          //       placeholder="Stock"
          //     />
          //     <div className="flex items-center space-x-2">
          //       <Checkbox
          //         checked={editingForm.isArchived}
          //         onCheckedChange={(checked) => handleFormInput("isArchived", checked)}
          //         id="isArchived"
          //       />
          //       <Label htmlFor="isArchived">Archived?</Label>
          //     </div>
          //   </CardContent>
          //   <CardFooter className="flex justify-end gap-5 mt-auto">
          //     <Button onClick={onProductDelete} variant="destructive">
          //       Delete
          //     </Button>
          //     <Button onClick={isEditing.type === "new" ? onProductCreate : onProductUpdate} variant="default">
          //       {isEditing.type === "new" ? "Create" : "Update"}
          //     </Button>
          //   </CardFooter>
          // </Card>
          // <ProductForm
          //   onClose={() => handleEditingComponent(false, "new", null)}
          //   onFormSubmit={isEditing.type === "new" ? onProductCreate : onProductUpdate}
          //   onProductDelete={onProductDelete}
          //   submitButtonText={isEditing.type === "new" ? "Create" : "Update"}
          //   title={isEditing.type === "new" ? "Create New Product" : "Edit Product"}
          // />
          <></>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
