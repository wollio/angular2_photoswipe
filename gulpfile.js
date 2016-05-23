//dependencies
var gulp = require('gulp');
var util = require('gulp-util');
var SystemBuilder = require('systemjs-builder');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var tsConfig = require('./tsconfig.json');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var tap = require('gulp-tap');
var fs = require('fs');

//Typescript Config;
var tsProject = ts.createProject(tsConfig.compilerOptions);

//copy dependencies to dist folder
gulp.task('copy:deps', function(){
  return gulp.src([
    '../photoswipe/dist/photoswipe.js',
    '../photoswipe/dist/photoswipe-ui-default.js'
  ]).pipe(gulp.dest('dist/vendor'));
});

//copy html/css/js files
gulp.task('copy:media', function(){
  return gulp.src([
    '../photoswipe/src/css/default-skin/*.png',
    '../photoswipe/src/css/default-skin/*.svg',
    '../photoswipe/src/css/default-skin/*.gif'
  ])
  .pipe(gulp.dest('dist/assets/media'));
});

gulp.task('copy:html', function() {
  return gulp.src([
    'src/**/*.html'
  ])
  .pipe(gulp.dest('dist'));
})

//compile app typescript files
gulp.task('compile:app', function(){
  return gulp.src(['src/**/*.ts', 'typings/browser/**/*.d.ts'])
    .pipe(ts(tsProject))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compile:sass', function () {
  return gulp.src(['src/**/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'));
});

//default task
gulp.task('default', ['compile:app', 'copy:media', 'compile:sass', 'copy:html', 'copy:deps'], function(){
});

gulp.task('watch', ['compile:app', 'copy:media', 'compile:sass'], function(){
  gulp.watch(['src/**/*.ts'], ['compile:app']);
  gulp.watch(['src/**/*.js', 'src/**/*.html'], ['copy:src'], ['copy:html']);
  gulp.watch(['src/**/*.scss'], ['compile:sass']);
});
