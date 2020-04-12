exports.up = function(knex) {
  return knex.schema.createTable('RPG_color_eye',function(table){
    table.integer('id').primary().notNullable().increments();
    table.string('name').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    table.engine('InnoDB');
    table.charset('utf8');
  }).insert([
    {id:1,name:'Verde'},
    {id:2,name:'Azul'},
    {id:3,name:'Caramelo'},
    {id:4,name:'Brancos'},
    {id:5,name:'Castanho'},
    {id:6,name:'Dourado'},
    {id:7,name:'Cinza'}
  ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('RPG_color_eye');
};
