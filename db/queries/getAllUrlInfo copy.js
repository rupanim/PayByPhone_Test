const pg = require('pg');
const db_connection = require('../db_connection_info');
const client = new pg.Client(db_connection);

const getAllUrlInfo = async () =>{

    return new Promise((resolve, reject) => {
        let resultRows = {};

        client.connect(err => {
            if (err) {
                return reject('Connection error: ' + err);
            }
            else { queryDatabase(); }
        });

        function queryDatabase() {
        
            console.log(`Connected to server: ${db_connection.host}`);            

            const query = 'SELECT * FROM urlinfo;';

            client.query(query)
                .then(res => {
                    const rows = res.rows;
                    // rows.map(row => {
                    //     console.log(`Read: ${JSON.stringify(row)}`);
                    // });
                    // resultRows = res.rows;
                    // module.exports = {
                    //     resultRows
                    // };                                                            
                    return resolve(rows);                    
                })
                .catch(err => {
                    return reject('Query error: ' + err);
                });
        }
    });
};
 module.exports = getAllUrlInfo;
