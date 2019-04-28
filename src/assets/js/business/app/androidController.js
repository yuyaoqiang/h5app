export default {
    controller: {

        goback: function () {
            window.trendWeb.back();
        },

        //聊天室
        chatroom: {

            //到发送红包页面
            toSendRedPacketsView: function () {
                window.chatroomWeb.toSendRedPacketsView();
            },


            //到抢红包页面
            toRecRedPacketsView: function (id) {
                window.chatroomWeb.toRecRedPacketsView(id);
            },



        },
    }
}