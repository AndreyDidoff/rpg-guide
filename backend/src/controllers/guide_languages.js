// Requires
const connection = require("../database/connect");
const validators = require("./validators");
const table_db = "RPG_guide_languages";
// Exports
module.exports = {
  /*
   * Languages
   */
  // Create Languages
  async create(request, res) {
    // Pega itens do body
    let { id_user, id_guide, id_languages } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se guide existe e pertence ao usuário
      const res_guide = await validators.valida_guide(
        id_guide,
        res_user_token.id_user
      );
      // Verifica se usuário pode adicionar
      if (res_guide.res) {
        // Cria Array para colocar o resultado
        let result = [];
        // Procurar cada uma da languages
        for (i in id_languages) {
          id_language = id_languages[i];
          // Valida se encntra o item
          const res_count_item = await validators.conta_itens(table_db, {
            id_guide: id_guide,
            id_language: id_language,
          });
          // Verifica se encontrou itens e seu limite
          if (res_count_item.res < 1) {
            const [id] = await connection(table_db).insert({
              id_guide: id_guide,
              id_language: id_language,
            });
            result.push(id);
          }
        }
        if (result.length === 0) {
          return res.status(400).json({
            msg: "O personagem já fala essas línguas",
          });
        } else {
          // Resposta
          return res.json({
            query: {
              id_guide: id_guide,
              id_languages: id_languages,
            },
            data: result,
            msg: "SUCCESS",
          });
        }
      } else {
        // Resposta
        return res.status(res_guide.status).json({
          msg: res_guide.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Languages
  async select_all_languages(request, res) {
    // Pega itens do body
    const { id_user, id_guide } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se guide existe e pertence ao usuário
      const res_guide = await validators.valida_guide(
        id_guide,
        res_user_token.id_user
      );
      // Verifica se usuário pode adicionar
      if (res_guide.res) {
        // Valida se encntra o item
        const res_count_item = await validators.conta_itens(table_db, {
          id_guide: id_guide,
        });
        // Verifica se encontrou itens e seu limite
        if (res_count_item.res > 0) {
          // Consulta quantos tem no banco
          const languages = await connection(table_db)
            .select("RPG_languages.id", "RPG_languages.name")
            .join("RPG_languages", function () {
              this.on({
                "RPG_guide_languages.id_language": "RPG_languages.id",
              });
            })
            .where(table_db + ".id_guide", id_guide)
            .orderBy("RPG_languages.name");
          // Resposta
          res.header("X-Total-Count", languages.length);
          return res.json({
            rows: languages.length,
            data: languages,
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
        return res.status(res_guide.status).json({
          msg: res_guide.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Update Language
  async update_language(request, res) {
    // Pega itens do body
    let { id_user, id_guide, id_languages } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se guide existe e pertence ao usuário
      const res_guide = await validators.valida_guide(
        id_guide,
        res_user_token.id_user
      );
      // Verifica se usuário pode adicionar
      if (res_guide.res) {
        // Cria Array para colocar o resultado
        let result = [];
        for (i in id_languages[0]) {
          let id_language = i;
          let type = id_languages[0][i];
          if (type === "C") {
            // Valida se encntra o item
            const res_count_item = await validators.conta_itens(table_db, {
              id_guide: id_guide,
              id_language: id_language,
            });
            // Verifica se encontrou itens e seu limite
            if (res_count_item.res < 1) {
              const [id] = await connection(table_db).insert({
                id_guide: id_guide,
                id_language: id_language,
              });
              result.push(id);
            }
          } else if (type === "D") {
            // Valida se encntra o item
            const res_count_item = await validators.conta_itens(table_db, {
              id_guide: id_guide,
              id_language: id_language,
            });
            // Verifica se encontrou itens e seu limite
            if (res_count_item.res > 0) {
              // Deleta do Banco
              await connection(table_db)
                .where({ id_language: id_language, id_guide: id_guide })
                .delete();
            }
          }
        }
        if (result.length === 0) {
          return res.status(res_count_item.status).json({
            msg: "As línguas escolhidas já existem ou já foram deletada",
          });
        } else {
          // Resposta
          return res.json({
            query: {
              id_guide: id_guide,
              id_languages: id_languages,
            },
            msg: "SUCCESS",
          });
        }
      } else {
        // Resposta
        return res.status(res_guide.status).json({
          msg: res_guide.msg,
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Delete Language
  async delete_language(request, res) {
    // Pega itens do body
    let { id_user, id_guide, id_languages } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se guide existe e pertence ao usuário
      const res_guide = await validators.valida_guide(
        id_guide,
        res_user_token.id_user
      );
      // Verifica se usuário pode adicionar
      if (res_guide.res) {
        // Procurar cada uma da languages
        for (i in id_languages) {
          // Define id_language
          id_language = id_languages[i];
          // Valida se encntra o item
          const res_count_item = await validators.conta_itens(table_db, {
            id_language: id_language,
            id_guide: id_guide,
          });
          // Verifica se encontrou itens e seu limite
          if (res_count_item.res > 0) {
            // Apaga do banco cada lingua escolhida
            await connection(table_db)
              .where({ id_language: id_language, id_guide: id_guide })
              .delete();
            // Resposta
            return res.json({
              msg: "SUCCESS",
            });
          } else {
            // Resposta
            return res.status(res_count_item.status).json({
              msg: "As línguas escolhidas não existem",
            });
          }
        }
      } else {
        // Resposta
        return res.status(res_guide.status).json({
          msg: res_guide.msg,
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
