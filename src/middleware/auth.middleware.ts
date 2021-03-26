import jwt from "jsonwebtoken";
import userConnector from "../connectors/mongo/user/user.connector";
import { errorMessages } from "../constants/messages/error-messages";
import { TRequest, TResponse } from "../models/shared/express-types";
import { IUser, IUserDocument } from "../models/user/user.model";
import { getErrorResponse } from "../utils/response/get-error-response";

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export interface TAuthRequest<body = any, query = any> extends TRequest<body, query> {
  userId?: string;
  token?: string;
  user?: IUserDocument;
}

export const auth = async (req: TAuthRequest<any, any>, res: TResponse<any>, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      throw "ERROR_NOT_ENOUGH_PERMISIONS";
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const existingUsers = await userConnector.getUsers({ _id: decoded._id });

    req.userId = decoded._id;
    (req.token = token), (req.user = existingUsers[0]);

    if (!existingUsers[0].tokens.find((element) => element === token)) {
      throw "ERROR_NOT_AUTH";
    }

    next();
  } catch (error) {
    const requestName = "get /user-error";
    const completeError = getErrorResponse({
      requestName,
      bodyParams: {},
      error,
    });
    res.status(completeError.status).send(completeError);
  }
};
