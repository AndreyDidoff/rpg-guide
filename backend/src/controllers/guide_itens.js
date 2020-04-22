// Requires
const connection = require("../database/connect");
const validators = require("./validators");
const table_db = "RPG_guide_itens";
// Exports
module.exports = {
  /*
   * Helmos
   */
  // Create Helmos
  async create(request, res) {
    // Pega itens do body
    let { id_guide, name, description = "", amount, unit = "" } = request.body;
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
          name: name,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res < 1) {
          // criar insert do banco
          let insert = {
            id_guide: id_guide,
            name: name,
            amount: amount,
          };
          if (description !== "") {
            insert["description"] = description;
          }
          if (unit !== "") {
            insert["unit"] = unit;
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
            msg: "Item já existe na mochila. Escolha outro nome.",
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
  // Select All Helmos
  async select_all_itens(request, res) {
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
          const armors = await connection(table_db)
            .select("id", "id_guide", "name", "description", "amount", "unit")
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
      return res.status(res_cod_user.status).json({
        msg: res_cod_user.msg,
      });
    }
  },
  // Update Helmo
  async update_item(request, res) {
    // Pega itens do body
    let {
      id_guide,
      name = "",
      description = "",
      amount = "",
      unit = "",
    } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_item } = request.params;
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
          name: name,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res < 1) {
          // criar insert do banco
          let update = { id_guide: id_guide };
          if (name !== "") {
            update["name"] = name;
          }
          if (description !== "") {
            update["description"] = description;
          }
          if (amount !== "") {
            update["amount"] = amount;
          }
          if (unit !== "") {
            update["unit"] = unit;
          }
          // Faz o Update
          await connection(table_db).update(update).where({ id: id_item });
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
  // Delete Helmo
  async delete_item(request, res) {
    // Pega itens do body
    const { id_guide } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_item } = request.params;
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
          id: id_item,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          await connection(table_db).where("id", id_item).delete();
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
