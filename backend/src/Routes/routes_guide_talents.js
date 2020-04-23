// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide_talents = require("../controllers/guide_talents");
// Variables
const routes_guide_talents = express.Router();
/*
 * guide_talents
 */
// Create guide_talents
routes_guide_talents.post(
  "/talents",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      lvl: Joi.number().required(),
    }),
  }),
  guide_talents.create
);
// Select All guide_talentss
routes_guide_talents.get(
  "/talents",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_talents.select_all_talents
);
// Update guide_talents
routes_guide_talents.put(
  "/talents/:id_talent",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_talent: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      name: Joi.string(),
      description: Joi.string(),
      lvl: Joi.number(),
    }),
  }),
  guide_talents.update_talent
);
// Delete guide_talents
routes_guide_talents.delete(
  "/talents/:id_talent",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_talent: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_talents.delete_talent
);
// Export routes_guide_talents
module.exports = routes_guide_talents;
