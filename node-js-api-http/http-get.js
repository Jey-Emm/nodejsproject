import http from 'http'

let students = [
    {"FullName":"Jose Rizal", "Address":"Calamba", "Age":130},
    {"FullName":"Apolinario Mabini", "Address":"Cavite", "Age":150},
    {"FullName":"Andres Bonifacio", "Address":"Batangas", "Age":112}
]

const server = http.createServer((req,res) =>{
    const {method, url} = req;
    const parsedURL = new URL(url, `http://${req.headers.host}`);
    const pathValue = parsedURL.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if(method === "GET" && pathValue === '/students'){
        res.writeHead(200, {'Content-Type':'application/json'});
        res.write(JSON.stringify(students));
        res.end();
        }
        else{
        res.writeHead(500, {'Content-Type':'application/json'});
        let errorResponse = {"errorcode":"500", "description":"Internal Server Error"};
        res.write(JSON.stringify(errorResponse));
        res.end();
        }
})

const portValue = 5002;
server.listen(5002, () => {
    console.log('Server listen to ' + portValue);
})