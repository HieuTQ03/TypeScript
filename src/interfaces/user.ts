export interface IUser {
  _id?: number | string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
export interface IRegister {
  name: string;
  email: string;
  password: string | number;
  confirmPassword?: string | number;
}
