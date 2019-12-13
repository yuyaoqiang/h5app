import appContext from '../../context/appContext'

export default {
    inited: false,
    init: function (user, recMsg) {
        var _this = this;


        if (this.inited) return;
        //console.log(user)
        _this.inited = true;
        var id = user.id;
        var platformCode = user.platformCode; //amq的平台名字
        var myDestinationNum = 'topic://' + platformCode + '.nums';
        var myDestination = 'topic://' + platformCode + id;
        var myDestinationMess = 'topic://' + platformCode + '.notice';

        var amq = org.activemq.Amq;
        var url = appContext.buildApiUrl("/amq")
        amq.init({
            uri: url, //AjaxServlet所配置对应的URL
            logging: true, //激活日志记录
            timeout: 20, //保持连接时长，单位为秒
            clientId: (new Date()).getTime().toString() //防止多个浏览器窗口标签共享同一个JSESSIONID
        });


        amq.addListener("num", myDestinationNum, function (message) {
            recMsg(message)
        });
        amq.addListener("msg", myDestination, function (message) {
            recMsg(message)
        });
        amq.addListener("message", myDestinationMess, function (message) {
            recMsg(message)
        });
    },
}