import { Router } from "express";
import { validateSchema } from "../middlewares/schema.validation.js";
import { travelsSchema } from "../schemas/travels.schema.js";
import { createTravelController } from "../controllers/travels.controllers.js";

const travelsRouter = Router();

travelsRouter.post("/travels", validateSchema(travelsSchema), createTravelController);

export default travelsRouter;