var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    polylint = require('gulp-polylint'),
    crisper = require('gulp-crisper'),
    vulcanize = require('gulp-vulcanize'),
    htmlmin = require('gulp-htmlmin'),
    minifyInline = require('gulp-minify-inline'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean');

//var merge = require('merge-stream'),rename = require('gulp-rename');

require('web-component-tester').gulp.init(gulp, []);


var settings = {
    production : false,
    workingDir : 'build'
};

gulp.task('production', function(done){
    settings.production = true;
    settings.workingDir = '.';
    done();
});

gulp.task('clean', function () {
    return gulp.src(['build'])
    .pipe(gulpif(!settings.production, clean()));
});

gulp.task('copy',['clean'], function () {
  if(!settings.production){  
    return gulp.src(['**/*.*', '!build/**', '!coverage/**'])
        .pipe(gulpif(!settings.production, gulp.dest('build')));
  }
});

gulp.task('jshint', function () {
    return gulp.src([
      '**/*.js',
      '!build/**/*.js',
      '!coverage/**/*.js',
      '!node_modules/**/*.js',
      '!bower_components/**/*.js'
    ])
    .pipe(jshint('.jshintrc', {
        fail: true
    }))
    .pipe(jshint.reporter(stylish)); 
    // Console output
});

gulp.task('polylint', function () {
    return gulp.src([
        '**/*.html',
        '!bower_components/**/*.html',
        '!templates/**/*.html'
    ])
    .pipe(polylint({ noRecursion: true }))
    .pipe(jshint.extract('auto'))
    .pipe(jshint())
    .pipe(polylint.combineWithJshintResults())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('vulcanize', ['copy'], function (done) {
    gulp.src([
        settings.workingDir+'/all-imports.html'
    ])
    .pipe(vulcanize({
        inlineScripts: true,
        stripComments:true,    
        excludes: [],
        stripExcludes: false
    }))
    .pipe(crisper({
            scriptInHead: false, 
            // true is default 
            onlySplit: false
    }))
    .pipe(gulpif(/\.html$/, htmlmin({collapseWhitespace: true})))    
    .pipe(gulpif(/\.html$/, minifyInline()))    
    .pipe(gulpif(/\.js$/, uglify()))
//    .pipe(rename({suffix:'-vulc'}))
    .pipe(gulp.dest(settings.workingDir+'/').on('end',done));
    
});

gulp.task('default',['vulcanize']);
//gulp.task('default',['jshint','polylint','test:local','vulcanize']);