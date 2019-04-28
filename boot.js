var argv = require('yargs').argv;


if(argv._.length == 0 || argv._[0]===null || argv._[0]===""){
    log('平台不能为空');
    return;
}

var platform=argv._[0];
var packge=argv._[1];

var webpack = require('webpack')
webpack.lotteryPlatform=platform;
var webpackConfig = require('./webpack.config')
if(packge == null){
    webpackConfig.watch=true;
    log("正在启动监听自动打包")
} else if(packge=="p"){

    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
    process.env.NODE_ENV="production"
    log("正在打包")
}else {
    return log("无效的参数:"+packge);
}


webpack(webpackConfig, function (err, stats) {
    log(stats)
   // console.error(stats)
    log("打包完成")
    if(webpackConfig.watch){
        log("正在启动监听自动打包...")
    }
})



function log(msg){
    console.log(dateFormat(new Date(),"yyyy-MM-dd hh:mm:ss ["+platform+"]")+" : ########## "+msg)
}


function dateFormat (date,fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
