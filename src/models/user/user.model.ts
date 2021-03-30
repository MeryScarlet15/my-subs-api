import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export type TRol = "ADMIN" | "ACCOUNT";

export interface IUser {
  _id: string;
  email: string;
  name?: string;
  lastname?: string;
  password: string;
  tokens: string[];
  deletedAt?: string;
}

export interface IUserDocument extends Document {
  email: string;
  name?: string;
  lastname?: string;
  password: string;
  tokens: string[];
  subscriptionCost: string;
  deletedAt?: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  tokens: { type: [String], required: true },
  subscriptionCost: { type: Number, required: true },
  deletedAt: { type: Date },
});

// Hash the user password before saving
UserSchema.pre("save", async function (next) {
  const user: any = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.toJSON = function () {
  const user: any = this;
  const userObject: IUser = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

const User = mongoose.model<IUserDocument>("User", UserSchema);

export default User;
