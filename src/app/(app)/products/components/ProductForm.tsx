"use client";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { X } from "lucide-react";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { BRANDS, CATEGORIES, GENDERS, MATERIALS } from "../../../../lib/const";
import { ProductFormColor } from "./ProductFormColor";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { apiService } from "../../../../config/api/api";
import { BASE_URL } from "../../../../config/api/products";

type TProps = {
  onClose: () => void;
  title: string;
  onProductDelete: (id: string) => void;
  onProductSubmit: (data: any) => void;
  submitButtonText: string;
  showDeleteButton: boolean;
  slug: string;
};

export function ProductForm({
  onClose,
  title,
  onProductDelete,
  onProductSubmit,
  submitButtonText,
  showDeleteButton,
  slug,
}: TProps) {
  type Inputs = {
    name: string;
    description: string;
    brand: string;
    isArchived: boolean;
    material: string;
    gender: string;
    category: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({ defaultValues: { isArchived: false } });

  const [colors, setColors] = useState<{ color: string; id: string; sizes: any[] }[]>([]);
  const [images, setImages] = useState<any>({});

  useEffect(() => {
    colors.forEach((el) => {
      setImages((prev: any) => {
        if (!prev[el.id]) {
          return { ...prev, [el.id]: [] };
        } else {
          return prev;
        }
      });
    });
  }, [colors]);

  useEffect(() => {
    if (slug !== "new") {
      (async () => {
        const data = await apiService.products.getProductById(slug);

        setValue("name", data.name);
        setValue("description", data.description);
        setValue("brand", data.brand);
        setValue("category", data.category);
        setValue("gender", data.gender);
        setValue("isArchived", data.isArchived);
        setValue("material", data.material);

        setColors(data.colors);

        const images: any = {};

        data.colors.forEach((el: any) => {
          images[el.id] = el.images.map((el: any) => {
            return { file: null, preview: `http://34.75.95.89:5000${el.url}` };
          });
        });

        setImages(images);
      })();
    }
  }, [slug]);

  const addImages = (colorId: string, imageData: { file: File; preview: string }[]) => {
    setImages((prev: any) => {
      return { ...prev, [colorId]: imageData };
    });
  };

  const removeImage = (colorId: string, index: number) => {
    setImages((prev: any) => {
      return { ...prev, [colorId]: prev[colorId].filter((_: any, i: number) => i !== index) };
    });
  };

  const handleColorNameUpdate = (colorId: string, value: string) => {
    setColors((prev) => prev.map((color) => (color.id === colorId ? { ...color, color: value } : color)));
  };

  const addColor = () => {
    setColors((prev) => {
      return [...prev, { color: "", id: uuidv4(), sizes: [] }];
    });
  };

  const removeColor = (colorId: string) => {
    setColors((prev) => prev.filter((el) => el.id !== colorId));
  };

  const addSize = (colorId: string) => {
    setColors((prev) =>
      prev.map((color) =>
        color.id === colorId
          ? {
              ...color,
              sizes: [...color.sizes, { price: "", stock: "", size: "", id: uuidv4() }],
            }
          : color
      )
    );
  };

  const removeSize = (colorId: string, sizeId: string) => {
    setColors((prev) =>
      prev.map((color) =>
        color.id === colorId
          ? {
              ...color,
              sizes: color.sizes.filter((size) => size.id !== sizeId),
            }
          : color
      )
    );
  };

  const handleSizeValueUpdate = (colorId: string, sizeId: string, field: string, value: string) => {
    setColors((prev) =>
      prev.map((color) =>
        color.id === colorId
          ? {
              ...color,
              sizes: color.sizes.map((size) => (size.id === sizeId ? { ...size, [field]: value } : size)),
            }
          : color
      )
    );
  };

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      onProductSubmit({ ...data, colors, images });
    },

    [images, colors]
  );

  return (
    <Card className="w-full h-full">
      <CardHeader className="px-7 flex justify-between flex-row items-center">
        <CardTitle>{title}</CardTitle>
        <X onClick={onClose} style={{ margin: 0 }} />
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <CardContent>
          <div className="flex gap-20">
            <div className="flex flex-col gap-5 w-1/2">
              <div>
                <Label htmlFor="name">Name {errors.name && <span className="text-red-500">*</span>}</Label>
                <Input {...register("name", { required: true })} />
              </div>
              <div>
                <Label htmlFor="description">
                  Description {errors.description && <span className="text-red-500">*</span>}
                </Label>
                <Input {...register("description", { required: true })} />
              </div>

              <div>
                <Label htmlFor="brand">Brand {errors.brand && <span className="text-red-500">*</span>}</Label>
                <Controller
                  name="brand"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          {BRANDS.map((el) => {
                            return (
                              <SelectItem key={el.value} value={el.value}>
                                {el.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>

              <div>
                <Label htmlFor="material">Material {errors.material && <span className="text-red-500">*</span>}</Label>
                <Controller
                  name="material"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          {MATERIALS.map((el) => {
                            return (
                              <SelectItem key={el.value} value={el.value}>
                                {el.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender {errors.gender && <span className="text-red-500">*</span>}</Label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          {GENDERS.map((el) => {
                            return (
                              <SelectItem key={el.value} value={el.value}>
                                {el.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>

              <div>
                <Label htmlFor="category">Category {errors.category && <span className="text-red-500">*</span>}</Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((el) => {
                            return (
                              <SelectItem key={el.value} value={el.value}>
                                {el.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Controller
                  name="isArchived"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} id="isArchived" />
                  )}
                />
                <Label htmlFor="isArchived">Archived?</Label>
                <Label htmlFor="material">
                  {errors.isArchived && <span className="text-red-500">errors.isArchived</span>}
                </Label>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-5">
              <Button type="button" onClick={addColor} variant="outline">
                Add Color
              </Button>
              {colors.map((el, i) => {
                return (
                  <ProductFormColor
                    key={el.id}
                    colorId={el.id}
                    onAddSize={() => addSize(el.id)}
                    onColorRemove={() => removeColor(el.id)}
                    onColorNameUpdate={(value: string) => handleColorNameUpdate(el.id, value)}
                    onSizeValueUpdate={(sizeId: string, field: string, value: string) =>
                      handleSizeValueUpdate(el.id, sizeId, field, value)
                    }
                    onSizeRemove={(sizeId: string) => removeSize(el.id, sizeId)}
                    colorForm={colors.find((clr) => clr.id === el.id)}
                    imagesPreview={images[el.id]}
                    onImageAdd={(images: { file: File; preview: string }[]) => addImages(el.id, images)}
                    index={i}
                  />
                );
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-5 mt-auto">
          {showDeleteButton ? (
            <Button onClick={() => onProductDelete(slug)} variant="destructive">
              Delete
            </Button>
          ) : (
            ""
          )}

          <Button type="submit" variant="default">
            {submitButtonText}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
