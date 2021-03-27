import { IPaidPeriod, ISubscription } from "../../models/subscription/subscription.model";

export interface IPostSubscriptionBody {
  name: string;
  cost: string;
  paidPeriod: IPaidPeriod;
  renovationDate?: Date;
  note?: string;
  isPaid?: boolean;
}

export interface IGetSubscriptionsFilter {
  paidPeriod?: IPaidPeriod;
  isPaid?: boolean;
}

export interface IDeleteSubscriptionResponse {
  message: string;
}

export interface IUpdateSubscriptionResponse {
  message: string;
}

export type TFilterSubscriptionUpdate = { [key in keyof Omit<ISubscription, "deleteAt">]?: ISubscription[key] };
