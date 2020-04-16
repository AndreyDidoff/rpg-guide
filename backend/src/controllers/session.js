// Requires
const bcrypt = require("bcryptjs");
const moment = require("moment");
const connection = require("../database/connect");
const table_db = "RPG_users";
// Exports
module.exports = {
  async create(request, res) {
    // Pega variavel id
    const body = request.body;
    // Pesquisa no banco
    const user = await connection(table_db)
      .select("name", "email", "passwd", "cod")
      .where("nickname", body.nickname)
      .first();
    // Verifica se existe
    if (!user) {
      return res.status(400).json({
        query: body,
        msg: "Usuário não encontrado",
      });
    }
    // Configurando senha
    const salt = bcrypt.genSaltSync(10);
    const passwd_hash = bcrypt.hashSync(body.passwd, salt);
    if (!bcrypt.compareSync(body.passwd, passwd_hash)) {
      return res.status(400).json({
        query: body,
        msg: "Usuário não autorizado",
      });
    }
    let now = new Date().getTime();
    let lastLogin = moment().format("YYYY-MM-DD hh:mm:ss");
    await connection(table_db)
      .update({ lastLogin: lastLogin })
      .where("cod", user.cod);
    // Resposta
    return res.json({
      query: body,
      data: {
        name: user.name,
        nickname: body.nickname,
        email: user.email,
        lastLogin: lastLogin,
        cod: user.cod,
      },
      msg: "SUCCESS",
    });
  },
  async select_id(request, res) {},
};
