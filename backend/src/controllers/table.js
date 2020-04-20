// Requires
const bcrypt = require("bcryptjs");
const moment = require("moment");
const connection = require("../database/connect");
// Exports
module.exports = {
  /*
   * Tables
   */
  // Create New Table
  async create(request, res) {
    // Pega itens do body
    const { name, description = "", resume = "" } = request.body;
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
      if (count["count(*)"] === 0) {
        // criar insert do banco
        let insert = {
          name: name,
          description: description,
          resume: resume,
        };
        // Inserir no banco os dados da guide nova
        const [id] = await connection("RPG_tables").insert(insert);
        // Resposta
        return res.json({
          query: body,
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
        })
        .join("RPG_tables", function () {
          this.on({
            "RPG_users_tables.id_user": id_user,
            "RPG_users_tables.id_table": "RPG_tables.id",
          });
        })
        .join("RPG_guide", function () {
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
  async select_cross_users_table(request, res) {
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
      const users = await connection("RPG_users_tables")
        .select("RPG_user.nick", "RPG_user.description", "rRPG_user.esume")
        .join("RPG_tables", function () {
          this.on({
            "RPG_users_tables.id_user": id_user,
            "RPG_users_tables.id_table": "RPG_tables.id",
          });
        })
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
};
