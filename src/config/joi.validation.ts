import * as joi from "joi";

/*
Joi validation es un módulo que nos permite validar los valores de las variables de entorno.
En este caso, estamos validando que las variables de entorno MONGODB y PORT sean de tipo string y number respectivamente.
En caso de que no se cumpla la validación, Joi lanzará un error.
Se tiene que cargar dentro de app.module.ts para que se ejecute la validación, en el "configModule".
*/

export const joiValidation = joi.object({
  MONGODB: joi.string().required(),
  PORT: joi.number().default(3000),
  DEFAULT_LIMIT: joi.number().default(10),
});
