import { IPaidPeriod } from "../../models/subscription/subscription.model";

export interface IPostSubscriptionBody {
  name: string;
  cost: string;
  paidPeriod: IPaidPeriod;
  renovationDate?: Date;
  note?: string;
  isPaid?: boolean;
}
