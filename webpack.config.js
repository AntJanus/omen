var path = require('path')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  sourceMap: true,
  entry: './app/scripts/main.ts',
  target: 'electron',
  output: {
    path: path.resolve('./dist/js'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [path.join(__dirname, 'node_modules')],
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
  },
  plugins: [new BundleAnalyzerPlugin()]
}
