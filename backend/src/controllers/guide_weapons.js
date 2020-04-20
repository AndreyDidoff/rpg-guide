// Requires
const connection = require("../database/connect");
const table_db = "RPG_guide_weapons";
// Exports
module.exports = {
  /*
   * Weapons
   */
  // Create Weapons
  async create(request, res) {
    // Pega itens do body
    let {
      id_guide,
      amount_dice_attack = null,
      dice_attack = null,
      bonus = null,
      amount_dice_critical = null,
      dice_critical = null,
      reach = "",
      type = "",
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
          const weapons = await connection(table_db)
            .select("main")
            .where("id_guide", id_guide)
            .whereNot("main", 3);
          if (weapons.length === 0) {
            // Se não tiver, main tem que ser 1
            main = main !== 3 ? 1 : main;
            if (main === 3) {
              // Consulta quantas ocultas tem
              const [count_oculta] = await connection(table_db)
                .where({ id_guide: id_guide, main: 3 })
                .count();
              console.log(count_oculta["count(*)"]);
              // Se já tiver
              if (count_oculta["count(*)"] > 0) {
                // Resposta
                return res.status(400).json({
                  msg:
                    "Limite de Armas Atingido. Adcionar a mochila ou excluir uma arma.",
                });
              }
            }
            // criar insert do banco
            let insert = {
              id_guide: id_guide,
              amount_dice_attack: amount_dice_attack,
              dice_attack: dice_attack,
              bonus: bonus,
              amount_dice_critical: amount_dice_critical,
              dice_critical: dice_critical,
              reach: reach,
              type: type,
              main: main,
            };
            // Inserir no banco os dados
            const [id] = await connection(table_db).insert(insert);
            // Resposta
            return res.json({
              query: {
                id_guide: id_guide,
                amount_dice_attack: amount_dice_attack,
                dice_attack: dice_attack,
                bonus: bonus,
                amount_dice_critical: amount_dice_critical,
                dice_critical: dice_critical,
                reach: reach,
                type: type,
                main: main,
              },
              data: { id: id },
              msg: "SUCCESS",
            });
          } else if (weapons.length < 2) {
            if (main === 3) {
              // Consulta quantas ocultas tem
              const [count_oculta] = await connection(table_db)
                .where({ id_guide: id_guide, main: 3 })
                .count();
              // Se já tiver
              if (count_oculta["count(*)"] === 1) {
                // Resposta
                return res.status(400).json({
                  msg:
                    "Limite de Armas Atingido. Adcionar a mochila ou excluir uma arma.",
                });
              }
            }
            if (main === null) {
              main = weapons[0].main === 1 ? 0 : 1;
            } else if (weapons[0].main === main) {
              main = weapons[0].main > 0 ? 0 : 1;
            }
            // criar insert do banco
            let insert = {
              id_guide: id_guide,
              amount_dice_attack: amount_dice_attack,
              dice_attack: dice_attack,
              bonus: bonus,
              amount_dice_critical: amount_dice_critical,
              dice_critical: dice_critical,
              reach: reach,
              type: type,
              main: main,
            };
            // Inserir no banco os dados
            const [id] = await connection(table_db).insert(insert);
            // Resposta
            return res.json({
              query: {
                id_guide: id_guide,
                amount_dice_attack: amount_dice_attack,
                dice_attack: dice_attack,
                bonus: bonus,
                amount_dice_critical: amount_dice_critical,
                dice_critical: dice_critical,
                reach: reach,
                type: type,
                main: main,
              },
              data: { id: id },
              msg: "SUCCESS",
            });
          } else if (weapons.length === 2 && main === 3) {
            // Consulta quantas ocultas tem
            const [count_oculta] = await connection(table_db)
              .where({ id_guide: id_guide, main: 3 })
              .count();
            // Se já tiver
            if (count_oculta["count(*)"] === 1) {
              // Resposta
              return res.status(400).json({
                msg:
                  "Limite de Armas Atingido. Adcionar a mochila ou excluir uma arma.",
              });
            }
            // criar insert do banco
            let insert = {
              id_guide: id_guide,
              amount_dice_attack: amount_dice_attack,
              dice_attack: dice_attack,
              bonus: bonus,
              amount_dice_critical: amount_dice_critical,
              dice_critical: dice_critical,
              reach: reach,
              type: type,
              main: main,
            };
            // Inserir no banco os dados
            const [id] = await connection(table_db).insert(insert);
            // Resposta
            return res.json({
              query: {
                id_guide: id_guide,
                amount_dice_attack: amount_dice_attack,
                dice_attack: dice_attack,
                bonus: bonus,
                amount_dice_critical: amount_dice_critical,
                dice_critical: dice_critical,
                reach: reach,
                type: type,
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
  // Select All Weapons
  async select_all_weapons(request, res) {
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
          const weapons = await connection(table_db)
            .select(
              "id",
              "id_guide",
              "amount_dice_attack",
              "dice_attack",
              "bonus",
              "amount_dice_critical",
              "dice_critical",
              "reach",
              "type",
              "main"
            )
            .where("id_guide", id_guide)
            .orderBy("main", "desc");
          // Resposta
          res.header("X-Total-Count", weapons.length);
          return res.json({
            rows: weapons.length,
            data: weapons,
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
  // Update Weapons
  async update_weapons(request, res) {
    // Pega itens do body
    let {
      id_guide,
      amount_dice_attack = null,
      dice_attack = null,
      bonus = null,
      amount_dice_critical = null,
      dice_critical = null,
      reach = "",
      type = "",
      main = 1,
    } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_weapons } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar weapons:
      const weapons = await connection(table_db)
        .select(".RPG_guide.id_user", ".RPG_guide.id", table_db + ".main")
        .join("RPG_guide", function () {
          this.on({
            "RPG_guide.id": id_guide,
          });
        })
        .where(table_db + ".id", id_weapons);
      // Verificar se achou:
      if (weapons.length > 0) {
        // Verifica se usuário pode adicionar
        if (user[0].id === weapons[0].id_user) {
          // Procura todas as armas
          const weapons_2 = await connection(table_db)
            .select("id", "main")
            .where("id_guide", id_guide);
          // Verifica quantas armas tem
          if (weapons_2.length === 1) {
            // Define Obrigatóriamente main como 1
            main = 1;
            // Faz o Update
            await connection(table_db)
              .update({
                amount_dice_attack: amount_dice_attack,
                dice_attack: dice_attack,
                bonus: bonus,
                amount_dice_critical: amount_dice_critical,
                dice_critical: dice_critical,
                reach: reach,
                type: type,
                main: main,
              })
              .where({ id: id_weapons });
          } else {
            let id_other = 0;
            let main_other = 0;
            // Se tiver mais de uma
            // Verifica se a primeira que achou não é a que estamos tratando
            if (weapons_2[0].id !== id_weapons) {
              id_other = weapons_2[0].id;
              main_other = weapons_2[0].main;
            } else {
              id_other = weapons_2[1].id;
              main_other = weapons_2[1].main;
            }
            if (main === main_other && main === 1) {
              // Faz o Update da primeira arma
              await connection(table_db)
                .update({
                  amount_dice_attack: amount_dice_attack,
                  dice_attack: dice_attack,
                  bonus: bonus,
                  amount_dice_critical: amount_dice_critical,
                  dice_critical: dice_critical,
                  reach: reach,
                  type: type,
                  main: 1,
                })
                .where({ id: id_weapons });
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
                  amount_dice_attack: amount_dice_attack,
                  dice_attack: dice_attack,
                  bonus: bonus,
                  amount_dice_critical: amount_dice_critical,
                  dice_critical: dice_critical,
                  reach: reach,
                  type: type,
                  main: 0,
                })
                .where({ id: id_weapons });
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
                  amount_dice_attack: amount_dice_attack,
                  dice_attack: dice_attack,
                  bonus: bonus,
                  amount_dice_critical: amount_dice_critical,
                  dice_critical: dice_critical,
                  reach: reach,
                  type: type,
                  main: main,
                })
                .where({ id: id_weapons });
            }
          }
          // Resposta
          return res.json({
            query: {
              id_guide: id_guide,
              amount_dice_attack: amount_dice_attack,
              dice_attack: dice_attack,
              bonus: bonus,
              amount_dice_critical: amount_dice_critical,
              dice_critical: dice_critical,
              reach: reach,
              type: type,
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
  // Delete Weapons
  async delete_weapons(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_weapons } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar se o usuário já tem um personagem com o mesmo nome:
      const weapons = await connection(table_db)
        .select(".RPG_guide.id_user", ".RPG_guide.id", table_db + ".main")
        .join("RPG_guide", function () {
          this.on({
            "RPG_guide_weapons.id": id_weapons,
          });
        })
        .where(table_db + ".id", id_weapons);
      // Verificar se achou:
      if (weapons.length > 0) {
        // Verifica se usuário pode adicionar weaponss
        if (user[0].id === weapons[0].id_user) {
          await connection(table_db).where("id", id_weapons).delete();
          if (weapons[0].main === 1) {
            await connection(table_db)
              .update({ main: 1 })
              .where({ id_guide: weapons[0].id, main: 0 });
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
