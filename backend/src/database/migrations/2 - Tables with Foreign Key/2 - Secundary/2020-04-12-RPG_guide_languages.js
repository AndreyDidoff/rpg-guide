exports.up = function(knex) {
    return knex.schema.createTable('RPG_guide_languages',function(table){
      table.interger('id').increments();
      table.interger('id_guide').notNullable();
      table.interger('id_language').notNullable();
      table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
      table.engine('InnoDB');
      table.charset('utf8');
      table.foreign('id_guide').references('id').inTable('RPG_guide');
      table.foreign('id_language').references('id').inTable('RPG_languages');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('RPG_guide_languages');
  };