const express = require('express');
const cors = require('cors');
const app = require('./app')
const http = require('http');
const { initializeSocket } = require('./socket');
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);
server.listen(PORT, () => {
  console.log(`listenining on PORT : http://localhost:${PORT}`);
});