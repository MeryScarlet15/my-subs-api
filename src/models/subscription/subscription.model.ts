import mongoose, { Document, Schema } from "mongoose";
import { IUser, IUserDocument } from "../user/user.model";

export type IPaidPeriod = "WEEK" | "MONTH" | "YEAR";

export interface ISubscription {
  _id: string;
  name: string;
  cost: string;
  paidPeriod: IPaidPeriod;
  isPaid: boolean;
  renovationDate?: Date;
  note?: string;
  user: IUserDocument;
  deletedAt?: string;
}

export interface ISubscriptionDocument extends Document {
  name: string;
  cost: string;
  paidPeriod: IPaidPeriod;
  isPaid: boolean;
  renovationDate?: Date;
  note?: string;
  user: IUserDocument;
  deletedAt?: string;
}

const SubscriptionSchema: Schema = new Schema({
  name: { type: String, required: true },
  cost: { type: String, required: true },
  paidPeriod: { type: String, enum: ["WEEK", "MONTH", "YEAR"], default: "MONTH", required: true },
  isPaid: { type: Boolean, required: true },
  note: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  renovationDate: { type: Date },
  deletedAt: { type: Date },
});

const Subscription = mongoose.model<ISubscriptionDocument>("Subscription", SubscriptionSchema);

export default Subscription;
