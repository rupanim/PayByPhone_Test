const getUrlInfobyUrl = async (req) =>{

    return new Promise((resolve, reject) => {      

        const query = `SELECT * FROM urlinfo where actual_url=\'${req.params.userUrl}\'`;

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
module.exports = getUrlInfobyUrl;
