// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide_others = require("../controllers/guide_others");
// Variables
const routes_guide_others = express.Router();
/*
 * guide_others
 */
// Create guide_others
routes_guide_others.post(
  "/others",
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
  guide_others.create
);
// Select All guide_otherss
routes_guide_others.get(
  "/others",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_others.select_all_others
);
// Update guide_others
routes_guide_others.put(
  "/others/:id_other",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_other: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      bonus: Joi.string(),
      extra_bonus: Joi.string(),
      property_especial: Joi.string(),
    }),
  }),
  guide_others.update_other
);
// Delete guide_others
routes_guide_others.delete(
  "/others/:id_other",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_other: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_others.delete_other
);
// Export routes_guide_others
module.exports = routes_guide_others;
