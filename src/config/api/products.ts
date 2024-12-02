import axios from "axios";
import { TProduct } from "../../types/Product";

export const BASE_URL = "http://34.75.95.89:5000/api";
export const BASE_IMAGE_URL = "http://34.75.95.89:5000";

const API_ENDPOINTS = {
  products: {
    updateProduct: (id: string) => `${BASE_URL}/products/${id}`,
    updateColor: (id: string) => `${BASE_URL}/products/color/${id}`,
    updateSize: (id: string) => `${BASE_URL}/products/size/${id}`,
    createBase: `${BASE_URL}/products/create-base`,
    createColor: `${BASE_URL}/products/create-color`,
    uploadImages: `${BASE_URL}/upload/images`,
    getProductById: (id: string) => `${BASE_URL}/products/${id}`,
    deleteProductById: (id: string) => `${BASE_URL}/products/${id}`,
  },
};

export const createBaseProduct = async (data: TProduct) => {
  const res = await axios.post(API_ENDPOINTS.products.createBase, data);
  return res.data;
};

export const createProductColor = async (data: any) => {
  const res = await axios.post(API_ENDPOINTS.products.createColor, data);
  return res.data;
};

export const updateProduct = async (id: string, data: any) => {
  const res = await axios.put(API_ENDPOINTS.products.updateProduct(id), data);
  return res.data;
};

export const updateSize = async (id: string, data: any) => {
  const res = await axios.put(API_ENDPOINTS.products.updateSize(id), data);
  return res.data;
};

export const updateColor = async (id: string, data: any) => {
  const res = await axios.put(API_ENDPOINTS.products.updateColor(id), data);
  return res.data;
};

export const getColor = async (id: string) => {
  const res = await axios.get(API_ENDPOINTS.products.updateColor(id));
  return res.data;
};

export const uploadImages = async (img: any) => {
  const res = await axios.post(API_ENDPOINTS.products.uploadImages, img, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await axios.get(API_ENDPOINTS.products.getProductById(id));
  return res.data;
};

export const deleteProductById = async (id: string) => {
  const res = await axios.delete(API_ENDPOINTS.products.deleteProductById(id));
  return res.data;
};
