// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const session = require("../controllers/session");
// Variables
const routes_session = express.Router();
/*
 * SESSION
 */
// Create session
routes_session.post(
  "/session",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nickname: Joi.string().required(),
      passwd: Joi.string().required().min(8),
    }),
  }),
  session.create
);
// Get session
routes_session.get(
  "/session",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      token: Joi.string().required(),
    }),
  }),
  session.confirm
);
// Delete session
routes_session.delete(
  "/session",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id_user: Joi.number().required(),
      token: Joi.string().required(),
    }),
  }),
  session.delete
);

// Export routes_session
module.exports = routes_session;
