const getUrlInfobyShort = async (req) =>{

    return new Promise((resolve, reject) => {      

        const query = `SELECT * FROM urlinfo where short_url=\'${req.params.shortUrl}\'`;

        req.params.dbClient.query(query)
                .then(res => {
                    const rows = res.rows;                                                                        
                    return resolve(rows);                    
                })
                .catch(err => {
                    return reject('Query error: ' + err);
                });       
    });
};
module.exports = getUrlInfobyShort;
