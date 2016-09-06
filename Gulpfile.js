var gulp = require('gulp')
var connect = require('gulp-connect')
var less = require('gulp-less')
var webpack = require('webpack-stream')

gulp.task('connect', ['copy'], function () {
  connect.server({
    root: ['./build'],
    port: 3001
  })
})

gulp.task('scripts', function () {
  return gulp.src('./app/js/main.ts')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./build'))
})

gulp.task('copy', function () {
  return gulp.src(['./app/**/**.*', '!./app/**/**.ts'], {
    base: './src'
  })
    .pipe(gulp.dest('./build'))
})

gulp.task('build', ['scripts', 'copy'])

gulp.task('default', ['scripts', 'copy', 'connect'], function () {
  gulp.watch(['!./app/**/**.ts', './src/**/**.*'], ['copy'])
  gulp.watch('./src/**/**.ts', ['scripts'])
})
