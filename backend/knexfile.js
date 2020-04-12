// Update with your config settings.
module.exports = {
    development: {
        client: 'mysql',
        connection: {
          host : '127.0.0.1',
          user : 'root',
          password : 'root',
          database : 'RPGGuide-Dev'
        },
        migrations:{
        directory: './src/database/migrations'
      },
      useNullAsDefault:true
    },
    test: {
        client: 'mysql',
        connection: {
          host : '127.0.0.1',
          user : 'root',
          password : 'root',
          database : 'RPGGuide-Test'
        },
      migrations:{
        directory: './src/database/migrations'
      },
      useNullAsDefault:true
    },
    production: {
        client: 'mysql',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : 'root',
            database : 'RPGGuide'
        },
        migrations:{
            directory: './src/database/migrations'
        },
    }
  };