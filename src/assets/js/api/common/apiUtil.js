import messageBox from "../../../../controls/messageBox";
import appContext from "../../../js/context/appContext";

export default {
  API_PREFIX: null,
  doPost(url, params, callback) {
    this.doAjax("post", url, params, callback);
  },
  doSyncPost(url, params, callback) {
    this.doAjax("post", url, params, callback, false);
  },
  doGet(url, params, callback) {
    this.doAjax("get", url, params, callback);
  },
  doAjax(method, url, params, callback, async) {
    var _this = this;
    var reqUrl = _this.buildUrl(url);
    $.ajax({
      url: reqUrl,
      type: method,
      dataType: "json",
      data: params,
      async: async,

      success: function (data) {
        _this.handleResponse(data, callback);
      },
      error: function (resp) {
        if (resp.status && resp.status >= 400) {
          if (callback) {
            callback({
              isServerError: true
            });
          }
        }
        messageBox.alterSuccess("服务器繁忙,请稍后重试");
      }
    });
  },

  buildUrl(url) {
    return "" + url;
  },

  handleResponse(data, callback) {
    var _this = this;
    if (data && data.code) {
      var code = data.code;

      if (code == 210 && appContext.isLogin() == true) {
        messageBox.confirm(data.msg, { showCancelButton: false }, function () {
          appContext.destroy();
        });
        return;
      }
      // if(code!=200&&code!=210){
      //     messageBox.closeWait()
      //     messageBox.alterSuccess(data.msg)
      //     return
      // }
    }

    if (callback) {
      callback(data);
    }
  }
};
