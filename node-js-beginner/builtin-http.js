import http from 'http'

//Create the http server
const server = http.createServer((request, response) => {
    
    if(request.url === '/'){
        response.writeHead(200, {'content-type': 'text/html'});
        response.write("<h1> My First Home HTTP Server in Node.JS </h1> ");
        response.end();
    }
    else if (request.url === '/Profile'){
        response.writeHead(200, {'content-type': 'text/html'});
        response.write('<h1> My First Profile HTTP Server in Node.JS </h1>');
        response.end();
    }
    else if(request.url === '/contact'){
        response.writeHead(200, {'content-type':'text/html'});
        response.write('<h1> My First Contact HTTP Server in Node.JS </h1>');
        response.end();
    }
    else{
        response.writeHead(404, {'content-type':'text/html'});
        response.write('<h1> 404 Resources Not Found </h1>')
        response.end();
    }
})

//Define port were the created server will listen
server.listen(5000,() => {
    console.log("Server listening to Port 5000.")
})