import express from "express";
import authMiddlewear from "../middlewear/auth.js";
import { placeOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddlewear, placeOrder);

export default orderRouter;
