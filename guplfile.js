"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const useref = require("gulp-useref");
const uglify = require("gulp-uglify-es").default;
const pump = require("pump");

gulp.task("runServer", () => {
  browserSync({
    server: {
      baseDir: "./app"
    }
  });
  gulp.watch(["*.html", ".js", "*.css"], {cwd: "./app"}, reload);
});

gulp.task("concat", () => {
  return gulp.src("./app/public/index.html")
  .pipe(useref())
  .pipe(gulp.dest("./dist"));
})

gulp.task("minify", (cb) => {
  pump([
  gulp.src("./dist/main.js"), // what file(s) to minify
  uglify(), // run the uglify function
  gulp.dest("./dist") // where to place the newly minified file
  ], cb);
  });