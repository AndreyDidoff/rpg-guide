// Requires
const connection = require("../database/connect");
const table_db = "RPG_guide_armor";
// Exports
module.exports = {
  /*
   * Armor
   */
  // Create Armor
  async create(request, res) {
    // Pega itens do body
    let {
      id_guide,
      bonus = "",
      extra_bonus = "",
      property_especial = "",
    } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar a guide:
      const guide = await connection("RPG_guide")
        .select("id_user")
        .where("id", id_guide);
      // Verificar se achou:
      if (guide.length > 0) {
        // Verifica se usuário pode adicionar
        if (user[0].id === guide[0].id_user) {
          // Consultar se o usuário já tem:
          const [count_armor] = await connection(table_db)
            .where("id_guide", id_guide)
            .count();
          if (count_armor["count(*)"] === 0) {
            // criar insert do banco
            let insert = {
              id_guide: id_guide,
              bonus: bonus,
              extra_bonus: extra_bonus,
              property_especial: property_especial,
            };
            // Inserir no banco os dados
            const [id] = await connection(table_db).insert(insert);
            // Resposta
            return res.json({
              query: {
                id_guide: id_guide,
                bonus: bonus,
                extra_bonus: extra_bonus,
                property_especial: property_especial,
              },
              data: { id: id },
              msg: "SUCCESS",
            });
          } else {
            // Resposta
            return res.status(400).json({
              msg:
                "Limite de Armaduras Atingido. Adcionar a mochila ou excluir uma armadura.",
            });
          }
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
  // Select All Armors
  async select_all_armors(request, res) {
    // Pega itens do body
    const { id_guide } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar se o usuário já tem um personagem com o mesmo nome:
      const guide = await connection("RPG_guide")
        .select("id_user")
        .where("id", id_guide);
      // Verificar se achou:
      if (guide.length > 0) {
        // Verifica se usuário pode adicionar armors
        if (user[0].id === guide[0].id_user) {
          // Consulta quantos tem no banco
          const armors = await connection(table_db)
            .select(
              "id",
              "id_guide",
              "bonus",
              "extra_bonus",
              "property_especial"
            )
            .where("id_guide", id_guide);
          // Resposta
          res.header("X-Total-Count", armors.length);
          return res.json({
            rows: armors.length,
            data: armors,
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
  // Update Guide
  async update_armor(request, res) {
    // Pega itens do body
    let {
      id_guide,
      bonus = "",
      extra_bonus = "",
      property_especial = "",
    } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_armor } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar se o usuário já tem um personagem com o mesmo nome:
      const armor = await connection(table_db)
        .select(".RPG_guide.id_user", ".RPG_guide.id")
        .join("RPG_guide", function () {
          this.on({
            "RPG_guide.id": id_guide,
          });
        })
        .where(table_db + ".id", id_armor);
      // Verificar se achou:
      if (armor.length > 0) {
        // Verifica se usuário pode adicionar armors
        if (user[0].id === armor[0].id_user) {
          // Faz o Update
          await connection(table_db)
            .update({
              bonus: bonus,
              extra_bonus: extra_bonus,
              property_especial: property_especial,
            })
            .where({ id: id_armor });
          // Resposta
          return res.json({
            query: {
              bonus: bonus,
              extra_bonus: extra_bonus,
              property_especial: property_especial,
            },
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
          msg: "Arma não encontrada",
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
  async delete_armor(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_armor } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar se o usuário já tem um personagem com o mesmo nome:
      const armor = await connection(table_db)
        .select(".RPG_guide.id_user", ".RPG_guide.id")
        .join("RPG_guide", function () {
          this.on({
            "RPG_guide_armor.id": id_armor,
          });
        })
        .where(table_db + ".id", id_armor);
      // Verificar se achou:
      if (armor.length > 0) {
        // Verifica se usuário pode adicionar armors
        if (user[0].id === armor[0].id_user) {
          await connection(table_db).where("id", id_armor).delete();
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
