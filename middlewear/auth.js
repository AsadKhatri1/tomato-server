import jwt from "jsonwebtoken";

const authMiddlewear = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Not authprized, please login",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error in authorization",
    });
  }
};

export default authMiddlewear;
