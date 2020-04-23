// Requires
const connection = require("../database/connect");
const validators = require("./validators");
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
      id_user,
      id_guide,
      amount_dice_attack = null,
      dice_attack = null,
      bonus = null,
      amount_dice_critical = null,
      dice_critical = null,
      reach = "",
      type = "",
      main,
    } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se guide existe e pertence ao usuário
      const res_guide = await validators.valida_guide(
        id_guide,
        res_user_token.id_user
      );
      // Verifica se usuário pode adicionar
      if (res_guide.res) {
        // criar insert do banco
        let insert = { id_guide: id_guide };
        insert["amount_dice_attack"] =
          amount_dice_attack !== null ? amount_dice_attack : null;
        insert["bonus"] = bonus !== null ? bonus : null;
        insert["dice_attack"] = dice_attack !== null ? dice_attack : null;
        insert["amount_dice_critical"] =
          amount_dice_critical !== null ? amount_dice_critical : null;
        insert["dice_critical"] = dice_critical !== null ? dice_critical : null;
        insert["reach"] = reach !== "" ? reach : "";
        insert["type"] = type !== "" ? type : "";
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, insert, {
          main: 3,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res < 1) {
          if (main === 3) {
            let insert_oculto = insert;
            insert_oculto["main"] = 3;
            // Consulta quantas ocultas tem
            const res_count_item_oculto = await validators.conta_itens(
              table_db,
              insert_oculto
            );
            // Se já tiver
            if (res_count_item_oculto.res > 0) {
              // Resposta
              return res.status(res_count_item_oculto.status).json({
                msg:
                  "Limite de itens atingido! Adcione a sua mochila este item.",
              });
            }
          } else {
            // Consulta quantas armas tem com main
            const res_count_item_main = await validators.conta_itens(table_db, {
              main: main,
            });
            // Se não tiver, main tem que ser 1
            main =
              res_count_item_main.res > 0
                ? main === 1
                  ? 0
                  : 1
                : main === 0
                ? 0
                : 1;
            // Consulta quantas armas tem com main
            const res_count_item_main2 = await validators.conta_itens(
              table_db,
              {
                main: main,
              }
            );
            if (res_count_item_main2.res > 0) {
              // Resposta
              return res.status(res_count_item.status).json({
                msg:
                  "Limite de itens atingido! Adcione a sua mochila este item.",
              });
            }
          }
          // Insere main no insert original
          insert["main"] = main;
          // Inserir no banco os dados
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
        return res.status(res_guide.status).json({
          msg: res_guide.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Weapons
  async select_all_weapons(request, res) {
    // Pega itens do body
    const { id_user, id_guide } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se guide existe e pertence ao usuário
      const res_guide = await validators.valida_guide(
        id_guide,
        res_user_token.id_user
      );
      // Verifica se usuário pode adicionar
      if (res_guide.res) {
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, {
          id_guide: id_guide,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
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
          return res.status(res_count_item.status).json({
            msg: res_count_item.msg,
          });
        }
      } else {
        // Resposta
        return res.status(res_guide.status).json({
          msg: res_guide.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Update Weapons
  async update_weapons(request, res) {
    // Pega itens do body
    let {
      id_user,
      id_guide,
      amount_dice_attack = null,
      dice_attack = null,
      bonus = null,
      amount_dice_critical = null,
      dice_critical = null,
      reach = "",
      type = "",
      main,
    } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_weapons } = request.params;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se guide existe e pertence ao usuário
      const res_guide = await validators.valida_guide(
        id_guide,
        res_user_token.id_user
      );
      // Verifica se usuário pode adicionar
      if (res_guide.res) {
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, {
          id: id_weapons,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          // criar update do banco
          let update = { id_guide: id_guide, main: main };
          if (amount_dice_attack !== null) {
            update["amount_dice_attack"] = amount_dice_attack;
          }
          if (bonus !== null) {
            update["bonus"] = bonus;
          }
          if (dice_attack !== null) {
            update["dice_attack"] = dice_attack;
          }
          if (amount_dice_critical !== null) {
            update["amount_dice_critical"] = amount_dice_critical;
          }
          if (dice_critical !== null) {
            update["dice_critical"] = dice_critical;
          }
          if (reach !== "") {
            update["reach"] = reach;
          }
          if (type !== "") {
            update["type"] = type;
          }
          // Faz o Update
          await connection(table_db).update(update).where({ id: id_weapons });
          // Resposta
          return res.json({
            query: update,
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
        return res.status(res_guide.status).json({
          msg: res_guide.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Delete Weapons
  async delete_weapons(request, res) {
    // Pega itens do body
    const { id_user, id_guide, main } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_weapons } = request.params;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se guide existe e pertence ao usuário
      const res_guide = await validators.valida_guide(
        id_guide,
        res_user_token.id_user
      );
      // Verifica se usuário pode adicionar
      if (res_guide.res) {
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, {
          id: id_weapons,
          main: main,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          await connection(table_db).where("id", id_weapons).delete();
          if (main === 1) {
            await connection(table_db)
              .update({ main: 1 })
              .where({ id_guide: id_guide, main: 0 });
          }
          // Resposta
          return res.json({
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
        return res.status(res_guide.status).json({
          msg: res_guide.msg,
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
