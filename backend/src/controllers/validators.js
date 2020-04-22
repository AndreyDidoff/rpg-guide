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
    return user.length !== 0
      ? { id_user: user[0].id, res: true }
      : { res: false, status: 400, msg: "Usuário não autorizado" };
  },
  /*
   * Verifica se a guide existe e pertence aquele usuário
   */
  async valida_guide(id_guide, id_user) {
    // Consulta se guide pertence ao usuário
    const guide = await connection("RPG_guide")
      .select("id_user")
      .where("id", id_guide);
    return guide.length > 0
      ? id_user === guide[0].id_user
        ? { res: true }
        : {
            res: false,
            status: 400,
            msg: "Usuário não pode alterar esse personagem",
          }
      : { res: false, status: 400, msg: "Personagem não encontrado" };
  },
  /*
   * Valida se o item já existem no banco
   */
  async valida_item(id_guide, id_item, key, parm) {},
};
