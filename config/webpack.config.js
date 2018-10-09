/**
 * Adapted from angular2-webpack-starter
 */

const helpers = require('./helpers'),
    webpack = require('webpack');

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts', '.js']
    },

    entry: helpers.root('index.ts'),

    output: {
        path: helpers.root('bundles'),
        publicPath: '/',
        filename: 'index.umd.js',
        libraryTarget: 'umd',
        library: 'angular2_photoswipe'
    },

    // require those dependencies but don't bundle them
    externals: [/^\@angular\//, /^rxjs\//, /^photoswipe\//],

    module: {
        rules: [{
            enforce: 'pre',
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: [helpers.root('node_modules')]
        }, {
            test: /\.ts$/,
            loader: ['awesome-typescript-loader', 'angular2-template-loader'],
            exclude: [/\.e2e\.ts$/]
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        }]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)esm5/,
            helpers.root('./src')
        ),

        new webpack.LoaderOptionsPlugin({
            options: {
                tslintLoader: {
                    emitErrors: true,
                    failOnHint: false
                }
            }
        })
    ]
};
