// Requires
const connection = require("../database/connect");
const validators = require("./validators");
const table_db = "RPG_guide_magics";
// Exports
module.exports = {
  /*
   * magics
   */
  // Create magics
  async create(request, res) {
    // Pega itens do body
    let {
      id_user,
      id_guide,
      id_magic,
      vocal_text = "",
      material_text = "",
      gestual_text = "",
      item_text = "",
      description_user = "",
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
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, {
          id_guide: id_guide,
          id_magic: id_magic,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res < 1) {
          // criar insert do banco
          let insert = {
            id_guide: id_guide,
            id_magic: id_magic,
          };
          if (vocal_text !== "") {
            insert["vocal_text"] = vocal_text;
          }
          if (material_text !== "") {
            insert["material_text"] = material_text;
          }
          if (gestual_text !== "") {
            insert["gestual_text"] = gestual_text;
          }
          if (item_text !== "") {
            insert["item_text"] = item_text;
          }
          if (description_user !== "") {
            insert["description_user"] = description_user;
          }
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
  // Select All magics
  async select_all_magics(request, res) {
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
          const armors = await connection(table_db)
            .select(
              "id",
              "id_guide",
              "id_magic",
              "vocal_text",
              "material_text",
              "gestual_text",
              "item_text",
              "description_user"
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
  // Update magic
  async update_magic(request, res) {
    // Pega itens do body
    let {
      id_user,
      id_guide,
      id_magic,
      vocal_text = "",
      material_text = "",
      gestual_text = "",
      item_text = "",
      description_user = "",
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
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, {
          id_guide: id_guide,
          id_magic: id_magic,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          // Cria update
          let update = { id_guide: id_guide, id_magic: id_magic };
          if (vocal_text !== "") {
            update["vocal_text"] = vocal_text;
          }
          if (material_text !== "") {
            update["material_text"] = material_text;
          }
          if (gestual_text !== "") {
            update["gestual_text"] = gestual_text;
          }
          if (item_text !== "") {
            update["item_text"] = item_text;
          }
          if (description_user !== "") {
            update["description_user"] = description_user;
          }
          // Faz o Update
          await connection(table_db)
            .update(update)
            .where({ id_guide: id_guide, id_magic: id_magic });
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
  // Delete magic
  async delete_magic(request, res) {
    // Pega itens do body
    const { id_user, id_guide } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_magic } = request.params;
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
          id_magic: id_magic,
          id_guide: id_guide,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          await connection(table_db)
            .where({ id_magic: id_magic, id_guide: id_guide })
            .delete();
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
