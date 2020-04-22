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
    let { id_guide, id_table, id_magic } = request.body;
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
      return res.status(res_cod_user.status).json({
        msg: res_cod_user.msg,
      });
    }
  },
  // Select All Helmos
  async select_all_table_magics(request, res) {
    // Pega itens do body
    const { id_guide, id_table } = request.body;
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
  // Delete Helmo
  async delete_table_magic(request, res) {
    // Pega itens do body
    let { id_guide, id_table } = request.body;
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
        await connection(table_db)
          .where({ id_guide: id_guide, id_table: id_table })
          .delete();
        // Resposta
        return res.json({
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
      return res.status(res_cod_user.status).json({
        msg: res_cod_user.msg,
      });
    }
  },
};
