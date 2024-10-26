import express from "express";
import authMiddlewear from "../middlewear/auth.js";
import {
  allOrders,
  placeOrder,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddlewear, placeOrder);
orderRouter.post("/userorders", authMiddlewear, userOrders);
orderRouter.get("/list", allOrders);
orderRouter.post("/update", updateStatus);

export default orderRouter;
