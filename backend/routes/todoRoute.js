import express from "express";
import { INTERNAL_LINKS } from "../constant";
import { authentication } from "../middleware";
import { todoController } from "../controller";

export default express
  .Router()
  .post(INTERNAL_LINKS.TODO.ADD_TODO, authentication, todoController.addTodo)
  .get(
    INTERNAL_LINKS.TODO.GET_TODO,
    authentication,
    todoController.gettodolist
  );
