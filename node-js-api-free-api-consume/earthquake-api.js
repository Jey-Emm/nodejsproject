import https from 'https'
import url from 'url'
import { error_helper } from './error-handler.js';
import 'dotenv/config';

const queryParams = {
    format: 'geojson',
    starttime: '2025-09-01',
    endtim: '2025-09-15'
}

const request_url = url.format({
    protocol: process.env.protocol,
    hostname: process.env.earthquake_hostname,
    pathname: process.env.earthquake_pathname,
    query: queryParams
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
            const responseData = JSON.parse(data);
            console.log('API Response: ', responseData);
        }
        catch(err){
            console.error('Error parsing JSON: ', err);
            console.log('Raw response: ', data);
        }
    });
    }
    else{
        error_helper(res.statusCode);
    }
    
}).on('error', (err) => {
    console.log('Error making API request: ', err.message);
});