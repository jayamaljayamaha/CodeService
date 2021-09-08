import { ExceptionHandler } from "exception-library";
import express from "express";

const app = express()
app.use(express.json())

app.use(ExceptionHandler)

export default app