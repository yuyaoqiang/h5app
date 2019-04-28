export default {
    controller:{

        // 走势图
        goback: function () {
            var params={"method":"back"};
            window.webkit.messageHandlers.method.postMessage(params);
        },

        //聊天室
        chatroom: {

            //到发送红包页面
            toSendRedPacketsView: function () {
                var params={"method":"toSendRedPacketsView"};
                window.webkit.messageHandlers.method.postMessage(params);
            },



            //到抢红包页面
            toRecRedPacketsView: function (id) {
                var params={"method":"toRecRedPacketsView","params":{"id":id}};
                window.webkit.messageHandlers.method.postMessage(params);
            },

        },
    }
}