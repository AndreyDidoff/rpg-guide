// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide_pets = require("../controllers/guide_pets");
// Variables
const routes_guide_pets = express.Router();
/*
 * guide_pets
 */
// Create guide_pets
routes_guide_pets.post(
  "/pets",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_guide: Joi.number().required(),
      id_alignment: Joi.number().required(),
      name: Joi.string().required(),
      height: Joi.number(),
      life: Joi.number(),
      distance: Joi.number(),
      description: Joi.string(),
    }),
  }),
  guide_pets.create
);
// Select All guide_petss
routes_guide_pets.get(
  "/pets",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_guide: Joi.number().required(),
    }),
  }),
  guide_pets.select_all_pets
);
// Update guide_pets
routes_guide_pets.put(
  "/pets/:id_pets",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_pets: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_guide: Joi.number().required(),
      name: Joi.string(),
      height: Joi.number(),
      life: Joi.number(),
      distance: Joi.number(),
      description: Joi.string(),
    }),
  }),
  guide_pets.update_pet
);
// Delete guide_pets
routes_guide_pets.delete(
  "/pets/:id_pets",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_pets: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_guide: Joi.number().required(),
    }),
  }),
  guide_pets.delete_pet
);
// Export routes_guide_pets
module.exports = routes_guide_pets;
