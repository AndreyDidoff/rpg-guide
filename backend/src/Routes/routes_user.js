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
// Select User id
routes_user.get(
  "/user/:id",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  user.select_id
);
// Update User
routes_user.put(
  "/user/:id_user",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_user: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      nickname: Joi.string(),
      passwd: Joi.string().min(8),
      email: Joi.string().email(),
    }),
  }),
  user.update
);
// Delete User
routes_user.delete(
  "/user/:id",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  user.delete
);

// Create Friend
routes_user.post(
  "/friend",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_friend: Joi.number().required(),
    }),
  }),
  user.create_friend
);
// Select All Friends
routes_user.get(
  "/friends",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  user.select_all_friends
);
// Create Friend
routes_user.put(
  "/friend",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      id_friend: Joi.number().required(),
      authorization: Joi.number().required(),
    }),
  }),
  user.update_friend
);
// Export routes_user
module.exports = routes_user;
