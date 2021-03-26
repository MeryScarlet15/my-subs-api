import { IUser } from "../../../models/user/user.model";

export type TRegisterUserConnectorParams = Omit<IUser, "_id" | "deleteAt" | "tokens">;

export type TFilterUserConnector = { [key in keyof Omit<IUser, "deleteAt">]?: IUser[key] };

export type TUpdateUsersConnector = { [key in keyof Omit<IUser, "deleteAt" | "_id">]?: IUser[key] };
