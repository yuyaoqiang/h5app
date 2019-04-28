import apiUtil  from './common/apiUtil';

export default  {
    getHistoryNums(params, callback){
        apiUtil.doPost('/gameType/history-nums.mvc', params, callback);
    },

    getInitData(params,callback){
      apiUtil.doPost('/gameType/initGame.mvc?',params,callback);
    },

    getCloseTime(params,callback){
      apiUtil.doPost('/betType/lotterTime.mvc',params,callback);
    },

    getBettingTime(params,callback){
      apiUtil.doPost('/betType/bettingTime.mvc',params,callback);
    },

    getBettingTimeList(params,callback){
      apiUtil.doPost('/betType/betting-time/list.mvc',params,callback);
    },
    confirmBet(params,callback){
        apiUtil.doPost('/cathectic/cathectic.mvc',params,callback);
    },
    getTrend(params,callback){
        apiUtil.doPost('/lottery/list.mvc',params,callback);
    },
    getIndexLotteryList(callback){
        apiUtil.doPost('/gameType/index-list.mvc',null,callback);
    },
    getColdHot(id,callback){
        apiUtil.doPost("/betRecord/coldHot.mvc",{gameType:id},callback)
    },
    getLeaveOut(id,callback){
        apiUtil.doPost("/betRecord/historyLeaveOut.mvc",{gameType:id},callback)
    },

    sendRedEnvelope(params,callback){
        apiUtil.doPost("/Hongbao/sendhb.mvc",params,callback)
    },
    openRedEnvelope(params,callback){
        apiUtil.doPost("/Hongbao/lingqu.mvc",params,callback)
    },
    viewRedEnvelopeRcords(params,callback){
        apiUtil.doPost("/Hongbao/lingqulist.mvc",params,callback)
    },
    isReceiveRedEnvelope(params,callback){
        apiUtil.doGet("/Hongbao/islingqu.mvc",params,callback)
    },
    getChatroomPlatform(callback){
        apiUtil.doGet("/Hongbao/platformurl.mvc",null,callback)
    },
    getChatroomPlatformByToken(token,callback){
        apiUtil.doPost("/Hongbao/platformurlH5.mvc",{token:token},callback)
    }


}
