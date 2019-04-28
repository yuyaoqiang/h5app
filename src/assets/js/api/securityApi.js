
import apiUtil  from './common/apiUtil';

export default {
    getVerifyCodeUrl(){
        return apiUtil.buildUrl("/verifyCode");
    },
    getOnlineServiceUrl(callbakc){
        apiUtil.doSyncPost("/login/kefuxian.mvc", null, callbakc);
    },
    getSafe(callbakc){
        apiUtil.doPost("/login/safe.mvc?",null,callbakc)
    }
}