// Requires
const connection = require("../database/connect");
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
          const [count_item] = await connection(table_db)
            .where("name", name)
            .count();
          if (count_item["count(*)"] === 0) {
            // criar insert do banco
            let insert = {
              id_guide: id_guide,
              name: name,
              description: description,
              amount: amount,
              unit: unit,
            };
            // Inserir no banco os dados
            const [id] = await connection(table_db).insert(insert);
            // Resposta
            return res.json({
              query: {
                id_guide: id_guide,
                name: name,
                description: description,
                amount: amount,
                unit: unit,
              },
              data: { id: id },
              msg: "SUCCESS",
            });
          } else {
            // Resposta
            return res.status(400).json({
              msg: "Item já cadastrado",
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
  // Select All Helmos
  async select_all_itens(request, res) {
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
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar se o usuário já tem um personagem com o mesmo nome:
      const helmo = await connection(table_db)
        .select(".RPG_guide.id_user", ".RPG_guide.id")
        .join("RPG_guide", function () {
          this.on({
            "RPG_guide.id": id_guide,
          });
        })
        .where(table_db + ".id", id_item);
      // Verificar se achou:
      if (helmo.length > 0) {
        // Verifica se usuário pode adicionar helmos
        if (user[0].id === helmo[0].id_user) {
          let insert = {};
          if (name !== "") {
            insert["name"] = name;
          }
          if (description !== "") {
            insert["description"] = description;
          }
          if (amount !== "") {
            insert["amount"] = amount;
          }
          if (unit !== "") {
            insert["unit"] = unit;
          }
          // Faz o Update
          await connection(table_db).update(insert).where({ id: id_item });
          // Resposta
          return res.json({
            query: { insert },
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
          msg: "Item não encontrada",
        });
      }
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Delete Helmo
  async delete_item(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_item } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar se o usuário que está socitando pode apagar
      const item = await connection(table_db)
        .select(".RPG_guide.id_user", "RPG_guide.id")
        .join("RPG_guide", function () {
          this.on({
            "RPG_guide_itens.id_guide": "RPG_guide.id",
          });
        })
        .where(table_db + ".id", id_item);
      // Verificar se achou:
      if (item.length > 0) {
        // Verifica se usuário pode adicionar armors
        if (user[0].id === item[0].id_user) {
          await connection(table_db).where("id", id_item).delete();
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
          msg: "Item não encontrado",
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
