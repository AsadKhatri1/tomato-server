import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing order for frontend

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // const line_items = req.body.items.map((item, i) => ({
    //   price_data: {
    //     currency: "pkr",
    //     product_data: {
    //       name: item.name,
    //     },
    //     unit_amount: item.price * 100 * 270,
    //   },
    //   quantity: item.quantity,
    // }));
    // line_items.push({
    //   price_data: {
    //     currency: "pkr",
    //     product_data: {
    //       name: "Delivery charges",
    //     },
    //     unit_amount: 2 * 100 * 270,
    //   },
    //   quantity: 1,
    // });

    // const session = await stripe.checkout.sessions.create({
    //   line_items: line_items,
    //   mode: "payment",
    //   success_url: `http://localhost:5173/verify?success=true$orderId=${newOrder._id}`,
    //   cancel_url: `http://localhost:5173/verify?success=false$orderId=${newOrder._id}`,
    // });

    res.json({ success: true, message: "Order placed with success" });
  } catch (err) {
    res.json({ success: false, message: "Order not placed with error" });
  }
};

export { placeOrder };
