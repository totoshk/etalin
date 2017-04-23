var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './app/index.js',
    devtool: 'source-map',
    output: {
        filename: 'index_bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: ['css-loader?-autoprefixer&sourceMap=true!postcss-loader',
                             'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true',
                    ],
                    publicPath: './dist'
                })
            },
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/pug/index.pug',
            hash: true
        }),
        new ExtractTextPlugin({
            filename: 'index.css',
            disable: false,
            allChunks: true
        })
    ]
}