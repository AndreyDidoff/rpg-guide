exports.up = function(knex) {
  return knex.schema.createTable('RPG_users',function(table){
    table.integer('id').primary().notNullable().increments();
    table.string('name').notNullable();
    table.string('nickname').notNullable();
    table.string('passwd').notNullable();
    table.string('email').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    table.engine('InnoDB');
    table.charset('utf8');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('RPG_users');
};