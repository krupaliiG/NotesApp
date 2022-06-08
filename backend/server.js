import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dbConfig from "./config/dbConfig";
import allRoutes from "./routes/allRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

mongoose
  .connect(dbConfig.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database.");
  })
  .catch((error) => {
    console.log(`Error while connecting to the database: ${error.message}`);
    process.exit(1);
  });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

allRoutes(app);

app.use("/", express.static("uploads"));

app.listen(7000, () => {
  console.log("You can view Notes application at http://localhost:7000");
});
