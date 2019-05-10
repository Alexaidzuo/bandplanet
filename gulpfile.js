require('es6-promise').polyfill();

var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    rtlcss        = require('gulp-rtlcss'),
    cleanCSS      = require('gulp-clean-css'),
    autoprefixer  = require('gulp-autoprefixer'),
    plumber       = require('gulp-plumber'),
    gutil         = require('gulp-util'),
    rename        = require('gulp-rename'),
    concat        = require('gulp-concat'),
    imagemin      = require('gulp-imagemin'),
    browserSync   = require('browser-sync').create(),
    reload        = browserSync.reload;

var onError = function( err ) {
  console.log('An error occurred:', gutil.colors.magenta(err.message));
  gutil.beep();
  this.emit('end');
};

// Sass
gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('minify-css', () => {
     // Folder with files to minify
     return gulp.src('css/*.css')
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./'));
});

// Move the JavaScript files into js/vendor folder from node_package
gulp.task('js', function (){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js'])
  .pipe(gulp.dest('./js/vendor'));
});

// Images
gulp.task('images', function() {
  return gulp.src('./img/**/*')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(imagemin({ optimizationLevel: 7, progressive: true }))
  .pipe(gulp.dest('./img/dist'));
});

// Watch
gulp.task('watch', function() {
  browserSync.init({
    files: ['./**/*.html'],
    proxy: 'localhost/bandplanet/',
  });
  gulp.watch('./sass/**/*.scss', ['sass', reload]);
  // gulp.watch('images/src/*', ['images', reload]);
  gulp.watch('*.css', ['minify-css', reload]);
});

// Default
gulp.task('default', ['sass', 'js', 'images', 'minify-css', 'watch']);