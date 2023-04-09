import instance from "./intance";
import { IRegister, IUser } from "../interfaces/user";
export const login = (user: IUser) => {
  return instance.post("/signin", user);
};
export const signup = (user: IRegister) => {
  return instance.post("/signup", user);
};
