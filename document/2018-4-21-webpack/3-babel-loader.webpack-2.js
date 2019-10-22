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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
