// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const others = require("../controllers/others");
// Variables
const routes_others = express.Router();
/*
 * others
 */
// Create others
routes_others.post(
  "/others",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nickname: Joi.string().required(),
      passwd: Joi.string().required().min(8),
    }),
  }),
  others.create
);
// Get others
routes_others.get(
  "/others",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.create
);
// Delete others

// Mod others

// Export routes_others
module.exports = routes_others;
