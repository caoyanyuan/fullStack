const pathlib=require('path');

module.exports={
  mode: 'development',
  entry: './src/2',
  output: {
    path: pathlib.resolve('dest'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.css$/, use: 'css-loader'}
    ]
  }
};
