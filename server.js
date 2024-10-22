import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

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

// server started

app.listen(port, () => {
  console.log(`App is up and running at port ${port}`);
});

// mongodb+srv://hafizasad398:<db_password>@cluster0.gucxs.mongodb.net/?
