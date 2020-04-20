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
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  session.create
);
// Delete session

// Mod session
/*
// ONG
routes_session.post('/ongs',celebrate({
   [Segments.BODY] :Joi.object().keys({
       name: Joi.string().required()
       ,email: Joi.string().required().email()
       ,whatsapp: Joi.string().required().min(10).max(11)
       ,city: Joi.string().required()
       ,uf: Joi.string().required().length(2)
   })
}),ong.create);
routes_session.get('/ongs',ong.select_all);
routes_session.get('/ongs/:id',ong.select_id);
// INCIDENTS
routes_session.post('/incidents',incident.create);
routes_session.get('/incidents', celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page: Joi.number()
    })
}),incident.select_all);
routes_session.get('/incidents/:id',incident.select_id);
routes_session.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id: Joi.number().required()
    })
}),incident.delete);
*/
// Export routes_session
module.exports = routes_session;
