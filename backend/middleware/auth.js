import jwt from "jsonwebtoken";
import { userModel } from "../models";

const authentication = async (request, response, next) => {
  try {
    const jwtToken = request.cookies.jwt_token;

    if (jwtToken === undefined) throw new Error("Access Denied!");

    const authorization = jwt.verify(jwtToken, "MY_SECRET_TOKEN");
    if (!authorization) throw new Error("Invalid token!");

    const user = await userModel.findOne({ email: authorization.email });

    if (!user) throw new Error("No user found with that token!");
    request.currentUser = user.email;
    request.id = user._id;
    next();
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

export default authentication;
