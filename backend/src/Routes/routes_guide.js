// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const guide = require("../controllers/guide");
// Variables
const routes_guide = express.Router();
/*
 * guide
 */
// Create guide
routes_guide.post(
  "/guide",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id_alignment: Joi.number().required(),
      id_class: Joi.number().required(),
      id_color_eye: Joi.number().required(),
      id_color_hair: Joi.number().required(),
      id_color_skin: Joi.number().required(),
      id_race: Joi.number().required(),
      id_size: Joi.number().required(),
      id_user: Joi.number().required(),
      age: Joi.number().required(),
      charisma: Joi.number(),
      constitution: Joi.number(),
      dexterity: Joi.number(),
      force: Joi.number(),
      heigth: Joi.number().required(),
      intelligence: Joi.number(),
      money_copper: Joi.number(),
      money_gold: Joi.number(),
      money_platinum: Joi.number(),
      money_silver: Joi.number(),
      movement: Joi.number(),
      name: Joi.string().required(),
      secret_story: Joi.string(),
      story: Joi.string(),
      weight: Joi.number().required(),
      wisdom: Joi.number(),
      xp: Joi.number(),
    }),
  }),
  guide.create
);
// Select All Guides
routes_guide.get(
  "/guide",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
    }),
  }),
  guide.select_all_guides
);
// Update Guide
routes_guide.put(
  "/guide/:id_guide",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_guide: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      id_alignment: Joi.number().required(),
      id_class: Joi.number().required(),
      id_color_eye: Joi.number().required(),
      id_color_hair: Joi.number().required(),
      id_color_skin: Joi.number().required(),
      id_race: Joi.number().required(),
      id_size: Joi.number().required(),
      age: Joi.number().required(),
      charisma: Joi.number(),
      constitution: Joi.number(),
      dexterity: Joi.number(),
      force: Joi.number(),
      heigth: Joi.number().required(),
      intelligence: Joi.number(),
      money_copper: Joi.number(),
      money_gold: Joi.number(),
      money_platinum: Joi.number(),
      money_silver: Joi.number(),
      movement: Joi.number(),
      name: Joi.string().required(),
      secret_story: Joi.string(),
      story: Joi.string(),
      weight: Joi.number().required(),
      wisdom: Joi.number(),
      xp: Joi.number(),
    }),
  }),
  guide.update_guide
);
// Delete Guide
routes_guide.delete(
  "/guide/:id_guide",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_guide: Joi.number().required(),
    }),
  }),
  guide.delete_guide
);
// Export routes_guide
module.exports = routes_guide;
