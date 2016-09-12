var gulp = require('gulp')
var connect = require('gulp-connect')
var less = require('gulp-less')
var webpack = require('webpack-stream')

const paths = {
  styles: {
    src: './app/styles/main.less',
    dest: './dist/styles',
    glob: './app/**/*.less'
  },
  scripts: {
    src: './app/scripts/main.ts',
    dest: './dist/js',
    glob: './app/**/*.ts'
  }
}

function server (done) {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 3001
  })

  done()
}

function styles () {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(connect.reload())
}

function scripts () {
  return gulp.src(paths.scripts.src)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(connect.reload())
}

function copy () {
  return gulp.src(['./app/**/**.*', '!./app/**/**.ts', '!./app/**/**.less'], {
    base: './app'
  })
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
}

function watch (done) {
  gulp.watch(paths.scripts.glob, scripts)
  gulp.watch(paths.styles.glob, styles)
  gulp.watch(['./app/**/**.*', '!./app/**/*.ts', '!./app/**/*.less'], copy)

  done()
}

exports.server = server
exports.styles = styles
exports.scripts = scripts
exports.copy = copy
exports.watch = watch

const build = gulp.parallel([scripts, styles, copy])

gulp.task('build', build)
gulp.task('default', gulp.series(build, watch, server))
