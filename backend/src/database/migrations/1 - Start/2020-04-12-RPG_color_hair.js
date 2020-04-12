exports.up = function(knex) {
  return knex.schema.createTable('RPG_color_hair',function(table){
    table.integer('id').primary().notNullable().increments();
    table.string('name').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    table.engine('InnoDB');
    table.charset('utf8');
  }).insert([
    {id:1,name:'Branco'},
    {id:2,name:'Preto'},
    {id:3,name:'Castanho'},
    {id:4,name:'Ruivo'},
    {id:5,name:'Loiro'},
    {id:6,name:'Careca'},
    {id:7,name:'Dourado'}
  ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('RPG_color_hair');
};