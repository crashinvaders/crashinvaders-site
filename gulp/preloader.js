const gulp = require("gulp");
const fs = require("fs");
const through = require("through2");

// const inputFiles = "build/images/**/*.png";
// const outputFile = "src/generated/preload-resources.json";

const FILE_PREFIX = "images/"
const DIR_OUTPUT = "src/generated"

function indexPreloadResources() {
    // return gulp.src("build/images/**/*.png")
    //     .pipe(folderIndex({
    //         filename: "preload-resources.json",
    //         prefix: "images"
    //
    //     }))
    //     .pipe(gulp.dest("build/data"));

    return gulp.src("src")
        .pipe(through.obj((chunk, enc, cb) => {
            const fileList = fs.readdirSync("build/images/").map(fileName => FILE_PREFIX + fileName);
            const content = JSON.stringify(fileList);
            if (!fs.existsSync(DIR_OUTPUT)) {
                fs.mkdirSync(DIR_OUTPUT);
            }
            fs.writeFileSync("src/generated/image-index.json", content);
            cb(null, chunk);
        }))
        .pipe(gulp.dest("src"));
}

module.exports = indexPreloadResources;