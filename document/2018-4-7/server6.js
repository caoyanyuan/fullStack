const express=require('express');
const pathlib=require('path');

let server=express();
server.listen(8080);

server.get('/a', (req, res)=>{
  console.log(req.query);
});
