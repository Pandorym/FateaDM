/*
 * ©2019 Pandorym. All Rights Reserved.
 */

const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge-stream');

gulp.task('tsc', function () {
    let tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('dist/types')),
        tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest('dist')),
    ]);
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', gulp.series('tsc'));
});
