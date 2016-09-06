module.exports = {
  entry: './app/js/main.ts',
  watch: true,
  output: {
    path: './dist/js',
    publicPath: 'dist',
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
