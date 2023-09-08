import httpStatus from "http-status";
import { getCityByName } from "../repositories/cities.repository.js";

async function checkCityExists(name) {
    const cityExists = await getCityByName(name);

    if (cityExists.rows.length > 0) {
        throw httpStatus.CONFLICT;
    }
}

export const citiesServices = {
    checkCityExists
};