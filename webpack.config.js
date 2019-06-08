const path = require('path');

module.exports = {
  mode: 'development',
  watch: true,
  entry: path.resolve(__dirname, 'client', 'src', 'app.jsx'),
  target: "web",
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'client', 'dist', 'static')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }, 
  devServer: {
    contentBase: path.resolve(__dirname, 'client', 'dist', 'templates'),
    publicPath: '/',
    compress: true,
    port: 8081,
    host: '0.0.0.0'
  }
}
    