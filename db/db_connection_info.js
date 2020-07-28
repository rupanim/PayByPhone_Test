
module.exports = {
        host: 'url-shortening-server.postgres.database.azure.com',       
        user: process.env.DB_USER,     
        password: process.env.DB_PWD,
        database: 'urlinfodb',
        port: 5432,
        ssl: true    
};