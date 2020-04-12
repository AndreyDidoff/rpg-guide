const knex = require('knex');
const configuration = require('../../knexfile');
const database = process.env.NODE_ENV==='test'?configuration.test:configuration.development;
const connection = knex(database);
module.exports = connection;