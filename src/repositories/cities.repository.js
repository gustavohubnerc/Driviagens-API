import { db } from "../database/database.connection.js";

export async function addNewCity(name) {
    const result = await db.query(`INSERT INTO cities (name) VALUES ($1)`, [name]);
    return result;
}

export async function getCityByName(name) {
    const result = await db.query(`SELECT * FROM cities WHERE name = $1`, [name]);
    return result;
}

export async function getCityById(id) {
    const result = await db.query(`SELECT * FROM cities WHERE id = $1`, [id]);
    console.log("repository city:", result);
    return result;
}