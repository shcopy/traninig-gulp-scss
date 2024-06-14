// require the module as normal
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require("browser-sync");

const ghPages = require('gulp-gh-pages');
 
// compileSass task
function compileScss() {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(
        browserSync.reload({
            stream: true,
        })
    );
}

// copyHTML task
function copyHTML() {
    return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(
        browserSync.reload({
            stream: true,
        })
    );
}


// Static 
function browser() {
    browserSync.init({
        server:{
            baseDir: "./dist",
        },
        port:8080,
    });
}

function watch(){
    gulp.watch('./src/**/*.html', gulp.series(copyHTML));
    gulp.watch('./src/scss/**/*.scss', gulp.series(compileScss));
}

function deploy(){
    return gulp.src('/dist')
    .pipe(ghPages());
}

// gulp.task('deploy', function() {
//     return gulp.src('./dist/**/*')
//       .pipe(ghPages());
//   });



// Exports
// exports.default = copyHTML;      // 執行指令: gulp
// exports.sass = compileSass;      // 執行指令: gulp sass
// exports.copyHTML = copyHTML;     // 執行指令: gulp copyHTML 

// exports.default = gulp.series(copyHTML, compileScss);   // 執行指令: gulp
// exports.scss = gulp.series(copyHTML, compileScss);;     // 執行指令: gulp sass


// 平行執行 copyHTML 及 compileScss 後再同步執行 browseSync 及watch
exports.default = gulp.series(copyHTML, compileScss, gulp.parallel(browser, watch));   // 執行指令: gulp
exports.build = gulp.series(copyHTML, compileScss);
exports.deploy = deploy;