exports.up = function(knex) {
  return knex.schema.createTable('RPG_classes',function(table){
    table.integer('id').primary().notNullable().increments();
    table.string('name').notNullable();
    table.integer('dice_life').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    table.engine('InnoDB');
    table.charset('utf8');
  }).insert([
    {id:1,name:'Bárbaro',dice_life:12},
    {id:2,name:'Bardo',dice_life:6},
    {id:3,name:'Clérigo',dice_life:8},
    {id:4,name:'Druida',dice_life:8},
    {id:5,name:'Feiticeiro',dice_life:4},
    {id:6,name:'Guerreiro',dice_life:10},
    {id:7,name:'Ladino',dice_life:6},
    {id:8,name:'Mago',dice_life:4},
    {id:9,name:'Monge',dice_life:8},
    {id:10,name:'Paladino',dice_life:10},
    {id:11,name:'Ranger',dice_life:8}
  ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('RPG_classes');
};