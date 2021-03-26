import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userConnector from "../../connectors/mongo/user/user.connector";
import { ILoginUserServiceParams, TRegisterUserServiceParams } from "./user-service.type";
import { IUser, IUserDocument } from "../../models/user/user.model";

const generateAuthToken = async (id: string): Promise<string> => {
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET);
  return token;
};

const registerUser = async (user: TRegisterUserServiceParams): Promise<{ user: IUserDocument }> => {
  const existingUser = await userConnector.getExistingUsers(user.email);
  if (existingUser.length !== 0) {
    throw { name: "ERROR_EXISTING_IN_BBDD", param: "User" };
    return;
  }

  const userCreated = await userConnector.createUser(user);

  return { user: userCreated };
};

const login = async ({ email, password }: ILoginUserServiceParams) => {
  const existingUser = await userConnector.getExistingUsers(email);

  if (existingUser.length === 0) {
    throw "ERROR_BAD_CREDENTIALS";
    return;
  }

  const isPassword = await bcrypt.compare(password, existingUser[0].password);

  if (!isPassword) {
    throw "ERROR_BAD_CREDENTIALS";
    return;
  }
  const authToken = await generateAuthToken(existingUser[0]._id);

  const userTokens = existingUser[0].tokens;
  if (userTokens.indexOf(authToken) === -1) {
    const updateUserToken = await userConnector.updateUsers(
      {
        _id: existingUser[0]._id,
      },
      { tokens: [...userTokens, authToken] },
    );
  }

  return { authToken };
};

const logout = async (idUser, token) => {
  const existingUser = await userConnector.getUsers({ _id: idUser });

  if (existingUser.length === 0) {
    throw "ERROR_BAD_CREDENTIALS";
    return;
  }

  const userTokens = existingUser[0].tokens;

  if (userTokens.indexOf(token) !== -1) {
    const newUserTokens = userTokens.filter((element) => element !== token);
    const updateUserToken = await userConnector.updateUsers(
      {
        _id: existingUser[0]._id,
      },
      { tokens: newUserTokens },
    );
  }
};

const getUsers = async (filters) => {
  return await userConnector.getUsers(filters || {});
};

const deleteUser = async (id) => {
  const deletedStatus = await userConnector.deleteUsers({ _id: id });

  if (deletedStatus.n === 0) {
    throw { name: "ERROR_NOT_EXISTING_IN_BBDD", param: "User" };
  }

  return { message: "User deleted successfully" };
};

const updateUser = async (id, updatedUser) => {
  const updatedStatus = await userConnector.updateUsers(
    {
      _id: id,
    },
    updatedUser,
  );

  if (updatedStatus.n === 0) {
    throw { name: "ERROR_NOT_EXISTING_IN_BBDD", param: "User" };
  }

  return { message: "User updated successfully", user: updatedUser };
};

export default { registerUser, login, logout, getUsers, deleteUser, updateUser };
