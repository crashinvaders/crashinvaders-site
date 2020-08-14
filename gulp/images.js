const gulp = require('gulp');

function processImages() {
    return gulp.src('src/images/**/*.{gif,png,jpg,svg,webp}')
        .pipe(gulp.dest('build/images'))
}

module.exports = processImages;