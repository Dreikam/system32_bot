import joi from 'joi';

export const tokenCreate = joi.object({
  price: joi.number().required(),
  memberId: joi.string().required(),
  expiresIn: joi.date(),
});
