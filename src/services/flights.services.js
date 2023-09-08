import httpStatus from "http-status";
import { getCityByName } from "../repositories/cities.repository.js";
import { flightSchema } from "../schemas/flights.schema.js";
import { flightQuerySchema } from "../schemas/flightquery.schema.js";
import { getFilteredFlights } from "../repositories/flights.repository.js";

async function checkCityExistence(name) {
    const city = await getCityByName(name);

    if (!city) {
        throw httpStatus.NOT_FOUND;
    }
}

export async function checkFlightValidity(origin, destination, date) {
    const validationResult = flightSchema.validate({ origin, destination, date });

    if (validationResult.error) {
        throw httpStatus.UNPROCESSABLE_ENTITY;
    }

    await checkCityExistence(origin);
    await checkCityExistence(destination);

    if (origin === destination) {
        throw httpStatus.CONFLICT;
    }

    const currentDate = new Date();
    const flightDate = new Date(date.split("-").reverse().join("-"));

    if (flightDate <= currentDate) {
        throw httpStatus.UNPROCESSABLE_ENTITY;
    }
}

export async function filterFlights(queryParams) {
    const { smaller_date, bigger_date } = queryParams;

    if (smaller_date && bigger_date) {
        const smallerDateObj = new Date(smaller_date.split("-").reverse().join("-"));
        const biggerDateObj = new Date(bigger_date.split("-").reverse().join("-"));

        if (smallerDateObj >= biggerDateObj) {
            throw httpStatus.BAD_REQUEST;
        }
    }

    const { error, value } = flightQuerySchema.validate(queryParams, { convert: true });

    if (error) {
        throw httpStatus.UNPROCESSABLE_ENTITY;
    }

    const flights = await getFilteredFlights(value);

    return flights;
}
