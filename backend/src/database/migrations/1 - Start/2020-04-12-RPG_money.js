exports.up = function(knex) {
  return knex.schema.createTable('RPG_money',function(table){
    table.integer('id').primary().notNullable().increments();
    table.string('name').notNullable();
    table.string('initials').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    table.engine('InnoDB');
    table.charset('utf8');
  }).insert([
    {id:1,name:'Platina',initials:'pl'},
    {id:2,name:'Ouro',initials:'po'},
    {id:3,name:'Prata',initials:'pp'},
    {id:4,name:'Cobre',initials:'pc'}
  ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('RPG_money');
};