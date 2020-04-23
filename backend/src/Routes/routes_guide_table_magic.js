// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide_table_magic = require("../controllers/guide_table_magic");
// Variables
const routes_guide_table_magic = express.Router();
/*
 * guide_table_magic
 */
// Create guide_table_magic
routes_guide_table_magic.post(
  "/table_magic",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      id_table: Joi.number().required(),
      id_magic: Joi.number().required(),
    }),
  }),
  guide_table_magic.create
);
// Select All guide_table_magics
routes_guide_table_magic.get(
  "/table_magic",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      id_table: Joi.number().required(),
    }),
  }),
  guide_table_magic.select_all_table_magics
);
// Delete guide_table_magic
routes_guide_table_magic.delete(
  "/table_magic",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      id_table: Joi.number().required(),
    }),
  }),
  guide_table_magic.delete_table_magic
);
// Export routes_guide_table_magic
module.exports = routes_guide_table_magic;
