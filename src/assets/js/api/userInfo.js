import apiUtil  from './common/apiUtil';

export default  {
    getUserInfo(callback) {
        apiUtil.doPost("/userInfo/getUserInfo.mvc",null,callback);
    },
  /*  getUserInfoDails(callback) {
        apiUtil.doPost("/userInfo/getUserInfoDails.mvc",null,callback);
    },*/
    //修改个人信息
    baseInfo(params,callback){
        apiUtil.doPost("/userInfo/baseInfo.mvc",params,callback);
    },

    //设置资金密码
    updatePwd(params,callback){
        apiUtil.doPost('/userInfo/updatePwd.mvc',params,callback);
    },
    //修改资金密码
    takePassword(params,callback){
        apiUtil.doPost('/userInfo/takePassword.mvc?',params,callback);
    },
    //更新登录密码
    updateLoginPwd(params,callback){
        apiUtil.doPost('/userInfo/updateLoginPwd.mvc?',params,callback);
    },
    //登录
    login(params,callback){
        apiUtil.doPost('/login/login.mvc?',params,callback);
    },
    needValidateCode(callback){
        apiUtil.doGet("/login/need-validate-code.mvc",null,callback);
    },
    //退出登录
    loginOut(callback){
        apiUtil.doPost("/login/loginOut.mvc",null,callback);
    },
    //公告
    notice(callback){
        apiUtil.doPost("/notice/notice.mvc",null,callback);
    },
    //登录
    createTrdGameUser(params,callback){
        apiUtil.doPost("/thirdUserAdd/"+params+"/create.mvc",null,callback);
    },
    //奖金详情
    serachGameRebate(callback) {
        apiUtil.doPost("/gameType/serachGameRebate.mvc", null, callback);
    },
    //彩种限红
    getGameInfo(callback) {
        apiUtil.doPost("/gameType/getGameInfo.mvc", null, callback);
    },
    //意见箱
    getAdvise(params, callback) {
        apiUtil.doPost("/userInfo/addOpinion.mvc", params, callback);
    },
    //用户代理信息
    getUserList(params,callback){
        apiUtil.doPost("/userInfo/search.mvc",params,callback);
    },
    //新增用户
    addUser(params,callback){
        apiUtil.doPost("/userInfo/add.mvc",params,callback);
    },
    //注册链接列表
    getRegisterCodeLink(params,callback){
        apiUtil.doPost("/registercode/search.mvc",params,callback);
    },
    //禁用|启用注册链接
    offLink(params,callback){
        apiUtil.doPost("/registercode/offLink.mvc",params,callback);
    },
    //删除链接
    deleteLink(params,callback){
        apiUtil.doPost("/registercode/deleteLink.mvc",params,callback);
    },
    //生成注册链接
    produceLink(params,callback){
        apiUtil.doPost("/registercode/produceLink.mvc",params,callback);
    },
    //初始化代理用户信息
    initUpdate(params,callback){
        apiUtil.doPost("/userInfo/initUpdate.mvc",params,callback);
    },
    //修改返点
    update(params,callback){
        apiUtil.doPost("/userInfo/update.mvc",params,callback);
    },
    //配额管理初始化
    intUserQuota(params,callback){
        apiUtil.doPost("/userQuota/init.mvc",params,callback);
    },
    //配额修改
    updateUserQuota(params,callback){
        apiUtil.doPost("/userQuota/update.mvc",params,callback);
    },
    //代理转账
    transferPrepare(callback){
        apiUtil.doPost("/transfer/transferPrepare.mvc",null,callback);
    },
    transfer(params,callback){
        apiUtil.doPost("/transfer/transfer.mvc",params,callback);
    } ,
    //修改分红
    updateDividend(params, callback){
        apiUtil.doPost("/userInfo/updateDividend.mvc", params, callback);
    },

    updateDailyWage : function(param,callback) {
        apiUtil.doPost("/userInfo/updateDailyWage.mvc", param, callback);
    },

    getUserSimpleInfo(params,callback){
        apiUtil.doPost("/userInfo/simple-info.mvc",params,callback);
    },

    getUserMenu(params,callback){
        apiUtil.doPost("/userInfo/menu.mvc",params,callback);
    },
    saveFavorites(params,callback){
        apiUtil.doPost("/userInfo/lottery-favorites/save.mvc",params,callback);
    },
    //系统公告
    searchNotice(params,callback){
        apiUtil.doPost("/notice/notice.mvc",params,callback);
    },
    loginThir(param, callback){
        apiUtil.doPost("/userInfo/loginThir.mvc", param, callback);
    } ,
    syncLoginThir(param, callback){
        apiUtil.doSyncPost("/userInfo/loginThir.mvc", param, callback);
    } ,
    getTrdGameLoginInfo(params,callback){
        apiUtil.doPost("/thirdUserAdd/"+params.platform+"/login.mvc",params,callback);
    },
    reg(params, callback){
        apiUtil.doPost("/security/reg.mvc", params, callback);
    },
    regCode(callback){
        apiUtil.doPost("/system-config/front.mvc", null, callback);
    },
    appRegCode(params,callback){
        apiUtil.doPost("/system-config/get-regcode.mvc", params, callback);
    },
    //试玩接口
    loginShiWan(params,callbakc){
        apiUtil.doPost("/login/shiwangAdd.mvc?",params,callbakc)
    },
    //  //获取各种图片地址 1 轮播图   2 支付二维码   3 app下载二维码   4 手机轮播图    5 其它
    getUrlAddrs(params,callback){
        apiUtil.doPost("/Uploadimg/list.mvc", params, callback);
    },
    //手机活动接口
    getActivity(params,callback){
      /*  apiUtil.doGet("/PromotionsWap/list.mvc", params, callback);*/
      apiUtil.doGet("/Promotions/list.mvc", params, callback);
    },
    //活动领取接口
    receiveRewards(params,callback){
      /*  apiUtil.doGet("/PromotionsWap/receiveRewards.mvc", params, callback);*/
      apiUtil.doGet("/Promotions/receiveRewards.mvc", params, callback);
    },

    getSareBet(params,callback) {//聊天室获取分享注单
        apiUtil.doPost("/betRecord/getLatestTimeBet.mvc", params, callback);
    },
    getChatroomInfo(params,callback) {//聊天室获取聊天信息接口
        apiUtil.doPost("/Promotions/getChatInfo.mvc", params, callback);
    },
    getChatroomUserIsSpeak(param,callback) {//聊天室获取是否禁言
        apiUtil.doPost("/Promotions/getChatUserIsSpeak.mvc", param, callback);
    },

    //红包接口
    receiveDividend(callback){
        apiUtil.doPost("/Hongbao/receiveDividend.mvc", null, callback);
    },
    getDividendAvailable(callback){
        apiUtil.doPost("/Hongbao/getDividendAvailable.mvc", null, callback);
    },
}
