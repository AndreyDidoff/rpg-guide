// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide_table_history = require("../controllers/guide_table_history");
// Variables
const routes_guide_table_history = express.Router();
/*
 * guide_table_history
 */
// Create guide_table_history
routes_guide_table_history.post(
  "/table_history",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      id_table: Joi.number().required(),
      history_text: Joi.string().required(),
      datetime: Joi.string().required(),
    }),
  }),
  guide_table_history.create
);
// Select All guide_table_historys
routes_guide_table_history.get(
  "/table_history/:id_table",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_table: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_table_history.select_all_table_historys
);
// Update guide_table_history
routes_guide_table_history.put(
  "/table_history/:id_table_history",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_table_history: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      history_text: Joi.string().required(),
      datetime: Joi.string().required(),
    }),
  }),
  guide_table_history.update_table_history
);
// Delete guide_table_history
routes_guide_table_history.delete(
  "/table_history/:id_table_history",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_table_history: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_table_history.delete_table_history
);
// Export routes_guide_table_history
module.exports = routes_guide_table_history;
