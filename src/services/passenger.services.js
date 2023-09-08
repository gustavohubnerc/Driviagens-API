import httpStatus from "http-status";
import { createPassenger, getPassengersWithTravelCount } from "../repositories/passenger.repository.js";
import { passengerSchema } from "../schemas/passengers.schema.js";
import { passengerQuerySchema } from "../schemas/passengerquery.schema.js";

export async function createPassengerService(firstName, lastName) {
    const validationResult = passengerSchema.validate({ firstName, lastName });

    if (validationResult.error) {
        throw httpStatus.BAD_REQUEST;
    }

    await createPassenger(firstName, lastName);
}

export async function filterPassengersWithTravelCount(queryParams){
    const { error, value } = passengerQuerySchema.validate(queryParams, { convert: true });

    if (error) {
        throw httpStatus.UNPROCESSABLE_ENTITY;
    }

    const passengers = await getPassengersWithTravelCount(value.name);

    if (passengers.length > 10) {
        throw httpStatus.INTERNAL_SERVER_ERROR;
    }

    return passengers;
}