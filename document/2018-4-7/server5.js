const express=require('express');
const pathlib=require('path');

let server=express();
server.listen(8080);

server.get('/a', (req, res)=>{
  res.redirect('http://www.baidu.com/');

  /*res.setHeader('location', 'http://www.baidu.com/');
  res.writeHeader(401);
  res.end();*/
});
