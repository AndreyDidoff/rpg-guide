// Requires
const connection = require("../database/connect");
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
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consultar se o usuário já tem um personagem com o mesmo nome:
      const [count_table] = await connection("RPG_tables")
        .where("name", name)
        .count();
      // Verificar se achou:
      if (count_table["count(*)"] === 0) {
        // criar insert do banco
        let insert = {
          name: name,
          description: description,
          resume: resume,
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
        return res.status(406).json({
          msg: "Nome já cadastrado",
        });
      }
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select Table using id
  async select_table_id(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const tables = await connection("RPG_tables")
        .select("name", "description", "resume")
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
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select All Tables
  async select_all_tables(request, res) {
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consulta quantos tem no banco
      const tables = await connection("RPG_tables")
        .select("name", "description", "resume")
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
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },

  // Create Cross User Tables
  async create_cross_user_table(request, res) {
    // Pega itens do body
    const { id_user, id_table, master = 0 } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
      // Consultar se o usuário já tem um personagem com o mesmo nome:
      const [count_table] = await connection("RPG_users_tables")
        .where({ id_user: id_user, id_table: id_table })
        .count();
      // Verificar se achou:
      if (count_table["count(*)"] === 0) {
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
        return res.status(406).json({
          msg: "Usuário já cadastrado neste Mesa",
        });
      }
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select Cross User Tables
  async select_cross_user_tables(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_user } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
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
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select Cross Users Table
  async select_cross_table_users(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_table } = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count] = await connection("RPG_users")
      .where("cod", cod_user)
      .count();
    // Veriricar se encotrou no banco o usuário
    if (count["count(*)"] > 0) {
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
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
};
