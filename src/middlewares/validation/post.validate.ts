import Joi from "joi";
export default {
    createPost: Joi.object({
        title: Joi.string().min(5).required(),
        desc: Joi.string().min(10).required(),
        imgURL: Joi.string().required(),
        categories: Joi.array(),
        content: Joi.string().min(200).required(),
        author: Joi.string().required(),
    }),
    updatePost: Joi.object({
        postId: Joi.string().required(),
        title: Joi.string().min(5).required(),
        desc: Joi.string().min(10).required(),
        imgURL: Joi.string().required(),
        categories: Joi.array(),
        content: Joi.string().min(200).required(),
    }),
    likePost: Joi.object({
        userId: Joi.string().required(),
    }),
};
