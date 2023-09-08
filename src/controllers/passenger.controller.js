import httpStatus from "http-status";
import { createPassengerService, filterPassengersWithTravelCount } from "../services/passenger.services.js";

export async function createPassengerController(req, res) {
    const { firstName, lastName } = req.body;

    try {
        await createPassengerService(firstName, lastName);
        res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        if (error === httpStatus.BAD_REQUEST) {
            res.sendStatus(httpStatus.BAD_REQUEST);
        } else {
            res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export async function getPassengersWithCount(req, res) {
    const queryParams = req.query;

    try {
        const passengers = await filterPassengersWithTravelCount(queryParams);
        res.status(httpStatus.OK).json(passengers);
    } catch (error) {
        if (error === httpStatus.UNPROCESSABLE_ENTITY) {
            res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Parâmetros inválidos.");
        } else if (error === httpStatus.INTERNAL_SERVER_ERROR) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Too many results.");
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
}