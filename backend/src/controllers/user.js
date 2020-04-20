// Requires
const bcrypt = require("bcryptjs");
const connection = require("../database/connect");
let table_db = "RPG_users";
// Exports
module.exports = {
  /*
   * Criar um novo usuário:
   * * Parametros de Entrada:
   * * * name
   * * * nickname
   * * * passwd
   * * * email
   */
  async create(request, res) {
    // Pega todos os paramentros do body e colocar na variavel
    const body = request.body;
    // Passa parametros body para varaveis
    const { name, nickname, passwd, email } = body;
    // Procura no banco se usuário já existe
    const users = await connection(table_db)
      .select("id")
      .limit(1)
      .where("email", email)
      .orWhere("nickname", nickname);
    // Verifica se encontrou resultados
    if (users.length > 0) {
      // Resposta
      return res.status(406).json({
        query: body,
        rows: users.length,
        msg: "Usuário ou e-mail já cadastrado!",
      });
    } else {
      // Configurando senha
      const salt = bcrypt.genSaltSync(10);
      const passwd_hash = bcrypt.hashSync(passwd, salt);
      let cod = "";
      while (cod == "") {
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
        const [count] = await connection(table_db)
          .where("cod", cod_hash)
          .count();
        // Verifica se encontrou resultados
        if (count["count(*)"] == 0) {
          // Se não tiver resultados
          cod = cod_hash;
        }
      }
      // Cria variavel insert
      const insert = {
        name: name,
        nickname: nickname,
        passwd: passwd_hash,
        email: email,
        cod: cod,
      };
      // Insere no banco
      const [id] = await connection(table_db).insert(insert);
      // Resposta
      return res.json({
        query: body,
        data: { id: id },
        msg: "SUCCESS",
      });
    }
  },

  async select_all_friends(request, res) {
    // Pega todos os paramentros da query e colocar na variavel
    const { page = 1 } = request.query;
    // Pega todos os paramentros do body e colocar na variavel
    const { id } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const [count_users] = await connection(table_db)
      .where("cod", cod_user)
      .count();
    // Verifica se a Key é permitida
    if (count_users["count(*)"] > 0) {
      // Define Tabela de join
      const join_table = "RPG_user_friends";
      // Consulta quantos tem no banco
      const [count_friends] = await connection(table_db)
        .select(
          table_db + ".name",
          table_db + ".nickname",
          join_table + ".authorization"
        )
        .join(join_table, function () {
          this.on(join_table + ".id_user", id).on(
            join_table + ".id_friend",
            table_db + ".id"
          );
        })
        .count();
      // Consulta no banco id
      const friends = await connection(table_db)
        .select(
          table_db + ".name",
          table_db + ".nickname",
          join_table + ".authorization"
        )
        .join(join_table, function () {
          this.on(join_table + ".id_user", id).on(
            join_table + ".id_friend",
            table_db + ".id"
          );
        })
        .limit(5)
        .offset((page - 1) * 5);
      if (count_friends["count(*)"] > 0) {
        // Resposta
        res.header("X-Total-Count", count_friends["count(*)"]);
        return res.json({
          query: { id: id, page: page },
          all_rows: count_friends["count(*)"],
          rows: friends.length,
          data: friends,
          msg: "SUCCESS",
        });
      } else {
        // Resposta
        return res.status(406).json({
          query: id,
          msg: "Usuário sem Amigos",
        });
      }
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },

  async select_id(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const routes = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta no banco id
    const users = await connection(table_db)
      .select("name", "nickname", "email", "cod")
      .where("id", routes.id);
    // Verifica se a Key é permitida
    if (users.length > 0) {
      console.log(users[0]);
      if (users[0].cod == cod_user) {
        // Resposta
        return res.json({
          query: routes,
          data: users[0],
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
      return res.status(406).json({
        query: routes,
        msg: "ID NO EXISTS",
      });
    }
  },

  async delete(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const routes = request.params;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta no banco id
    const user = await connection(table_db)
      .select("cod")
      .where("id", routes.id)
      .first();
    // Verfica se a ONG pode apagar esse incidente
    if (!user) {
      return res.status(406).json({ msg: "Usuário não encontrado" });
    }
    if (cod_user !== user.cod) {
      return res.status(401).json({ msg: "Usuário não Autorizado" });
    }
    // Deleta da base
    await connection(table_db).where("id", routes.id).delete();
    // Resposta
    return res.json({
      query: routes,
      msg: "SUCCESS",
    });
  },
};
