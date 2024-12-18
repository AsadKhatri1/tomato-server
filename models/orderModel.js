import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "processing",
    },
    payment: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;
