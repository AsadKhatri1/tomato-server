import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import dotenv from "dotenv";
dotenv.config();

// app config
const app = express();
const port = 4000;

// middlewear

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API working");
});

// db connection

connectDB();

// api endpoints

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// server started

app.listen(port, () => {
  console.log(`App is up and running at port ${port}`);
});

// mongodb+srv://hafizasad398:<db_password>@cluster0.gucxs.mongodb.net/?
