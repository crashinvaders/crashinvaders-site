const gulp = require('gulp');
const htmlMin = require('gulp-htmlmin');
const htmlHint = require('gulp-htmlhint');

const outputDir = 'build/';

function process() {
    return gulp.src('src/html/**/*.html')
        .pipe(htmlHint('.htmlhintrc.json'))
        .pipe(htmlMin())
        .pipe(gulp.dest(outputDir));
}

function processAndWatch(cb) {
    gulp.watch('src/html/**/*.html', { ignoreInitial: false }, process);
    cb();
}

module.exports = processAndWatch;