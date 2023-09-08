import Joi from "joi";

export const passengerQuerySchema = Joi.object({
    name: Joi.string().max(100).allow(null)
})