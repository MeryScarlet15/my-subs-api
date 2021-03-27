import { IPaidPeriod, ISubscription } from "../../../models/subscription/subscription.model";

export interface ICreateSubscriptionConnectorParams {
  name: string;
  cost: string;
  paidPeriod: IPaidPeriod;
  renovationDate?: Date;
  note?: string;
  isPaid?: boolean;
  user: string;
}

export type TFilterSubscriptionConnector = { [key in keyof Omit<ISubscription, "deleteAt">]?: ISubscription[key] };

export type TUpdateSubscriptionsConnector = {
  [key in keyof Omit<ISubscription, "deleteAt" | "_id">]?: ISubscription[key];
};
