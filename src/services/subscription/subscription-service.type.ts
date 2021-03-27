import { IPaidPeriod, ISubscription } from "../../models/subscription/subscription.model";
import { Overwrite } from "../../utils/typescript-helpers/overwrite-helper";

export interface ICreateSubscriptionServiceParams {
  name: string;
  cost: string;
  paidPeriod: IPaidPeriod;
  renovationDate?: Date;
  note?: string;
  isPaid?: boolean;
  user: string;
}

export type TFilterSubscriptionService = Overwrite<
  { [key in keyof Omit<ISubscription, "deleteAt">]?: ISubscription[key] },
  { user?: any }
>;

export type TUpdateSubscriptionsService = {
  [key in keyof Omit<ISubscription, "deleteAt" | "_id">]?: ISubscription[key];
};
