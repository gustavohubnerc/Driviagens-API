import { createFlight } from "../repositories/flights.repository.js";
import { checkFlightValidity } from "../services/flights.services.js";
import httpStatus from "http-status";
import { filterFlights } from "../services/flights.services.js";

export async function createFlightController(req, res) {
    const { origin, destination, date } = req.body;

    try {
        await checkFlightValidity(origin, destination, date);

        await createFlight(origin, destination, date);

        res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        if (error === httpStatus.UNPROCESSABLE_ENTITY) {
            res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Formato de data inválido.");
        } else if (error === httpStatus.NOT_FOUND) {
            res.status(httpStatus.NOT_FOUND).send("Cidade de origem ou destino não encontrada.");
        } else if (error === httpStatus.CONFLICT) {
            res.status(httpStatus.CONFLICT).send("Origem e destino devem ser diferentes.");
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
}

export async function getFlightsController(req, res) {
    const queryParams = req.query;

    try {
        const flights = await filterFlights(queryParams);

        res.status(httpStatus.OK).json(flights);
    } catch (error) {
        if (error === httpStatus.UNPROCESSABLE_ENTITY) {
            res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Parâmetros inválidos.");
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
}
