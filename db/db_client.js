const db_client = async () =>{
    return new Promise((resolve, reject) => {
        const pg = require('pg');
        const db_connection = require('./db_connection_info');
        const client = new pg.Client(db_connection);   
        client.connect((err, db) => {
            if (err) {
                return reject(`Connection error: ${err}`);
            }
            else {                
                console.log(`Successfully Connected to server: ${db.connectionParameters.host}`);
                return resolve(db);
             }
        });
    });
};

module.exports = db_client;