const fileAnalyzer = require('./FileTypes.js');
let fileSizes = fileAnalyzer('./');
console.log(fileSizes);

const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const filePath = './index.html';
  const contentType = 'text/html';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error loading ${filePath}`);
    } else {
      const html = content.toString().replace('{{fileSizes}}', JSON.stringify(fileSizes));
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(html, 'utf-8');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
