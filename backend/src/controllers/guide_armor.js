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
      main = 1,
    } = request.body;
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
          // Consultar se o usuário já tem uma arma:
          const [count_armor] = await connection(table_db)
            .where("id_guide", id_guide)
            .count();
          console.log(count_armor);
          if (count_armor["count(*)"] === 1) {
            main = 0;
          }
          if (count_armor["count(*)"] < 2) {
            // criar insert do banco
            let insert = {
              id_guide: id_guide,
              bonus: bonus,
              extra_bonus: extra_bonus,
              property_especial: property_especial,
              main: main,
            };
            // Inserir no banco os dados da guide nova
            const [id] = await connection(table_db).insert(insert);
            // Resposta
            return res.json({
              query: {
                id_guide: id_guide,
                bonus: bonus,
                extra_bonus: extra_bonus,
                property_especial: property_especial,
                main: main,
              },
              data: { id: id },
              msg: "SUCCESS",
            });
          } else {
            // Resposta
            return res.status(400).json({
              msg:
                "Limite de Armas Atingido. Adcionar a mochila ou excluir uma arma.",
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
          const guides = await connection(table_db)
            .select(
              "id_guide",
              "bonus",
              "extra_bonus",
              "property_especial",
              "main"
            )
            .where("id_guide", id_guide)
            .orderBy("main", "desc");
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
      main = 1,
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
        .select(".RPG_guide.id_user", ".RPG_guide.id", table_db + ".main")
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
          // Procura todas as armas
          const armors = await connection(table_db)
            .select("id", "main")
            .where("id_guide", id_guide);
          // Verifica quantas armas tem
          if (armors.length === 1) {
            // Define Obrigatóriamente main como 1
            main = 1;
            // Faz o Update
            await connection(table_db)
              .update({
                bonus: bonus,
                extra_bonus: extra_bonus,
                property_especial: property_especial,
                main: main,
              })
              .where({ id: id_armor });
          } else {
            let id_other = 0;
            let main_other = 0;
            // Se tiver mais de uma
            // Verifica se a primeira que achou não é a que estamos tratando
            if (armors[0].id !== id_armor) {
              id_other = armors[0].id;
              main_other = armors[0].main;
            } else {
              id_other = armors[1].id;
              main_other = armors[1].main;
            }
            if (main === main_other && main === 1) {
              // Faz o Update da primeira arma
              await connection(table_db)
                .update({
                  bonus: bonus,
                  extra_bonus: extra_bonus,
                  property_especial: property_especial,
                  main: 1,
                })
                .where({ id: id_armor });
              // Faz o Update da segunda arma
              await connection(table_db)
                .update({
                  main: 0,
                })
                .where({ id: id_other });
            } else if (main === main_other && main === 0) {
              // Faz o Update da primeira arma
              await connection(table_db)
                .update({
                  bonus: bonus,
                  extra_bonus: extra_bonus,
                  property_especial: property_especial,
                  main: 0,
                })
                .where({ id: id_armor });
              // Faz o Update da segunda arma
              await connection(table_db)
                .update({
                  main: 1,
                })
                .where({ id: id_other });
            } else {
              // Faz o Update
              await connection(table_db)
                .update({
                  bonus: bonus,
                  extra_bonus: extra_bonus,
                  property_especial: property_especial,
                  main: main,
                })
                .where({ id: id_armor });
            }
          }
          // Resposta
          return res.json({
            query: {
              bonus: bonus,
              extra_bonus: extra_bonus,
              property_especial: property_especial,
              main: main,
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
        .select(".RPG_guide.id_user", ".RPG_guide.id", table_db + ".main")
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
          await connection(table_db)
            .update({ main: 1 })
            .where("id_guide", armor[0].id);
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
