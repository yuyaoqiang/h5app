import apiUtil  from './common/apiUtil';

//import apiUtil  from '../util/apiUtil.js';
export default  {
    //初始银行
    initOne(callback){
        apiUtil.doPost("/userBank/initOne.mvc",null,callback);
    },
    //添加银行
    addBankCard(params,callback){
        apiUtil.doPost('/userBank/addBankCard.mvc',params,callback);
    },
    //绑定银行卡
    lockBankCard(callback){
        apiUtil.doPost("/userBank/lockBankCard.mvc",null,callback);
    },
    //用户银行信息
    getUserBankInfo(callback){
        apiUtil.doPost("/userBank/getUserBankInfo.mvc",null,callback);
    },
    //额度转换初始化
    TransfInit(callback){
        apiUtil.doPost("/platformTransferRecords/init.mvc",null,callback);
    },
    //额度转换
    capitalTransfer(params,callback){
        apiUtil.doPost('/platformTransferRecords/capitalTransfer.mvc',params,callback);
    },
    thirBalancer(callback){
       apiUtil.doGet("/userInfo/thirBalancer.mvc",null,callback);
    },
    //充值
    lotteryVerify(params,callback){
        apiUtil.doPost('/moneyInVerify/lotteryVerify.mvc?',params,callback);
    },
    //提现初始化银行
    init(callback){
        apiUtil.doPost("/moneyoutRecord/init.mvc",null,callback);
    },
    //提现
    take(params,callback){
        apiUtil.doPost('/moneyoutRecord/take.mvc?',params,callback);
    },
    //修改银行信息
    updatedBank(params,callback) {
        apiUtil.doPost('/userBank/upBankCard.mvc?',params,callback);
    },
}