const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const shorthand = require("gulp-shorthand");
const autoprefixer = require("gulp-autoprefixer");
const stylelint = require("gulp-stylelint");
const rename = require("gulp-rename");
const concat = require("gulp-concat");

const outputDir = "build/css";

function compileSass() {
    return gulp.src("src/styles/index.scss")
        .pipe(plumber())
        .pipe(stylelint({
            failAfterError: false,
            reporters: [
                {
                    formatter: "string",
                    console: true
                }
            ]
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(shorthand())
        // .pipe(cleanCSS({
        //     debug: true,
        //     compatibility: "*"
        // }, details => {
        //     console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`)
        // }))
        .pipe(concat("index.css"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./")) // writes .map file
        .pipe(gulp.dest(outputDir))
}

module.exports = function(cb) {
    gulp.watch("src/styles/**/*.scss", { ignoreInitial: false }, compileSass);
    cb();
};