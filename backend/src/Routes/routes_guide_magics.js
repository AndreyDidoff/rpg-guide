// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide_magics = require("../controllers/guide_magics");
// Variables
const routes_guide_magics = express.Router();
/*
 * guide_magics
 */
// Create guide_magics
routes_guide_magics.post(
  "/magics",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      id_magic: Joi.number().required(),
      vocal_text: Joi.string(),
      material_text: Joi.string(),
      gestual_text: Joi.string(),
      item_text: Joi.string(),
      description_user: Joi.string(),
    }),
  }),
  guide_magics.create
);
// Select All guide_magicss
routes_guide_magics.get(
  "/magics",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_magics.select_all_magics
);
// Update guide_magics
routes_guide_magics.put(
  "/magics",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      id_magic: Joi.number().required(),
      vocal_text: Joi.string(),
      material_text: Joi.string(),
      gestual_text: Joi.string(),
      item_text: Joi.string(),
      description_user: Joi.string(),
    }),
  }),
  guide_magics.update_magic
);
// Delete guide_magics
routes_guide_magics.delete(
  "/magics/:id_magic",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_magic: Joi.number().required(),
    }),
  }),
  guide_magics.delete_magic
);
// Export routes_guide_magics
module.exports = routes_guide_magics;
