exports.up = function(knex) {
  return knex.schema.createTable('RPG_alignment',function(table){
    table.integer('id').primary().notNullable().increments();
    table.string('name').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    table.engine('InnoDB');
    table.charset('utf8');
  }).insert([
    {id:1,name:'Leal e Bom'},
    {id:2,name:'Neutro e Bom'},
    {id:3,name:'Caótico e Bom'},
    {id:4,name:'Leal e Neutro'},
    {id:5,name:'Neutro'},
    {id:6,name:'Caótico e Neutro'},
    {id:7,name:'Leal e Mau'},
    {id:8,name:'Neutro e Mau'},
    {id:9,name:'Caótico e Mau'}
  ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('RPG_alignment');
};