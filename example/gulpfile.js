'use strict';

var gulp     = require('gulp'),
    sequence = require('gulp-sequence'),
    plumber  = require('gulp-plumber'),
    reactify = require('reactify'),
    webpack  = require('gulp-webpack'),
    react    = require('gulp-react'),
    rimraf   = require('rimraf'),
    noop     = function() {}

gulp.task('webpack', function() {
    gulp.src('./tmp/app.js')
        .pipe(plumber())
        .pipe(webpack({
            entry: {
                app: './tmp/app.js'
            },
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('public/'))
})

gulp.task('react', function() {
    return gulp.src('src/**/*.js')
        .pipe(plumber())
        .pipe(react())
        .pipe(gulp.dest('tmp/'))
})

gulp.task('clean', function() {
    rimraf('./tmp', noop)
    rimraf('./public/bundle.js', noop)
})

gulp.task('build', sequence('react', 'webpack'))

gulp.task('default', function() {
    gulp.watch('src/**/*.js', ['build'])
})
