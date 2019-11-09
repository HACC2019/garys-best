const argv = require('yargs').argv;

const gulp = require('gulp');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const ngAnnotate = require('gulp-ng-annotate');
const templateCache = require('gulp-angular-templatecache');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const log = require('gulplog');
const watchify = require('watchify');
const assign = require('lodash.assign');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');

const src = {
  sass: ['web/hecoweb/react-src/scss/*.scss'],
  react:  ['web/hecoweb/react-src/root.jsx']
};

const compiledJSFileName = 'app.js';

const dest = {
  sass: {
    dir: 'src/main/webapp/public/build/css',
    file: 'app.css'
  },
  angular: {
    dir: 'src/main/webapp/public/build/js',
    file: compiledJSFileName
  },
  react: {
    dir: 'src/main/webapp/public/build/react',
    file: compiledJSFileName
  },
  instSurv: {
    dir: 'src/main/webapp/public/build/instSurv',
    file: compiledJSFileName
  },
  templates: {
    dir: 'src/main/webapp/public/build/js',
    file: compiledTemplateFileName
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
  .pipe(browserSync.stream());
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

// add custom browserify options here
const customOpts2 = {
  entries: src.instSurv, //Entry point at root.jsx, imports will be recognized and added as they appears
  debug: true
};
const opts2 = assign({}, watchify.args, customOpts2); // watchify.args includes the arguments like 'cache' that watchify needs to use to run
const watch2 = watchify(browserify(opts2).transform('browserify-css', {global: true}));

// transformations here
watch2.transform(babelify.configure({ presets: ["@babel/preset-env", "@babel/preset-react"] }));

// gulp.task('instSurv', compileInstSurv);
gulp.task('instSurv', argv.production ? () => {
  let browserifyStream = browserify(customOpts2).transform('browserify-css', {global: true});
  browserifyStream.transform(babelify.configure({ presets: ["@babel/preset-env", "@babel/preset-react"] }));

  return browserifyStream.bundle()
  .on('error', log.error.bind(log, 'Browserify Error'))  // log errors if they happen
  .pipe(source(dest.instSurv.file)) //compile the jsx into a single file
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  // .pipe(gulpif(argv.production, uglify())).on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(sourcemaps.write('./')) //create mappings at piped dir
  .pipe(gulp.dest(dest.instSurv.dir));
} : compileInstSurv);
// gulp.task('react', compileReact);
gulp.task('react', argv.production ? () => {
  let browserifyStream = browserify(opts).transform('browserify-css', {global: true});
  browserifyStream.transform(babelify.configure({ presets: ["@babel/preset-env", "@babel/preset-react"] }));
  
  return browserifyStream.bundle()
  .on('error', log.error.bind(log, 'Browserify Error'))  // log errors if they happen
  .pipe(source(dest.react.file)) //compile the jsx into a single file
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  // .pipe(gulpif(argv.production, uglify())).on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(sourcemaps.write('./')) //create mappings at piped dir
  .pipe(gulp.dest(dest.react.dir));
} : compileReact);
watch.on('update', compileReact); // on any dep update, runs the bundler
watch2.on('update', compileInstSurv); // on any dep update, runs the bundler
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
    .pipe(gulpif(argv.production, uglify()))
    .pipe(sourcemaps.write('./')) //create mappings at piped dir
    .pipe(gulp.dest(dest.react.dir));
}

function compileInstSurv() {
  log.info('Compiling jsx files for instructor-survey');
  log.info('There is a delay of around 1 second after the bytes is written where the browser will continue to use the old react code');
  log.info('Check the comments on gulpfile.js');
  return watch2.bundle()
    .on('error', log.error.bind(log, 'Browserify Error'))  // log errors if they happen
    .pipe(source(dest.instSurv.file)) //compile the jsx into a single file
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(sourcemaps.write('./')) //create mappings at piped dir
    .pipe(gulp.dest(dest.instSurv.dir));
}

gulp.task('angular', () => {
  return gulp.src(src.angular)
  .pipe(gulpif(!argv.production, sourcemaps.init()))
    .pipe(plumber())
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(concat(dest.angular.file))
    .pipe(ngAnnotate())
    .pipe(gulpif(argv.production, uglify())).on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(gulpif(!argv.production, sourcemaps.write()))
  .pipe(gulp.dest(dest.angular.dir));
});

gulp.task('templates', () => {
  return gulp.src(src.templates)
  .pipe(plumber())
  .pipe(templateCache({
    filename: dest.templates.file,
    standalone: true
  }))
  .pipe(gulpif(argv.production, uglify())).on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(gulp.dest(dest.templates.dir));
});

gulp.task('apply-prod-environment', function() {
  process.env.NODE_ENV = 'production';
});

gulp.task('watch', () => {
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.templates, ['templates']);
  gulp.watch(src.angular, ['angular']);
  gulp.watch(src.react, ['react']);
  gulp.watch(src.instSurv, ['instSurv']);
  //don't need to watch for react files cause watchify does it already
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['angular'], function (done) {
  browserSync.reload();
  done();
});
gulp.task('buildProduction', ['apply-prod-environment', 'build']);
gulp.task('build', ['sass', 'angular', 'react', 'instSurv', 'templates']);
gulp.task('default', ['build', 'watch'], () => {
      // Serve files from the root of this project
      browserSync.init({
        port: "10013",
        proxy: {
          target: "https://localhost:10011/appointment",
          ws: true
      },
        https: true
      });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(src.angular, ['js-watch']);
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.templates).on('change', browserSync.reload);
});