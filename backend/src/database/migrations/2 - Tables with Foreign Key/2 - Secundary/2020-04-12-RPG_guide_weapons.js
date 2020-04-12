exports.up = function(knex) {
    return knex.schema.createTable('RPG_guide_weapons',function(table){
      table.interger('id').increments();
      table.interger('id_guide').notNullable();
      table.interger('amount_dice_attack').notNullable();
      table.interger('dice_attack').notNullable();
      table.interger('bonus').notNullable();
      table.interger('amount_dice_critical').notNullable();
      table.interger('dice_critical').notNullable();
      table.string('reach').notNullable();
      table.string('type').notNullable();
      table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
      table.engine('InnoDB');
      table.charset('utf8');
      table.foreign('id_guide').references('id').inTable('RPG_guide');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('RPG_guide_weapons');
  };