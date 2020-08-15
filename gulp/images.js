const gulp = require('gulp');
const fs = require("fs");

function processImages() {
    return gulp.src('src/images/**/*.{gif,png,jpg,svg,webp}')
        .pipe(gulp.dest('build/images'))
}
module.exports = processImages;


const FILE_PREFIX = "images/"
const DIR_GENERATED = "src/generated"
function indexFiles(cb) {
    const fileList = fs.readdirSync("build/images/").map(fileName => FILE_PREFIX + fileName);
    const content = JSON.stringify(fileList);

    console.log("Image files indexed. " + fileList.length + " items found.");

    if (!fs.existsSync(DIR_GENERATED)) { fs.mkdirSync(DIR_GENERATED); }
    fs.writeFileSync(DIR_GENERATED + "/image-index.json", content);

    if (cb) cb();
}
module.exports.indexFiles = indexFiles;