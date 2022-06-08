import express from "express";
import { INTERNAL_LINKS } from "../constant";
import { userController } from "../controller";
import { authentication, upload } from "../middleware";

export default express
  .Router()
  .post(
    INTERNAL_LINKS.USER.SIGNUP,
    upload.single("picUrl"),
    userController.registerUser
  )
  .post(INTERNAL_LINKS.USER.LOGIN, userController.loginUser)
  .get(INTERNAL_LINKS.USER.USERINFO, authentication, userController.userInfo)
  .post(
    INTERNAL_LINKS.USER.UPDATEUSER,
    authentication,
    upload.single("picUrl"),
    userController.updateUserInfo
  )
  .post(INTERNAL_LINKS.USER.LOGOUT, userController.logout);
