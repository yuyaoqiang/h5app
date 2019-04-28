import apiUtil  from './common/apiUtil';

export default  {
    checkAuth(params,callback) {
        apiUtil.doPost("/trd-auth-account/check-auth.mvc",params,callback);
    },

    bind(params,callback) {
        apiUtil.doPost("/trd-auth-account/bind.mvc",params,callback);
    },

    create(params,callback) {
        apiUtil.doPost("/trd-auth-account/create.mvc",params,callback);
    },

    needCaptcha(callback) {
        apiUtil.doPost("/trd-auth-account/need-captcha.mvc",null,callback);
    },
}
