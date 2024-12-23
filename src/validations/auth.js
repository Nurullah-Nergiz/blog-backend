import joi from "joi";

export const validateToLogin = (data) =>
   joi
      .object()
      .keys({
         email: joi.string().email().required(),
         password: joi.string().required,
      })
      .validate(data);

export const validateToRegister = (data) =>
   joi
      .object()
      .keys({
         userName: joi.string().min(4).max(25).required(),
         email: joi.string().email().required(),
         password: joi.string().min(8).required(),
      })
      .validate(data);
