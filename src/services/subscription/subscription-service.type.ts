import { IPaidPeriod } from "../../models/subscription/subscription.model";

export interface ICreateSubscriptionParams {
  name: string;
  cost: string;
  paidPeriod: IPaidPeriod;
  renovationDate?: Date;
  note?: string;
  isPaid?: boolean;
  user: string;
}
