// Requires
const connection = require("../database/connect");
const validators = require("./validators");
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
      id_user,
      id_guide,
      bonus = "",
      extra_bonus = "",
      property_especial = "",
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
        insert["bonus"] = bonus !== "" ? bonus : "";
        insert["extra_bonus"] = extra_bonus !== "" ? extra_bonus : "";
        insert["property_especial"] =
          property_especial !== "" ? property_especial : "";
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, insert);
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res < 1) {
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
  // Select All shields
  async select_all_shields(request, res) {
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
  // Update shields
  async update_shield(request, res) {
    // Pega itens do body
    let {
      id_user,
      id_guide,
      bonus = "",
      extra_bonus = "",
      property_especial = "",
    } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_shield } = request.params;
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
          id: id_shield,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          // Cria update
          let update = { id_guide: id_guide };
          if (bonus !== "") {
            update["bonus"] = bonus;
          }
          if (extra_bonus !== "") {
            update["extra_bonus"] = extra_bonus;
          }
          if (property_especial !== "") {
            update["property_especial"] = property_especial;
          }
          // Faz o Update
          await connection(table_db).update(update).where({ id: id_shield });
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
  // Delete shields
  async delete_shield(request, res) {
    // Pega itens do body
    const { id_user, id_guide } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_shield } = request.params;
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
          id: id_shield,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          await connection(table_db).where("id", id_shield).delete();
          if (shields[0].main === 1) {
            await connection(table_db)
              .update({ main: 1 })
              .where({ id_guide: id_shields });
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
