const { src, dest, series, parallel, watch } = require("gulp");
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const babel = require('gulp-babel');
const sass = require("gulp-sass")(require("sass"));
const fileinclude = require("gulp-file-include");
const browserSync = require('browser-sync');
const reload = browserSync.reload;

//搬家語法
function move() {
  return src("src/index.html").pipe(dest("dist"));
}
exports.m = move;


// 清除舊檔案
function clear() {
  return src('dist' ,{ read: false ,allowEmpty: true })//不去讀檔案結構，增加刪除效率  / allowEmpty : 允許刪除空的檔案
  .pipe(clean({force: true})); //強制刪除檔案 
}

exports.c = clear

//  css minify
function cssminify() {
  return src("src/css/style.css").pipe(cleanCSS()).pipe(dest("dist/css"));
}

exports.cssm = cssminify;

// php move
function phpmove() {
  return src(['src/php/*.php','src/php/**/*.php','src/php/**/**/*.php']).pipe(dest("dist/php"));
}
// js minify
function jsmove() {
  return src(['src/js/*.js','src/js/**/*.js','src/js/**/**/*.js']).pipe(dest("dist/js"));
}
function jsmini() {
  return src(['src/js/*.js','src/js/**/*.js','src/js/**/**/*.js']).pipe(uglify()).pipe(dest("dist/js"));
}

// js es6 -> es5
function babel5() {
    return src(['src/js/*.js','src/js/**/*.js','src/js/**/**/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

exports.es5 = babel5;
exports.js = jsmini;
exports.jsm = jsmove;


// sass complier
// 沒壓縮css
function sassStyle() {
  return src("src/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on("error", sass.logError)) // sass ->css
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
      cascade: false
  }))
    .pipe(dest("dist/css"));
}

// 有壓縮
function sassStyleMini() {
  return src("src/sass/*.scss")
  .pipe(sourcemaps.init())
  .pipe(sass.sync().on("error", sass.logError)) // sass ->css
  .pipe(sourcemaps.write())
    .pipe(cleanCSS()) // minify css
    .pipe(autoprefixer({
      cascade: false
     }))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest("dist/css"));
}

exports.style = sassStyle;
exports.styleMini = sassStyleMini;


// html template
function html() {
  return src("src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(dest("dist/"));
}

exports.template = html


// 打包圖片
function img(){
   return src(['src/img/*.*','src/img/**/*.*']).pipe(dest('dist/img'))
}
function otherPng(){
  return src(['src/img/*.png','src/img/**/*.png']).pipe(dest('dist/img'))
}
function otherSvg(){
  return src(['src/img/*.svg','src/img/**/*.svg']).pipe(dest('dist/img'))
}
exports.img = img;
exports.png = otherPng;
exports.svg = otherSvg;
//圖片壓縮
function imgmini(){
  return src(['src/img/**/**/*.*' ,'src/img/*.*','src/img/**/*.*'])
  .pipe(imagemin([
    imagemin.mozjpeg({quality: 80, progressive: true}) // 壓縮品質      quality越低 -> 壓縮越大 -> 品質越差 

]))
  .pipe(dest('dist/img/'))
}

exports.minifyimg = imgmini;






// 監看所有變動
function watchfile(){
  watch(['src/*.html' , 'src/layout/*.html'] ,html)
  watch(['src/sass/*.style' , 'src/sass/**/*.scss'] ,sassStyle)
  watch('src/js/*.js' , jsmini)
  watch(['src/img/*.*', 'src/img/**/*.*'] , img)
}


//瀏覽器同步
function browser(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        },
        port: 3000
    });
    watch(['src/*.html' , 'src/layout/*.html'] ,html).on('change' , reload)
    watch(['src/sass/*.style' , 'src/sass/**/*.scss'] ,sassStyle).on('change' , reload)
    watch(['src/js/*.js', 'src/js/**/*.js','src/js/**/**/*.js'], jsmove).on('change' , reload)
    watch(['src/php/*.php','src/php/**/*.php','src/php/**/**/*.php'], phpmove).on('change' , reload)
    watch(['src/img/*.*', 'src/img/**/*.*'] , img).on('change' , reload)
    watch(['src/img/*.png','src/img/**/*.png'] , otherPng).on('change' , reload)
    watch(['src/img/*.svg','src/img/**/*.svg'] , otherSvg).on('change' , reload)
    done();
}

//開發用
exports.default = series(parallel(html , sassStyle ,jsmove ,img, otherSvg, otherPng,phpmove) , browser);


// 打包上線用
exports.package = series(clear,parallel(html ,sassStyle , babel5 , imgmini,otherSvg,otherPng,phpmove))
// exports.package = series(clear,parallel(html ,sassStyleMini , babel5 , imgmini))
