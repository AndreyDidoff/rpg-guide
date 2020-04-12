// Requires
const express = require('express');
const {celebrate,Segments,Joi} = require('celebrate');
// Controllers
const user = require('./controllers/user');
const session = require('./controllers/session');
const guide = require('./controllers/guide');
// Variables
const routes = express.Router();
/*
* Routes
*/
// SESSION
routes.get('/session',celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),session.create);
// ONG
routes.post('/ongs',celebrate({
   [Segments.BODY] :Joi.object().keys({
       name: Joi.string().required()
       ,email: Joi.string().required().email()
       ,whatsapp: Joi.string().required().min(10).max(11)
       ,city: Joi.string().required()
       ,uf: Joi.string().required().length(2)
   })
}),ong.create);
routes.get('/ongs',ong.select_all);
routes.get('/ongs/:id',ong.select_id);
// INCIDENTS
routes.post('/incidents',incident.create);
routes.get('/incidents', celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page: Joi.number()
    })
}),incident.select_all);
routes.get('/incidents/:id',incident.select_id);
routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id: Joi.number().required()
    })
}),incident.delete);
// Export routes
module.exports = routes;