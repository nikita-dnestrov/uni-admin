import { api } from "../../../lib/utils";
import { TProduct, TProductPayload } from "../../../types/Product";

const getProducts = async (search = "") => (await api.get(`/products/admin/all?search=${search}`)).data;
const createProduct = async (data: TProductPayload) => (await api.post("/products/admin", data)).data;
const updateProduct = async (id: string, data: TProductPayload) => (await api.put("/products/admin/" + id, data)).data;
const deleteProduct = async (id: string) => (await api.delete("/products/admin/" + id)).data;

export const productPageApiService = { getProducts, createProduct, updateProduct, deleteProduct };
