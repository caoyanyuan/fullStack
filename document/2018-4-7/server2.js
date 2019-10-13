const express=require('express');

let server=express();
server.listen(8080);

server.get('/a', (req, res)=>{
  res.send({a: 12, b: 44});
});
