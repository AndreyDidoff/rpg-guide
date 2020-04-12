exports.up = function(knex) {
    return knex.schema.createTable('RPG_guide',function(table){
      table.interger('id').increments();
      table.interger('id_alignment').notNullable();
      table.interger('id_class').notNullable();
      table.interger('id_color_eye').notNullable();
      table.interger('id_color_hair').notNullable();
      table.interger('id_color_skin').notNullable();
      table.interger('id_race').notNullable();
      table.interger('id_size').notNullable();
      table.interger('id_user').notNullable();
      table.interger('age').notNullable();
      table.interger('charisma').notNullable();
      table.interger('constitution').notNullable();
      table.interger('descterity').notNullable();
      table.interger('force').notNullable();
      table.interger('height').notNullable();
      table.interger('intelligence').notNullable();
      table.interger('money_copper').notNullable().defaultTo(0);
      table.interger('money_gold').notNullable().defaultTo(0);
      table.interger('money_platium').notNullable().defaultTo(0);
      table.interger('money_silver').notNullable().defaultTo(0);
      table.interger('movement').notNullable();
      table.string('name').notNullable();
      table.text('secret_story').notNullable();
      table.text('story').notNullable();
      table.interger('weight').notNullable();
      table.interger('wisdom').notNullable();
      table.interger('xp').notNullable().defaultTo(0);
      table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
      table.engine('InnoDB');
      table.charset('utf8');
      table.foreign('id_alignment').references('id').inTable('RPG_alignment');
      table.foreign('id_class').references('id').inTable('RPG_classes');
      table.foreign('id_color_eye').references('id').inTable('RPG_color_eye');
      table.foreign('id_color_hair').references('id').inTable('RPG_color_hair');
      table.foreign('id_color_skin').references('id').inTable('RPG_color_skin');
      table.foreign('id_race').references('id').inTable('RPG_races');
      table.foreign('id_size').references('id').inTable('RPG_size');
      table.foreign('id_user').references('id').inTable('RPG_users');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('RPG_guide');
  };