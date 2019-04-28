import apiUtil from './common/apiUtil';

export default {

    //个人充值记录
    moneyinRecord(params, callback) {
        apiUtil.doPost('/moneyinRecord/records.mvc', params, callback);
    },
    //提现记录
    moneyoutRecord(params, callback) {
        apiUtil.doPost('/moneyoutRecord/search.mvc', params, callback);
    },
    //转账记录
    getTransferRecords(params, callback) {
        apiUtil.doPost('/platformTransferRecords/records.mvc', params, callback);
    },
    //团队记录
    TeamLoss(params, callback) {
        apiUtil.doPost('/termsProfitStatistics/list.mvc', params, callback);
    },
    //账变明细
    getProfitLossList(params, callback) {
        apiUtil.doPost('/profitLoss/getProfitLossList.mvc', params, callback);
    },
    //彩票账变
    getLotteryProfitLossList(params, callback) {
        apiUtil.doPost('/lotteryProfitLoss/search.mvc', params, callback);
    },
    //团队彩票
    getTeamLotteryRecord(params, callback) {
        apiUtil.doPost('/betRecord/searchGroup.mvc', params, callback);
    },
    //kg团队彩票
    getKgTeamLotteryRecord(params, callback) {
        apiUtil.doPost('/kjbetRecord/searchGroup.mvc', params, callback);
    },
    //彩票日结报表
    getUserDailyReportList(params, callback) {
        apiUtil.doPost('/termsProfitStatistics/dailyStatis.mvc', params, callback);
    },
    //消息列表
    getMessageRecords(params, callback) {
        apiUtil.doPost('/message/search.mvc', params, callback);
    },
    //删除消息
    deleteMessage(params, callback) {
        apiUtil.doPost('/message/deleteMessage.mvc', params, callback);
    },
    //发送消息
    sendMessage(params, callback) {
        apiUtil.doPost('/message/send.mvc', params, callback);
    },
    //获取消息好友
    searchSenderUser(params, callback) {
        apiUtil.doPost('/message/searchSenderUser.mvc', params, callback);
    },
    //反馈列表
    getOpinionList(params, callback) {
        apiUtil.doGet('userInfo/getOpinionList.mvc', params, callback);
    },
    //团队余额
    getTeamBalance(callback) {
        apiUtil.doPost('/balance/getTeamBalance.mvc', null, callback);
    },
    getAGBetRecords(params, callback) {
        apiUtil.doPost('/agBetRecords/search.mvc', params, callback);
    },
    getBBINBetRecords(params, callback) {
        apiUtil.doPost('/bbinBetRecords/search.mvc', params, callback);
    },
    getPTBetRecords(params, callback) {
        apiUtil.doPost('/ptBetRecords/search.mvc', params, callback);
    },
    getDSBetRecords(params, callback) {
        apiUtil.doPost('/dsBetRecords/search.mvc', params, callback);
    },
    getMGBetRecords(params, callback) {
        apiUtil.doPost('/mgBetRecords/search.mvc', params, callback);
    },
    getSBBetRecords(params, callback) {
        apiUtil.doPost('/sbBetRecords/search.mvc', params, callback);
    },
    getGPBetRecords(params, callback) {
        apiUtil.doPost('/gpBetRecords/search.mvc', params, callback);
    },
    getKYBetRecords(params, callback) {
        apiUtil.doPost('/kyBetRecords/search.mvc', params, callback);
    },
    overAllCount(params, callback) {
        apiUtil.doPost('/termsProfitStatistics/overallCount.mvc', params, callback);
    },
}