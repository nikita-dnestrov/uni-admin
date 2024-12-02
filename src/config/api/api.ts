import axios from "axios";
import { TProduct } from "../../types/Product";
import {
  createBaseProduct,
  createProductColor,
  deleteProductById,
  getColor,
  getProductById,
  updateColor,
  updateProduct,
  updateSize,
  uploadImages,
} from "./products";

export const apiService = {
  products: {
    createBase: createBaseProduct,
    createColor: createProductColor,
    uploadImage: uploadImages,
    getProductById: getProductById,
    deleteProductById,
    updateColor,
    updateProduct,
    updateSize,
    getColor,
  },
};
