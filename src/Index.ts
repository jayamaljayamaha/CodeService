import app from "./api/v1/App";
import mongoose from "mongoose";
import logger from "./api/v1/Config/Logger";

if (!process.env.DB_URI) {
  throw new Error("DB_URI is not defined in env variables");
}
if (!process.env.DB_NAME) {
  throw new Error("DB_NAME is not defined in env variables");
}
if (!process.env.DB_PORT) {
  throw new Error("DB_PORT is not defined in env variables");
}
if (!process.env.SERVER_PORT) {
  throw new Error("SERVER_PORT is not defined in env variables");
}

mongoose
  .connect(
    `mongodb://${process.env.DB_URI}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  )
  .then(() => {
    logger.info("Connected to database");
  })
  .catch((err) => {
    logger.error(err);
  });

app.listen(process.env.SERVER_PORT, () => {
  logger.info(`Code service is listning on port ${process.env.SERVER_PORT}`);
});
