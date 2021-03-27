import subscriptionConnector from "../../connectors/mongo/subscription/subscription.connector";
import { ISubscriptionDocument } from "../../models/subscription/subscription.model";
import { IUser } from "../../models/user/user.model";
import {
  ICreateSubscriptionServiceParams,
  TFilterSubscriptionService,
  TUpdateSubscriptionsService,
} from "./subscription-service.type";

const createSubscription = async (params: ICreateSubscriptionServiceParams): Promise<ISubscriptionDocument> => {
  const subscriptionCreated = await subscriptionConnector.createSubscription({ ...params });

  return subscriptionCreated;
};

const getSubscriptions = async (filters: TFilterSubscriptionService) => {
  return await subscriptionConnector.getSubscriptions(filters || {});
};

const deleteSubscription = async (id: string, idUser: string) => {
  const deletedStatus = await subscriptionConnector.deleteSubscription({ _id: id, user: idUser });

  if (deletedStatus.n === 0) {
    throw { name: "ERROR_NOT_EXISTING_IN_BBDD", param: "User" };
  }

  return { message: "Subscription deleted successfully" };
};

const updateSubscription = async (id: string, updateSubscription: TUpdateSubscriptionsService) => {
  const updatedStatus = await subscriptionConnector.updateSubscription(
    {
      _id: id,
    },
    updateSubscription,
  );

  if (updatedStatus.n === 0) {
    throw { name: "ERROR_NOT_EXISTING_IN_BBDD", param: "User" };
  }

  return { message: "Subscription updated successfully", user: updateSubscription };
};

export default { createSubscription, getSubscriptions, deleteSubscription, updateSubscription };
