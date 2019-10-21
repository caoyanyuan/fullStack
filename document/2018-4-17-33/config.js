const pathlib=require('path');

module.exports={
  //basic
  port:       8080,
  uploadDir:  pathlib.resolve('www/upload'),
  wwwDir:     pathlib.resolve('www'),
  logpath:    pathlib.resolve('log/access.log'),

  //secret
  secret_key: ['sadfasgdsfsdfes', 'etdty5erdydr6hy'],

  //database
  db_host:    'localhost',
  db_port:    3309,
  db_user:    'root',
  db_pass:    '',
  db_name:    'zhihu',
};
