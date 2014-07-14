/*!
 * Facebook React Starter Kit | https://github.com/kriasoft/React-Seed
 * Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
 */

'use strict';

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var es = require('event-stream');
var path = require('path');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

// Settings
var DEST = './build';
var DEBUG = !argv.release;
var WATCH = !!argv.watch;
var LOG = !!argv.log;

// Node.js runtime dependencies and their version numbers
var pkgs = require('./package.json').dependencies;
Object.keys(pkgs).forEach(function (key) { return pkgs[key] = pkgs[key].substring(1); });

// Clean up
// -----------------------------------------------------------------------------
gulp.task('clean', function (cb) {
    var rimraf = require('rimraf');
    rimraf(DEST, cb);
});

// Copy vendor files
// -----------------------------------------------------------------------------
gulp.task('vendor', function () {
    return es.merge(
        gulp.src('./node_modules/jquery/dist/**')
            .pipe(gulp.dest(DEST + '/vendor/jquery-' + pkgs.jquery)),
        gulp.src('./node_modules/bootstrap/dist/fonts/**')
            .pipe(gulp.dest(DEST + '/fonts'))
    );
});

// Copy static files / assets
// -----------------------------------------------------------------------------
gulp.task('assets', function () {
    return es.merge(
        gulp.src('./src/assets/**')
            .pipe(gulp.dest(DEST)),
        gulp.src('./src/images/**')
            .pipe(gulp.dest(DEST + '/images/')),
        gulp.src('./src/*.html')
            .pipe(DEBUG ? $.util.noop() : $.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true
            }))
            .pipe(DEBUG ? $.embedlr() : $.util.noop())
            .pipe(gulp.dest(DEST))
    );
});

// CSS stylesheets
// -----------------------------------------------------------------------------
gulp.task('styles', function () {
    return gulp.src('./src/styles/bootstrap.less')
        .pipe($.plumber())
        .pipe($.less({sourceMap: DEBUG, sourceMapBasepath: __dirname}))
        .on('error', $.util.log)
        .pipe(DEBUG ? $.util.noop() : $.minifyCss())
        .pipe(gulp.dest(DEST + '/css'));
});

// Create JavaScript bundle
// -----------------------------------------------------------------------------
gulp.task('bundle', function (cb) {
    var bundler = webpack(require('./config/webpack.config.js')(DEBUG));

    function bundle (err, stats) {
        if (err) {
            throw new $.util.PluginError('webpack', err);
        }
        LOG && $.util.log('[webpack]', stats.toString({colors: true}));
        return cb();
    }

    if (WATCH) {
        bundler.watch(200, bundle);
    } else {
        bundler.run(bundle);
    }
});

// Build the app from source code
// -----------------------------------------------------------------------------
gulp.task('build', ['clean'], function (cb) {
    runSequence(['vendor', 'assets', 'styles', 'bundle'], cb);
});

// Launch a lightweight HTTP Server
// -----------------------------------------------------------------------------
gulp.task('serve', ['build'], function (next) {
    var url = require('url');
    var server = require('ecstatic')({root: './', cache: 'no-cache', showDir: true});
    var port = 3000;

    require('http').createServer()
        .on('request', function (req, res) {
            // For non-existent files output the contents of /index.html page in order to make HTML5 routing work
            var urlPath = url.parse(req.url).pathname;
            if (urlPath === '/') {
                req.url = DEST.substring(1) + '/index.html';
            } else if (['src', 'bower_components'].indexOf(urlPath.split('/')[1]) === -1) {
                if (urlPath.length > 3 &&
                    ['src', 'bower_components'].indexOf(urlPath.split('/')[1]) === -1 &&
                    ['css', 'html', 'ico', 'js', 'png', 'txt', 'xml'].indexOf(urlPath.split('.').pop()) == -1 &&
                    ['fonts', 'images', 'vendor', 'views'].indexOf(urlPath.split('/')[1]) == -1) {
                    req.url = DEST.substring(1) + '/index.html';
                } else {
                    req.url = DEST.substring(1) + req.url;
                }
            }
            server(req, res);
        })
        .listen(port, function () {
            $.util.log('Server is listening on ' + $.util.colors.magenta('http://localhost:' + port + '/'));
            next();
        });
});

// Watch for changes in source files
// -----------------------------------------------------------------------------
gulp.task('watch', ['serve'], function () {
    var path = require('path');
    var lr = require('gulp-livereload');

    // Watch for changes in source files
    gulp.watch('./src/assets/**', ['assets']);
    gulp.watch('./src/**/*.less', ['styles']);

    // Watch for changes in 'compiled' files
    gulp.watch(DEST + '/**', function (file) {
        var relPath = DEST.substring(2) + '\\' + path.relative(DEST, file.path);
        $.util.log('File changed: ' + $.util.colors.magenta(relPath));
        lr.changed(file.path);
    });

    lr.listen();
});

// Deploy to GitHub Pages. See: https://pages.github.com
// -----------------------------------------------------------------------------
gulp.task('deploy', ['build'], function (cb) {
    var url = 'https://github.com/{name}/{name}.github.io.git';
    var exec = require('child_process').exec;
    var cwd = path.join(__dirname, DEST);
    var cmd = 'git init && git remote add origin ' + url + ' && ' +
              'git add . && git commit -m Release && ' +
              'git push -f origin master';

    exec(cmd, { 'cwd': cwd }, function (err, stdout, stderr) {
        if (err !== null) {
            cb(err);
        } else {
            $.util.log(stdout, stderr);
            cb();
        }
    });
});

// The default task
gulp.task('default', ['watch']);