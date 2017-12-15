var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function () {
    return gulp.src('lib/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            module: 'amd',
            target: 'es5',
            lib: ["es5", "es6", "dom"],
            outFile: 'output.js'
        }))
        .pipe(gulp.dest('built/local'));
});