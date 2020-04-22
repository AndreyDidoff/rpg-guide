// Requires
const connection = require("../database/connect");
const table_db = "RPG_guide_languages";
// Exports
module.exports = {
  /*
   * Languages
   */
  // Create Languages
  async create(request, res) {
    // Pega itens do body
    let { id_guide, id_languages } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Cria Array para colocar o resultado
      let result = [];
      // Procurar cada uma da languages
      for (i in id_languages) {
        id_language = id_languages[i];
        // Procura no banco para saber se lingua já existe
        const [count_language] = await connection(table_db)
          .where({ id_guide: id_guide, id_language: id_language })
          .count();
        // Verifica se encontrou no banco
        if (count_language["count(*)"] === 0) {
          const [id] = await connection(table_db).insert({
            id_guide: id_guide,
            id_language: id_language,
          });
          result.push(id);
        }
      }
      if (result.length === 0) {
        return res.status(400).json({
          msg: "Nada ha ser inserido no banco",
        });
      } else {
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
      }
    } else {
      // Resposta
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Select All Languages
  async select_all_languages(request, res) {
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
      // Consultar se o usuário solicitante é dono do guide
      const guide = await connection("RPG_guide")
        .select("id_user")
        .where("id", id_guide);
      // Verificar se achou:
      if (guide.length > 0) {
        // Verifica se usuário pode adicionar armors
        if (user[0].id === guide[0].id_user) {
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
  // Update Language
  async update_language(request, res) {
    // Pega itens do body
    let { id_guide, id_languages } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Cria Array para colocar o resultado
      let result = [];
      for (i in id_languages[0]) {
        console.log(id_languages[0][i]);
        let id_language = i;
        let type = id_languages[0][i];
        if (type === "C") {
          // Procura no banco para saber se lingua já existe
          const [count_language] = await connection(table_db)
            .where({ id_guide: id_guide, id_language: id_language })
            .count();
          // Verifica se encontrou no banco
          if (count_language["count(*)"] === 0) {
            const [id] = await connection(table_db).insert({
              id_guide: id_guide,
              id_language: id_language,
            });
            result.push(id);
          }
        } else if (type === "D") {
          // Procura no banco para saber se lingua existe
          const [count_language] = await connection(table_db)
            .where({ id_guide: id_guide, id_language: id_language })
            .count();
          // Verifica se encontrou no banco
          if (count_language["count(*)"] !== 0) {
            // Deleta do Banco
            await connection(table_db)
              .where({ id_language: id_language, id_guide: id_guide })
              .delete();
          }
        }
      }
      if (result.length === 0) {
        return res.status(400).json({
          msg: "Nada ha ser inserido no banco",
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
      return res.status(400).json({
        msg: "Usuário não autorizado",
      });
    }
  },
  // Delete Language
  async delete_language(request, res) {
    // Pega itens do body
    let { id_guide, id_languages } = request.body;
    // Pega parametros do Headers para variavel
    const cod_user = request.headers.authorization;
    // Consulta quantos tem no banco
    const user = await connection("RPG_users")
      .select("id")
      .where("cod", cod_user);
    // Veriricar se encotrou no banco o usuário
    if (user.length > 0) {
      // Consultar se o usuário que está socitando pode apagar
      const user = await connection(table_db)
        .select(".RPG_guide.id_user", "RPG_guide.id")
        .join("RPG_guide", function () {
          this.on({
            "RPG_guide_languages.id_guide": "RPG_guide.id",
          });
        })
        .where(table_db + ".id_guide", id_guide);
      // Verificar se achou:
      if (user.length > 0) {
        // Verifica se usuário pode adicionar armors
        if (user[0].id === user[0].id_user) {
          // Procurar cada uma da languages
          for (i in id_languages) {
            // Define id_language
            id_language = id_languages[i];
            // Apaga do banco cada lingua escolhida
            await connection(table_db)
              .where({ id_language: id_language, id_guide: id_guide })
              .delete();
          }
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
