1. 初始化npm包管理器
    npm init -y
2. 安装webpack相关包
    npm i -D webpack webpack-cli typescript ts-loader
3.  配置webpack.config.js
    const path = require("path");
    module.exports = {
        //入口目录
        entry:"./src/index.ts",
        output:{
            path: path.resolve(__dirname,"dist"),
            filename:"boundle.js"
        },
        module:{
            rules:[
            {
                test:/\.ts$/,
                use:"ts-loader",
                exclude:/node-modules/
             }
            ]   
        }
    } 
4.配置tsconfig.json文件
    {
    "compilerOptions": {
        "module": "ES2015",
        "target": "ES2015",
        "strict": true,
        "noEmitOnError": true
        }
    }
5. package.json文件中配置build命令
    "build": "webpack"

6. 引入html文件,并自动引入ts编译后的js.并在webpack.config.js文件中配置
    npm i -D html-webpack-plugin
   //下面是webpack.config.js文件添加的内容
   const HTMLWebpackPlugin = require("html-webpack-plugin");
   
   plugins:[
     new HTMLWebpackPlugin()
    ]
7. index.html可以根据自定义模板进行配置
   plugins:[
       new HTMLWebpackPlugin({
       //这是一个自定义的模板
       template: "./src.index.html"
       })
   ]
8. 服务器自动根据修改编译并刷新浏览器
   npm i -D webpack-dev-server
   并package.json里面配置 start命令
    "start": "webpack serve --open chrome.exe"
9. 自动编译前,删除dist目录下的文件 
    npm i -D clean-webpack-plugin
   webpack.config.js中引入
   const { CleanWebpackPlugin } =  require("clean-webpack-plugin");
   plugins:[
   new CleanWebpackPlugin(),
   new HTMLWebpackPlugin()
   ]
   
10. 配置识别模块管理,export后可以在别的文件zhogn引用
   resolve:{
     extensions: ['.ts','.js']
   }
11. 使用babel兼容浏览器
    npm i -D @babel/core @babel/preset-env babel-loader core-js
    修改webpack.config.js的loader部分
    module:{
    rules:[
        {
        test:/\.ts$/,
        use:[
            {
            //loader
             loader: "babel-loader",
             options:{
               presets:[
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
              }
            },
            "ts-loader"
        ],
        exclude:/node-modules/
        }
    ]   
    }
12. 兼容IE,屏蔽箭头函数
   webpack.config.js中output中将箭头函数屏蔽
    output:{
    path: path.resolve(__dirname,"dist"),
    filename:"boundle.js",
    environment: {
    arrowFunction: false 
    }
    }
13. 安装less依赖
    npm i -D less less-loader css-loader style-loader
14. 样式兼容问题
    npm i  -D postcss postcss-loader postcss-preset-env