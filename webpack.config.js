const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } =  require("clean-webpack-plugin");
module.exports = {
    entry: "/src/index.ts",
    mode: "development",
    module: {
        rules:[
            {
                test:/\.ts$/,
                exclude: /node_modules/,
                use:[
                    {
                        //浏览器兼容loader
                        loader: "babel-loader",
                        options:{
                            presets:[
                              [
                                "@babel/preset-env",
                                {
                                    targets:{
                                        "chrome":"78",
                                        "ie":"11"
                                    },
                                    "corejs":"3",
                                    //加载corejs的方式
                                    "useBuiltIns":"usage"
                                }
                              ]
                            ]
                        }
                    },
                    "ts-loader"
                ]
            },
            {
                test: /\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "bundle.js",
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    resolve:{
        extensions: ['.ts','.js']
    }

}