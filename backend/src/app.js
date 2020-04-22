// Requires
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const routes_user = require("./Routes/routes_user");
const routes_guide = require("./Routes/routes_guide");
const routes_guide_armor = require("./Routes/routes_guide_armor");
const routes_guide_helmos = require("./Routes/routes_guide_helmos");
const routes_guide_itens = require("./Routes/routes_guide_itens");
const routes_guide_language = require("./Routes/routes_guide_languages");
const routes_guide_magics = require("./Routes/routes_guide_magics");
const routes_guide_others = require("./Routes/routes_guide_others");
const routes_guide_shields = require("./Routes/routes_guide_shields");
const routes_guide_table_history = require("./Routes/routes_guide_table_history");
const routes_guide_weapons = require("./Routes/routes_guide_weapons");
const routes_session = require("./Routes/routes_session");
const routes_table = require("./Routes/routes_table");
const routes_others = require("./Routes/routes_others");
// Variables
const app = express();
// Execulting
app.use(cors());
app.use(express.json());
app.use(routes_user); // Routes User User
app.use(routes_guide); // Routes Guide
app.use(routes_guide_armor); // Routes Armor
app.use(routes_guide_helmos); // Routes Helmos
app.use(routes_guide_itens); // Routes Itens
app.use(routes_guide_language); // Routes Languages
app.use(routes_guide_magics); // Routes Magics
app.use(routes_guide_others); // Routes Others
app.use(routes_guide_shields); // Routes Shields
app.use(routes_guide_table_history); // Routes Table History
app.use(routes_guide_weapons); // Routes Weapons
app.use(routes_session); // Routes Session
app.use(routes_table); // Routes Table
app.use(routes_others); // Routes Others
app.use(errors());
module.exports = app;
