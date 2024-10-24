import express from "express";
import { loginUser, registerUser } from "../controllers/usercontroller.js";
import multer from "multer";

const userRouter = express.Router();

// Image storage engine using multer
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

userRouter.post("/login", loginUser);
userRouter.post("/register", upload.single("image"), registerUser);

export default userRouter;
