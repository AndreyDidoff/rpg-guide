// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide_shields = require("../controllers/guide_shields");
// Variables
const routes_guide_shields = express.Router();
/*
 * guide_shields
 */
// Create guide_shields
routes_guide_shields.post(
  "/shields",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      bonus: Joi.string(),
      extra_bonus: Joi.string(),
      property_especial: Joi.string(),
    }),
  }),
  guide_shields.create
);
// Select All guide_shields
routes_guide_shields.get(
  "/shields",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_shields.select_all_shields
);
// Update guide_shields
routes_guide_shields.put(
  "/shields/:id_shield",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_shield: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      bonus: Joi.string(),
      extra_bonus: Joi.string(),
      property_especial: Joi.string(),
    }),
  }),
  guide_shields.update_shield
);
// Delete guide_shields
routes_guide_shields.delete(
  "/shields/:id_shield",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_shield: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_shields.delete_shield
);
// Export routes_guide_shields
module.exports = routes_guide_shields;
