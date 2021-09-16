import { ExceptionHandler } from "exception-library";
import express from "express";
import CodeRouter from "./Routes/Codes";

const app = express();
app.use(express.json());
app.use("/api/v1/codes", CodeRouter);
app.use(ExceptionHandler);

export default app;
