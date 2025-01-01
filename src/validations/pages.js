import Joi from "joi";

export const validatePageParams = (data) =>
   Joi.object()
      .keys({
         page: Joi.number().integer().min(0),
         limit: Joi.number().integer().min(0).max(12),
      })
      .validate(data);
