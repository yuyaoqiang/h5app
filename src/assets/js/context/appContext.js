import arrayUtil from "./../util/arrayUtil"
import cacheUtil from "./../util/cacheUtil"

export default {

    toLoginFlag: "?p=j",

    DEVICES: [
        { code: "h5", name: "h5", paths: ["h5", "mobile", "h5home"], betVal: "3" },
        { code: "android", name: "androidH5", paths: ["androidhome"], betVal: "4" },
        { code: "ios", name: "iosH5", paths: ["ioshome"], betVal: "5" },
        { code: "wechat", name: "wechat", paths: ["wechat"], betVal: "3" },
    ],
    isLogin() {
        return cacheUtil.getSessionStorage("H5LOGIN") == "LOGIN";
    },

    init() {
        if (this.isInit == true) {
            return;
        }
        cacheUtil.setSessionStorage("H5LOGIN", "LOGIN");
        this.isInit = true;
    },

    current: null,
    getDevice: function() {
        var _this = this;

        if (_this.device != null) {
            return _this.device;
        }

        var device = null;
        var url = window.location.href.toLowerCase();
        arrayUtil.forEach(_this.DEVICES, item => {
            var paths = item.paths;
            arrayUtil.forEach(paths, path => {
                if (url.indexOf(path.toLowerCase()) != -1) {
                    device = item;
                }
            });
        });

        if (device == null) {
            device = _this.DEVICES[0];
        }
        _this.device = device;

        return device;
    },


    destroy: function() {
        cacheUtil.clearAllSession();
        var device = this.getDevice();
        if (device.code == "wechat") {
            window.location.href = "/" + device.paths[0] + "#/bindUser";
            return;
        }
        window.location.href = "/" + device.paths[0] + this.toLoginFlag;
    },
    API_PREFIX: null,
    buildApiUrl(url) {
        if (url == null || url.trim() == "") {
            return url;
        }

        url = url.trim();
        if (url.indexOf("/") != 0) {
            return "/" + url;
        }

        return url;
    },
    buildStaticPath(relativelyPath) {
        return "/pcapp/static/" + relativelyPath;
    },
    buildH5StaticPath(relativelyPath) {
        return "/h5app/static/" + relativelyPath;
    },
    chatroom:null,
    chatroomKeepAlive:null,
    tokens: {
        lottery_token:null, //彩票跟KG彩票token一样
    }
}