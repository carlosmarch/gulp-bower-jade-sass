/**
 * Created by carlos on 27/10/15.
 */

/*----------------------------------------------*\
 Gulp Require
 \*----------------------------------------------*/
var gulp            = require('gulp'),
    sass            = require('gulp-ruby-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifycss       = require('gulp-minify-css'),
    jshint          = require('gulp-jshint'),
    uglify          = require('gulp-uglify'),
    imagemin        = require('gulp-imagemin'),
    rename          = require('gulp-rename'),
    concat          = require('gulp-concat'),
    notify          = require('gulp-notify'),
    cache           = require('gulp-cache'),
    livereload      = require('gulp-livereload'),
    del             = require('del'),
    inject          = require('gulp-inject'),
    jade            = require('gulp-jade');


/*----------------------------------------------*\
 Build & Inject
 \*----------------------------------------------*/


/* Take all SASS files, compile, minify & put into build folder */
gulp.task('styles', function() {
    return sass('app/styles/main.scss', { style: 'expanded' })
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

/* Take all Scripts, minify & put into build folder */
gulp.task('scripts', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

/* Compile index.jade into .html and put in build folder */
gulp.task('templates', function() {
    gulp.src('app/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist'))
});

/* Inject into Index.jade all .css & .js files  */
gulp.task('inject-files', ['styles', 'scripts', 'templates'], function () {
    var target  = gulp.src('./dist/index.html');
    var sources = gulp.src(['./dist/js/*.js', './dist/css/*.css'], {read: false});

    return target.pipe(inject(sources, {relative: true}))
                 .pipe(gulp.dest('./dist'));
});




/* START  GULP */
gulp.task('default', ['inject-files', 'templates'], function() {

});

