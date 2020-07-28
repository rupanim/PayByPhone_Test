const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = (process.env.PORT) || 3000;
const { v4: uuidv4 } = require('uuid');

let urlInfoList = {};

const startApiServer = async(dbClient) => {
    return new Promise((resolve, reject) => {  
        app.use(bodyParser.json());
        app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );        

        app.get('/', (request, response) => {
           response.send(
               '<h1>Welcome to URL Shortening API</h1> <hr> <br/> The following are the list of valid apis <br/>' +
            '<ul> <li> /getAllUrlInfo  -> To get the list of all the data in the urlInfo table </li>' +
            '<li> /getShortenUrlInfo/{userUrl}  -> To get the url info based on the actual url or create a new one if it does not exists.</li>' +
            '<li> /redirectUrl/tinyurl/:shortUrl  -> To redirect to the actual url info based on the shortened part of the url (specifcally the uniue id after \'tinyurl.com/\') </li>' +
            '<li> /retrieveUrlInfo/tinyurl/:shortUrl  -> To get the url info based on the shortened part of the url (specifcally the uniue id after \'tinyurl.com/\') </li>' +
            '</ul>'
            
           );
        });

        app.get('/getAllUrlInfo', (request, response) => {            
            request.params.dbClient = dbClient;
            const result = require('../db/queries/getAllUrlInfo');
            result(request).then(rows => {
                
                console.log('got all urlinfo table rows');                
                urlInfoList = rows;
                response.json(urlInfoList);
                response.end();
                
            });          
            
        });

        app.get('/getShortenUrlInfo/:userUrl', (request, response) => {
            if(validateURL(request.params.userUrl)){
                request.params.dbClient = dbClient;            
                const result2 = require('../db/queries/getUrlInfobyUrl');
                result2(request).then(row => {
                    if(row.length != 0){
                        response.send('URL data found in DB: ' + JSON.stringify(row));
                        response.end();                   
                    } else{                   
                        response.send('Since data does not exist in DB, added new UrlInfo row data!!');
                        
                        const turl = require('turl');
                        turl.shorten(request.params.userUrl).then((tUrl) => {                          
                            request.params.shortUrl = tUrl;
                            request.params.id = uuidv4();
                            const result3 = require('../db/queries/createNewUrlInfo');
                            result3(request).then(row => {
                           
                        }).catch((err) => {
                            console.log(err);
                        });
                        
                        });
                    }                   
                });
            } else{
                response.send(`Invalid Url: ${request.params.userUrl}`);
                response.end();
            }
        });

        app.get('/redirectUrl/tinyurl/:shortUrl', (request, response) => {
            request.params.shortUrl = "https://tinyurl.com/" + request.params.shortUrl;           
            request.params.dbClient = dbClient;            
            const result2 = require('../db/queries/getUrlInfobyShort');
            result2(request).then(row => {
                if(row.length != 0){
                    console.log('URL data found in DB: ' + JSON.stringify(row));                    
                    response.redirect(row[0].actual_url);                    
                     response.end();                   
                } else{                   
                    response.send(`Invalid Short URL: ${request.params.shortUrl}`);
                    response.end();                       
                }                   
            });
        
    });

        app.get('/retrieveUrlInfo/tinyurl/:shortUrl', (request, response) => {
                request.params.shortUrl = "https://tinyurl.com/" + request.params.shortUrl;             
                request.params.dbClient = dbClient;            
                const result2 = require('../db/queries/getUrlInfobyShort');
                result2(request).then(row => {
                    if(row.length != 0){
                        response.send('URL data found in DB: ' + JSON.stringify(row));
                        response.end();                   
                    } else{                   
                        response.send(`Invalid Short URL: ${request.params.shortUrl}`);
                        response.end();                       
                    }                   
                });
            
        });


        function validateURL(url){
             return (url.endsWith(".com"));            
        }

        app.listen(port, () => {            
            resolve(port);
        });
        
});
};

module.exports = startApiServer;