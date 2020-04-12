exports.up = function(knex) {
  return knex.schema.createTable('RPG_tables',function(table){
    table.integer('id').primary().notNullable().increments();
    table.string('name').notNullable();
    table.string('description');
    table.string('resume');
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    table.engine('InnoDB');
    table.charset('utf8');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('RPG_tables');
};