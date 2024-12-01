export type TProduct = {
  id: string;
  name: string;
  colors: TColor[];
  description: string;
  isArchived: boolean;
  images: string[];
};

type TColor = {
  sizes: { size: number; stock: number; price: number }[];
  images: { url: string }[];
};

export type TProductPayload = Omit<TProduct, "id">;
