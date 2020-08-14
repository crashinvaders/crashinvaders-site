const gulp = require('gulp');
const clean = require('gulp-clean');
const typescript = require('./gulp/typescript');
const styles = require('./gulp/styles');
const html = require('./gulp/html');
const staticResources = require('./gulp/static');
const images = require('./gulp/images');
const devServer = require('./gulp/devServer');

const outputDir = 'build/';

function cleanupBuildDir() {
    return gulp.src(outputDir, {read: false, allowEmpty: true})
        .pipe(clean());
}

module.exports.default = gulp.series(
    cleanupBuildDir,
    staticResources,
    gulp.parallel(
        devServer,
        typescript.bundleJs,
        styles,
        images,
        html));

module.exports.clean = cleanupBuildDir;

module.exports.deployS3 = require('./gulp/deploy').deployS3;

module.exports.compileTs = gulp.series(
    cleanupBuildDir,
    typescript.compileTs);