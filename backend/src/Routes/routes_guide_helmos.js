// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide_helmos = require("../controllers/guide_helmos");
// Variables
const routes_guide_helmos = express.Router();
/*
 * guide_helmos
 */
// Create guide_helmos
routes_guide_helmos.post(
  "/helmos",
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
  guide_helmos.create
);
// Select All guide_helmoss
routes_guide_helmos.get(
  "/helmos",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_helmos.select_all_helmos
);
// Update guide_helmos
routes_guide_helmos.put(
  "/helmos/:id_helmo",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_helmo: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      bonus: Joi.string(),
      extra_bonus: Joi.string(),
      property_especial: Joi.string(),
    }),
  }),
  guide_helmos.update_helmo
);
// Delete guide_helmos
routes_guide_helmos.delete(
  "/helmos/:id_helmo",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_helmo: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_helmos.delete_helmo
);
// Export routes_guide_helmos
module.exports = routes_guide_helmos;
