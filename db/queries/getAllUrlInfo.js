const getAllUrlInfo = async (req) =>{

    return new Promise((resolve, reject) => {      

        const query = 'SELECT * FROM urlinfo;';

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
module.exports = getAllUrlInfo;
