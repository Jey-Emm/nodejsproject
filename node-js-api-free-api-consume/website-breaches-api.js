import https from 'https'
import { error_helper } from './error-handler.js'
import url from 'url'
import 'dotenv/config';

const request_url = url.format({
    protocol: process.env.protocol,
    hostname: process.env.breaches_hostname,
    pathname: process.env.breaches_pathname
});

console.log(request_url);

https.get(request_url, (res) => {

    if(res.statusCode === 200){
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const response_value = JSON.stringify(data);
                console.log(response_value);
            }
            catch(err){
                console.error('Error parsing JSON data');
                console.log('Raw Response ', data);
            }
        });
    }
    else{
        error_helper(res.statusCode);
    }
}).on('error', (err) => {
     console.log('Error making API request: ', err.message);
});