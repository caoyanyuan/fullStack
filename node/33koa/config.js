const pathlib = require('path')

//pathlib 都用绝对六级
module.exports = {
    port: 8080,
    uploadDir: pathlib.resolve('www/upload'),
    wwwDir:     pathlib.resolve('www'),
    logpath:    pathlib.resolve('log/access.log'),

    //secret
    secret_key: ['sadfasgdsfsdfes', 'etdty5erdydr6hy'],

    //database
    db_host:    'localhost',
    db_port:    3306,
    db_user:    'root',
    db_pass:    'root',
    db_name:    'zhihu',
}