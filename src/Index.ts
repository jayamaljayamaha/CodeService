import app from "./api/v1/App";
import mongoose from "mongoose";
import logger from "./api/v1/Config/Logger";

if (!process.env.DB_URI) {
  throw new Error("DB_URI is not defined in env variables");
}
if (!process.env.DB_NAME) {
  throw new Error("DB_NAME is not defined in env variables");
}
if (!process.env.DB_USER) {
  throw new Error("DB_USER is not defined in env variables");
}
if (!process.env.DB_PASSWORD) {
  throw new Error("DB_PASSWORD is not defined in env variables");
}
if (!process.env.SERVER_PORT) {
  throw new Error("SERVER_PORT is not defined in env variables");
}
if (!process.env.AUTH_SRV_URL) {
  throw new Error("AUTH_SRV_URL is not defined in env variables");
}
if (!process.env.AUTH_SRV_PORT) {
  throw new Error("AUTH_SRV_URL is not defined in env variables");
}
if (!process.env.LOG_FILE_PATH) {
  throw new Error("LOG_FILE_PATH is not defined in env variables");
}

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}/${process.env.DB_NAME}?retryWrites=true&w=majority`
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
