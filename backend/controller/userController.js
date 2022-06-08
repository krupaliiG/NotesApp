import { userModel } from "../models";
import jwt from "jsonwebtoken";
import { response } from "express";
import { s3Upload } from "../.utils";

const registerUser = async (request, response) => {
  try {
    const { email } = request.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) throw new Error("User already exists! Please Login.");

    const data = new userModel({
      ...request.body,
    });

    await data.save();

    const { _id } = data;

    await userModel.findByIdAndUpdate(_id, {
      pic: "http://localhost:7000/" + request.file.filename,
      picUrl: request.file.filename,
    });

    const uploadTos3 = await s3Upload(request.file.path, _id.toString());
    if (!uploadTos3) throw new Error();

    response.status(200).send({
      success: true,
      message: "Registration successfull! Please check your email.",
    });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const userExists = await userModel.findOne({ email });
    if (!userExists) throw new Error("User does not exists! Please Register.");
    if (!(userExists.password == password))
      throw new Error("Username and password does not match!");

    const jwtToken = jwt.sign({ email }, "MY_SECRET_TOKEN");
    response
      .status(200)
      .cookie("jwt_token", jwtToken)
      .send({ success: true, message: "Login succssfull!", token: jwtToken });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

const userInfo = async (request, response) => {
  try {
    const userExists = await userModel.findOne({ email: request.currentUser });
    if (!userExists) throw new Error("User does not exists! Please Register.");
    response.status(200).send({ success: true, userDetail: userExists });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

const updateUserInfo = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const data = await userModel.findOneAndUpdate(
      { _id: request.id },
      {
        name,
        email,
        password,
        pic: "http://localhost:7000/" + request.file.filename,
        picUrl: request.file.filename,
      }
    );

    const uploadTos3 = await s3Upload(request.file.path, request.id.toString());
    if (!uploadTos3) throw new Error();

    response.status(200).send({
      success: true,
      message: "Profile Detail updated successfully!",
    });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

const logout = async (request, response) => {
  try {
    response
      .status(200)
      .clearCookie("jwt_token")
      .send({ success: true, message: "Logout succssfully!" });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

export default { registerUser, loginUser, userInfo, updateUserInfo, logout };
