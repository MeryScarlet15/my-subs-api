import express, { Router } from "express";
import { auth, TAuthRequest } from "../../middleware/auth.middleware";
import { TResponse } from "../../models/shared/express-types";
import { ISubscriptionDocument } from "../../models/subscription/subscription.model";
import { getErrorResponse } from "../../utils/response/get-error-response";
import { validateRequiredParams } from "../../utils/validations/validate-required-params";
import { IPostSubscriptionBody } from "./subscription-router.type";

const router: Router = express.Router();

router.post("/", auth, async (req: TAuthRequest<IPostSubscriptionBody>, res: TResponse<ISubscriptionDocument>) => {
  const body = req.body;
  const subscription = {
    name: body.name,
    cost: body.cost,
    paidPeriod: body.paidPeriod,
  };

  try {
    validateRequiredParams(subscription);
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

router.get("/", auth, async (req: TAuthRequest<{}>, res: TResponse<ISubscriptionDocument[]>) => {});
