import { IPaidPeriod, ISubscription } from "../../../models/subscription/subscription.model";
import { Overwrite } from "../../../utils/typescript-helpers/overwrite-helper";

export interface ICreateSubscriptionConnectorParams {
  name: string;
  cost: string;
  paidPeriod: IPaidPeriod;
  renovationDate?: Date;
  note?: string;
  isPaid?: boolean;
  user: string;
}

export type TFilterSubscriptionConnector = Overwrite<
  { [key in keyof Omit<ISubscription, "deleteAt">]?: ISubscription[key] },
  { user?: any }
>;

export type TUpdateSubscriptionsConnector = {
  [key in keyof Omit<ISubscription, "deleteAt" | "_id">]?: ISubscription[key];
};
