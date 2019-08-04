const gulp = require('gulp');
const concat = require('gulp-concat');
const src = require('gulp-bem-src');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sync = require('browser-sync').create();

gulp.task('bundle', function bem() {
  src(
    ['library.blocks','common.blocks'],
    [{ block: 'block1'}, {block: 'block2'}],
    'sass',
    {
      config: {
        'blocks': { scheme: 'nested'}
      }
    }
  ).pipe(concat('index.sass'))
    .pipe(gulp.dest('build/sass'))
});


gulp.task('sass', function () {
  return gulp.src('build/sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream())
});


gulp.task('server', function () {
  sync.init({
    server: {
      baseDir: "./build"
    }
  });

  gulp.watch("./common.blocks/**/*.sass", gulp.series('sass'));
  gulp.watch("./library.blocks/**/*.sass", gulp.series('sass'));
  gulp.watch("./build/*.pug", gulp.series('pug')).on('change', sync.reload);
  gulp.watch("./build/*.html").on('change', sync.reload);

});


gulp.task('pug', function () {
  return gulp.src('build/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build'))
    .pipe(sync.stream())
});

gulp.task('default', gulp.series('server'));