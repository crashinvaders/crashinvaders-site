const gulp = require('gulp');
const server = require('browser-sync').create();

function readyReload(cb) {
    server.reload();
    cb();
}

module.exports = function(cb) {
    server.init({
        server: 'build',
        notify: false,
        open: false,
        cors: true
    });

    gulp.watch('build/**/*.css', cb => gulp.src('build/**/*.css').pipe(server.stream()).on('end', cb));
    gulp.watch('build/*.{js,html}', readyReload);
    gulp.watch('build/images/**/*', readyReload);

    return cb()
};