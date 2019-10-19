const koa=require('koa');
const router=require('koa-router');
const Mysql=require('mysql-pro');

const db=new Mysql({
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: '20180412'
  }
});

console.log(db)

const server=new koa();
server.listen(8080);

let r1=router();
server.use(r1.routes());

//"/user?id=xxx"
r1.get('/user', async ctx=>{
  let id=ctx.query.id;

  try{
    // await db.startTransaction();
    // let data=await db.executeTransaction('SELECT * FRO user_table WHERE ID=? AND age=?', [id, 18]);
    // await db.stopTransaction();

    ctx.response.body='ccc';
  }catch(e){
    console.log(e)
    ctx.response.body='数据库正在维护中，请稍候重试';
  }
});
