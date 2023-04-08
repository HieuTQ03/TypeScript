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
  return instance.put("/products/" + product.id, product);
};
export const addProduct = (product: IProduct) => {
  return instance.post("/products", product);
};
