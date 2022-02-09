import jwt from "jsonwebtoken";
import { ConnectionClosedEvent } from "mongodb";
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user request object
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default auth;
