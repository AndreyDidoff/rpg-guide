// Requires
const connection = require("../database/connect");
const validators = require("./validators");
// Exports
module.exports = {
  /*
   * Alignment
   */
  // Create New Alignment
  async create_alignments(request, res) {
    // Pega itens do body
    const { id_user, name } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_alignment", {
        name: name,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
        // Inserir no banco os dados
        const [id] = await connection("RPG_alignment").insert({ name: name });
        // Resposta
        return res.json({
          query: name,
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Alignments
  async select_all_alignments(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_alignment");
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  /*
   * Classes
   */
  // Create New Classes
  async create_class(request, res) {
    // Pega itens do body
    const { id_user, name, dice_life } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_classes", {
        name: name,
        dice_life: dice_life,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
        // Inserir no banco os dados
        const [id] = await connection("RPG_classes").insert({
          name: name,
          dice_life: dice_life,
        });
        // Resposta
        return res.json({
          query: { name: name, dice_life: dice_life },
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select Class Using id
  async select_class_id(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id } = request.params;
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_classes", {
        id: id,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Classes
  async select_all_classes(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_classes");
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  /*
   * Color Eye
   */
  // Create New Color Eye
  async create_color_eye(request, res) {
    // Pega itens do body
    const { id_user, name } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_color_eye", {
        name: name,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
        // Inserir no banco os dados
        const [id] = await connection("RPG_color_eye").insert({ name: name });
        // Resposta
        return res.json({
          query: name,
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Colors Eye
  async select_all_color_eye(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_color_eye");
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  /*
   * Color Hair
   */
  // Create New Color Hair
  async create_color_hair(request, res) {
    // Pega itens do body
    const { id_user, name } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_color_hair", {
        name: name,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
        // Inserir no banco os dados
        const [id] = await connection("RPG_color_hair").insert({ name: name });
        // Resposta
        return res.json({
          query: name,
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Colors Hair
  async select_all_color_hair(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_color_hair");
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  /*
   * Color Skin
   */
  // Create New Color Skin
  async create_color_skin(request, res) {
    // Pega itens do body
    const { id_user, name } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_color_skin", {
        name: name,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
        // Inserir no banco os dados
        const [id] = await connection("RPG_color_skin").insert({ name: name });
        // Resposta
        return res.json({
          query: name,
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Colors Skin
  async select_all_color_skin(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_color_skin");
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  /*
   * Language
   */
  // Create New Language
  async create_language(request, res) {
    // Pega itens do body
    const { id_user, name } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_languages", {
        name: name,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
        // Inserir no banco os dados
        const [id] = await connection("RPG_languages").insert({ name: name });
        // Resposta
        return res.json({
          query: name,
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Languages
  async select_all_languages(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_languages");
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
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
      id_user,
      name,
      circle,
      level,
      formulation_time,
      duraction,
      reach,
      target,
      resistance,
      description,
    } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_magics", {
        name: name,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
        // Inserir no banco os dados
        const [id] = await connection("RPG_magics").insert({
          name: name,
          circle: circle,
          level: level,
          formulation_time: formulation_time,
          duraction: duraction,
          reach: reach,
          target: target,
          resistance: resistance,
          description: description,
        });
        // Resposta
        return res.json({
          query: {
            name: name,
            circle: circle,
            level: level,
            formulation_time: formulation_time,
            duraction: duraction,
            reach: reach,
            target: target,
            resistance: resistance,
            description: description,
          },
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select Magic Using id
  async select_magic_id(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id } = request.params;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_magics", {
        id: id,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Consulta quantos tem no banco
        const magic = await connection("RPG_magics")
          .select(
            "name",
            "circle",
            "level",
            "formulation_time",
            "duraction",
            "reach",
            "target",
            "resistance",
            "description"
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Magics
  async select_all_magics(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_magics");
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Consulta quantos tem no banco
        const magics = await connection("RPG_magics")
          .select(
            "name",
            "circle",
            "level",
            "formulation_time",
            "duraction",
            "reach",
            "target",
            "resistance",
            "description"
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  /*
   * Money
   */
  // Create New Money
  async create_money(request, res) {
    // Pega itens do body
    const { id_user, name, initials } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_money", {
        name: name,
        initials: initials,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
        // Inserir no banco os dados
        const [id] = await connection("RPG_money").insert({
          name: name,
          initials: initials,
        });
        // Resposta
        return res.json({
          query: {
            name: name,
            initials: initials,
          },
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select Money Using id
  async select_money_id(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id } = request.params;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_money", {
        id: id,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Consulta quantos tem no banco
        const magic = await connection("RPG_money")
          .select("name", "initials")
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Money
  async select_all_money(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_money");
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Consulta quantos tem no banco
        const money = await connection("RPG_money")
          .select("name", "initials")
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
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
      id_user,
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
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_races", {
        name: name,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
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
          query: {
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
          },
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select Race Using id
  async select_race_id(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id } = request.params;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_races", {
        id: id,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Consulta quantos tem no banco
        const race = await connection("RPG_races")
          .select(
            "name",
            "force_add",
            "dexterity_add",
            "constitution_add",
            "intelligence_add",
            "wisdom_add",
            "charisma_add",
            "displacement",
            "min_age",
            "max_age"
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Races
  async select_all_races(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_races");
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Consulta quantos tem no banco
        const races = await connection("RPG_races")
          .select(
            "name",
            "force_add",
            "dexterity_add",
            "constitution_add",
            "intelligence_add",
            "wisdom_add",
            "charisma_add",
            "displacement",
            "min_age",
            "max_age"
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select Cross Race Languages
  async select_cross_race_languages(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_race } = request.params;
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens(
        "RPG_race_languages",
        {
          id_race: id_race,
        }
      );
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Consulta quantos tem no banco
        const languages = await connection("RPG_race_languages")
          .select("RPG_languages.name")
          .join("RPG_languages", function () {
            this.on({
              "RPG_race_languages.id_race": id_race,
              "RPG_race_languages.id_language": "RPG_languages.id",
            });
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  /*
   * Size
   */
  // Create New Size
  async create_size(request, res) {
    // Pega itens do body
    const { id_user, name, height = 0, width = 0 } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_size", {
        name: name,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
        // Inserir no banco os dados
        const [id] = await connection("RPG_size").insert({
          name: name,
          height: height,
          width: width,
        });
        // Resposta
        return res.json({
          query: {
            name: name,
            height: height,
            width: width,
          },
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Sizes
  async select_all_sizes(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_size");
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
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
        return res.status(res_count_item.status).json({
          msg: res_count_item.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
};
