// Requires
const bcrypt = require("bcryptjs");
const moment = require("moment");
const connection = require("../database/connect");
const table_db = "RPG_guide";
// Exports
module.exports = {
  async create(request, res) {
    // Pega itens do body
    const {
      id_alignment,
      id_class,
      id_color_eye,
      id_color_hair,
      id_color_skin,
      id_race,
      id_size,
      id_user,
      age,
      charisma = 0,
      constitution = 0,
      dexterity = 0,
      force = 0,
      heigth,
      intelligence = 0,
      money_copper = 0,
      money_gold = 0,
      money_platinum = 0,
      money_silver = 0,
      movement = 0,
      name,
      secret_story = "",
      story = "",
      weight,
      wisdom = 0,
      xp = 0,
    } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consultar se o usuário já tem um personagem com o mesmo nome:
      const [count_guide] = await connection(table_db)
        .where("name", name)
        .count();
      // Verificar se achou:
      if (count["count(*)"] > 0) {
        // criar insert do banco
        let insert = {
          id_alignment: id_alignment,
          id_class: id_class,
          id_color_eye: id_color_eye,
          id_color_hair: id_color_hair,
          id_color_skin: id_color_skin,
          id_race: id_race,
          id_size: id_size,
          id_user: id_user,
          age: age,
          charisma: charisma,
          constitution: constitution,
          dexterity: dexterity,
          force: force,
          heigth: heigth,
          intelligence: intelligence,
          money_copper: money_copper,
          money_gold: money_gold,
          money_platinum: money_platinum,
          money_silver: money_silver,
          movement: movement,
          name: name,
          secret_story: secret_story,
          story: story,
          weight: weight,
          wisdom: wisdom,
          xp: xp,
        };
        // Inserir no banco os dados da guide nova
        const [id] = await connection(table_db).insert(insert);
        // Resposta
        return res.json({
          query: body,
          data: { id: id },
          msg: "SUCCESS",
        });
      } else {
        // Resposta
        return res.status(406).json({
          msg: "Nome já cadastrado",
        });
      }
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
};
