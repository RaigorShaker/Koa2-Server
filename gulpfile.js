const   gulp = require('gulp'),
      gutil = require("gulp-util"),
      webpack = require("webpack"),
      runSequence = require('run-sequence');

gulp.task("webpack", function(callback) {

  var webpackConfig = require("./webpack.server.js");

    // modify some webpack config options
    webpack(Object.create(webpackConfig), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });


});

gulp.task("config",function(){
    gulp.src([
        "./app/config/localConfig.production.json",
        "./config/sysConfig.production.json",
    ]).pipe(gulp.dest("./dist"));
})

gulp.task("mv",function(){
    gulp.src("./dist")
    .pipe(gulp.dest("./../relase/Koa2-server/"));
})

gulp.task("build",function(){
    runSequence("webpack","config","mv")
})