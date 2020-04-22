// Requires
const connection = require("../database/connect");
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
      id_guide,
      id_magic,
      vocal_text = "",
      material_text = "",
      gestual_text = "",
      item_text = "",
      description_user = "",
    } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar a guide:
      const guide = await connection("RPG_guide")
        .select("id_user")
        .where("id", id_guide);
      // Verificar se achou:
      if (guide.length > 0) {
        // Verifica se usuário pode adicionar
        if (user[0].id === guide[0].id_user) {
          // Consultar se o usuário já tem:
          const [count_magic] = await connection(table_db)
            .where({ id_magic: id_magic, id_guide: id_guide })
            .count();
          if (count_magic["count(*)"] === 0) {
            // criar insert do banco
            let insert = {
              id_guide: id_guide,
              id_magic: id_magic,
              vocal_text: vocal_text,
              material_text: material_text,
              gestual_text: gestual_text,
              item_text: item_text,
              description_user: description_user,
            };
            // Inserir no banco os dados
            const [id] = await connection(table_db).insert(insert);
            // Resposta
            return res.json({
              query: {
                id_guide: id_guide,
                id_magic: id_magic,
                vocal_text: vocal_text,
                material_text: material_text,
                gestual_text: gestual_text,
                item_text: item_text,
                description_user: description_user,
              },
              data: { id: id },
              msg: "SUCCESS",
            });
          } else {
            // Resposta
            return res.status(400).json({
              msg: "Essa mágica já foi adcionada",
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
  // Select All magics
  async select_all_magics(request, res) {
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
      // Consultar se o usuário já tem um personagem com o mesmo nome:
      const guide = await connection("RPG_guide")
        .select("id_user")
        .where("id", id_guide);
      // Verificar se achou:
      if (guide.length > 0) {
        // Verifica se usuário pode adicionar armors
        if (user[0].id === guide[0].id_user) {
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
  // Update magic
  async update_magic(request, res) {
    // Pega itens do body
    let {
      id_guide,
      id_magic,
      vocal_text = "",
      material_text = "",
      gestual_text = "",
      item_text = "",
      description_user = "",
    } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar se o usuário já tem um personagem com o mesmo nome:
      const magic = await connection(table_db)
        .select(".RPG_guide.id_user", ".RPG_guide.id")
        .join("RPG_guide", function () {
          this.on({
            "RPG_guide.id": id_guide,
          });
        })
        .where(table_db + ".id_magic", id_magic);
      // Verificar se achou:
      if (magic.length > 0) {
        // Verifica se usuário pode adicionar magics
        if (user[0].id === magic[0].id_user) {
          // Faz o Update
          await connection(table_db)
            .update({
              vocal_text: vocal_text,
              material_text: material_text,
              gestual_text: gestual_text,
              item_text: item_text,
              description_user: description_user,
            })
            .where({ id_guide: id_guide, id_magic: id_magic });
          // Resposta
          return res.json({
            query: {
              id_guide: id_guide,
              id_magic: id_magic,
              vocal_text: vocal_text,
              material_text: material_text,
              gestual_text: gestual_text,
              item_text: item_text,
              description_user: description_user,
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
          msg: "Mágica não encontrada",
        });
      }
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Delete magic
  async delete_magic(request, res) {
    // Pega itens do body
    const { id_guide } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_magic } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar se o usuário já tem um personagem com o mesmo nome:
      const armor = await connection(table_db)
        .select(".RPG_guide.id_user", "RPG_guide.id")
        .join("RPG_guide", function () {
          this.on({
            "RPG_guide_magics.id_guide": "RPG_guide.id",
          });
        })
        .where(table_db + ".id", id_magic);
      // Verificar se achou:
      if (armor.length > 0) {
        // Verifica se usuário pode adicionar armors
        if (user[0].id === armor[0].id_user) {
          await connection(table_db)
            .where({ id_magic: id_magic, id_guide: id_guide })
            .delete();
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
};
