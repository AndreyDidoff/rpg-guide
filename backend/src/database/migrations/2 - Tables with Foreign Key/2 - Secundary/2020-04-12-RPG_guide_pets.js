exports.up = function(knex) {
    return knex.schema.createTable('RPG_guide_pets',function(table){
      table.interger('id').increments();
      table.interger('id_guide').notNullable();
      table.interger('id_alignment').notNullable();
      table.string('name').notNullable();
      table.interger('height').notNullable();
      table.interger('life').notNullable();
      table.interger('distance').notNullable();
      table.text('description');
      table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
      table.engine('InnoDB');
      table.charset('utf8');
      table.foreign('id_guide').references('id').inTable('RPG_guide');
      table.foreign('id_alignment').references('id').inTable('RPG_alignment');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('RPG_guide_pets');
  };