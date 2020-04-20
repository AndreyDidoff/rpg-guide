// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const table = require("../controllers/table");
// Variables
const routes_table = express.Router();
/*
 * Table
 */
// Create table
routes_table.post(
  "/table",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nickname: Joi.string().required(),
      passwd: Joi.string().required().min(8),
    }),
  }),
  table.create
);
// Get table
routes_table.get(
  "/table",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  table.create
);
// Delete table

// Mod table

// Export routes_table
module.exports = routes_table;
