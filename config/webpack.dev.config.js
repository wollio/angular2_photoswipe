//will place the files in a virtual memory "/dist" folder
// "npm start" to build the virtual dev environment

var webpackMerge = require('webpack-merge');
const helpers = require('./helpers');
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack Config
var commonConfig = {
    entry: {
        'main': './demo/src/main.browser.ts',
        'vendor': './demo/src/vendor.browser.ts'
    },

    output: {
        publicPath: '',
        path: path.resolve(__dirname, '../dist'),
    },

    resolve: {
        extensions: [ '.ts', '.js' ],
        modules: [ path.resolve(__dirname, '../node_modules') ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, '../src'),
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),

        new CopyWebpackPlugin([ { from: 'demo/src/assets', to: 'assets' } ]),

        new HtmlWebpackPlugin({
            template: 'demo/src/index.html'
        }),

        new webpack.ProvidePlugin({
            PhotoSwipe: 'photoswipe',
            PhotoSwipeUI_Default: 'photoswipe/dist/photoswipe-ui-default'
        })

    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader?configFileName=demo/tsconfig.json',
                    'angular2-template-loader',
                    'angular2-router-loader'
                ],
                exclude: /backend/
            },
            { test: /(.*node_modules.*|.*global)\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'], exclude: /(node_modules|global\.css)/},
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    }

};

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    clearImmediate: false,
    setImmediate: false
  }
});
