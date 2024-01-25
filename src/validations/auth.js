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
         firtName: joi.string().min(4).max(25).required(),
         lastName: joi.string().min(4).max(25).required(),
         email: joi.string().email().required(),
         password: joi.string().min(8).required(),
      })
      .validate(data);
