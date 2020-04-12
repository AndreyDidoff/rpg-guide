exports.up = function(knex) {
  return knex.schema.createTable('RPG_races',function(table){
    table.integer('id').primary().notNullable().increments();
    table.string('name').notNullable();
    table.integer('force_add').notNullable().defaultTo(0);
    table.integer('dexterity_add').notNullable().defaultTo(0);
    table.integer('constitution_add').notNullable().defaultTo(0);
    table.integer('intelligence_add').notNullable().defaultTo(0);
    table.integer('wisdom_add').notNullable().defaultTo(0);
    table.integer('charisma_add').notNullable().defaultTo(0);
    table.integer('displacement').notNullable().defaultTo(0);
    table.integer('min_age').notNullable().defaultTo(0);
    table.integer('max_age').notNullable().defaultTo(900);
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    table.engine('InnoDB');
    table.charset('utf8');
  }).insert([
    {id:1,name:'Halfling',force_add:0,dexterity_add:2,constituion_add:0,intelligence_add:0,wisdom_add:0,charisma_add:0,displacement:6,min_age:20,max_age:150},
    {id:2,name:'Meio-Orc',force_add:2,dexterity_add:0,constituion_add:1,intelligence_add:0,wisdom_add:0,charisma_add:0,displacement:9,min_age:14,max_age:75},
    {id:3,name:'Meio-Elfo',force_add:0,dexterity_add:0,constituion_add:0,intelligence_add:0,wisdom_add:0,charisma_add:2,displacement:9,min_age:20,max_age:180},
    {id:4,name:'Gnomo',force_add:0,dexterity_add:0,constituion_add:0,intelligence_add:1,wisdom_add:0,charisma_add:0,displacement:6,min_age:40,max_age:500},
    {id:5,name:'Elfo',force_add:0,dexterity_add:2,constituion_add:0,intelligence_add:0,wisdom_add:0,charisma_add:0,displacement:9,min_age:110,max_age:700},
    {id:6,name:'Anão',force_add:2,dexterity_add:0,constituion_add:2,intelligence_add:0,wisdom_add:0,charisma_add:0,displacement:6,min_age:40,max_age:400},
    {id:7,name:'Humano',force_add:1,dexterity_add:1,constituion_add:1,intelligence_add:1,wisdom_add:1,charisma_add:1,displacement:9,min_age:15,max_age:120},
    {id:8,name:'Orc',force_add:0,dexterity_add:0,constituion_add:0,intelligence_add:0,wisdom_add:0,charisma_add:0,displacement:0,min_age:0,max_age:0},
    {id:9,name:'Draconato',force_add:2,dexterity_add:0,constituion_add:0,intelligence_add:0,wisdom_add:0,charisma_add:1,displacement:0,min_age:0,max_age:0},
    {id:10,name:'Gnomo da Floresta',force_add:0,dexterity_add:1,constituion_add:0,intelligence_add:0,wisdom_add:0,charisma_add:0,displacement:0,min_age:0,max_age:0},
    {id:11,name:'Gnomo das Rochas',force_add:0,dexterity_add:0,constituion_add:1,intelligence_add:0,wisdom_add:0,charisma_add:0,displacement:0,min_age:0,max_age:0},
    {id:12,name:'Halfling Robusto',force_add:0,dexterity_add:0,constituion_add:1,intelligence_add:0,wisdom_add:0,charisma_add:0,displacement:0,min_age:0,max_age:0},
    {id:13,name:'Alto Elfo',force_add:0,dexterity_add:0,constituion_add:0,intelligence_add:1,wisdom_add:0,charisma_add:0,displacement:0,min_age:0,max_age:0},
    {id:14,name:'Tiefling',force_add:0,dexterity_add:0,constituion_add:0,intelligence_add:1,wisdom_add:0,charisma_add:2,displacement:0,min_age:0,max_age:0},
    {id:15,name:'Elfo da Floresta',force_add:0,dexterity_add:0,constituion_add:0,intelligence_add:0,wisdom_add:1,charisma_add:0,displacement:0,min_age:0,max_age:0},
    {id:16,name:'Anão da Colina',force_add:0,dexterity_add:0,constituion_add:0,intelligence_add:0,wisdom_add:1,charisma_add:0,displacement:0,min_age:0,max_age:0},
    {id:17,name:'Drow',force_add:0,dexterity_add:0,constituion_add:0,intelligence_add:0,wisdom_add:0,charisma_add:1,displacement:0,min_age:0,max_age:0},
    {id:18,name:'Halfling Pés-Leves',force_add:0,dexterity_add:0,constituion_add:0,intelligence_add:0,wisdom_add:0,charisma_add:1,displacement:0,min_age:0,max_age:0},
    {id:19,name:'Fada',force_add:0,dexterity_add:0,constituion_add:0,intelligence_add:0,wisdom_add:0,charisma_add:0,displacement:0,min_age:0,max_age:900}
  ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('RPG_races');
};