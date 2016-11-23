var pkg     = require('./package.json');
var path    = require('path');
var fs      = require('fs');
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
    'PhotoSwipeUI_Default': './node_modules/photoswipe/dist/photoswipe-ui-default.js'
  },
  paths: {
    '*': '*.js'
  },
  meta: {
    'node_modules/@angular/*': { build: false },
    'node_modules/rxjs/*': { build: false }
  }
};

var photoswipeImages = [];
photoswipeImages.push({mimeType: 'image/svg+xml', imgName: 'default-skin.png', replaceWith: ""});
photoswipeImages.push({mimeType: 'image/png', imgName: 'default-skin.svg', replaceWith: ""});
photoswipeImages.push({mimeType: 'image/gif', imgName: 'preloader.gif', replaceWith: ""});
var photoswipeDefaultSkin = fs.readFileSync('./node_modules/photoswipe/dist/default-skin/default-skin.css', 'utf-8');
photoswipeImages.forEach(function (img, index, array) {
  var data = fs.readFileSync('./node_modules/photoswipe/dist/default-skin/' + img.imgName, "utf8");
  var base64data = new Buffer(data).toString('base64');
  var regEx = new RegExp(img.imgName, 'gm');
  photoswipeDefaultSkin = photoswipeDefaultSkin.replace(regEx, "data:"+img.mimeType+";base64,"+base64data);
  if (index === array.length - 1) {
    fs.writeFile('./default-skin.css', photoswipeDefaultSkin);
  }
});




builder.config(config);
builder.buildStatic('photoswipe', 'vendor/photoswipe.js', {
  globalName: 'PhotoSwipe'
});
builder.buildStatic('PhotoSwipeUI_Default', 'vendor/photoswipeui.js', {
  globalName: 'PhotoSwipeUI_Default'
});
builder
.bundle('vendor/photoswipe & vendor/photoswipeui & index', path.resolve(__dirname, 'bundles/', pkg.name + '.js'))
.then(function() {
  console.log('Build complete.');
})
.catch(function(err) {
  console.log('Error', err);
});
