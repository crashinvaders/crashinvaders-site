const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = env => {

    const development = !(env) || env.release !== true;

    const mode = development ? "development" : "production";
    // if (env && env.release) {mode = "production";} else {mode = "development";}
    console.log("Webpack is running in the \"" + mode + "\" mode.");

    return {
        mode: mode,
        entry: {
            index: [
                "./src/scripts/index.ts",
                "./src/styles/index.scss",
            ],
        },
        devtool: development ? "eval" : "nosources-source-map",
        devServer: {
            contentBase: "./dist",
            host: "0.0.0.0",
            port: 3000,
            disableHostCheck: true
        },
        // optimization: {
        //     usedExports: true,
        // },
        plugins: [
            new CleanWebpackPlugin({
                cleanStaleWebpackAssets: false,
            }),
            new HtmlWebpackPlugin({ template: "./src/pug/index.pug" }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                // chunkFilename: '[id].css',
            }),
        ],
        resolve: {
            extensions: [".ts", ".js"],
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
        },
        module: {
            rules: [
                // Pug/HTML
                {
                    test: /\.pug$/,
                    include: [path.resolve(__dirname, "src/pug")],
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "html-loader",
                            options: {
                                attributes: {
                                    list: [
                                        {
                                            tag: "img",
                                            attribute: "src",
                                            type: "src",
                                        },
                                        {
                                            tag: "img",
                                            attribute: "srcset",
                                            type: "srcset",
                                        },
                                        {
                                            tag: "img",
                                            attribute: "data-src",
                                            type: "src",
                                        },
                                        {
                                            tag: "img",
                                            attribute: "data-srcset",
                                            type: "srcset",
                                        },
                                        {
                                            tag: "input",
                                            attribute: "src",
                                            type: "src",
                                        },
                                        {
                                            attribute: "data-thumb-cycle-images",
                                            type: "srcset",
                                        },
                                        {
                                            tag: "link",
                                            attribute: "href",
                                            type: "src",
                                            filter: (tag, attribute, attributes, resourcePath) => {
                                                return /\bicon|\bshortcut icon/i.test(attributes.rel);
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            loader: "pug-html-loader"
                        }
                    ],
                },
                // Scripts
                {
                    test: /\.ts$/,
                    include: [path.resolve(__dirname, "src/scripts")],
                    exclude: /node_modules/,
                    use: "ts-loader",
                },
                // Styles
                {
                    test: /\.scss$/,
                    include: [path.resolve(__dirname, "src/styles")],
                    exclude: /node_modules/,
                    use: [
                        // "file-loader",
                        // "extract-loader",

                        MiniCssExtractPlugin.loader,

                        // // Creates "style" nodes from JS strings
                        // "style-loader",
                        // Translates CSS into CommonJS
                        { loader: "css-loader", options: { sourceMap: development } },
                        // Compiles Sass to CSS
                        { loader: "sass-loader", options: { sourceMap: development } },
                    ],
                },
                {
                    test: /\.css$/,
                    // use: [
                    //     "style-loader",
                    //     "css-loader"
                    // ]
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
                // Images
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: { name: "images/[name].[contenthash].[ext]" }
                        },
                        {
                            loader: "image-webpack-loader",
                            options: {
                                // Disable for development builds.
                                disable: development
                            }
                        }
                    ],
                },
                // Fonts
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: { name: "fonts/[name].[contenthash].[ext]" }
                        },
                    ],
                },
                // // HTML
                // {
                //     test: /\.html$/,
                //     // include: [path.resolve(__dirname, "src/html", "src/pug")],
                //     exclude: /node_modules/,
                //     use: [{
                //         loader: "html-loader",
                //         options: {
                //             attributes: {
                //                 list: [
                //                     {
                //                         tag: "img",
                //                         attribute: "src",
                //                         type: "src",
                //                     },
                //                     {
                //                         tag: "img",
                //                         attribute: "srcset",
                //                         type: "srcset",
                //                     },
                //                     {
                //                         tag: "img",
                //                         attribute: "data-src",
                //                         type: "src",
                //                     },
                //                     {
                //                         tag: "img",
                //                         attribute: "data-srcset",
                //                         type: "srcset",
                //                     },
                //                     {
                //                         tag: "input",
                //                         attribute: "src",
                //                         type: "src",
                //                     },
                //                     {
                //                         attribute: "data-thumb-cycle-images",
                //                         type: "srcset",
                //                     },
                //                     {
                //                         tag: "link",
                //                         attribute: "href",
                //                         type: "src",
                //                         filter: (tag, attribute, attributes, resourcePath) => {
                //                             return /\bicon|\bshortcut icon/i.test(attributes.rel);
                //                         }
                //                     }
                //                 ]
                //             }
                //         }
                //     }],
                // },
            ],
        },
    }
};