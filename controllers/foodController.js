import { foodModel } from "../models/foodModel.js";
import fs from "fs";

// add food item

export const addFood = async (req, res) => {
  let image_filename = `${req.file?.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Food is not added" });
  }
};

// list food items

export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, message: "All food items listed", data: foods });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "error in food items list" });
  }
};

// remove food item
export const removeFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await foodModel.findById(id);
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Food removed" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error in removing food" });
  }
};
