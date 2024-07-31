import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";

import adminRoute from "./routes/adminRoute";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/admin", adminRoute);

const mongoURI = process.env.MONGO_URL;
const port = process.env.PORT || 4000;

if (!mongoURI) {
  console.error(
    "MongoDB connection string is missing in the environment variables."
  );
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
