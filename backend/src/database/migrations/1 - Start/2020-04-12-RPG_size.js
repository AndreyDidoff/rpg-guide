exports.up = function(knex) {
  return knex.schema.createTable('RPG_size',function(table){
    table.integer('id').primary().notNullable().increments();
    table.string('name').notNullable();
    table.integer('height').notNullable().defaultTo(0);
    table.integer('width').notNullable().defaultTo(0);
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    table.engine('InnoDB');
    table.charset('utf8');
  }).insert([
    {id:1,name:'Minúsculo',height:15,width:0},
    {id:2,name:'Diminuto',height:30,width:0},
    {id:3,name:'Miúdo',height:75,width:0},
    {id:4,name:'Pequeno',height:130,width:130},
    {id:5,name:'Médio',height:150,width:150},
    {id:6,name:'Grande (Alto)',height:300,width:300},
    {id:7,name:'Grande (Comprido)',height:300,width:150},
    {id:8,name:'Enorme (Alto)',height:450,width:450},
    {id:9,name:'Enorme (Comprido)',height:450,width:300},
    {id:10,name:'Imenso (Alto)',height:600,width:600},
    {id:11,name:'Imenso (Comprido)',height:600,width:450},
    {id:12,name:'Colossal (Alto)',height:900,width:900},
    {id:13,name:'Colossal (Comprido)',height:900,width:600}
  ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('RPG_size');
};