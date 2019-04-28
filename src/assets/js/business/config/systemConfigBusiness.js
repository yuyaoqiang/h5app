
import systemConfigApi from "../../../js/api/systemConfigApi"


export default {
    config:null,
    getConfig(callback){
        var _this=this;
        var doCallback=function () {
            if(callback){
                callback(_this.config);
            }
        }

        if(_this.config!=null){
            doCallback();
            return;
        }

        systemConfigApi.getConfig((resp)=>{
            if(resp.code==200){
                _this.config=resp.data;
                doCallback();
            }else {
                console.error("获取系统配置出错",resp);
            }
        });

    }

}