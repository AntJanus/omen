var path = require('path')

module.exports = {
  entry: './app/scripts/main.ts',
  output: {
    path: path.resolve('./dist/js'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    root: './src',
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
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
