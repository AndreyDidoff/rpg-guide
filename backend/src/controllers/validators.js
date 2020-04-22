// Requires
const connection = require("../database/connect");
// Export
module.exports = {
  /*
   * Verifica se o cod é válido
   */
  async valida_cod(cod_user) {
    // Consulta se existe usuário com esse código no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Verifica se não entrou e retorna:
    return user.length !== 0
      ? // id do usuário, true caso ache o usuário
        { id_user: user[0].id, res: true }
      : // false, status, msg caso não ache
        { res: false, status: 400, msg: "Usuário não autorizado" };
  },
  /*
   * Verifica se a guide existe e pertence aquele usuário
   */
  async valida_guide(id_guide, id_user) {
    // Consulta se guide pertence ao usuário
    const guide = await connection("RPG_guide")
      .select("id_user")
      .where("id", id_guide);
    // Verifica se encontrou o personagme
    return guide.length > 0
      ? // Se encontrou o personagem verifica se esse personagem pertence a esse usuário
        id_user === guide[0].id_user
        ? // true Se pertence ao usuário
          { res: true }
        : // false, status, msg se não pertence ao usuário
          {
            res: false,
            status: 400,
            msg: "Usuário não pode alterar esse personagem",
          }
      : // false, status, msg se não encontrou o personagem
        { res: false, status: 400, msg: "Personagem não encontrado" };
  },
  /*
   * Valida se o item já existem no banco
   */
  async conta_itens(table, parms, whereNot = {}) {
    // Consulta a quantidade de itens
    const [count] = await connection(table)
      .where(parms)
      .whereNot(whereNot)
      .count();
    // Verifica se encontrou no banco
    return count["count(*)"] !== 0
      ? // Se encontrou retorna a quantidade, true, um status, msg caso tenha excedido o limte que será defindo depois
        {
          res: count["count(*)"],
          status: 400,
          msg: "Limite de itens atingido! Adcione a sua mochila este item.",
        }
      : // Se não encontrou retorna false, e um status, msg dizendo que não encontrou
        {
          res: count["count(*)"],
          status: 404,
          msg: "Item(s) não encontrado(s).",
        };
  },
};
