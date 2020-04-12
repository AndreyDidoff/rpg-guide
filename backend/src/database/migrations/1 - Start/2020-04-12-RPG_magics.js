exports.up = function(knex) {
  return knex.schema.createTable('RPG_magics',function(table){
    table.integer('id').primary().notNullable().increments();
    table.string('name').notNullable();
    table.string('circle').notNullable();
    table.integer('level').notNullable().defaultTo('0');
    table.string('formulation_time').notNullable();
    table.string('duration').notNullable();
    table.string('reach').notNullable();
    table.string('target').notNullable();
    table.string('resistence').notNullable();
    table.text('description').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    table.engine('InnoDB');
    table.charset('utf8');
  }).insert([
    {id:1,name:'Armadura de Espinhos',circle:'Spiritum',level:1,formulation_time:'1 Rodada',duraction:'1 Cena',reach:'Próprio Personagem',target:'Próprio personagem',resistance:'Não',description:'Este ritual conjura matéria espiritual primitiva,que fica circulando ao redor do corpo do mago no reino de Spiritum. Essa Forma-Pensamento constitui uma armadura astral que protege o mago com BA +7 (IP 6) para qualquer tipo de ataque espiritual u astral. Fantasmas, espectros, apraições e qualquer outro tipo de entidade espiritual são afetados por essa magia.'},
    {id:2,name:'Água Envenenada',circle:'',level:0,formulation_time:'1 Ação',duraction:'Uma Semana e Um Dia',reach:'Toque',target:'Um Líquido',resistance:'Sim (Vontade/anula)',description:'Este ritaul consiste em mergulhar uma varinha de metal duas vezes no recipente contendo o líquido que se tornará envenedado, em alterar suas características básicas (embora ainda pode ser detectado através de magias apropriadas). O volume transformado será sempre se um copo de vinho, mas a força do veneno dependerá do Focus do ritual. O veneno criado perderá a força em uma semana e um dia. O veneno criado causará 3d6 pontos de dano +1 ponto por nível se ingerido. A vítima pode fazer uma teste de fortitude (CON) para reduzir o dano à metade.'},
    {id:3,name:'Aumento de Dano',circle:'',level:0,formulation_time:'1 Ação',duraction:'1 Cena',reach:'Toque',target:'Uma Arma',resistance:'Sim (Vontade/anula)',description:'Em vez de causara dano direto, a magia pode ser usada para aumentar OUTRA fonte de dano. Você pode, digamos, revestir com chamas uma espada par aumentar o dano de ataque (ou do ataque de um colega) ou acrescentar uma aura de pedra em seus punhos, ácido na ponta de uma flecha, fagulhas incândecentes ou qualquer outro efeito que o mestre descrever.O aumento será:↵↵Nível = Aumento de Dano↵1 a 2 = +1↵3 a 5 = +2↵6 a 8 = +1d6↵  9+   = + 2d6↵↵Além disso, o dano passa a ser considerado mágico. Existem seis variações para este ritual,um para cada Caminho Elemental.'},
    {id:4,name:'Barreira Invisível de Espíritos',circle:'',level:0,formulation_time:'1 Rodada',duraction:'4d6 Rodadas',reach:'5 Metros',target:'Um Raio de 3 Metros',resistance:'Não',description:'Apesar do nome, este ritual faz o ar próximo do mago "endureça", formando um espécie de teia de ar sólido e invisível, capaz de segurar portas, deter atacantes, segurar objetos arremeçados e outros efeitos. Ao contrário do campo de força, a teia formada por esse ritual não é completamente fechada, permitindo a passagem de gases, líquidos ou chamas. Também não precisa ser totalmente rígida, podendo servir para amortecer quedas sem ferir as pessoas.↵A teia invisivel possui Força (FR) variável com o nível do mago (nível até 3˚ = 3d6; níveis 4˚a 6˚ = 4d6; níveis 7˚a 9˚ = 5d6; níveis 10˚+ = 6d6)'},
    {id:5,name:'Beleza Impecável',circle:'',level:0,formulation_time:'1 Rodada',duraction:'Ver Descrição',reach:'Próprio Personagem',target:'Próprio Personagem',resistance:'Não',description:'Este ritaul for criado por uma feiticeira chamada Luciene, que vivia se atrasando para reuniões e outros eventos por sua mania de limpeza e sua demora em escolher sua maquiagem, perfumes e arrumar seus cabelos. Este feitiço elemina primeiramente toda a sujeira do corpo, cabelos e roupas do mago. Em seguida, arruma as unhas, barba (se houver) e cabelos (deixando-os desembaraçados e arrumados, não importan o quão longo e crespos eles sejam). Em terceiro lugar, arruma suas roupas para que fiquem limpas e perfumadas (com cheiro de rosas). O mago continua arrumado até que a natureza se encarregue se sujá-lo novamente...↵Daemon: caso o mago não esteja utilizando nenhum tipo de pele animal, o Caminho Animais não é necessário.'},
    {id:6,name:'Bolsa Mágica',circle:'',level:0,formulation_time:'1 Rodada',duraction:'Uma hora / nível',reach:'Toque',target:'Uma bolsa',resistance:'Não',description:'Faz com que o interior de uma bolsa, baú, sacola ou outro recipiente aumente internamente de tamanho, permitindo ao feiticeiro carregar várias vezes o volume interno sem alterar o volume(peso) externo. Os limites para a bolsa mágica são dados pelo nível do mago.↵↵Nível  = Peso    = Volume↵Até 2 = 25Kg   = 2x↵3 a 4 = 50Kg   = 4x↵5 a 6 = 100Kg = 8x↵7 a 9 = 200Kg = 16x↵10 +  = 400Kg = 32x↵↵Uma vez que a duração do ritual acabe, todos os objetos no interior da bolsa serão automaticamente expelidos.'},
    {id:7,name:'Chave Mestra',circle:'',level:0,formulation_time:'1 Ação',duraction:'Permanente',reach:'Toque',target:'Fechadura',resistance:'Não',description:'Este ritual nessecita que o feiticeiro toque a fechadura de alguma maneira com seus dedos nus (não pode estar usando nenhum tipo de luva). A seguir , ele coloca a mão dentro de um bolso de sua roupa e retira uma chave que se encaixa perfeitamente na fechadura escolhida.'},
    {id:8,name:'Click',circle:'',level:0,formulation_time:'1 Ação',duraction:'Ver descrição',reach:'30 Metros',target:'Uma arma de fogo ou arco a cada 2 níveis',resistance:'Não',description:''},
    {id:9,name:'Crânnio Voador de Vladislav',circle:'',level:0,formulation_time:'1 Ação',duraction:'Instantánea',reach:'20 Metros',target:'1 Criatura por Crânio',resistance:'Reflexos/Anula/Resiste a mágia',description:''},
    {id:10,name:'Cura Mágica',circle:'',level:0,formulation_time:'1 Ação',duraction:'Instantánea',reach:'Toque',target:'1 Pessoa',resistance:'Vontade/Anula/Resiste a mágia',description:''},
    {id:11,name:'Dentes de Ferro',circle:'',level:0,formulation_time:'1 Ação',duraction:'1 Cena',reach:'Toque',target:'Próprio personagem',resistance:'Não',description:''},
    {id:12,name:'Desvio de Disparos',circle:'',level:0,formulation_time:'1 Rodada',duraction:'1 Cena',reach:'Toque',target:'1 Pessoa',resistance:'Não',description:''},
    {id:13,name:'Detectar Magia',circle:'',level:0,formulation_time:'1 Ação',duraction:'1 Cena',reach:'20 Metros',target:'Não tem Alvo',resistance:'Não',description:''},
    {id:14,name:'Encontrar Água',circle:'',level:0,formulation_time:'Ver Descrição',duraction:'Ver Descrição',reach:'Ver Descrição',target:'Ver Descrição',resistance:'Não',description:''},
    {id:15,name:'Espada Espiritual',circle:'',level:0,formulation_time:'1 Ação',duraction:'1 Cena',reach:'Toque',target:'Não tem Alvo',resistance:'Não',description:''},
    {id:16,name:'Flechas Mágicas de Questor',circle:'',level:0,formulation_time:'1 Ação',duraction:'1 Rodada',reach:'5 Metros',target:'1 Flecha a Cada 2 Níveis',resistance:'Não',description:''},
    {id:17,name:'Lança Infalível de Talude',circle:'',level:0,formulation_time:'1 Ação',duraction:'Instantánea',reach:'30 Metros',target:'1 Critura por Lança',resistance:'Não',description:''},
    {id:18,name:'Ouro dos Trouxas',circle:'',level:0,formulation_time:'1 Ação',duraction:'Uma hora / nível',reach:'Toque',target:'Não tem Alvo',resistance:'Não',description:''},
    {id:19,name:'Pele de Camaleão',circle:'',level:0,formulation_time:'1 Ação',duraction:'1 Cena',reach:'Toque',target:'1 Pessoa',resistance:'Não',description:''},
    {id:20,name:'Pequenas Curas',circle:'',level:0,formulation_time:'1 Ação',duraction:'Permanente',reach:'Toque',target:'1 Pessoa',resistance:'Vontade/Anula/Resiste a mágia',description:''}
  ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('RPG_magics');
};