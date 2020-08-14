const gulp = require("gulp");
const fs = require("fs");

const AWS_CREDS_FILE = "private/aws-creds.json";

function deployS3() {
    if (!fs.existsSync(AWS_CREDS_FILE)) {
        throw new Error("There's no local AWS credential file found. It should be located under: " + AWS_CREDS_FILE);
    }

    const s3Config = JSON.parse(fs.readFileSync(AWS_CREDS_FILE));
    const s3 = require("gulp-s3-upload")(s3Config);

    return gulp.src(["build/index.html", "build/index.js", "build/index.min.css"])
        .pipe(s3({
            Bucket: "crashinvaders.com",
            ACL:    "public-read",
        }, {
            maxRetries: 3
        }))
    ;
}

module.exports.deployS3 = deployS3;