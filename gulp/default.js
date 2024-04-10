const gulp = require('gulp');
const include = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');


gulp.task('clean:default', function (done) { 
    if (fs.existsSync('./build/')) {
        return gulp.src('./build/', {read: false})
            .pipe(clean({force: true}))
    }    

    done();
})

gulp.task('html:default', function () {
    return gulp.src(['./src/html/**/*.html', '!./src/html/components/*.html'])
        .pipe(changed('./build/', {hasChanged: changed.compareContents}))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'HTML',
                message: 'Error <%= error.message =%>',
                sound: false,
            })
        }))
        .pipe(include({
            prefix: '@@',
            basepath: '@file',
        }))
        .pipe(gulp.dest('./build/'))
})

gulp.task('sass:default', function () { 
    return gulp.src('./src/scss/**/*.scss')
        .pipe(changed('./build/css'))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Styles',
                message: 'Error <%= error.message =%>',
                sound: false,
            })
        }))
        .pipe(sourceMaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./build/css'))
})

gulp.task('images:default', function () {
    return gulp.src('./src/img/**/*')
        .pipe(changed('./build/img'))
        .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest('./build/img'))
})

gulp.task('fonts:default', function () {
    return gulp.src('./src/fonts/**/*')
    .pipe(changed('./build/fonts'))
    .pipe(gulp.dest('./build/fonts'))
})

gulp.task('files:default', function () {
    return gulp.src('./src/files/**/*')
    .pipe(changed('./build/files'))
    .pipe(gulp.dest('./build/files'))
})

gulp.task('js:default', function () { 
    return gulp.src('./src/js/*.js')
        .pipe(changed('./build/js'))
        .pipe(plumber({
        errorHandler: notify.onError({
            title: 'JS',
            message: 'Error <%= error.message =%>',
            sound: false,
        })
        }))
        // .pipe(babel())
        .pipe(webpack(require('./../webpack.config.js')))
        .pipe(gulp.dest('./build/js'))
})


gulp.task('server:default', function () {
    return gulp.src('./build/')
        .pipe(server({
            livereload: true,
            oper: true,
    }))
})

gulp.task('watch:default', function () { 
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:default'));
    gulp.watch('./src/**/*.html', gulp.parallel('html:default'));
    gulp.watch('./src/img/**/*', gulp.parallel('images:default'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:default'));
    gulp.watch('./src/files/**/*', gulp.parallel('files:default'));
    gulp.watch('./src/js/*.js', gulp.parallel('js:default'));
})

