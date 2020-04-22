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
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string(),
      resume: Joi.string(),
      id_user: Joi.number().required(),
    }),
  }),
  table.create
);
// Get Table using id
routes_table.get(
  "/table/:id",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  table.select_table_id
);
// Get All Tables
routes_table.get(
  "/table",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  table.select_all_tables
);
// Update Table
routes_table.put(
  "/table/:id_table",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_table: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string(),
      resume: Joi.string(),
    }),
  }),
  table.update_table
);
// Delete Table
routes_table.put(
  "/table/:id_table",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_table: Joi.number().required(),
    }),
  }),
  table.delete_table
);

// Create Cross User Table
routes_table.post(
  "/user/table",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_table: Joi.number().required(),
      master: Joi.number(),
    }),
  }),
  table.create_cross_user_table
);
// Select All User Tables
routes_table.get(
  "/user/:id_user/tables",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_user: Joi.number().required(),
    }),
  }),
  table.select_cross_user_tables
);
// Select All Table Users
routes_table.get(
  "/table/:id_table/users",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_table: Joi.number().required(),
    }),
  }),
  table.select_cross_table_users
);
// Delete Cross  User Table
routes_table.put(
  "/user/:id_user/table/:id_table",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_table: Joi.number().required(),
    }),
  }),
  table.delete_cross_user_table
);

// Export routes_table
module.exports = routes_table;
