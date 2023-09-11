import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routers/index.routes.js";
import dotenv from "dotenv";
import errorHandlerMiddleware from "./middlewares/error.handler.js";

const app = express();

dotenv.config();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})