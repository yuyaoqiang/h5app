
import { MessageBox } from 'mint-ui';
import { Notification } from 'element-ui';
import { Indicator } from 'mint-ui'; //加载中...
import { Toast } from 'mint-ui'; //加载中...

export default{
    install(Vue){

        var _this = this;
        Vue.prototype.lconfirm = function (message, options, confirm, cancel) {
            _this.confirm(message, options, confirm, cancel);
        };
        Vue.prototype.lprompt = function (message, options, confirm, cancel) {
            _this.prompt(message, options, confirm, cancel);
        }

        Vue.prototype.lalterSuccess = function (message, title, duration) {
            _this.alterSuccess(message, title, duration);
        };

        Vue.prototype.lalterWarning = function (message, title, duration) {
            _this.alterWarning(message, title, duration);
        };

        Vue.prototype.lalterError = function (message, title, duration) {
            _this.alterError(message, title, duration);
        };
        Vue.prototype.lshowWait=function (text,opts) {
            _this.showWait(text,opts);
        };
        Vue.prototype.lcloseWait=function () {
            _this.closeWait();
        }
    },

    confirm(message, options, confirm, cancel) {
        options = options == null ? {} : options;
        MessageBox({
            title: options.title == undefined ? "提示" : options.title,
            message: message,
            showCancelButton: options.showCancelButton == undefined ? true : options.showCancelButton,
            cancelButtonText: options.cancelButtonText == undefined ? "取消" : options.cancelButtonText,
            confirmButtonText: options.confirmButtonText == undefined ? "确定" : options.confirmButtonText,
            closeOnClickModal: options.closeOnClickModal
        }).then(action => {
            if (action == "confirm" && confirm) {
                confirm();
            }
            if (action == "cancel" && cancel) {
                cancel();
            }
        });
       setTimeout(function () {
           $(".mint-msgbox-wrapper").css("z-index", 99999);
           $(".mint-msgbox-wrapper").next().css("z-index", 99998);
       },200)
        //$(".mint-msgbox-wrapper").next(".v-modal").style("z-index", 99999);
    },
    prompt(message, options, confirm, cancel){
        options = options == null ? {} : options;
        var promptOpts = {
            cancelButtonText: options.cancelButtonText == undefined ? "取消" : options.cancelButtonText,
            confirmButtonText: options.confirmButtonText == undefined ? "确定" : options.confirmButtonText,
            inputErrorMessage: '格式不正确'
        };
        if (options.inputPattern != undefined) {
            promptOpts.inputPattern = options.inputPattern;
        }

        var title = options.title == undefined ? "提示" : options.title;

        MessageBox.prompt(message, title, promptOpts).then(({value}) => {
            if (confirm) {
                confirm(value);
            }
        }).catch((action) => {
            if (cancel) {
                cancel();
            }
        });
    },
    instance:null,
    LToast(message, title, duration){
        if(this.instance !=null){
            this.instance.close();
            this.instance=null;
        }
        this.instance = Toast({
            message:message,
            duration: 3000
        });
    },
    alterSuccess(message, title, duration) {
        this.LToast(message);
        //Notification.success(this.buildAlterOpts(message, title, duration));
    },

    alterWarning(message, title, duration) {
        this.LToast(message);

        //Notification.warning(this.buildAlterOpts(message, title, duration));
    },

    alterError(message, title, duration) {
        this.LToast(message);
        //Notification.error(this.buildAlterOpts(message, title, duration));
    },
    showWait(text,opts){
        this.closeWait();
        var opts=opts==undefined?{}:opts;
        if(text != undefined){
            opts.text=text;
        }else {
            opts.text="请稍候...";
        }
        if(opts.spinnerType == undefined){
            opts.spinnerType='fading-circle';
        }
        Indicator.open(opts);
    },
    closeWait(){
        Indicator.close();
    },
    buildAlterOpts(message, title, duration){

        var result = {
            title: title,
            message: message,
            duration: duration == undefined ? 1500 : duration
        };
        return result;
    },
}

