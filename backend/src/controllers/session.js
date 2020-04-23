// Requires
const moment = require("moment");
const connection = require("../database/connect");
const validators = require("./validators");
const jwt = require("jsonwebtoken");
const table_db = "RPG_users";
// Exports
module.exports = {
  /*
   * Session
   */
  // Create Session
  async create(request, res) {
    // Pega itens do body
    const { nickname, passwd } = request.body;
    // Pesquisa no banco
    const user = await connection(table_db)
      .select("id", "name", "email", "passwd", "cod")
      .where("nickname", nickname);
    if (user.length > 0) {
      // Consulta se senhas são iguais
      const res_passwd = await validators.passwd(passwd, user[0].passwd);
      // Verifica resposta
      if (res_passwd.res) {
        // Inicia um nova data com agora
        let lastLogin = moment().format("YYYY-MM-DD hh:mm:ss");
        // Cria token web
        let token = jwt.sign(
          { email: user[0].email, passwd: user[0].passwd },
          user[0].cod,
          {
            expiresIn: 86400,
          }
        );
        // Conecta no banco e coloca o last login
        await connection(table_db)
          .update({ lastLogin: lastLogin, last_token: token })
          .where("cod", user[0].cod);
        // Resposta
        return res.json({
          auth: true,
          id: user[0].id,
          token: token,
        });
      } else {
        // Resposta
        return res.status(res_passwd.status).json({
          auth: false,
          msg: res_passwd.msg,
        });
      }
    } else {
      // Resposta
      return res.status(401).json({
        auth: false,
        msg: "Usuário ou Senha incorreta!",
      });
    }
  },
  // Confim session
  async confirm(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Pesquisa no banco
    const user = await connection(table_db)
      .select("id", "name", "email", "passwd", "cod", "last_token")
      .where("id", id_user);
    // verifica se achou o usuário
    if (user.length > 0) {
      if (token === user[0].last_token) {
        jwt.verify(token, user[0].cod, function (err, decoded) {
          if (err)
            return res
              .status(401)
              .json({ auth: false, message: "Failed to authenticate token." });
          // Resposta
          return res.json({
            auth: true,
            id: user[0].id,
            token: token,
          });
        });
      } else {
        jwt.verify(token, user[0].cod, async function (err, decoded) {
          if (err)
            return res
              .status(401)
              .json({ auth: false, message: "Failed to authenticate token." });
          // Inicia um nova data com agora
          let lastLogin = moment().format("YYYY-MM-DD hh:mm:ss");
          // Conecta no banco e coloca o last login
          await connection(table_db)
            .update({ lastLogin: lastLogin, last_token: token })
            .where("cod", user[0].cod);
          // Resposta
          return res.json({
            auth: true,
            id: user[0].id,
            token: token,
          });
        });
      }
    } else {
      // Resposta
      return res.status(401).json({
        auth: false,
        msg: "Usuário ou Senha incorreta!",
      });
    }
  },
  // Delete session
  async delete(request, res) {
    // Pega itens do body
    const { id_user } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Pesquisa no banco
    const user = await connection(table_db)
      .select("id", "name", "email", "passwd", "cod", "last_token")
      .where("id", id_user);
    // verifica se achou o usuário
    if (user.length > 0) {
      // Conecta no banco e coloca o last login
      await connection(table_db)
        .update({ lastLogin: null, last_token: null })
        .where("cod", user[0].cod);
      return res.json({
        auth: false,
      });
    } else {
      // Resposta
      return res.status(404).json({
        msg: "Usuário não existe!",
      });
    }
  },
};
