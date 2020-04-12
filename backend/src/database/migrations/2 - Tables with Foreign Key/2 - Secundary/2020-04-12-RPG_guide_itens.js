exports.up = function(knex) {
    return knex.schema.createTable('RPG_guide_itens',function(table){
      table.interger('id').increments();
      table.interger('id_guide').notNullable();
      table.string('name').notNullable();
      table.text('description');
      table.interger('amount').notNullable();
      table.string('unit');
      table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
      table.engine('InnoDB');
      table.charset('utf8');
      table.foreign('id_guide').references('id').inTable('RPG_guide');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('RPG_guide_itens');
  };