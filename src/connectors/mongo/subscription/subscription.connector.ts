import Subscription, { ISubscriptionDocument } from "../../../models/subscription/subscription.model";
import { initDBConnection } from "../mongo.connector";
import {
  ICreateSubscriptionConnectorParams,
  TFilterSubscriptionConnector,
  TUpdateSubscriptionsConnector,
} from "./subscription-connector.type";

initDBConnection();

const createSubscription = async (params: ICreateSubscriptionConnectorParams): Promise<ISubscriptionDocument> => {
  const subscription = new Subscription({ ...params });
  subscription.save();

  return subscription;
};

const getSubscriptions = async (filters: TFilterSubscriptionConnector): Promise<ISubscriptionDocument[]> => {
  return await Subscription.find({ ...filters, deletedAt: { $exists: false } }).exec();
};

const deleteSubscription = async (filter: TFilterSubscriptionConnector) => {
  return await Subscription.updateOne(
    { ...filter, deletedAt: { $exists: false } },
    { deletedAt: new Date().toISOString() },
  );
};

const updateSubscription = async (filter: TFilterSubscriptionConnector, update: TUpdateSubscriptionsConnector) => {
  return await Subscription.updateOne({ ...filter }, update);
};

export default { createSubscription, getSubscriptions, deleteSubscription, updateSubscription };
