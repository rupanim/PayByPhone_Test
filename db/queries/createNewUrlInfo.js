const createNewUrlInfo = async (req) =>{

    return new Promise((resolve, reject) => {      
    const query = `INSERT INTO urlinfo VALUES(\'${req.params.id}\', \'${req.params.shortUrl}\', \'${req.params.userUrl}\')`;

        req.params.dbClient.query(query)

                .then(res => {                                                                                       
                    console.log('data row added into DB');
                    return resolve(res);  
                })
                .catch(err => {
                    return reject('Query error: ' + err);
                });   
        });   
};
module.exports = createNewUrlInfo;
