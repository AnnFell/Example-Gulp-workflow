const gulp = require('gulp'),
      eslint = require('gulp-eslint');


gulp.task('watch', function(){
  gulp.watch('app/js/**/*.js', ['linter']);
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