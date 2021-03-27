import mongoose, { Document, Schema } from "mongoose";

export interface ISubscription extends Document {
  name: string;
  cost: string;
  paidPeriod: "WEEK" | "MONTH" | "YEAR";
  isPaid: boolean;
  note?: string;
}

const SubscriptionSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  tokens: { type: [String], required: true },
  deletedAt: { type: Date },
});

const Subscription = mongoose.model<ISubscription>("Subscription", SubscriptionSchema);

export default Subscription;
