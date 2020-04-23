// Requires
const connection = require("../database/connect");
const validators = require("./validators");
const table_db = "RPG_guide_table_magic";
// Exports
module.exports = {
  /*
   * Helmos
   */
  // Create Helmos
  async create(request, res) {
    // Pega itens do body
    let { id_user, id_guide, id_table, id_magic } = request.body;
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
        let insert = {
          id_guide: id_guide,
          id_table: id_table,
          id_magic: id_magic,
        };
        // Inserir no banco os dados
        const [id] = await connection(table_db).insert(insert);
        // Resposta
        return res.json({
          query: {
            id_guide: id_guide,
            id_table: id_table,
            id_magic: id_magic,
          },
          data: { id: id },
          msg: "SUCCESS",
        });
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
  // Select All Helmos
  async select_all_table_magics(request, res) {
    // Pega itens do body
    const { id_user, id_guide, id_table } = request.body;
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
          id_table: id_table,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          // Consulta quantos tem no banco
          const table_magics = await connection(table_db)
            .select("id", "id_guide", "id_table", "id_magic")
            .where({ id_guide: id_guide, id_table: id_table });
          // Resposta
          res.header("X-Total-Count", table_magics.length);
          return res.json({
            rows: table_magics.length,
            data: table_magics,
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
  // Delete Helmo
  async delete_table_magic(request, res) {
    // Pega itens do body
    let { id_user, id_guide, id_table } = request.body;
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
          id_table: id_table,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          // Deleta do banco
          await connection(table_db)
            .where({ id_guide: id_guide, id_table: id_table })
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
