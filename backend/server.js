const app = require('./app');
const http = require('http');
const PORT = process.env.PORT || 3000;
 const server = http.createServer(app);

server.listen(3000 , ()=>{
    console.log(`listenining on PORT : http://localhost:${PORT}`);
    
})