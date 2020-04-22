// Requires
const connection = require("../database/connect");
const validators = require("./validators");
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
    // Valida cod_user
    const res_cod_user = await validators.valida_cod(cod_user);
    // Verifica se encontrou usuário
    if (res_cod_user.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens(table_db, {
        name: name,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
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
          query: insert,
          data: { id: id },
          msg: "SUCCESS",
        });
      } else {
        // Resposta
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_cod_user.status).json({
        msg: res_cod_user.msg,
      });
    }
  },
  // Select All Guides
  async select_all_guides(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Valida cod_user
    const res_cod_user = await validators.valida_cod(cod_user);
    // Verifica se encontrou usuário
    if (res_cod_user.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens(table_db, {
        id_user: id_user,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Consulta quantos tem no banco
        const guides = await connection(table_db)
          .select(
            "id",
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_cod_user.status).json({
        msg: res_cod_user.msg,
      });
    }
  },
  // Update Guide
  async update_guide(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_guide } = request.params;
    // Pega itens do body
    const {
      id_alignment = null,
      id_class = null,
      id_color_eye = null,
      id_color_hair = null,
      id_color_skin = null,
      id_race = null,
      id_size = null,
      age = null,
      charisma = 0,
      constitution = 0,
      dexterity = 0,
      force = 0,
      heigth = null,
      intelligence = 0,
      money_copper = 0,
      money_gold = 0,
      money_platinum = 0,
      money_silver = 0,
      movement = 0,
      name = "",
      secret_story = "",
      story = "",
      weight = 0,
      wisdom = 0,
      xp = 0,
    } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Valida cod_user
    const res_cod_user = await validators.valida_cod(cod_user);
    // Verifica se encontrou usuário
    if (res_cod_user.res) {
      // Valida se guide existe e pertence ao usuário
      const res_guide = await validators.valida_guide(
        id_guide,
        res_cod_user.id_user
      );
      // Verifica se usuário pode adicionar
      if (res_guide.res) {
        let update = { id: id_guide };
        if (id_alignment !== null) {
          update["id_alignment"] = id_alignment;
        }
        if (id_class !== null) {
          update["id_class"] = id_class;
        }
        if (id_color_eye !== null) {
          update["id_color_eye"] = id_color_eye;
        }
        if (id_color_hair !== null) {
          update["id_color_hair"] = id_color_hair;
        }
        if (id_color_skin !== null) {
          update["id_color_skin"] = id_color_skin;
        }
        if (id_race !== null) {
          update["id_race"] = id_race;
        }
        if (id_size !== null) {
          update["id_size"] = id_size;
        }
        if (age !== null) {
          update["age"] = age;
        }
        if (charisma !== 0) {
          update["charisma"] = charisma;
        }
        if (constitution !== 0) {
          update["constitution"] = constitution;
        }
        if (dexterity !== 0) {
          update["dexterity"] = dexterity;
        }
        if (force !== 0) {
          update["force"] = force;
        }
        if (heigth !== null) {
          update["heigth"] = heigth;
        }
        if (intelligence !== 0) {
          update["intelligence"] = intelligence;
        }
        if (money_copper !== 0) {
          update["money_copper"] = money_copper;
        }
        if (money_gold !== 0) {
          update["money_gold"] = money_gold;
        }
        if (money_platinum !== 0) {
          update["money_platinum"] = money_platinum;
        }
        if (money_silver !== 0) {
          update["money_silver"] = money_silver;
        }
        if (movement !== 0) {
          update["movement"] = movement;
        }
        if (name !== "") {
          update["name"] = name;
        }
        if (secret_story !== "") {
          update["secret_story"] = secret_story;
        }
        if (story !== "") {
          update["story"] = story;
        }
        if (weight !== 0) {
          update["weight"] = weight;
        }
        if (wisdom !== 0) {
          update["wisdom"] = wisdom;
        }
        if (xp !== 0) {
          update["xp"] = xp;
        }
        await connection(table_db).update(update).where({ id: id_guide });
        // Resposta
        return res.json({
          query: update,
          msg: "SUCCESS",
        });
      } else {
        // Resposta
        return res.status(res_guide.status).json({
          msg: res_guide.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_cod_user.status).json({
        msg: res_cod_user.msg,
      });
    }
  },
  // Delete All Guides
  async delete_guide(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_guide } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Valida cod_user
    const res_cod_user = await validators.valida_cod(cod_user);
    // Verifica se encontrou usuário
    if (res_cod_user.res) {
      // Valida se guide existe e pertence ao usuário
      const res_guide = await validators.valida_guide(
        id_guide,
        res_cod_user.id_user
      );
      // Verifica se usuário pode adicionar
      if (res_guide.res) {
        await connection(table_db).where("id", id_guide).delete();
        // Resposta
        return res.json({
          msg: "SUCCESS",
        });
      } else {
        // Resposta
        return res.status(res_guide.status).json({
          msg: res_guide.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_cod_user.status).json({
        msg: res_cod_user.msg,
      });
    }
  },
};
