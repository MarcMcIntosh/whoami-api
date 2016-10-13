"use strict";
const http = require('http');
const server = http.createServer();

server.on('request', (req , res)=>{
  const headers = req.headers;
  const obj = {
    ipaddress: headers['x-forwarded-for'],
    language: headers['accept-language'].split(',')[0],
    software: headers['user-agent'].match(/\((.*?)\)/)[1]
  };
  const str = JSON.stringify(obj);
  res.writeHead(200,{
    'Content-Length': Buffer.byteLength(str),
    'Content-Type': 'application/json'
  });
  res.write(str,'utf8',()=>{
    res.end();
  });
});

server.on('error', (err)=>{
  console.error(err);
});

server.listen(8080);
