import Joi from "joi";
export default {
    register: Joi.object({
        username: Joi.string().min(5).required(),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: Joi.string().min(8).required(),
    }),
};
