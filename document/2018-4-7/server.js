const express=require('express');

let server=express();
server.listen(8080);

server.get('/a', ()=>{
  console.log('请求a');
});

server.post('/upload', ()=>{
  console.log('请求upload');
});
