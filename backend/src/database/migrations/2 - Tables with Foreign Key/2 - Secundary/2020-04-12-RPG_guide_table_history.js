exports.up = function(knex) {
    return knex.schema.createTable('RPG_guide_table_history',function(table){
      table.interger('id').increments();
      table.interger('id_guide').notNullable();
      table.interger('id_table').notNullable();
      table.text('history_text').notNullable();
      table.dateTime('datetime').notNullable();
      table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
      table.engine('InnoDB');
      table.charset('utf8');
      table.foreign('id_guide').references('id').inTable('RPG_guide');
      table.foreign('id_table').references('id').inTable('RPG_tables');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('RPG_guide_table_history');
  };