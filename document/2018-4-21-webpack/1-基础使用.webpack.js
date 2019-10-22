const pathlib=require('path');

module.exports={
  entry:  {
    index: './src/index',
    test:  './src/1'
  },
  output: {
    path:       pathlib.resolve('dest/'),     //目标目录
    filename:   '[name].bundle.js'                   //输出文件名
  }
};
