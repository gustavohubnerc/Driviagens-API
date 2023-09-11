import { citiesServices } from "../services/cities.services.js";
import { flightQuerySchema } from "../schemas/flightquery.schema.js";
import { getFilteredFlights } from "../repositories/flights.repository.js";
import { conflictError } from "../errors/conflict.js";
import { badRequestError } from "../errors/badRequest.js";
import { invalidDataError } from "../errors/invalidData.js";

export async function checkFlightValidity(origin, destination, date) {
    await citiesServices.checkCityById(origin);
    await citiesServices.checkCityById(destination);

    if (origin === destination) {
        throw conflictError('Cidades iguais');
    }

    const currentDate = new Date();
    const flightDate = new Date(date.split('-').reverse().join('-'));

    if (flightDate <= currentDate) {
        throw invalidDataError('Insira uma data posterior ao dia de hoje.');
    }
}

export async function filterFlights(queryParams) {
    const { smaller_date, bigger_date } = queryParams;

    if (!smaller_date  && bigger_date || smaller_date && !bigger_date) {
        throw badRequestError('Insira as datas corretamente');
    }

    const smallerDateObj = new Date(smaller_date);
    const biggerDateObj = new Date(bigger_date);

    if (smallerDateObj >= biggerDateObj) {
        throw badRequestError('Insira as datas corretamente');
    }

    const { error, value } = flightQuerySchema.validate(queryParams, { convert: true });

    if (error) {
        throw invalidDataError('Parâmetro');
    }

    const flights = await getFilteredFlights(value);

    return flights;

}

export const flightsService = {
    checkFlightValidity,
    filterFlights
}