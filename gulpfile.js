const argv = require('yargs').argv;

const gulp = require('gulp');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
// const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const log = require('gulplog');
const watchify = require('watchify');
const assign = require('lodash.assign');
const source = require('vinyl-source-stream');

const src = {
  sass: ['web/hecoweb/react-src/scss/*.scss'],
  react:  ['web/hecoweb/react-src/root.jsx']
};

const compiledJSFileName = 'app.js';

const dest = {
  sass: {
    dir: 'web/hecoweb/public/heco',
    file: 'app.css'
  },
  react: {
    dir: 'web/hecoweb/public/heco',
    file: compiledJSFileName
  }
};

gulp.task('sass', () => {
  return gulp.src(src.sass)
  .pipe(plumber())
  .pipe(sass())
  .pipe(concat(dest.sass.file))
  .pipe(autoprefixer())
  .pipe(gulpif(argv.production, csso()))
  .pipe(gulp.dest(dest.sass.dir))
  //.pipe(browserSync.stream());
});

// add custom browserify options here
const customOpts = {
  entries: src.react, //Entry point at root.jsx, imports will be recognized and added as they appears
  debug: true
};
const opts = assign({}, watchify.args, customOpts); // watchify.args includes the arguments like 'cache' that watchify needs to use to run
const watch = watchify(browserify(opts).transform('browserify-css', {global: true}));

// transformations here
watch.transform(babelify.configure({ presets: ["@babel/preset-env", "@babel/preset-react"] }));

// gulp.task('react', compileReact);
gulp.task('react', argv.production ? () => {
  let browserifyStream = browserify(opts).transform('browserify-css', {global: true});
  browserifyStream.transform(babelify.configure({ presets: ["@babel/preset-env", "@babel/preset-react"] }));
  
  return browserifyStream.bundle()
  .on('error', log.error.bind(log, 'Browserify Error'))  // log errors if they happen
  .pipe(source(dest.react.file)) //compile the jsx into a single file
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./')) //create mappings at piped dir
  .pipe(gulp.dest(dest.react.dir));
} : compileReact);

watch.on('update', compileReact); // on any dep update, runs the bundler
watch.on('log', log.info); // output build logs to terminal.

// Note, there's a delay when watchify compiles the jsx and when it actually finish writing the build to file. Causing the browser to
// to use the old version if you refresh the page too fast.
// There are ways to tell the browser to wait for the new build to finish, but they won't work with our architecture as they
// require the server to be open here to delay the http request
function compileReact() {
  log.info('Compiling jsx files');
  log.info('There is a delay of around 1 second after the bytes is written where the browser will continue to use the old react code');
  log.info('Check the comments on gulpfile.js');
  return watch.bundle()
    .on('error', log.error.bind(log, 'Browserify Error'))  // log errors if they happen
    .pipe(source(dest.react.file)) //compile the jsx into a single file
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./')) //create mappings at piped dir
    .pipe(gulp.dest(dest.react.dir));
}

gulp.task('apply-prod-environment', function() {
  process.env.NODE_ENV = 'production';
});

gulp.task('watch', () => {
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.react, ['react']);
  //don't need to watch for react files cause watchify does it already
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('buildProduction', ['apply-prod-environment', 'build']);
gulp.task('build', ['sass', 'react']);
gulp.task('default', ['build', 'watch'], () => {
      // Serve files from the root of this project
      browserSync.init({
        port: "8000",
        proxy: {
          target: "https://localhost:10011/hecoweb",
          ws: true
      },
        https: true
      });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(src.sass, ['sass']);
    // gulp.watch(src.react).on('change', browserSync.reload);
});