import { verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constants";

module.exports = (req, _, next) => {
  const accessToken = req.cookies["access-token"];

  try {
    const data = verify(accessToken, ACCESS_TOKEN_SECRET);
    req.userId = data.userId;
  } catch (err) {
    throw err;
  }
  next();
};
