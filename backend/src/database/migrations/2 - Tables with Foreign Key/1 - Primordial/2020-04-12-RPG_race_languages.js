exports.up = function(knex) {
    return knex.schema.createTable('RPG_race_languages',function(table){
      table.interger('id').increments();
      table.interger('id_race').notNullable();
      table.interger('id_language').notNullable();
      table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
      table.engine('InnoDB');
      table.charset('utf8');
      table.foreign('id_race').references('id').inTable('RPG_races');
      table.foreign('id_language').references('id').inTable('RPG_languages');
    })
    .insert([
      {id:1,id_race:1,id_language:7},
      {id:2,id_race:1,id_language:2},
      {id:3,id_race:2,id_language:8},
      {id:4,id_race:2,id_language:2},
      {id:5,id_race:3,id_language:3},
      {id:6,id_race:3,id_language:2},
      {id:7,id_race:4,id_language:5},
      {id:8,id_race:4,id_language:2},
      {id:9,id_race:5,id_language:3},
      {id:10,id_race:5,id_language:2},
      {id:11,id_race:6,id_language:1},
      {id:12,id_race:6,id_language:2},
      {id:13,id_race:7,id_language:2},
      {id:14,id_race:8,id_language:8},
      {id:15,id_race:8,id_language:2},
      {id:16,id_race:9,id_language:12},
      {id:17,id_race:9,id_language:2},
      {id:18,id_race:10,id_language:5},
      {id:19,id_race:10,id_language:2},
      {id:20,id_race:11,id_language:5},
      {id:21,id_race:11,id_language:2},
      {id:22,id_race:12,id_language:7},
      {id:23,id_race:12,id_language:2},
      {id:24,id_race:13,id_language:3},
      {id:25,id_race:13,id_language:2},
      {id:26,id_race:15,id_language:3},
      {id:27,id_race:15,id_language:2},
      {id:28,id_race:16,id_language:1},
      {id:29,id_race:16,id_language:2},
      {id:30,id_race:18,id_language:7},
      {id:31,id_race:18,id_language:2}
    ]);
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('RPG_race_languages');
  };
