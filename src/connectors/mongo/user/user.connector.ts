import User, { IUser, IUserDocument } from "../../../models/user/user.model";
import { initDBConnection } from "../mongo.connector";
import { TFilterUserConnector, TRegisterUserConnectorParams, TUpdateUsersConnector } from "./user-connector.type";
import { Model } from "mongoose";
import { IMongoUpdateOne } from "../mongo-connector.type";

initDBConnection();

const getUsers = async (filters: TFilterUserConnector): Promise<IUserDocument[]> => {
  return await User.find({ ...filters, deletedAt: { $exists: false } }).exec();
};

const getExistingUsers = async (email: string): Promise<IUserDocument[]> => {
  return await User.find({ email, deletedAt: { $exists: false } }).exec();
};

const createUser = async ({
  email,
  password,
  name,
  lastname,
  subscriptionCost,
}: TRegisterUserConnectorParams): Promise<IUserDocument> => {
  const user = new User({ email, password, name, lastname, subscriptionCost });
  await user.save();

  return user;
};

const deleteUsers = async (filter: TFilterUserConnector): Promise<any> => {
  return await User.updateOne({ ...filter, deletedAt: { $exists: false } }, { deletedAt: new Date().toISOString() });
};

const updateUsers = async (filter: TFilterUserConnector, update: TUpdateUsersConnector): Promise<any> => {
  return await User.updateOne({ ...filter }, update);
};

export default {
  getUsers,
  getExistingUsers,
  createUser,
  deleteUsers,
  updateUsers,
};
