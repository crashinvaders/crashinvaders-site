const gulp = require("gulp");
const clean = require("gulp-clean");
const typescript = require("./gulp/typescript");

const outputDir = "build/";

function cleanupBuildDir() {
    return gulp.src(outputDir, {read: false, allowEmpty: true})
        .pipe(clean());
}

module.exports.default = gulp.series(
    cleanupBuildDir,
    require("./gulp/static"),
    require("./gulp/images"),
    require("./gulp/images").indexFiles,
    gulp.parallel(
        require("./gulp/devServer"),
        typescript.bundleJs,
        require("./gulp/styles"),
        require("./gulp/html")));

module.exports.clean = cleanupBuildDir;

module.exports.deployS3 = require("./gulp/deploy").deployS3;

module.exports.compileTs = gulp.series(
    cleanupBuildDir,
    typescript.compileTs);

module.exports.indexPreload = require("./gulp/preloader")