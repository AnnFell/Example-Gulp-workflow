const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      eslint = require('gulp-eslint');


gulp.task('watch', function(){

  browserSync.init({
    server: "./"
  });

  gulp.watch('app/js/**/*.js', ['linter']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('linter', function(){
  return gulp.src([
    'app/js/**/*.js',
    '!node_modules'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulp.dest('js'));
});

gulp.task('default', ['linter', 'watch']);