const http=require('http');
const fs=require('fs');
const zlib=require('zlib');
const cluster=require('cluster');
const os=require('os');

if(cluster.isMaster){
  for(let i=0;i<os.cpus().length;i++){
    cluster.fork();
  }
}else{
  let server=http.createServer((req, res)=>{
    let rs=fs.createReadStream(`www${req.url}`);
    let gz=zlib.createGzip();

    res.setHeader('content-encoding', 'gzip');

    rs.pipe(gz).pipe(res);

    rs.on('error', function (){
      res.setHeader('content-encoding', '');
      res.writeHeader('404');
      res.write('Not Found');
      res.end();
    });
  });
  server.listen(8080);
}
