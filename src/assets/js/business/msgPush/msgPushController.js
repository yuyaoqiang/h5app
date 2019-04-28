import amq from "./amqController";
import lmsWebsocket from "./lmsWebsocket";
import appContext from '../../context/appContext'
import userBusiness from '../../business/user/userBusiness'
import soundController from '../../business/sound/soundController'
import MessageBoxs from '../../../../controls/messageBox'
import { MessageBox } from 'mint-ui';
import { debug } from "util";
export default {
    connect(user) {
        var _this = this;

        amq.init(user, function(msg) {

            var data = JSON.parse(msg.data);
            _this.pushEvent(data);
        });


        // lmsWebsocket.connect(function(msg) {
        //     //console.log(msg, 222)
        //     var data = JSON.parse(msg);
        //     for (var i = 0; i < data.length; i++) {
        //         _this.pushEvent(JSON.parse(data[i].content));
        //     }

        // });
    },

    pushEvent(data) {
        var code = data.code;
        if (code == 201 || code == 202) {
            this.lotteryEvent(data);
        } else {
            this.messageEvent(data);
        }
    },
    lotteryEvent(data) {
        if (data && appContext.current.lotteryPushTrigger) {
            appContext.current.lotteryPushTrigger(data);
        }
    },
    messageEvent(data) {

        if (data.code == 200) {
            //console.log(data,6666)
            //刷新余额
            setTimeout(function() {
                userBusiness.refreshBal();
            }, 2000)

            // layer.open({
            //     title: "中奖消息",
            //     closeBtn: 0, //不显示关闭按钮
            //     shade: 0,
            //     content: '<p>彩种类型：<font style="font-weight: bold;">' + data.gametypename + '</font></p>' +
            //         '<p>期号：<font style="font-weight: bold;">' + data.issueno + '</font></p>' +
            //         '<p>中奖注数：<font style="color:red;">' + data.winOrderCount + '</font></p>' +
            //         '<p>中奖金额：<font style="font-weight: bold;color:red;">' + data.winMoney.toFixed(3) + '</font></p>',
            //     area: ['300px', '230px'],
            //     offset: 'rb',
            //     shift: 2,
            //     time: 10000
            // });

            MessageBox.alert(`<p>彩种类型：<font style="font-weight: bold;">${data.gametypename}</font></p>
            <p>期号：<font style="font-weight: bold;">${data.issueno }</font></p>
            <p>中奖注数：<font style="color:red;">${data.winOrderCount}</font></p>
            <p>中奖金额：<font style="font-weight: bold;color:red;">${data.winMoney.toFixed(3)}元</font></p>
            `, '中奖消息');
           
            soundController.play("message.mp3");

        } else if (data.code == 400) {
            userBusiness.logout();
        } else {
            // layer.open({
            //     title: "推送消息",
            //     closeBtn: 0, //不显示关闭按钮
            //     shade: 0,
            //     content: '<p><font style="font-weight: bold;">' + data.message + '</font></p>',
            //     area: ['300px', '215px'],
            //     offset: 'rb',
            //     shift: 2,
            //     time: 10000
            // });
            // soundController.play("message.mp3");

        }
    }
}