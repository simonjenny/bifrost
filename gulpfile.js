const gulp       = require('gulp');
const concat     = require('gulp-concat');
const uglify     = require('gulp-uglify');
const uglifycss  = require('gulp-uglifycss');
const rename     = require('gulp-rename');
const declare    = require('gulp-declare');
const wrap       = require('gulp-wrap');
const handlebars = require('gulp-handlebars');
const merge      = require('merge2');
const download   = require('gulp-download2');
const del = require('del');

function templates() {
    return gulp.src('./templates/*.hbs')
    .pipe(rename((path) => {
      if (path.basename.startsWith('_')) {
        path.basename = path.basename.substring(1);
      }
    }))
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Hbs',
      noRedeclare: true,
    }));
  }

gulp.task('scripts', function() {
    return gulp.src('./src/**/*.js')
        .pipe(concat('j.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest( './build/assets/js' ));
});

gulp.task('styles', function() {
    return gulp.src('./assets/css/*.css')
        .pipe(concat('s.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('./build/assets/css'));
});

gulp.task('images', function() {
    return gulp.src('./assets/img/*')
        .pipe(gulp.dest('./build/assets/img'));
});

gulp.task('public', function() {
    return gulp.src('./public/**/*')
        .pipe(gulp.dest('./build'));
});

gulp.task('templates', function() {
    return merge(templates())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./src/lib'));
});

gulp.task('download', function () {
    const files = [
        {
            url: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.js',
            file: 'handlebars.js',
        },
        {
            url: 'https://code.iconify.design/1/1.0.0-rc7/iconify.js',
            file: 'iconify.js',
        },
    ];
    return download(files).pipe(gulp.dest('./src/lib'));
});

gulp.task('deploy', function() {
    return gulp.src('./build/**/*')
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
    return del(['build', 'src/lib'])
});

gulp.task('default',  gulp.series('download','templates','scripts', 'styles','images', 'public','clean','deploy'));
