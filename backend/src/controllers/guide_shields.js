// Requires
const connection = require("../database/connect");
const table_db = "RPG_guide_shields";
// Exports
module.exports = {
  /*
   * shields
   */
  // Create shields
  async create(request, res) {
    // Pega itens do body
    let {
      id_guide,
      bonus = "",
      extra_bonus = "",
      property_especial = "",
      main = null,
    } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar guide no banco:
      const guide = await connection("RPG_guide")
        .select("id_user")
        .where("id", id_guide);
      // Verificar se achou:
      if (guide.length > 0) {
        // Verifica se usuário pode adicionar
        if (user[0].id === guide[0].id_user) {
          // Consultar se o usuário já tem:
          const shields = await connection(table_db)
            .select("main")
            .where("id_guide", id_guide);
          if (shields.length === 0) {
            // Se não tiver, main tem que ser 1
            main = main === null ? 1 : main;
            // criar insert do banco
            let insert = {
              id_guide: id_guide,
              bonus: bonus,
              extra_bonus: extra_bonus,
              property_especial: property_especial,
              main: main,
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
                main: main,
              },
              data: { id: id },
              msg: "SUCCESS",
            });
          } else if (shields.length < 2) {
            if (main === null) {
              main = shields[0].main === 1 ? 0 : 1;
            } else if (shields[0].main === main) {
              main = shields[0].main > 0 ? 0 : 1;
            }
            // criar insert do banco
            let insert = {
              id_guide: id_guide,
              bonus: bonus,
              extra_bonus: extra_bonus,
              property_especial: property_especial,
              main: main,
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
                main: main,
              },
              data: { id: id },
              msg: "SUCCESS",
            });
          } else {
            // Resposta
            return res.status(400).json({
              msg:
                "Limite de Escudos Atingido. Adcionar a mochila ou excluir um escudo.",
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
  // Select All shields
  async select_all_shields(request, res) {
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
      // Consultar guide
      const guide = await connection("RPG_guide")
        .select("id_user")
        .where("id", id_guide);
      // Verificar se achou:
      if (guide.length > 0) {
        // Verifica se usuário pode adicionar
        if (user[0].id === guide[0].id_user) {
          // Consulta quantos tem no banco
          const shields = await connection(table_db)
            .select(
              "id",
              "id_guide",
              "bonus",
              "extra_bonus",
              "property_especial",
              "main"
            )
            .where("id_guide", id_guide)
            .orderBy("main", "desc");
          // Resposta
          res.header("X-Total-Count", shields.length);
          return res.json({
            rows: shields.length,
            data: shields,
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
  // Update shields
  async update_shield(request, res) {
    // Pega itens do body
    let {
      id_guide,
      bonus = "",
      extra_bonus = "",
      property_especial = "",
      main = 1,
    } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_shield } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar shields:
      const shields = await connection(table_db)
        .select(".RPG_guide.id_user", ".RPG_guide.id", table_db + ".main")
        .join("RPG_guide", function () {
          this.on({
            "RPG_guide.id": id_guide,
          });
        })
        .where(table_db + ".id", id_shield);
      // Verificar se achou:
      if (shields.length > 0) {
        // Verifica se usuário pode adicionar
        if (user[0].id === shields[0].id_user) {
          // Procura todas as armas
          const shields_2 = await connection(table_db)
            .select("id", "main")
            .where("id", id_shield);
          // Verifica quantas armas tem
          if (shields_2.length === 1) {
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
              .where({ id: id_shield });
          } else {
            let id_other = 0;
            let main_other = 0;
            // Se tiver mais de uma
            // Verifica se a primeira que achou não é a que estamos tratando
            if (shields_2[0].id !== id_shield) {
              id_other = shields_2[0].id;
              main_other = shields_2[0].main;
            } else {
              id_other = shields_2[1].id;
              main_other = shields_2[1].main;
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
                .where({ id: id_shield });
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
                .where({ id: id_shield });
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
                .where({ id: id_shield });
            }
          }
          // Resposta
          return res.json({
            query: {
              id_guide: id_guide,
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
  // Delete shields
  async delete_shield(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_shield } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar se o usuário já tem um personagem com o mesmo nome:
      const shields = await connection(table_db)
        .select(".RPG_guide.id_user", ".RPG_guide.id", table_db + ".main")
        .join("RPG_guide", function () {
          this.on({
            "RPG_guide_shields.id": id_shield,
          });
        })
        .where(table_db + ".id", id_shield);
      // Verificar se achou:
      if (shields.length > 0) {
        // Verifica se usuário pode adicionar shieldss
        if (user[0].id === shields[0].id_user) {
          await connection(table_db).where("id", id_shield).delete();
          if (shields[0].main === 1) {
            await connection(table_db)
              .update({ main: 1 })
              .where({ id_guide: shields[0].id, main: 0 });
          }
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
};
