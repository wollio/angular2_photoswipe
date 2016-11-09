var pkg     = require('./package.json');
var path    = require('path');
var Builder = require('systemjs-builder');

var builder = new Builder();
var config = {
  baseURL: '.',
  transpiler: 'typescript',
  typescriptOptions: {
    module: 'cjs'
  },
  map: {
    'typescript': './node_modules/typescript/lib/typescript.js',
    '@angular': path.resolve('node_modules/@angular'),
    'rxjs': path.resolve('node_modules/rxjs'),
    'photoswipe': './node_modules/photoswipe/dist/photoswipe.js',
    'photoswipeui': './node_modules/photoswipe/dist/photoswipe-ui-default.js'
  },
  paths: {
    '*': '*.js'
  },
  meta: {
    'node_modules/@angular/*': { build: false },
    'node_modules/rxjs/*': { build: false }
  },
};

builder.config(config);
builder.buildStatic('photoswipe', 'photoswipe.js', {
  globalName: 'PhotoSwipe'
});
builder.buildStatic('photoswipeui', 'photoswipeui.js', {
  globalName: 'PhotoSwipeUI_Default'
});
builder
.bundle('index', path.resolve(__dirname, 'bundles/', pkg.name + '.js'))
.then(function() {
  console.log('Build complete.');
})
.catch(function(err) {
  console.log('Error', err);
});
