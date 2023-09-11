import { getCityById, getCityByName } from "../repositories/cities.repository.js";
import { conflictError } from "../errors/conflict.js";
import { notFoundError } from "../errors/notFound.js";

async function checkCityExists(name) {
    const cityExists = await getCityByName(name);

    if (cityExists.rows.length > 0) {
        throw conflictError('Cidade já existe');
    }
}

async function checkCityById(id) {
    const cityExists = await getCityById(id);

    if (cityExists.rows.length === 0) {
        throw notFoundError('Cidade');
    }
    return cityExists.rows[0];
}

export const citiesServices = {
    checkCityExists,
    checkCityById
};