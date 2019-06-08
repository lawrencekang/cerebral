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
    




// module.exports = [{
//   mode: 'development',
//   watch: true,
//   entry: path.resolve(__dirname, 'server', 'src', 'app.js'),
//   target: "node",
//   output: {
//     filename: 'app.js',
//     path: path.resolve(__dirname, 'server', 'dist')
//   }
// }, {
//   watch: true,
//   entry: path.resolve(__dirname, 'client', 'src', 'app.jsx'),
//   target: "web",
//   output: {
//     filename: 'index.js',
//     path: path.resolve(__dirname, 'client', 'dist', 'static')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader"
//         }
//       }
//     ]
//   },
// }, {
//   devServer: {
//     contentBase: path.resolve(__dirname, 'client', 'dist', 'static'),
//     publicPath: path.resolve(__dirname, 'client', 'dist', 'static'),
//     compress: true,
//     port: 9000,
//     index: path.resolve(__dirname, 'client', 'dist', 'templates', 'index.html' )
//   },
//   mode: 'development',
// }];
