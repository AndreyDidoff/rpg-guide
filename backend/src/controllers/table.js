// Requires
const connection = require("../database/connect");
const validators = require("./validators");
// Exports
module.exports = {
  /*
   * Tables
   */
  // Create New Table
  async create(request, res) {
    // Pega itens do body
    const { name, description = "", resume = "", id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_tables", {
        name: name,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
        let cod = "";
        while (cod === "") {
          // Gera um código de 20 caracteres aleatórios
          let cod_hash = Array(20)
            .fill(
              "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            )
            .map(function (x) {
              return x[Math.floor(Math.random() * x.length)];
            })
            .join("");
          // Consulta quantos tem no banco
          const [count_cod] = await connection(table_db)
            .where("cod", cod_hash)
            .count();
          // Verifica se encontrou resultados
          if (count_cod["count(*)"] == 0) {
            // Se não tiver resultados
            cod = cod_hash;
          }
        }
        // criar insert do banco
        let insert = {
          name: name,
          description: description,
          resume: resume,
          cod: cod,
        };
        // Inserir no banco os dados da guide nova
        const [id] = await connection("RPG_tables").insert(insert);
        // Insere na tabela Cross o usuário e table como master
        await connection("RPG_users_tables").insert({
          id_user: id_user,
          id_table: id,
          master: 1,
        });
        // Resposta
        return res.json({
          query: {
            name: name,
            description: description,
            resume: resume,
          },
          data: { id: id },
          msg: "SUCCESS",
        });
      } else {
        // Resposta
        return res.status(res_count_item.status).json({
          msg: "Nome já cadastrado",
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select Table using id
  async select_table_id(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id } = request.params;
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens(table_db, {
        id: id,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Consulta quantos tem no banco
        const tables = await connection("RPG_tables")
          .select("id", "name", "description", "resume", "cod")
          .where("id", id)
          .limit(1);
        // Resposta
        res.header("X-Total-Count", tables.length);
        return res.json({
          data: tables,
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Tables
  async select_all_tables(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_tables");
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Consulta quantos tem no banco
        const tables = await connection("RPG_tables")
          .select("id", "name", "description", "resume", "cod")
          .orderBy("name");
        // Resposta
        res.header("X-Total-Count", tables.length);
        return res.json({
          rows: tables.length,
          data: tables,
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Update Table
  async update_table(request, res) {
    // Pega itens do body
    let { id_user, name = "", description = "", resume = "" } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_table } = request.params;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_tables", {
        id: id_table,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Cria update
        let update = { id: id_table };
        if (name !== "") {
          update["name"] = name;
        }
        if (description !== "") {
          update["description"] = description;
        }
        if (resume !== "") {
          update["resume"] = resume;
        }
        // Faz o Update
        await connection("RPG_tables")
          .update({
            update,
          })
          .where({ id: id_table });
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Delete Table
  async delete_table(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_table } = request.params;
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_tables", {
        id: id_table,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        await connection("RPG_tables").where("id", id_table).delete();
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },

  // Create Cross User Tables
  async create_cross_user_table(request, res) {
    // Pega itens do body
    const { id_user, id_table, master = 0 } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_users_tables", {
        id_user: id_user,
        id_table: id_table,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
        // criar insert do banco
        let insert = {
          id_user: id_user,
          id_table: id_table,
          master: master,
        };
        // Inserir no banco os dados da guide nova
        const [id] = await connection("RPG_users_tables").insert(insert);
        // Resposta
        return res.json({
          query: {
            id_user: id_user,
            id_table: id_table,
            master: master,
          },
          data: { id: id },
          msg: "SUCCESS",
        });
      } else {
        // Resposta
        return res.status(res_count_item.status).json({
          msg: "Usuário já cadastrado neste Mesa",
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select Cross User Tables
  async select_cross_user_tables(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_user } = request.params;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_users_tables", {
        id_user: id_user,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Consulta quantos tem no banco
        const tables = await connection("RPG_users_tables")
          .select({
            Tname: "RPG_tables.name",
            Gname: "RPG_guide.name",
            Tdescription: "RPG_tables.description",
            Tresume: "RPG_tables.resume",
            UTmaster: "RPG_users_tables.master",
          })
          .join("RPG_tables", function () {
            this.on({
              "RPG_users_tables.id_user": id_user,
              "RPG_users_tables.id_table": "RPG_tables.id",
            });
          })
          .leftJoin("RPG_guide", function () {
            this.on({
              "RPG_users_tables.id_guide": "RPG_guide.id",
            });
          })
          .orderBy("RPG_tables.name", "RPG_guide.name");
        // Resposta
        res.header("X-Total-Count", tables.length);
        return res.json({
          rows: tables.length,
          data: tables,
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select Cross Users Table
  async select_cross_table_users(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_table } = request.params;
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_users_tables", {
        id_table: id_table,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        // Consulta quantos tem no banco
        const users = await connection("RPG_tables")
          .select({
            Uname: "RPG_users.name",
            Unickname: "RPG_users.nickname",
            Tname: "RPG_tables.name",
            Gname: "RPG_guide.name",
            UTmaster: "RPG_users_tables.master",
          })
          .join("RPG_users_tables", function () {
            this.on({
              "RPG_users_tables.id_table": "RPG_tables.id",
            });
          })
          .join("RPG_users", function () {
            this.on({
              "RPG_users.id": "RPG_users_tables.id_user",
            });
          })
          .leftJoin("RPG_guide", function () {
            this.on({
              "RPG_users_tables.id_guide": "RPG_guide.id",
            });
          })
          .where({ "RPG_tables.id": id_table })
          .orderBy("RPG_tables.name", "RPG_guide.name");
        // Resposta
        res.header("X-Total-Count", users.length);
        return res.json({
          rows: users.length,
          data: users,
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Delete Cross Users Table
  async delete_cross_user_table(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_user, id_table } = request.params;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_users_tables", {
        id_user: id_user,
        id_table: id_table,
      });
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res > 0) {
        await connection("RPG_users_tables")
          .where({
            id_user: id_user,
            id_table: id_table,
          })
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
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
};
