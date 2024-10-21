import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://hafizasad398:dadabhai123@cluster0.gucxs.mongodb.net/food-del"
    )
    .then(() => {
      console.log("DB is succesfully connected");
    })
    .catch(() => {
      console.log("Error in connecting DB");
    });
};

export default connectDB;
