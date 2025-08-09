import http from 'http'
import fs from 'fs'
//Create the http server

const default_page = fs.readFileSync('./Navbar/index.html');
const default_style = fs.readFileSync('./Navbar/styles.css');
const default_logo = fs.readFileSync('./Navbar/logo.svg');
const default_browser_app = fs.readFileSync('./Navbar/browser-app.js');

const server = http.createServer((request, response) => {

    if(request.url === '/'){
        response.writeHead(200, {'content-type': 'text/html'});
        response.write(default_page);
        response.end();
    }
    else if(request.url === '/styles.css'){
        response.writeHead(200, {'content-type': 'text/css'});
        response.write(default_style);
        response.end();
    }
    else if(request.url === '/logo.svg'){
        response.writeHead(200, {'content-type': 'image/svg+xml'});
        response.write(default_logo);
        response.end();
    }
    else if(request.url === '/browser-app.js'){
        response.writeHead(200, {'content-type':'text/javascript'});
        response.write(default_browser_app);
        response.end();
    }

    else if (request.url === '/projects.html'){
        response.writeHead(200, {'content-type': 'text/html'});
        response.write('<h1> My First Profile HTTP Server in Node.JS </h1>');
        response.end();
    }
    else if(request.url === '/contact.html'){
        response.writeHead(200, {'content-type':'text/html'});
        response.write('<h1> My First Contact HTTP Server in Node.JS </h1>');
        response.end();
    }
    else if(request.url === '/about.html'){
        response.writeHead(200, {'content-type':'text/html'});
        response.write('<div><h1> My First About HTTP Server in Node.JS </h1></div>');
        response.end();
    }
        else if(request.url === '/index.html'){
        response.writeHead(200, {'content-type':'text/html'});
        response.write(default_page);
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