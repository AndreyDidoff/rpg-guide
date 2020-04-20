// Requires
const bcrypt = require("bcryptjs");
const moment = require("moment");
const connection = require("../database/connect");
// Exports
module.exports = {
  /*
   * Alignment
   */
  // Create New Alignment
  async create_alignments(request, res) {
    // Pega itens do body
    const { name } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Inserir no banco os dados
      const [id] = await connection("RPG_alignment").insert("name", name);
      // Resposta
      return res.json({
        query: body,
        data: { id: id },
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select All Alignments
  async select_all_alignments(request, res) {
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const alignments = await connection("RPG_alignment")
        .select("name")
        .orderBy("name");
      // Resposta
      res.header("X-Total-Count", alignments.length);
      return res.json({
        rows: alignments.length,
        data: alignments,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  /*
   * Classes
   */
  // Create New Classes
  async create_class(request, res) {
    // Pega itens do body
    const { name, dice_life } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Inserir no banco os dados
      const [id] = await connection("RPG_classes").insert({
        name: name,
        dice_life: dice_life,
      });
      // Resposta
      return res.json({
        query: body,
        data: { id: id },
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select Class Using id
  async select_class_id(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const class_db = await connection("RPG_classes")
        .select("name", "dice_life")
        .where("id", id)
        .limit(1);
      // Resposta
      res.header("X-Total-Count", class_db.length);
      return res.json({
        data: class_db,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select All Classes
  async select_all_classes(request, res) {
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const classes = await connection("RPG_classes")
        .select("name", "dice_life")
        .orderBy("name");
      // Resposta
      res.header("X-Total-Count", classes.length);
      return res.json({
        rows: classes.length,
        data: classes,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  /*
   * Color Eye
   */
  // Create New Color Eye
  async create_color_eye(request, res) {
    // Pega itens do body
    const { name } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Inserir no banco os dados
      const [id] = await connection("RPG_color_eye").insert("name", name);
      // Resposta
      return res.json({
        query: body,
        data: { id: id },
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select All Colors Eye
  async select_all_color_eye(request, res) {
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const colors_eye = await connection("RPG_color_eye")
        .select("name")
        .orderBy("name");
      // Resposta
      res.header("X-Total-Count", colors_eye.length);
      return res.json({
        rows: colors_eye.length,
        data: colors_eye,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  /*
   * Color Hair
   */
  // Create New Color Hair
  async create_color_hair(request, res) {
    // Pega itens do body
    const { name } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Inserir no banco os dados
      const [id] = await connection("RPG_color_hair").insert("name", name);
      // Resposta
      return res.json({
        query: body,
        data: { id: id },
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select All Colors Hair
  async select_all_color_hair(request, res) {
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const colors_hair = await connection("RPG_color_hair")
        .select("name")
        .orderBy("name");
      // Resposta
      res.header("X-Total-Count", colors_hair.length);
      return res.json({
        rows: colors_hair.length,
        data: colors_hair,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  /*
   * Color Skin
   */
  // Create New Color Skin
  async create_color_skin(request, res) {
    // Pega itens do body
    const { name } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Inserir no banco os dados
      const [id] = await connection("RPG_color_skin").insert("name", name);
      // Resposta
      return res.json({
        query: body,
        data: { id: id },
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select All Colors Skin
  async select_all_color_skin(request, res) {
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const colors_skin = await connection("RPG_color_skin")
        .select("name")
        .orderBy("name");
      // Resposta
      res.header("X-Total-Count", colors_skin.length);
      return res.json({
        rows: colors_skin.length,
        data: colors_skin,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  /*
   * Language
   */
  // Create New Language
  async create_language(request, res) {
    // Pega itens do body
    const { name } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Inserir no banco os dados
      const [id] = await connection("RPG_languages").insert("name", name);
      // Resposta
      return res.json({
        query: body,
        data: { id: id },
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select All Languages
  async select_all_languages(request, res) {
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const languages = await connection("RPG_languages")
        .select("name")
        .orderBy("name");
      // Resposta
      res.header("X-Total-Count", languages.length);
      return res.json({
        rows: languages.length,
        data: languages,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  /*
   * Magic
   */
  // Create New Magic
  async create_magic(request, res) {
    // Pega itens do body
    const {
      name,
      circle,
      level,
      formulation_time,
      duration,
      reach,
      target,
      resistance,
      description,
    } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Inserir no banco os dados
      const [id] = await connection("RPG_magics").insert({
        name: name,
        circle: circle,
        level: level,
        formulation_time: formulation_time,
        duration: duration,
        reach: reach,
        target: target,
        resistance: resistance,
        description: description,
      });
      // Resposta
      return res.json({
        query: body,
        data: { id: id },
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select Magic Using id
  async select_magic_id(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const magic = await connection("RPG_magics")
        .select(
          name,
          circle,
          level,
          formulation_time,
          duration,
          reach,
          target,
          resistance,
          description
        )
        .where("id", id)
        .limit(1);
      // Resposta
      res.header("X-Total-Count", magic.length);
      return res.json({
        data: magic,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select All Magics
  async select_all_magics(request, res) {
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const magics = await connection("RPG_magics")
        .select(
          name,
          circle,
          level,
          formulation_time,
          duration,
          reach,
          target,
          resistance,
          description
        )
        .orderBy("name");
      // Resposta
      res.header("X-Total-Count", magics.length);
      return res.json({
        rows: magics.length,
        data: magics,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  /*
   * Money
   */
  // Create New Money
  async create_money(request, res) {
    // Pega itens do body
    const { name, initials } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Inserir no banco os dados
      const [id] = await connection("RPG_money").insert({
        name: name,
        initials: initials,
      });
      // Resposta
      return res.json({
        query: body,
        data: { id: id },
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select Money Using id
  async select_money_id(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const magic = await connection("RPG_money")
        .select(name, initials)
        .where("id", id)
        .limit(1);
      // Resposta
      res.header("X-Total-Count", magic.length);
      return res.json({
        data: magic,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select All Money
  async select_all_money(request, res) {
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const money = await connection("RPG_money")
        .select(name, initials)
        .orderBy("name");
      // Resposta
      res.header("X-Total-Count", money.length);
      return res.json({
        rows: money.length,
        data: money,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  /*
   * Race
   */
  // Create New Race
  async create_race(request, res) {
    // Pega itens do body
    const {
      name,
      force_add = 0,
      dexterity_add = 0,
      constitution_add = 0,
      intelligence_add = 0,
      wisdom_add = 0,
      charisma_add = 0,
      displacement = 0,
      min_age = 0,
      max_age = 900,
    } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Inserir no banco os dados
      const [id] = await connection("RPG_races").insert({
        name: name,
        force_add: force_add,
        dexterity_add: dexterity_add,
        constitution_add: constitution_add,
        intelligence_add: intelligence_add,
        wisdom_add: wisdom_add,
        charisma_add: charisma_add,
        displacement: displacement,
        min_age: min_age,
        max_age: max_age,
      });
      // Resposta
      return res.json({
        query: body,
        data: { id: id },
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select Race Using id
  async select_race_id(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const race = await connection("RPG_races")
        .select(
          name,
          force_add,
          dexterity_add,
          constitution_add,
          intelligence_add,
          wisdom_add,
          charisma_add,
          displacement,
          min_age,
          max_age
        )
        .where("id", id)
        .limit(1);
      // Resposta
      res.header("X-Total-Count", race.length);
      return res.json({
        data: race,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select All Races
  async select_all_races(request, res) {
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const races = await connection("RPG_races")
        .select(
          name,
          force_add,
          dexterity_add,
          constitution_add,
          intelligence_add,
          wisdom_add,
          charisma_add,
          displacement,
          min_age,
          max_age
        )
        .orderBy("name");
      // Resposta
      res.header("X-Total-Count", races.length);
      return res.json({
        rows: races.length,
        data: races,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select Cross Race Languages
  async select_cross_race_languages(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_race } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const languages = await connection("RPG_race_languages")
        .select("RPG_languages.name")
        .join("RPG_languages", function () {
          this.on("RPG_race_languages.id_race", id_races);
        })
        .orderBy("name");
      // Resposta
      res.header("X-Total-Count", languages.length);
      return res.json({
        rows: languages.length,
        data: languages,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  /*
   * Size
   */
  // Create New Size
  async create_size(request, res) {
    // Pega itens do body
    const { name, height = 0, width = 0 } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Inserir no banco os dados
      const [id] = await connection("RPG_size").insert({
        name: name,
        height: height,
        width: width,
      });
      // Resposta
      return res.json({
        query: body,
        data: { id: id },
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select All Sizes
  async select_all_sizes(request, res) {
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const sizes = await connection("RPG_size")
        .select("name", "height", "width")
        .orderBy("name");
      // Resposta
      res.header("X-Total-Count", sizes.length);
      return res.json({
        rows: sizes.length,
        data: sizes,
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
};
