import axios from "axios";
import { TProduct } from "../../types/Product";
import { createBaseProduct, createProductColor, deleteProductById, getProductById, uploadImages } from "./products";

export const apiService = {
  products: {
    createBase: createBaseProduct,
    createColor: createProductColor,
    uploadImage: uploadImages,
    getProductById: getProductById,
    deleteProductById,
  },
};
