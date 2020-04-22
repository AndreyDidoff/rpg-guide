// Requires
const connection = require("../database/connect");
const validators = require("./validators");
const table_db = "RPG_guide_others";
// Exports
module.exports = {
  /*
   * others
   */
  // Create others
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
      return res.status(res_cod_user.status).json({
        msg: res_cod_user.msg,
      });
    }
  },
  // Select All others
  async select_all_others(request, res) {
    // Pega itens do body
    const { id_guide } = request.body;
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
          const others = await connection(table_db)
            .select(
              "id",
              "id_guide",
              "bonus",
              "extra_bonus",
              "property_especial"
            )
            .where("id_guide", id_guide);
          // Resposta
          res.header("X-Total-Count", others.length);
          return res.json({
            rows: others.length,
            data: others,
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
  // Update other
  async update_other(request, res) {
    // Pega itens do body
    let {
      id_guide,
      bonus = "",
      extra_bonus = "",
      property_especial = "",
    } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_other } = request.params;
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
          id: id_other,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          // Cria update
          let update = { id_guide: id_guide };
          if (bonus !== "") {
            insert["bonus"] = bonus;
          }
          if (extra_bonus !== "") {
            insert["extra_bonus"] = extra_bonus;
          }
          if (property_especial !== "") {
            insert["property_especial"] = property_especial;
          }
          // Faz o Update
          await connection(table_db).update({ update }).where({ id: id_other });
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
      return res.status(res_cod_user.status).json({
        msg: res_cod_user.msg,
      });
    }
  },
  // Delete other
  async delete_other(request, res) {
    // Pega itens do body
    const { id_guide } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_other } = request.params;
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
          id: id_other,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          await connection(table_db).where("id", id_other).delete();
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
