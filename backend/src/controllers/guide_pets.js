// Requires
const connection = require("../database/connect");
const validators = require("./validators");
const table_db = "RPG_guide_pets";
// Exports
module.exports = {
  /*
   * pet
   */
  // Create pet
  async create(request, res) {
    // Pega itens do body
    let {
      id_user,
      id_guide,
      id_alignment,
      name,
      height = null,
      life = null,
      distance = null,
      description = "",
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
        let insert = {
          id_guide: id_guide,
          id_alignment: id_alignment,
          name: name,
          height: height,
          life: life,
          distance: distance,
          description: description,
        };
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, insert);
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res < 1) {
          // Inserir no banco os dados
          const [id] = await connection(table_db).insert(insert);
          // Resposta
          return res.json({
            query: { insert },
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
  // Select All pets
  async select_all_pets(request, res) {
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
          const pets = await connection(table_db)
            .select(
              "id",
              "id_guide",
              table_db + ".name",
              "RPG_alignment.name",
              "height",
              "life",
              "distance",
              "description"
            )
            .join("RPG_alignment", function () {
              this.on({
                "RPG_alignment.id": "RPG_guide_pets.id_alignment",
              });
            })
            .where("id_guide", id_guide);
          // Resposta
          res.header("X-Total-Count", pets.length);
          return res.json({
            rows: pets.length,
            data: pets,
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
  // Update pet
  async update_pet(request, res) {
    // Pega itens do body
    let {
      id_user,
      id_guide,
      name = "",
      height = null,
      life = null,
      distance = null,
      description = "",
    } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_pets } = request.params;
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
          id: id_pets,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          // Cria update
          let update = { id_guide: id_guide };
          if (name !== "") {
            update["name"] = name;
          }
          if (height !== null) {
            update["height"] = height;
          }
          if (life !== null) {
            update["life"] = life;
          }
          if (distance !== null) {
            update["distance"] = distance;
          }
          if (description !== "") {
            update["description"] = description;
          }
          // Faz o Update
          await connection(table_db)
            .update({
              update,
            })
            .where({ id: id_pets });
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
  // Delete pet
  async delete_pet(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_pets } = request.params;
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
          id: id_pets,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          await connection(table_db).where("id", id_pets).delete();
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
