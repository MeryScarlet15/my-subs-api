import express, { Router } from "express";
import userConnector from "../../connectors/mongo/user/user.connector";
import { auth, TAuthRequest } from "../../middleware/auth.middleware";
import { TResponse } from "../../models/shared/express-types";
import { ISubscriptionDocument } from "../../models/subscription/subscription.model";
import subscriptionService from "../../services/subscription/subscription.service";
import { getAcceptedFilters } from "../../utils/get-valid-filters";
import { getErrorResponse } from "../../utils/response/get-error-response";
import { validateRequiredParams } from "../../utils/validations/validate-required-params";
import {
  IGetSubscriptionsFilter,
  IPostSubscriptionBody,
  IDeleteSubscriptionResponse,
  IUpdateSubscriptionResponse,
  TFilterSubscriptionUpdate,
} from "./subscription-router.type";

const router: Router = express.Router();

router.post("/", auth, async (req: TAuthRequest<IPostSubscriptionBody>, res: TResponse<ISubscriptionDocument>) => {
  const body = req.body;
  const subscription = {
    name: body.name,
    cost: body.cost,
    paidPeriod: body.paidPeriod,
  };

  const authUser = req.user;

  try {
    validateRequiredParams(subscription);
    const subscriptionCreated = await subscriptionService.createSubscription({ ...body, user: authUser._id });
    res.status(200).send(subscriptionCreated);
  } catch (error) {
    const requestName = "post /subscription-error";
    const completeError = getErrorResponse({
      requestName,
      bodyParams: body,
      error,
    });
    res.status(completeError.status).send(completeError);
  }
});

router.get("/", auth, async (req: TAuthRequest<IGetSubscriptionsFilter>, res: TResponse<ISubscriptionDocument[]>) => {
  const params = req.query;
  const authUser = req.user;
  const acceptedFilters = ["isPaid", "paidPeriod"];

  const filters = { ...getAcceptedFilters(acceptedFilters, params), user: authUser._id };

  try {
    const subscriptions = await subscriptionService.getSubscriptions(filters);

    res.status(200).send(subscriptions);
  } catch (error) {
    const requestName = "get /subscription-error";
    const completeError = getErrorResponse({
      requestName,
      bodyParams: params,
      error,
    });
    res.status(completeError.status).send(completeError);
  }
});

router.delete(
  "/:id",
  auth,
  async (req: TAuthRequest<{}, { id: string }>, res: TResponse<IDeleteSubscriptionResponse>) => {
    const body = req.body;
    const authUser = req.user;
    const params = req.params;
    try {
      const deleteSubscriptionMessage = await subscriptionService.deleteSubscription(params.id, authUser._id);

      res.status(200).send(deleteSubscriptionMessage);
    } catch (error) {
      const requestName = "delete /subscription-error";
      const completeError = getErrorResponse({
        requestName,
        bodyParams: body,
        error,
      });
      res.status(completeError.status).send(completeError);
    }
  },
);

router.put(
  "/:id",
  auth,
  async (req: TAuthRequest<TFilterSubscriptionUpdate, { id: string }>, res: TResponse<IUpdateSubscriptionResponse>) => {
    const body = req.body;
    const authUser = req.user;
    const params = req.params;
    const subscriptionUpdate = { ...body };
    try {
      const updatedSubscriptionMessage = await subscriptionService.updateSubscription(params.id, subscriptionUpdate);

      res.status(200).send(updatedSubscriptionMessage);
    } catch (error) {
      const requestName = "put /subscription-error";

      const completeError = getErrorResponse({
        requestName,
        bodyParams: body,
        error,
      });
      res.status(completeError.status).send(completeError);
    }
  },
);

export default router;
