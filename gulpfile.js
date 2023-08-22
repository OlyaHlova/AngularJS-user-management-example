import { createRequire } from 'node:module';
import gulp from 'gulp';
import concat from 'gulp-concat';
import browserSynchronization from 'browser-sync';

const require = createRequire(import.meta.url);
const scripts = require('./scripts');
const styles = require('./styles');

const { task, src, dest, series, watch } = gulp;
const browserSync = browserSynchronization.create();


gulp.task('css', function () {
    return gulp.src(styles)
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function () {
    return gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function () {
    return gulp.src('./src/templates/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build',  gulp.series('css', 'js', 'html'), function(done) {
});

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('watch', function (done) {
    gulp.watch('./src/styles/**/*.css', gulp.series('css'));
    gulp.watch('./src/js/**/*.js', gulp.series('js'));
    gulp.watch('./src/templates/**/*.html', gulp.series('html'));
    done();
});

gulp.task('start', gulp.parallel('build', 'browser-sync', 'watch'));
