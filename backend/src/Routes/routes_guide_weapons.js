// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide_weapons = require("../controllers/guide_weapons");
// Variables
const routes_guide_weapons = express.Router();
/*
 * guide_weapons
 */
// Create guide_weapons
routes_guide_weapons.post(
  "/weapons",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      amount_dice_attack: Joi.number(),
      dice_attack: Joi.number(),
      bonus: Joi.number(),
      amount_dice_critical: Joi.number(),
      dice_critical: Joi.number(),
      reach: Joi.string(),
      type: Joi.string(),
      main: Joi.number().required(),
    }),
  }),
  guide_weapons.create
);
// Select All guide_weapons
routes_guide_weapons.get(
  "/weapons",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
    }),
  }),
  guide_weapons.select_all_weapons
);
// Update guide_weapons
routes_guide_weapons.put(
  "/weapons/:id_weapons",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_weapons: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      amount_dice_attack: Joi.number(),
      dice_attack: Joi.number(),
      bonus: Joi.number(),
      amount_dice_critical: Joi.number(),
      dice_critical: Joi.number(),
      reach: Joi.string(),
      type: Joi.string(),
      main: Joi.number(),
    }),
  }),
  guide_weapons.update_weapons
);
// Delete guide_weapons
routes_guide_weapons.delete(
  "/weapons/:id_weapons",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_weapons: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_guide: Joi.number().required(),
      main: Joi.number().required(),
    }),
  }),
  guide_weapons.delete_weapons
);
// Export routes_guide_weapons
module.exports = routes_guide_weapons;
