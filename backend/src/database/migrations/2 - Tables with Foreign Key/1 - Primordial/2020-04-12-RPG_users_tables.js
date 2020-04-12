exports.up = function(knex) {
    return knex.schema.createTable('RPG_users_tables',function(table){
      table.interger('id').increments();
      table.interger('id_user').notNullable();
      table.interger('id_table').notNullable();
      table.specificType('master','tinyint(1)').notNullable().defaultTo(0);
      table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
      table.engine('InnoDB');
      table.charset('utf8');
      table.foreign('id_user').references('id').inTable('RPG_users');
      table.foreign('id_table').references('id').inTable('RPG_tables');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('RPG_users_tables');
  };
  