var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var webserver = require('gulp-webserver');
var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var watchify = require("watchify");
var fancy_log = require("fancy-log");

var paths = {
    pages: ["./*.html", "assets/**/*"],
};
var watchedBrowserify = watchify(
    browserify({
        basedir: ".",
        debug: true,
        entries: ["src/main.js"],
        cache: {},
        packageCache: {},
    })
        // .plugin(tsify)
        .transform("babelify", {
            presets: ["es2015"],
        })
);
gulp.task("copy-assets", function () {
    return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});
function bundle() {
    return watchedBrowserify
        .bundle()
        .on("error", fancy_log)
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist"));
}

function server() {
    gulp.src('./dist')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
}

gulp.task("default", gulp.series(gulp.parallel("copy-assets"), bundle, server));
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", fancy_log);