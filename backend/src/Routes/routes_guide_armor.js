// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide_armor = require("../controllers/guide_armor");
// Variables
const routes_guide_armor = express.Router();
/*
 * guide_armor
 */
// Create guide_armor
routes_guide_armor.post(
  "/armor",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id_guide: Joi.number().required(),
      bonus: Joi.string(),
      extra_bonus: Joi.string(),
      property_especial: Joi.string(),
      main: Joi.number(),
    }),
  }),
  guide_armor.create
);
// Select All guide_armors
routes_guide_armor.get(
  "/armor",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_guide: Joi.number().required(),
    }),
  }),
  guide_armor.select_all_armors
);
// Update guide_armor
routes_guide_armor.put(
  "/armor/:id_armor",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_armor: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_guide: Joi.number().required(),
      bonus: Joi.string(),
      extra_bonus: Joi.string(),
      property_especial: Joi.string(),
      main: Joi.number(),
    }),
  }),
  guide_armor.update_armor
);
// Delete guide_armor
routes_guide_armor.delete(
  "/armor/:id_armor",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_armor: Joi.number().required(),
    }),
  }),
  guide_armor.delete_armor
);
// Export routes_guide_armor
module.exports = routes_guide_armor;
