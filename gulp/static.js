const gulp = require('gulp');

function processStaticResources() {
    return gulp.src('static/**')
        .pipe(gulp.dest('build'))
}

module.exports = processStaticResources;