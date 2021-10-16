import { ExceptionHandler } from "exception-library";
import express from "express";
import CodeRouter from "./Routes/Codes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/codes", CodeRouter);
app.use(ExceptionHandler);

export default app;
