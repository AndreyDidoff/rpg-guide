// Requires
const connection = require('../database/connect');
const table_db = "Fi_user";
// Exports
module.exports = {
    async create(request,res){
        // Pega variavel id
        const body = request.body;
        // Pesquisa no banco
        const ong = await connection(table_db).select('name').where('id',body.id).first();
        // Verifica se existe
        if(!ong){
            return res.status(400).json({
                query:body
                ,msg:"NO ONG"
            });
        }
        // Resposta
        return res.json({
            query:body
            ,data:ong
            ,msg:"SUCCESS"
        });
    }
}