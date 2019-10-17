const mysql=require('mysql');
const config=require('./config');
const crypto=require('crypto');

let db=mysql.createPool({
  host:       config.db_host,
  port:       config.db_port,
  user:       config.db_user,
  password:   config.db_pass,
  database:   config.db_name,
});

let md5=crypto.createHash('md5');

let username='blue';
let password='123456';
md5.update(password+config.md5_key);
password=md5.digest('hex');

db.query(`INSERT INTO user_table (name,password) VALUES('${username}', '${password}')`, (err, rows)=>{
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
});
