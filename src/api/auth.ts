import instance from "./intance";
import { IUser } from "../interfaces/user";
export const login = (user: IUser) => {
  return instance.post("/signin", user);
};
export const signup = (user: IUser) => {
  return instance.post("/signup", user);
};
