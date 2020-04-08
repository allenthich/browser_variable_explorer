// TODO: Create skeleton template
// Reference: https://medium.com/code-oil/burning-questions-with-answers-to-why-webpack-dev-server-live-reload-does-not-work-6d6390277920
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === "development"
console.log('[DEBUG]: ENV:', process.env.NODE_ENV, isDevelopment)

module.exports = {
    mode: process.env.NODE_ENV === "development" ? "development" : "production",
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    devServer: {
        publicPath: '/', // serves static contentBase at http://localhost:PORT/
        contentBase: isDevelopment ? './templates' : './dist',
        compress: true,
        port: 9001,
        watchContentBase: isDevelopment,
        // hot: isDevelopment
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/, },
            { test: /\.module\.s(a|c)ss$/i,
                loader: [
                    isDevelopment ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // only enable hot in development
                          hmr: isDevelopment,
                          // if hmr does not work, this is a forceful method.
                          reloadAll: true,
                        }, 
                    }, // inject CSS to page
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                        options: {
                            modules: true,
                            sourceMap: isDevelopment
                        }
                    },
                    {
                        loader: 'postcss-loader', // Run postcss actions
                        options: {
                          plugins: function () { // postcss plugins, can be exported to postcss.config.js
                            return [
                              require('autoprefixer')
                            ];
                          }
                        }
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            {
                test:/\.s[ac]ss$/i,
                exclude: /\.module.(s(a|c)ss)$/i,
                loader: [
                    isDevelopment ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // only enable hot in development
                          hmr: isDevelopment,
                          // if hmr does not work, this is a forceful method.
                          reloadAll: true,
                        }, 
                    }, // inject CSS to page
                    'css-loader', // translates CSS into CommonJS modules
                    {
                        loader: 'postcss-loader', // Run postcss actions
                        options: {
                          plugins: function () { // postcss plugins, can be exported to postcss.config.js
                            return [
                              require('autoprefixer')
                            ];
                          }
                        }
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: path.resolve(__dirname, 'dist') + '/',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: 'templates/index.html',
            inject: 'head'
        }),
        new ManifestPlugin(),
    ]
};

// {
//     test: /\.s[ac]ss$/i,
//     use: [
//         // Creates `style` nodes from JS strings
//         'style-loader',
//         // Translates CSS into CommonJS
//         'css-loader',
//         // Compiles Sass to CSS
//         'sass-loader',
//     ],
// },