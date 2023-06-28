import Joi from "joi";
const userValidate = {
    register: Joi.object({
        username: Joi.string().min(5).required(),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: Joi.string().min(8).required(),
    }),
};

export default userValidate;
