import Joi from "joi";

export const flightSchema = Joi.object({
    origin: Joi.number().integer().required(),
    destination: Joi.number().integer().required(),
    date: Joi.string()
        .regex(/^\d{2}-\d{2}-\d{4}$/)
        .required()
});