import express, { Router } from "express";
import userRouter from "./user/user.router";
import subscriptionRouter from "./subscription/subscription.router";
const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/subscription", subscriptionRouter);

export default router;
