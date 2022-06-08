import { INTERNAL_LINKS } from "../constant";
import { userRoute, todoRoute } from "./index.js";

export default (app) => {
  app.use(INTERNAL_LINKS.USER.BASE_URL, userRoute);
  app.use(INTERNAL_LINKS.TODO.BASE_URL, todoRoute);
};
