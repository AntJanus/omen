var path = require('path')

module.exports = {
  entry: './app/js/main.ts',
  output: {
    path: path.resolve('./dist/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exlude: /(node_modules)/,
        loader: 'ts-loader'
      }
    ],
    noParse: [/zone\.js\/dist\/.+/, /angular2\/bundles\/.+/]
  }
}
