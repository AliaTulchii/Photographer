const gulp = require('gulp');

require('./gulp/default.js');
require('./gulp/docs.js');

gulp.task(
    'default', 
    gulp.series(
        'clean:default',
        gulp.parallel('html:default', 'sass:default', 'images:default', 'fonts:default', 'files:default', 'js:default'),
        gulp.parallel('server:default','watch:default')
    )
)


gulp.task(
    'docs', 
    gulp.series(
        'clean:docs',
        gulp.parallel('html:docs', 'sass:docs', 'images:docs', 'fonts:docs', 'files:docs', 'js:docs'),
        gulp.parallel('server:docs')
    )
)
