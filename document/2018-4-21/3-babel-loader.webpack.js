const pathlib=require('path');

module.exports={
  mode: 'development',
  entry: './src/es6',
  output: {
    path: pathlib.resolve('dest'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};
