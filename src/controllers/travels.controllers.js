import httpStatus from "http-status";
import { createTravel } from "../repositories/travels.repository.js";
import { checkPassengerAndFlightExistence } from "../services/travels.services.js";

export async function createTravelController(req, res) {
    const { passengerId, flightId } = req.body;

    await checkPassengerAndFlightExistence(passengerId, flightId);

    await createTravel(passengerId, flightId);

    res.sendStatus(httpStatus.CREATED);
}

export const travelsController = {
    createTravelController
}