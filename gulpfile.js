import autoprefixer from "autoprefixer";
import browser from "browser-sync";
import del from "del";
import csso from "postcss-csso";
import path from "path";

import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import less from "gulp-less";
import squoosh from "gulp-libsquoosh";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import rename from "gulp-rename";
import svgo from "gulp-svgmin";
import svgstore from "gulp-svgstore";
import terser from "gulp-terser";

const BUILD = "build"
const SOURCE = "source"

const minimizeStyles = (dst) => {
  return gulp.src(`${SOURCE}/less/style.less`, {sourcemaps: true})
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(`${dst}/css`, {sourcemaps: "."}))
    .pipe(browser.stream());
}

const buildMinimizeStyles = () => minimizeStyles(BUILD)
const devMinimizeStyles = () => minimizeStyles(SOURCE)

const minimizeHTMLs = () => {
  return gulp.src(`${SOURCE}/*.html`)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(BUILD))
}

const minimizeJS = () => {
  return gulp.src(`${SOURCE}/js/*.js`)
    .pipe(terser())
    .pipe(gulp.dest(`${BUILD}/js`))
}

const clean = () => {
  return del(BUILD)
}

const optimizePNGs = () => {
  return gulp.src(`${SOURCE}/img/**/*.png`)
    .pipe(squoosh())
    .pipe(gulp.dest(`${BUILD}/img`))
}

export const convertToWebP = () => {
  return gulp.src([`${SOURCE}/img/**/*.png`, `!${SOURCE}/img/backgrounds/*.png`])
    .pipe(squoosh({webp: {}}))
    .pipe(gulp.dest(`${SOURCE}/img`))
}

const copyWebP = () => {
  return gulp.src(`${SOURCE}/img/**/*.webp`)
    .pipe(gulp.dest(`${BUILD}/img`))
}

export const convertSVGsToSprite = () => {
  return gulp.src(`${SOURCE}/img/icons/*.svg`)
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest(`${SOURCE}/img`))
}

const processPath = (filePath) => () => gulp.src(`${SOURCE}/${filePath}`)
      .pipe(svgo())
      .pipe(gulp.dest(`${BUILD}/${(path.dirname(filePath))}`))

const minimizeSVGs = gulp.parallel(
  processPath("img/backgrounds/*.svg"),
  processPath("img/icons/*.svg"),
  processPath("img/htmlacademy-big.svg"),
)

const copySVGSprites = () => {
  return gulp.src(`${SOURCE}/img/sprites/*.svg`)
    .pipe(gulp.dest(`${BUILD}/img/sprites`))
}

const server = (baseDir, done) => {
  browser.init({
    server: {
      baseDir
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

const buildServer = (done) => server(BUILD, done)
const devServer = (done) => server(SOURCE, done)

const copyFonts = () => {
  return gulp.src(`${SOURCE}/fonts/*.{woff,woff2}`)
    .pipe(gulp.dest(`${BUILD}/fonts`))
}

const watcher = () => {
  gulp.watch(`${SOURCE}/less/**/*.less`, gulp.series(devMinimizeStyles));
  gulp.watch(`${SOURCE}/css/*.css`).on("change", browser.reload);
  gulp.watch(`${SOURCE}/*.html`).on("change", browser.reload);
  gulp.watch(`${SOURCE}/js/*.js`).on("change", browser.reload);
}

export const build = gulp.series(
  clean,
  buildMinimizeStyles, minimizeHTMLs, minimizeJS,
  optimizePNGs,
  convertToWebP, copyWebP,
  minimizeSVGs, copySVGSprites,
  copyFonts
)

export const devStart = gulp.series(
  devMinimizeStyles, devServer, watcher
)

export default gulp.series (
  build, buildServer
);
