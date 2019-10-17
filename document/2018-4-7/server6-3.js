const express=require('express');
let body=require('./libs/my-body');

let server=express();
server.listen(8080);

server.use(body);

server.post('/upload', (req, res)=>{
  console.log(req.body);
});
