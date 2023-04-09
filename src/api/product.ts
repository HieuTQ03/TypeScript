import { IProduct } from "../interfaces/product";
import instance from "./intance";

const { accessToken } = JSON.parse(localStorage.getItem("user")!);
export const getProducts = () => {
  return instance.get("/products");
};
export const removeProduct = (id: string | number) => {
  return instance.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
export const updateProduct = (product: IProduct) => {
  return instance.patch(`/products/${product._id}/update`, product, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
export const addProduct = (product: IProduct) => {
  return instance.post("/products/add", product, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
