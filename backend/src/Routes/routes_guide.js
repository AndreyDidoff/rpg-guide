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
      nickname: Joi.string().required(),
      passwd: Joi.string().required().min(8),
    }),
  }),
  guide.create
);
// Get guide
routes_guide.get(
  "/guide",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  guide.create
);
// Delete guide

// Mod guide

// Export routes_guide
module.exports = routes_guide;
