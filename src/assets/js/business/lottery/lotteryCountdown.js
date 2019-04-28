
import lotteryApi from  "../../api/lotteryApi";
import lotteryBusiness from  "./lotteryBusiness";
import log from "../../util/logUtil";
import appContext from "../../context/appContext";
import messageBox from "../../../../controls/messageBox";

export default {
    isDestroy:false,
    interval:null,
    start(lottery){

        this.destroy();

        this.isDestroy=false;

        if(lottery.isClosed==false) {
            //投注倒计时
            this.bettingCountdown(lottery);
        }else {
            //封盘倒计时
            this.closedCountdown(lottery);
        }

    },

    destroy(){
        this.stopInterval();
        this.isDestroy=true;
    },


    bettingCountdown(lottery){

        var delaySeconds=0;
        if(lottery.delay){
            delaySeconds=1;
        }

        var remainSeconds=lottery.countdownSeconds-delaySeconds;
        lottery.delay=false;

        if (remainSeconds < 1) {
            lottery.countdownSeconds=0;
            //封盘倒计时
            this.closedCountdown(lottery);
            return;
        } else {
            lottery.countdownSeconds=remainSeconds;
        }

        lottery.status = lotteryBusiness.STATUS_LIST.betting;

        var _this=this;
        this.createInterval(remainSeconds,function (countdown) {
            lottery.countdownContext= _this.buildCountdown(countdown);
            lottery.countdownSeconds=countdown;
            if(countdown == 0){
              // console.log("投注倒计时完成");
                //开始封盘倒计时
               _this.closedCountdown(lottery);
            }
        });
    },

    closedCountdown(lottery){

        var _this = this;

        lotteryApi.getCloseTime({gameId: lottery.id}, function (resp) {

      /*      if (resp.__HTTP_STATUS != 200) {
                _this.delayExec(function () {
                    _this.closedCountdown(lottery);
                }, 3000);
                return;
            }*/

            var serverTime = new Date(resp.CURRENTTIME);
            var lotteryTime = new Date(resp.LOTTERYTIME);


            if (lottery.issue != resp.ISSUENO) {

                //期号不一致处理 进入下一期
                _this.nextIssue(lottery);
                return;
            }

            var remainSeconds = (lotteryTime.getTime() - serverTime.getTime()) / 1000;
            var lazySeconds = 1;

            remainSeconds = remainSeconds - lazySeconds;
            if (remainSeconds < 1) {
                //进入下一期
                _this.nextIssue(lottery);
                return;
            } else {
                lottery.countdownSeconds = remainSeconds;
            }

            lottery.status = lotteryBusiness.STATUS_LIST.closed;

            _this.createInterval(remainSeconds, function (countdown) {
                lottery.countdownContext = _this.buildCountdown(countdown);
                lottery.countdownSeconds = countdown;
                if (countdown == 0) {

                    //进入下一期
                    _this.nextIssue(lottery);
                }
            });

        });
    },
    nextIssue(lottery,delay,tryTimes){
        var _this=this;
        var tryTimes=tryTimes?tryTimes:0;
        tryTimes++;


        delay=delay?delay:1000;


        if(tryTimes==1){
            // messageBox.alterSuccess("即将进入下一期投注");
        }


        _this.delayExec(function () {

            lotteryApi.getBettingTime({gameId:lottery.id},function (resp) {


               /* if(resp.__HTTP_STATUS != 200){
                    _this.nextIssue(lottery,2000,tryTimes);
                    return;
                }*/

                lottery.localDate=new Date();
                lottery.closeTimes = new Date(resp.CLOSETIME).getTime();
                lottery.serverTimes = new Date(resp.CURRENTTIME).getTime();
                var diffSeconds=(lottery.closeTimes-lottery.serverTimes)/1000;
                if (diffSeconds<1){
                    if(tryTimes>20){
                        return;
                    }
                    _this.nextIssue(lottery,2000,tryTimes);
                    return;
                }
                lottery.countdownSeconds=diffSeconds;


                lottery.data.betting.splice(0,1);
                lottery.issue=resp.ISSUENO;
                lottery.delay=true;

                if(appContext.current.nextIssueEvent){
                    try{
                        appContext.current.nextIssueEvent();
                    }catch (ex){
                        console.log("刷新下一期页面出现异常:"+ex);
                    }
                }

                _this.bettingCountdown(lottery);

            });
        },delay);


    },

    createInterval(seconds,action){
        var _this=this;
        _this.stopInterval();
        var countdown=seconds;
        _this.interval = setInterval(function () {
            countdown--;
            if(countdown == 0){
                _this.stopInterval();
            }
            action(countdown);

        }, 1000);
    },

    stopInterval(){
        if(this.interval != null){
            clearInterval(this.interval);
            this.interval=null;
        }
    },

    secondsToDDHHMMSS(seconds){
        var d = Math.floor(seconds/86400);
        var h = Math.floor((seconds%86400)/3600);
        var m = Math.floor(((seconds%86400)%3600)/60);
        var s = Math.floor(((seconds%86400)%3600)%60);
        return this.toFriendStr(d,false,true)+this.toFriendStr(h,false,true)+this.toFriendStr(m,true,true)+this.toFriendStr(s);
    },
    toFriendStr(val,defaultDisplay,splitFlag) {
        if(defaultDisplay==false && val<1){
            return "";
        }
        return (val<10?("0"+val):val)+(splitFlag?":":"");
    },
    delayExec(action,delay){
        delay=delay?delay:1000;
        var _this=this;
        if(delay<1 || _this.isDestroy) return;

        setTimeout(function () {
            if(_this.isDestroy){
                return;
            }
            action();
        },delay)
    },
    buildCountdown(seconds) {
        var d = Math.floor(seconds/ 86400) ;
        var h = Math.floor((seconds % 86400) / 3600);
        var m = Math.floor(((seconds % 86400) % 3600) / 60);
        var s = Math.floor(((seconds % 86400) % 3600) % 60);
        return {
            days: this.toFriendStr(d),
            hours: this.toFriendStr(h, false),
            munites: this.toFriendStr(m, true),
            secondes: this.toFriendStr(s),
        }
    },
}