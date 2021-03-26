import { IUser, TRol } from "../../models/user/user.model";

export type TPostUserBody = Omit<IUser, "_id" | "deleteAt" | "tokens">;
export type TPostUserResponse = { authToken: string };

export interface IGetUserBody {
  _id?: string;
  email?: string;
  rol?: TRol;
  name?: string;
  lastname?: string;
}

export interface IDeleteUserResponse {
  message: string;
}

export interface IUpdateUserResponse {
  message: string;
}

export type TUpdateBody = { [key in keyof Omit<IUser, "deleteAt" | "_id">]?: IUser[key] };
