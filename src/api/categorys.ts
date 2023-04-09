import instance from "./intance";

export const getAllCategory = () => {
  return instance.get("/categorys");
};
