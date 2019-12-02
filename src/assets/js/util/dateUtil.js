
export default {
    getSearchDateLimit(beforeDay) {

        var begin = this.getBeforeDayDate(0 - (beforeDay - 1), new Date());
        var end = this.getBeforeDayDate(1, new Date());
        var result = { "beginTime": begin, "endTime": end };
        return result;
    },

    getBeforeDayDate(beforeDay, beginDate) {
        var date = beginDate == null ? new Date() : beginDate;
        date.setDate(date.getDate() + beforeDay);
        return this.toYYYY_MM_DD(date);
    },
    toYYYY_MM_DDHHmmss(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var fullDateStr = year + "-" + this.toFriendlyDateStyle(month) + "-" + this.toFriendlyDateStyle(day) + " "
            + this.toFriendlyDateStyle(date.getHours()) + ":"
            + this.toFriendlyDateStyle(date.getMinutes()) + ":"
            + this.toFriendlyDateStyle(date.getSeconds())


        return fullDateStr;
    },
    toMM_DDHHmmss(date) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return this.toFriendlyDateStyle(month) + "." + this.toFriendlyDateStyle(day) + " "
            + this.toFriendlyDateStyle(date.getHours()) + ":"
            + this.toFriendlyDateStyle(date.getMinutes()) + ":"
            + this.toFriendlyDateStyle(date.getSeconds())
    },
    toYYYY_MM_DD(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return year + "-" + this.toFriendlyDateStyle(month) + "-" + this.toFriendlyDateStyle(day);
    },
    toFriendlyDateStyle(val) {
        return val < 10 ? ("0" + val) : val;
    },
    secondsToDDHHMMSS(seconds) {
        var d = Math.floor(seconds / 86400);
        var h = Math.floor((seconds % 86400) / 3600);
        var m = Math.floor(((seconds % 86400) % 3600) / 60);
        var s = Math.floor(((seconds % 86400) % 3600) % 60);
        return this.toFriendStr(d, false, true) + this.toFriendStr(h, false, true) + this.toFriendStr(m, true, true) + this.toFriendStr(s);
    },
    buildCountdown(seconds) {
        var d = Math.floor(seconds / 86400);
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
    toFriendStr(val, defaultDisplay, splitFlag) {
        if (defaultDisplay == false && val < 1) {
            return "";
        }
        return (val < 10 ? ("0" + val) : val) + (splitFlag ? ":" : "");
    }
}





