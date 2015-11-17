var gulp = require('gulp');
var notify = require('gulp-notify');
var babel = require('gulp-babel');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('compile', function() {
  return gulp.src(['./src/**/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('out'));
});

gulp.task('jscs', function() {
  return gulp.src(['./src/**/*.js'])
    .pipe(jscs({
      configPath: '.jscsrc'
    }))
    .pipe(jscs.reporter());
});

gulp.task('lint', function() {
  return gulp.src(['./src/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .pipe(notify({
      title: 'JSHint',
      message: 'JSHint Passed. Let it fly!',
    }));
});

gulp.task('test', function() {});

gulp.task('default', ['lint', 'jscs', 'test', 'compile'], function() {
  gulp.src('/')
    .pipe(notify({
      title: 'Task Builder',
      message: 'Successfully built server'
    }))
});