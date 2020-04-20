// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const user = require("../controllers/user");
// Variables
const routes_user = express.Router();
/*
 * Users / Friends
 */
// Create User
routes_user.post(
  "/user",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      nickname: Joi.string().required(),
      passwd: Joi.string().required().min(8),
      email: Joi.string().required().email(),
    }),
  }),
  user.create
);
// Get User
routes_user.get(
  "/user/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  user.select_id
);
// Get Friends
routes_user.get(
  "/friends",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  user.select_all_friends
);
// Delete User
routes_user.delete(
  "/user/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  user.delete
);
// Export routes_user
module.exports = routes_user;
