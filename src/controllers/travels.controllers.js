import httpStatus from "http-status";
import { createTravel } from "../repositories/travels.repository.js";
import { travelsSchema } from "../schemas/travels.schema.js";
import { checkPassengerAndFlightExistence } from "../services/travels.services.js";

export async function createTravelController(req, res) {
    const { passengerId, flightId } = req.body;

    try {
        const validationResult = travelsSchema.validate({ passengerId, flightId });

        if (validationResult.error) {
            res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Formato de dados inválido.");
            return;
        }
        await checkPassengerAndFlightExistence(passengerId, flightId);

        await createTravel(passengerId, flightId);

        res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        if (error === httpStatus.NOT_FOUND) {
            res.status(httpStatus.NOT_FOUND).send("Passageiro ou voo não encontrado.");
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
}