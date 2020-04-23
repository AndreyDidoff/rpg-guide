// Requires
const bcrypt = require("bcryptjs");
const connection = require("../database/connect");
const validators = require("./validators");
let table_db = "RPG_users";
// Exports
module.exports = {
  /*
   * Users
   */
  // Create User
  async create(request, res) {
    // Pega todos os paramentros do body e colocar na variavel
    const { name, nickname, passwd, email } = request.body;
    // Procura no banco se usuário já existe
    const [count_user] = await connection(table_db)
      .select("id")
      .limit(1)
      .where("email", email)
      .orWhere("nickname", nickname)
      .count();
    // Verifica se encontrou resultados
    if (count_user["count(*)"] > 0) {
      // Resposta
      return res.status(406).json({
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
        const [count_cod] = await connection(table_db)
          .where("cod", cod_hash)
          .count();
        // Verifica se encontrou resultados
        if (count_cod["count(*)"] == 0) {
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
      const [id_user] = await connection(table_db).insert(insert);
      // Resposta
      return res.json({
        data: { id_user: id_user },
        msg: "SUCCESS",
      });
    }
  },
  // Select User using id
  async select_id(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_user } = request.params;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Consulta no banco id
      const users = await connection(table_db)
        .select("name", "nickname", "email", "cod")
        .where("id", id_user)
        .limit(1);
      // Resposta
      return res.json({
        data: users[0],
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Update User
  async update(request, res) {
    // Pega todos os paramentros do body e colocar na variavel
    const { name = "", nickname = "", passwd = "", email = "" } = request.body;
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_user } = request.params;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Cria variavel insert
      let update = { id: id_user };
      if (passwd !== "") {
        // Configurando senha
        const salt = bcrypt.genSaltSync(10);
        const passwd_hash = bcrypt.hashSync(passwd, salt);
        update["passwd"] = passwd_hash;
      }
      if (name !== "") {
        update["name"] = name;
      }
      if (nickname !== "") {
        update["nickname"] = nickname;
      }
      if (email !== "") {
        update["email"] = email;
      }
      // Insere no banco
      await connection(table_db).update(update);
      // Resposta
      return res.json({
        data: { id: id_user },
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Delete User
  async delete(request, res) {
    // Pega todos os paramentros da rota e colocar na variavel
    const { id_user } = request.params;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Deleta da base
      await connection(table_db).where("id", id).delete();
      // Resposta
      return res.json({
        msg: "SUCCESS",
      });
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },

  // Create Friend
  async create_friend(request, res) {
    // Pega todos os paramentros do body e colocar na variavel
    const { id_user, id_friend } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Consulta se já é amigo
      const [count_friend] = await connection("RPG_user_friends")
        .where({ id_user: id_user, id_friend: id_friend })
        .count();
      // Verfica se são amigos
      if (count_friend["count(*)"] === 0) {
        // Consulta se amigo já pediu amizade
        const friend = await connection("RPG_user_friends")
          .select("authorization")
          .where({ id_user: id_friend, id_friend: id_user })
          .limit(1);
        // Verifica se amigo já pediu amizade
        if (friend.length > 0 && friend[0].authorization === 0) {
          // Atualiza amizade
          await connection("RPG_user_friends")
            .update({ authorization: 1 })
            .where({ id_user: id_friend, id_friend: id_user });
          // Resposta
          return res.json({
            msg: "Amigo já pediu amizade. Amizade Aceita",
          });
        } else if (friend.length > 0 && friend[0].authorization === 1) {
          // Resposta
          return res.status(406).json({
            msg: "Usuário já são amigos",
          });
        } else {
          const [id] = await connection("RPG_user_friends").insert({
            id_user: id_user,
            id_friend: id_friend,
          });
          // Resposta
          return res.json({
            query: { id_user: id_user, id_friend: id_friend },
            data: { id: id },
            msg: "SUCCESS",
          });
        }
      } else {
        // Resposta
        return res.status(406).json({
          msg: "Usuário já são amigos",
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Update Friend
  async update_friend(request, res) {
    // Pega todos os paramentros do body e colocar na variavel
    const { id_user, id_friend, authorization } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
      // Valida se encntra o item
      const res_count_item = await validators.conta_itens("RPG_user_friends", {
        id_user: id_user,
        id_friend: id_friend,
      });
      // Define 0 para não encontro, 1 para friend e 2 para usuário
      let friend = 0;
      // Verifica se encontrou itens e seu limite
      if (res_count_item.res < 1) {
        // Valida se encntra o item
        const res_count_item2 = await validators.conta_itens(
          "RPG_user_friends",
          { id_user: id_friend, id_friend: id_user }
        );
        // Verifica se amigo tem esse usuário
        if (res_count_item2.res < 1) {
          // Define que é amigo do usuário
          friend = 1;
        } else {
          // Resposta
          return res.status(res_count_item2.status).json({
            msg: "Usuário não são amigos",
          });
        }
      } else {
        // Define que o usuário é amigo
        friend = 2;
      }
      // Verfica se são amigos
      if (friend !== 0) {
        // Verifica o que o usuário quer fazer aceitar ou tirar um amigo
        if (authorization === 0) {
          if (friend == 1) {
            // Atualiza amizade
            await connection("RPG_user_friends")
              .where({ id_user: id_friend, id_friend: id_user })
              .delete();
          } else {
            // Atualiza amizade
            await connection("RPG_user_friends")
              .where({ id_user: id_user, id_friend: id_friend })
              .delete();
          }
          // Resposta
          return res.json({
            msg: "Não são mais amigos",
          });
        } else {
          if (friend == 1) {
            await connection("RPG_user_friends")
              .update({ authorization: 1 })
              .where({ id_user: id_friend, id_friend: id_user });
            // Resposta
            return res.json({
              msg: "Usuário são amigos Agora",
            });
          } else {
            // Resposta
            return res.status(400).json({
              msg: "Usuário não pode aceitar ele mesmo",
            });
          }
        }
      } else {
        // Resposta
        return res.status(406).json({
          msg: "Usuário não são amigos",
        });
      }
    } else {
      // Resposta
      return res.status(res_user_token.status).json({
        msg: res_user_token.msg,
      });
    }
  },
  // Select All Friends
  async select_all_friends(request, res) {
    // Pega todos os paramentros da query e colocar na variavel
    const { page = 1 } = request.query;
    // Pega todos os paramentros do body e colocar na variavel
    const { id } = request.body;
    // Pega parametros do Headers para variavel
    const token = request.headers.authorization;
    // Valida cod_user
    const res_user_token = await validators.valida_user_token(id_user, token);
    // Verifica se encontrou usuário
    if (res_user_token.res) {
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
        return res.status(404).json({
          query: id,
          msg: "Usuário sem Amigos",
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
