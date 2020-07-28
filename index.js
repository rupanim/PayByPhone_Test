if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const connectToDB = require('./db/db_client');
connectToDB().then(dbClient => {
    console.log('DB Client Connected');

    require('./api/startApiServer')(dbClient).then (port => {
        console.log(`Api server running on port ${port}.`);
    });
});





  



/*
const Pool = require('pg').Pool;
const pool = new Pool({
    host: 'url-shortening-server.postgres.database.azure.com',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: 'admin_mohit@url-shortening-server',     
    password: 'password$123',
    database: 'urlinfodb',
    port: 5432,
    ssl: true
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM urlinfo', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    })
  }
*/

//////////////////DONE
/*
const https = require('https');

https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
*/
/*
const pg = require('pg');

const db_connection = require('./db/db_connection');

const client = new pg.Client(db_connection);

client.connect(err => {
    if (err) throw err;
    else { queryDatabase(); }
});

function queryDatabase() {
  
    console.log(`Running query to PostgreSQL server: ${db_connection.host}`);

    const query = 'SELECT * FROM urlinfo;';

    client.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            process.exit();
        })
        .catch(err => {
            console.log(err);
        });
}
*/
