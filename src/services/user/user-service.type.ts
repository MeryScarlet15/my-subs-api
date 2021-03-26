import { IUser } from "../../models/user/user.model";

export type TRegisterUserServiceParams = Omit<IUser, "_id" | "deleteAt" | "tokens">;

export interface ILoginUserServiceParams {
  email: string;
  password: string;
}
