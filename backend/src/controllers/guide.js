// Requires
const connection = require("../database/connect");
const table_db = "RPG_guide";
// Exports
module.exports = {
  /*
   * Guide
   */
  // Create Guide
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
      if (count_guide["count(*)"] === 0) {
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
          query: {
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
          },
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
  // Select All Guides
  async select_all_guides(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("cod")
      .where("id", id_user)
      .limit(1);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      if (user[0].cod === cod_user) {
        // Consulta quantos tem no banco
        const guides = await connection(table_db)
          .select(
            "id_alignment",
            "id_class",
            "id_color_eye",
            "id_color_hair",
            "id_color_skin",
            "id_race",
            "id_size",
            "id_user",
            "age",
            "charisma",
            "constitution",
            "dexterity",
            "force",
            "heigth",
            "intelligence",
            "money_copper",
            "money_gold",
            "money_platinum",
            "money_silver",
            "movement",
            "name",
            "secret_story",
            "story",
            "weight",
            "wisdom",
            "xp"
          )
          .orderBy("name");
        // Resposta
        res.header("X-Total-Count", guides.length);
        return res.json({
          rows: guides.length,
          data: guides,
          msg: "SUCCESS",
        });
      } else {
        // Resposta
        return res.status(400).json({
          msg: "Usuário não autorizado",
        });
      }
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Update Guide
  async update_guide(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_guide } = request.params;
    // Pega itens do body
    const {
      id_alignment,
      id_class,
      id_color_eye,
      id_color_hair,
      id_color_skin,
      id_race,
      id_size,
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
        .where("id", id_guide)
        .count();
      // Verificar se achou:
      if (count_guide["count(*)"] !== 0) {
        await connection(table_db)
          .update({
            id_alignment: id_alignment,
            id_class: id_class,
            id_color_eye: id_color_eye,
            id_color_hair: id_color_hair,
            id_color_skin: id_color_skin,
            id_race: id_race,
            id_size: id_size,
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
          })
          .where({ id: id_guide });
        // Resposta
        return res.json({
          query: {
            id_alignment: id_alignment,
            id_class: id_class,
            id_color_eye: id_color_eye,
            id_color_hair: id_color_hair,
            id_color_skin: id_color_skin,
            id_race: id_race,
            id_size: id_size,
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
          },
          msg: "SUCCESS",
        });
      } else {
        // Resposta
        return res.status(406).json({
          msg: "Personagem não encontrado",
        });
      }
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Delete All Guides
  async delete_guide(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_guide } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user)
      .limit(1);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consulta se a guide existe
      const guide = await connection(table_db)
        .select("id_user")
        .where("id", id_guide)
        .limit(1);
      // Verifica se encontrou uma guide
      if (guide.length > 0) {
        // Verifica se o usuário que solicitou pode apagar essa guide
        if (user[0].id === guide[0].id_user) {
          await connection(table_db).where("id", id_guide).delete();
          // Resposta
          return res.json({
            msg: "SUCCESS",
          });
        } else {
          // Resposta
          return res.status(400).json({
            msg: "Usuário não autorizado",
          });
        }
      } else {
        // Resposta
        return res.status(404).json({
          msg: "Personagem não encontrado",
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
