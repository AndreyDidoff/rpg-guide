// Requires
const connection = require("../database/connect");
const validators = require("./validators");
const table_db = "RPG_guide_table_history";
// Exports
module.exports = {
  /*
   * magics
   */
  // Create magics
  async create(request, res) {
    // Pega itens do body
    let { id_guide, id_table, history_text, datetime } = request.body;
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
        // criar insert do banco
        let insert = {
          id_guide: id_guide,
          id_table: id_table,
          history_text: history_text,
          datetime: datetime,
        };
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, insert);
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res < 1) {
          // Inserir no banco os dados
          const [id] = await connection(table_db).insert(insert);
          // Resposta
          return res.json({
            query: {
              id_guide: id_guide,
              id_table: id_table,
              history_text: history_text,
              datetime: datetime,
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
  // Select All magics
  async select_all_table_historys(request, res) {
    // Pega itens do body
    const { id_guide } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_table } = request.params;
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
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, {
          id_guide: id_guide,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          // Consulta quantos tem no banco
          const historys = await connection(table_db)
            .select("id", "id_guide", "id_table", "history_text", "datetime")
            .where({ id_guide: id_guide, id_table: id_table });
          // Resposta
          res.header("X-Total-Count", historys.length);
          return res.json({
            rows: historys.length,
            data: historys,
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
      return res.status(res_cod_user.status).json({
        msg: res_cod_user.msg,
      });
    }
  },
  // Update magic
  async update_table_history(request, res) {
    // Pega itens do body
    let { id_guide, history_text, datetime } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_table_history } = request.params;
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
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, {
          id: id_table_history,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          // Faz o Update
          await connection(table_db)
            .update({
              id_guide: id_guide,
              history_text: history_text,
              datetime: datetime,
            })
            .where("id", id_table_history);
          // Resposta
          return res.json({
            query: {
              id_guide: id_guide,
              history_text: history_text,
              datetime: datetime,
            },
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
      return res.status(res_cod_user.status).json({
        msg: res_cod_user.msg,
      });
    }
  },
  // Delete magic
  async delete_table_history(request, res) {
    // Pega itens do body
    const { id_guide } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_table_history } = request.params;
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
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, {
          id: id_table_history,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          await connection(table_db).where("id", id_table_history).delete();
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
      return res.status(res_cod_user.status).json({
        msg: res_cod_user.msg,
      });
    }
  },
};
