/**
 * Created by Owner on 2017/3/21.
 */
/* jshint esversion: 6 */
require('shelljs/global');
var lotteryPlatforms = require('./lotteryPlatforms');
var webpack = require('webpack');
const path = require('path'); // 导入路径包
var HtmlWebpackPlugin = require('html-webpack-plugin');

// -----------------------------------------------------------------------------

var objPlatform = {
    1:'50k', 2:'bdb',3:'bjc', 4:'bjg',5:'bkc',6:'ds',7:'hkc',8:'jh',9:'jn',10:'jxb',
    11:'lsb',12:'my', 13:'n8',14:'qc',15:'qj',16:'sbc',17:'su8',18:'vc',19:'ybw',20:'yfc',21:'ylc',22:'yygj', 
   
}

var index = 0;//index=0 本机开发； index=1 本机打包

//打包的平台编码  
var lotteryPlatform = objPlatform[12];

if(!lotteryPlatform){
    console.log('平台不存在')
    return
}

var publicPath = 'h5app';

//更改存储文件夹名

var lotteryPlatformName;
if(index==0){
    lotteryPlatformName = "ds";
}else{
    lotteryPlatformName = lotteryPlatform;
} 

var outputBasePath = path.resolve(__dirname, "../output/" + lotteryPlatformName + "/" + publicPath);

var outputStaticPath = "static";

var assetsPath = path.join(path.resolve(__dirname, outputBasePath), outputStaticPath);

rm('-rf', path.resolve(__dirname, outputBasePath));
mkdir('-p', assetsPath);
cp('-R', outputStaticPath + '/*', assetsPath);

if (webpack.lotteryPlatform != null) {
    lotteryPlatform = webpack.lotteryPlatform;
}

var platformBasePath = path.resolve(__dirname, "src/assets/platform");
var mainPlatformPath = path.join(platformBasePath, "main");
var currentPlatformPath = path.join(platformBasePath, lotteryPlatform);
rm('-rf', mainPlatformPath);
mkdir('-p', mainPlatformPath);
cp('-R', currentPlatformPath + '/*', mainPlatformPath);

var version = new Date().getTime();
var platformName = lotteryPlatforms[lotteryPlatform];
console.log(platformName+'---------')
var platformFlagName = path.resolve(__dirname, outputBasePath) + "\\" + platformName + "_h5app_" + version + ".txt";

var fs = require("fs");
fs.writeFile(platformFlagName, platformName, function(err) {
    if (err) throw err;
});

// 模块导入
var webpackConfig = {
    entry: {
        main: './src/main',

    },
    output: {
        path: path.resolve(__dirname, outputBasePath),
        filename: outputStaticPath + '/js/[name].js?v=' + version,
        publicPath: '/h5app/'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, outputBasePath + '/index.html'),
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, 'node_modules')
                    ) === 0
                );
            }
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
        }),
    ],
    // 加载器
    module: {
        // 加载器
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'style-loader!css-loader!sass-loader',
                        'less': 'style-loader!css-loader!less-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!sass-loader!less-loader'
            },
            //解析.scss文件
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },

            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },

            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    limit: 10000,
                    name: outputStaticPath + '/fonts/[name].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: outputStaticPath + '/img/[name].[ext]'
                }
            }
        ]
    },

};


module.exports = webpackConfig;