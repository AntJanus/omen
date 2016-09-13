var gulp = require('gulp')
var connect = require('gulp-connect')
var less = require('gulp-less')
var webpack = require('webpack-stream')

const paths = {
  icons: {
    src: './node_modules/font-awesome/css/font-awesome.min.css',
    srcFont: './node_modules/font-awesome/fonts/**/*.*',
    dest: './dist/fonts'
  },
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

function fontCSS () {
  return gulp.src(paths.icons.src)
    .pipe(gulp.dest(paths.icons.dest + '/css'))
}

function fonts () {
  return gulp.src(paths.icons.srcFont)
    .pipe(gulp.dest(paths.icons.dest + '/fonts'))
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
  return gulp.src(['./app/**/**.*', '!./app/**/*.ts', '!./app/**/**.less'], {
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
exports.fonts = fonts
exports.fontCSS = fontCSS
exports.copy = copy
exports.watch = watch

const build = gulp.parallel([scripts, styles, copy, fonts, fontCSS])

gulp.task('build', build)
gulp.task('default', gulp.series(build, watch, server))
