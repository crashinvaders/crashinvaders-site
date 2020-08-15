const gulp = require("gulp");
const ts = require("gulp-typescript");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const watchify = require("watchify");
const tsify = require("tsify");
const gutil = require("gulp-util");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const filter = require("gulp-filter");

const outputDir = "build/js";
const watchedBrowserify = browserify({
    basedir: ".",
    debug: true,
    entries: ["src/scripts/index.ts"],
    cache: {},
    packageCache: {},
    plugin: [tsify, watchify]
});
watchedBrowserify.on("update", bundleJs);
watchedBrowserify.on("log", gutil.log);

function compileTs() {
    return gulp.src(["src/scripts/data/*.ts", "src/scripts/model/*.ts"])
        .pipe(ts({
            // module: "none",
            moduleResolution: "Node",
            declaration: true,
            // declarationMap: true,
            outFile: "datamodel.js"
        }))
        // .pipe(filter(["**/*.d.ts"]))
        .pipe(gulp.dest(outputDir));
}

function bundleJs() {
    return watchedBrowserify
        .bundle()
        .on("error", gutil.log)
        .pipe(source("index.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // .pipe(uglify())
        .pipe(sourcemaps.write("./")) // writes .map file
        .pipe(gulp.dest(outputDir));
}

module.exports.bundleJs = bundleJs;
module.exports.compileTs = compileTs;