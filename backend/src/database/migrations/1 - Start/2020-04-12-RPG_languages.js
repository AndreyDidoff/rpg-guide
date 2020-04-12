exports.up = function(knex) {
  return knex.schema.createTable('RPG_languages',function(table){
    table.integer('id').primary().notNullable().increments();
    table.string('name').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    table.engine('InnoDB');
    table.charset('utf8');
  }).insert([
    {id:1,name:'Anão'},
    {id:2,name:'Comum'},
    {id:3,name:'Élfico'},
    {id:4,name:'Gigante'},
    {id:5,name:'Gnômico'},
    {id:6,name:'Goblin'},
    {id:7,name:'Halfling'},
    {id:8,name:'Orc'},
    {id:9,name:'Abissal'},
    {id:10,name:'Celestial'},
    {id:11,name:'Dialeto Subterrâneo'},
    {id:12,name:'Dracônico'},
    {id:13,name:'Infernal'},
    {id:14,name:'Primordial'},
    {id:15,name:'Silvestre'},
    {id:16,name:'Subcomum'}
  ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('RPG_languages');
};