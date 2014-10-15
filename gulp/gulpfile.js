var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// uglify: {
//   base: {
//     files: {
//       'public/ss_foundation/libs/modernizr.min.js': [
//         'public/ss_foundation/libs/modernizr.js'
//       ],
//       // Custom foundation build

//       'public/ss_foundation/libs/foundation.min.js': [
//         'bower_components/foundation/js/foundation/foundation.js',
//         'bower_components/foundation/js/foundation/foundation.abide.js',
//         'bower_components/foundation/js/foundation/foundation.dropdown.js',
//         'bower_components/foundation/js/foundation/foundation.topbar.js',
//         'bower_components/foundation/js/foundation/foundation.magellan.js',
//         'bower_components/foundation/js/foundation/foundation.tab.js'
//       ]
//     }
//   },
gulp.task('uglify-base', function() {

  gulp.src([
    'lib/foundation/js/foundation/foundation.js',
    'lib/foundation/js/foundation/foundation.abide.js',
    'lib/foundation/js/foundation/foundation.dropdown.js',
    'lib/foundation/js/foundation/foundation.topbar.js',
    'lib/foundation/js/foundation/foundation.magellan.js',
    'lib/foundation/js/foundation/foundation.tab.js'
  ]).pipe(concat('foundation.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))

  gulp.src([
    'lib/modernizr/modernizr.js'
  ])
    .pipe(concat('modernizr.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))

});
