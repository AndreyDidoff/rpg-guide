// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide_language = require("../controllers/guide_languages");
// Variables
const routes_guide_language = express.Router();
/*
 * guide_language
 */
// Create guide_language
routes_guide_language.post(
  "/language",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      id_languages: Joi.array().required(),
    }),
  }),
  guide_language.create
);
// Select All guide_languages
routes_guide_language.get(
  "/language",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_language.select_all_languages
);
// Update guide_language
routes_guide_language.put(
  "/language",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      id_languages: Joi.array().required(),
    }),
  }),
  guide_language.update_language
);
// Delete guide_language
routes_guide_language.delete(
  "/language",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      id_languages: Joi.array().required(),
    }),
  }),
  guide_language.delete_language
);
// Export routes_guide_language
module.exports = routes_guide_language;
