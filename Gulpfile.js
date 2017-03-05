var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bower = require('gulp-bower');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('bower-restore', function() {
    return bower();
});

gulp.task('vendor-bundle', function() {
  return gulp.src(mainBowerFiles({filter:'**/*.js'}))
            .pipe(sourcemaps.init())
            .pipe(concat('vendors.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('maps/'))
            .pipe(gulp.dest('dist/'));
});

// gulp.task('app-bundle', function() {
//   return gulp.src(['src/js/app.js','src/js/**/*.js'])
//         .pipe(sourcemaps.init())
//         .pipe(concat('app.min.js'))
//          //.pipe(uglify())
//         .pipe(sourcemaps.write('maps/'))
//         .pipe(gulp.dest('dist/'));
// });

gulp.task('css',["bower-restore"], function() {
  return gulp.src(mainBowerFiles({filter:'**/*.css'})
          .concat('src/css/*.css'))
          .pipe(sourcemaps.init())
          .pipe(autoprefixer({
            browsers:['last 2 versions'],
            cascade:false
          }))
          .pipe(concat('site.min.css'))
          //.pipe(cssnano())
          .pipe(sourcemaps.write('maps/'))
          .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['vendor-bundle', 'css']);
