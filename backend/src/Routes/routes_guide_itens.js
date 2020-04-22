// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide_itens = require("../controllers/guide_itens");
// Variables
const routes_guide_itens = express.Router();
/*
 * guide_itens
 */
// Create guide_itens
routes_guide_itens.post(
  "/item",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_guide: Joi.number().required(),
      name: Joi.string().required(),
      description: Joi.string(),
      amount: Joi.number().required(),
      unit: Joi.string(),
    }),
  }),
  guide_itens.create
);
// Select All guide_itenss
routes_guide_itens.get(
  "/item",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_guide: Joi.number().required(),
    }),
  }),
  guide_itens.select_all_itens
);
// Update guide_itens
routes_guide_itens.put(
  "/item/:id_item",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_item: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_guide: Joi.number().required(),
      name: Joi.string(),
      description: Joi.string(),
      amount: Joi.number(),
      unit: Joi.string(),
    }),
  }),
  guide_itens.update_item
);
// Delete guide_itens
routes_guide_itens.delete(
  "/item/:id_item",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_item: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_guide: Joi.number().required(),
    }),
  }),
  guide_itens.delete_item
);
// Export routes_guide_itens
module.exports = routes_guide_itens;
