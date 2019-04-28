import dateUtil from "../../util/dateUtil";
import lotteryApi from '../../api/lotteryApi.js';
import objectUtil from '../../util/objectUtil';


export default {
    COUNDOWNS: {},
    add(lottery, countdownData) {
        var countdown = {
            lottery: lottery,
            countdownData: countdownData,
            interval: null,
            tryTimes: 0,
            countdownSeconds: 0,
            start: function(reloadDelay) {
                reloadDelay = reloadDelay == null ? false : true;
                var _this = this;
                _this.stop();

                var diffSeconds = 0;
                var status = null;
                if (this.countdownData != null) {
                    var closeTimes = new Date(this.countdownData.CLOSETIME).getTime();
                    var serverTimes = new Date(this.countdownData.CURRENTTIME).getTime();
                    diffSeconds = (closeTimes - serverTimes) / 1000;
                    status = "BETTING";
                    if (diffSeconds < 1) {
                        var openTime = new Date(this.countdownData.LOTTERYTIME).getTime();
                        diffSeconds = (openTime - serverTimes) / 1000;
                        status = "CLOSED";
                    }
                }


                if (diffSeconds < 1) {
                    if (this.tryTimes > 10) {
                        return;
                    }

                    this.tryTimes++;

                    var reloadBetTime = function() {
                        lotteryApi.getBettingTime({ gameId: lottery.id }, function(resp) {
                            _this.countdownData = resp;
                            _this.start(true);
                        });
                    }
                    if (reloadDelay) {
                        setTimeout(function() {
                            reloadBetTime();
                        }, 4000)
                    } else {
                        reloadBetTime();
                    }

                    return;
                }

                _this.countdownSeconds = diffSeconds;
                lottery.indexCountdown.status = status;
                lottery.indexCountdown.init = true;

                lottery.indexCountdown.countdown = dateUtil.buildCountdown(_this.countdownSeconds);
                lottery.indexCountdown.content = dateUtil.secondsToDDHHMMSS(_this.countdownSeconds);
                _this.interval = setInterval(function() {

                    _this.countdownSeconds--;
                    lottery.indexCountdown.countdown = dateUtil.buildCountdown(_this.countdownSeconds);

                    lottery.indexCountdown.content = dateUtil.secondsToDDHHMMSS(_this.countdownSeconds);
                    if (_this.countdownSeconds <= 0) {
                        _this.countdownData = null;
                        _this.start();
                        return;
                    }
                }, 1000);
            },
            stop: function() {
                if (this.interval != null) {
                    clearInterval(this.interval);
                    this.interval = null;
                }
            }

        }
        this.clear(lottery.id);
        this.COUNDOWNS[lottery.id] = countdown;
        countdown.start();
    },
    clear(id) {
        var countdown = this.COUNDOWNS[id];
        if (countdown != null) {
            countdown.stop();
            this.COUNDOWNS[id] = null;
        }
    },
    clearAll() {
        for (var key in this.COUNDOWNS) {
            this.clear(key);
        }
    }

}