import { ICategory } from "../interfaces/categorys";
import instance from "./intance";

const { accessToken } = JSON.parse(localStorage.getItem("user")!);
export const getAllCategory = () => {
  return instance.get("/categorys");
};
export const removeCategory = (id: string | number) => {
  return instance.delete(`/categorys/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
export const updateCategory = (categorys: ICategory) => {
  return instance.patch(`/categorys/${categorys.id}/update`, categorys, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
export const addCategory = (categorys: ICategory) => {
  return instance.post("/categorys/add", categorys, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
