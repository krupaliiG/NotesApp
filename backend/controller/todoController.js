import { response } from "express";
import { todoModel } from "../models";

const addTodo = async (request, response) => {
  try {
    const { title, description } = request.body;
    const titleExists = await todoModel.findOne({ title });

    if (titleExists)
      throw new Error(
        "Please use other name! Todo with this name already exists."
      );

    const data = new todoModel({
      title,
      description,
      createdBy: request.id,
    });

    await data.save();

    response
      .status(200)
      .send({ success: true, message: "Todo Added successfully!" });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

const gettodolist = async (request, response) => {
  try {
    const existingData = await todoModel.find({ createdBy: request.id });
    if (!existingData && existingData.length === 0) {
      response
        .status(200)
        .send({ success: true, message: "No Todo Available to show!" });
    }
    response.status(200).send({ success: true, existingData });
  } catch (error) {
    response.status(400).send({ success: false, message: error.message });
  }
};

export default { addTodo, gettodolist };
