var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: 'inline-sourcemap',
  entry: {
    "popup.min.js": './src/js/popup.js',
    "options.min.js": './src/js/options.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]'
  },
  module: {
    loaders: [
      {
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  watch: true
}
