"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "../components/ProductForm";
import { apiService } from "../../../../config/api/api";
import { useCallback, useEffect } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const router = useRouter();

  const onFormSubmit = useCallback(async (data: any) => {
    const { colors, images, ...base } = data;
    console.log(images);

    const { id: productId } = await apiService.products.createBase(base);

    await Promise.all(
      colors.map(async (el: any) => {
        const { id, sizes, ...rest } = el;

        const imagesForColor = images[id];

        const formData = new FormData();
        imagesForColor.forEach((el: any) => {
          formData.append("file", el.file);
        });

        const { urls } = await apiService.products.uploadImage(formData);

        const sizesMapped = sizes.map((el: any) => {
          const { _, size, price } = el;
          return { stock: 0, size: parseFloat(size), price: parseFloat(price) };
        });
        return await apiService.products.createColor({ ...rest, images: urls, sizes: sizesMapped, productId });
      })
    );
  }, []);

  const onProductUpdate = useCallback(async (data: any) => {
    const { colors, images, ...base } = data;

    const productId = slug;

    await Promise.all(
      colors.map(async (el: any) => {
        const { id, sizes, ...rest } = el;

        const imagesForColor = images[id];

        const formData = new FormData();
        imagesForColor.forEach((el: any) => {
          formData.append("file", el.file);
        });

        const { urls } = await apiService.products.uploadImage(formData);

        const sizesMapped = sizes.map((el: any) => {
          const { id, colorId, size, price } = el;
          return { id, colorId, stock: 0, size: parseFloat(size), price: parseFloat(price) };
        });

        const checkColor = await apiService.products.getColor(id);

        if (!checkColor) {
          const { urls } = await apiService.products.uploadImage(formData);

          const sizesMapped = sizes.map((el: any) => {
            const { _, size, price } = el;
            return { stock: 0, size: parseFloat(size), price: parseFloat(price) };
          });
          return await apiService.products.createColor({ ...rest, images: urls, sizes: sizesMapped, productId });
        } else {
          await Promise.all(
            sizesMapped.map(async (el: any) => {
              return await apiService.products.updateSize(el.id, el);
            })
          );

          return await apiService.products.updateColor(id, { ...rest, productId, images: urls });
        }
      })
    );
    return await apiService.products.updateProduct(productId, base);
  }, []);

  const onProductDelete = useCallback(async (id: string) => {
    await apiService.products.deleteProductById(id);
    router.back();
  }, []);

  return (
    <div>
      <ProductForm
        showDeleteButton={slug === "new" ? false : true}
        onClose={() => router.push("/products")}
        onProductSubmit={slug === "new" ? onFormSubmit : onProductUpdate}
        onProductDelete={onProductDelete}
        submitButtonText={slug === "new" ? "Create" : "Update"}
        title={slug === "new" ? "Create New Product" : "Edit Product"}
        slug={slug}
      />
    </div>
  );
}
