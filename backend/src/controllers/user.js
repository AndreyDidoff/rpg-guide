// Requires
const bcrypt = require('bcryptjs');
const connection = require('../database/connect');
const table_db = "RPG_users";
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
    async create(request,res){
        // Pega todos os paramentros do body e colocar na variavel
        const body = request.body;
        // Passa parametros body para varaveis
        const {name,nickname,passwd,email}=body;
        // Configurando senha
        const salt = bcrypt.genSaltSync(10);
        const passwd_hash = bcrypt.hashSync(passwd,salt);
        // Procura no banco se usuário já existe
        const users = await connection(table_db).select('id').limit(1).where('email',email).orWhere('nickname',nickname);
        // Verifica se encontrou resultados
        if(users.length>0){
            // Resposta
            return res.status(406).json({
                query:body
                ,rows:users.length
                ,msg:"Usuário ou e-mail já cadastrado!"
            });
        }else{
            // Cria variavel insert
            const insert = {"name":name,"nickname":nickname,"passwd":passwd_hash,'email':email};
            // Insere no banco
            const [id] = await connection(table_db).insert(insert);
            // Resposta
            return res.json({
                query:body
                ,data:{id}
                ,msg:"SUCCESS"
            });
        }
    },

    async select_all(request,res){
        // Pega todos os paramentros da query e colocar na variavel
        const {page = 1} = request.query;
        // Pega parametros do Headers para variavel
        const ONG_id = request.headers.authorization;
        // Consulta quantos tem no banco
        const [count] = await connection(table_db).count();
        // Consulta no banco id
        const incidents = await connection(table_db)
                                .select(table_db+'.title',table_db+'.description',table_db+'.value','ONGs.name','ONGs.city','ONGs.uf')
                                .join('ONGs','ONGs.id','=',table_db+'.ONG_id')
                                .limit(5)
                                .offset((page -1)*5)
                                .where('ONG_id',ONG_id);
        // Verifica se a Key é permitida
        if(incidents.length>0){
            // Resposta
            res.header('X-Total-Count',count['count(*)']);
            return res.json({
                query:page
                ,rows:incidents.length
                ,data:incidents
                ,msg:"SUCCESS"
            });
        }else{
            // Resposta
            return res.status(406).json({
                query:page
                ,rows:incidents.length
                ,msg:"NO INCIDENTS"
            });
        }
    },

    async select_id(request,res){
        // Pega todos os paramentros da rota e colocar na variavel
        const routes = request.params;
        // Pega parametros do Headers para variavel
        const ONG_id = request.headers.authorization;
        // Consulta no banco id
        const incidents = await connection(table_db).select('title','description','value').where({'id':routes.id,'ONG_id':ONG_id});
        console.log(incidents)
        // Verifica se a Key é permitida
        if(incidents.length>0){
            // Resposta
            return res.json({
                query:routes
                ,rows:incidents.length
                ,data:incidents
                ,msg:"SUCCESS"
            });
        }else{
            // Resposta
            return res.status(406).json({
                query:routes
                ,msg:"ID NO EXISTS"
            });
        }
    },

    async delete(request,res){
        // Pega todos os paramentros da rota e colocar na variavel
        const routes = request.params;
        // Pega parametros do Headers para variavel
        const ONG_id = request.headers.authorization;
        // Consulta no banco id
        const incident = await connection(table_db).select('ONG_id').where('id',routes.id).first();
        // Verfica se a ONG pode apagar esse incidente
        if(!incident){
            return res.status(406).json({msg:"INCIDENT NO EXISTS"});
        }
        if(ONG_id!==incident.ONG_id){
            return res.status(401).json({msg:"UNAUTHORIZED"});
        }
        // Deleta da base
        await connection(table_db).where('id',routes.id).delete();
        // Resposta
        return res.json({
            query:routes
            ,msg:"SUCCESS"
        });
    }
}