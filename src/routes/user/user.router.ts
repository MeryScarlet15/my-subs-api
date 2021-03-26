import { AnyARecord } from "dns";
import express, { Router } from "express";
import { auth, TAuthRequest } from "../../middleware/auth.middleware";
import { TRequest, TResponse } from "../../models/shared/express-types";
import { IUser, IUserDocument } from "../../models/user/user.model";
import userService from "../../services/user/user.service";
import { getAcceptedFilters } from "../../utils/get-valid-filters";
import { getErrorResponse } from "../../utils/response/get-error-response";
import { validateRequiredParams } from "../../utils/validations/validate-required-params";
import { IDeleteUserResponse, TPostUserBody, TPostUserResponse, IUpdateUserResponse } from "./user-router.type";

export interface IReqGetUser {
  userId?: string;
}

const router: Router = express.Router();

router.post("/", async (req: TRequest<TPostUserBody>, res: TResponse<TPostUserResponse>) => {
  const body = req.body;
  const user = {
    email: body.email,
    password: body.password,
    name: body.name,
    lastname: body.lastname,
    rol: body.rol,
  };

  try {
    validateRequiredParams(user);

    const userCreated = await userService.registerUser(user);
    const token = await userService.login(user);
    res.status(200).send(token);
  } catch (error) {
    const requestName = "post /user-error";
    const completeError = getErrorResponse({
      requestName,
      bodyParams: body,
      error,
    });
    res.status(completeError.status).send(completeError);
  }
});

router.post("/login", async (req, res) => {
  const body = req.body;
  const user = {
    email: body.email,
    password: body.password,
  };

  try {
    validateRequiredParams(user);

    const token = await userService.login(user);
    res.status(200).send(token);
  } catch (error) {
    const requestName = "post /user/login-error";
    const completeError = getErrorResponse({
      requestName,
      bodyParams: body,
      error,
    });
    res.status(completeError.status).send(completeError);
  }
});

router.post("/logout", auth, async (req: TAuthRequest<{}, {}>, res: TResponse<{ message: string }>) => {
  const body = req.body;
  const authUser = req.user;
  const tokenUser = req.token;
  try {
    validateRequiredParams(req.body);

    await userService.logout(authUser._id, tokenUser);
    res.status(200).send({ message: "Logout Successfully" });
  } catch (error) {
    const requestName = "post /user/login-error";
    const completeError = getErrorResponse({
      requestName,
      bodyParams: body,
      error,
    });
    res.status(completeError.status).send(completeError);
  }
});

router.get("/auth", auth, async (req: TAuthRequest<{}, {}>, res: TResponse<IUserDocument>) => {
  const body = req.body;
  const authUser = req.user;

  res.status(200).send(authUser);
});

router.get("/", auth, async (req: TAuthRequest<{}>, res: TResponse<IUserDocument[]>) => {
  const body = req.body;
  const authUser = req.user;
  const acceptedFilters = ["email", "rol", "name", "lastname"];

  const filters = getAcceptedFilters(acceptedFilters, body);

  try {
    if (authUser.rol !== "ADMIN") {
      throw "ERROR_NOT_ENOUGH_PERMISIONS";
    }
    const users = await userService.getUsers(filters);

    res.status(200).send(users);
  } catch (error) {
    const requestName = "get /user-error";
    const completeError = getErrorResponse({
      requestName,
      bodyParams: body,
      error,
    });
    res.status(completeError.status).send(completeError);
  }
});

router.delete("/:id", auth, async (req: TAuthRequest<{}, { id: string }>, res: TResponse<IDeleteUserResponse>) => {
  const body = req.body;
  const authUser = req.user;
  const params = req.params;
  try {
    if (authUser.rol !== "ADMIN") {
      throw "ERROR_NOT_ENOUGH_PERMISIONS";
    }
    const deletedUserMessage = await userService.deleteUser(params.id);

    res.status(200).send(deletedUserMessage);
  } catch (error) {
    const requestName = "delete /user-error";
    const completeError = getErrorResponse({
      requestName,
      bodyParams: body,
      error,
    });
    res.status(completeError.status).send(completeError);
  }
});

router.put("/:id", auth, async (req: TAuthRequest<IUser, { id: string }>, res: TResponse<IUpdateUserResponse>) => {
  const body = req.body;
  const authUser = req.user;
  const params = req.params;
  const userUpdated = { ...body };
  try {
    if (authUser.rol !== "ADMIN") {
      throw "ERROR_NOT_ENOUGH_PERMISIONS";
    }
    const updatedUserMessage = await userService.updateUser(params.id, userUpdated);

    res.status(200).send(updatedUserMessage);
  } catch (error) {
    const requestName = "put /user-error";

    const completeError = getErrorResponse({
      requestName,
      bodyParams: body,
      error,
    });
    res.status(completeError.status).send(completeError);
  }
});

export default router;
