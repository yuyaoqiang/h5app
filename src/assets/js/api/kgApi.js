import apiUtil  from './common/apiUtil';
import appContext  from '../context/appContext';
export default  {
    init(params, callback){
        apiUtil.doPost('/gameType/initKjGame.mvc', params, callback);
    },
    reloadKjOdds(params,callback){
        apiUtil.doPost('/gameType/reloadKjOdds.mvc?',params,callback);
    },
    cathectic(params,callback){
        apiUtil.doPost('/cathectic/kj_cathectic.mvc?',params,callback);
    },
    getLotteryList(callback){
        apiUtil.doPost('/gameType/initKjGameType.mvc',null,callback);
    },
    //kg个人日结报表
    getKgUserDailyReportList(params,callback){
        apiUtil.doPost('/termsProfitStatistics/dailyStatis.mvc',params,callback);
    },
    //kg个人彩票账变
    getKgLotteryProfitLossList(params,callback){
        apiUtil.doPost('/kjlotteryProfitLoss/search.mvc',params,callback);
    },
    //kg个人彩票投注
    getKgbetRecord(params,callback){
        apiUtil.doPost('/kjbetRecord/search.mvc',params,callback);
    },
    //kg个人彩票追号
    getKgzhuiHao(params,callback){
        apiUtil.doPost('/kjzhuiHao/search.mvc',params,callback);
    },

    //kg团队日结
    // getKgDailyStatisTeam(params,callback){
    //     apiUtil.doPost('/termsProfitStatistics/dailyStatisTeam.mvc',params,callback);
    // },
    //kg团队盈亏
    getKgDailyStatisTeam(params,callback){
        apiUtil.doPost('/termsProfitStatistics/list.mvc',params,callback);
    },
    //kg团队彩票
    getKgTeamLotteryRecord(params,callback){
        apiUtil.doPost('/kjbetRecord/searchGroup.mvc',params,callback);
    },
    //kg团队账变
    getKgTeamLotteryProfitLoss(params,callback){
        apiUtil.doPost('/kjlotteryProfitLoss/listTeam.mvc',params,callback);
    },
	//个人投注记录
    findBetRecord(params,callbakc){
        apiUtil.doPost('/kjbetRecord/search.mvc',params,function (resp) {
            if(resp.data && resp.data.token_cd){
                appContext.tokens.token_cd=resp.data.token_cd;
            }
            callbakc(resp);
        });
    },
    zhuiBetRecord(params,callback){
        apiUtil.doPost('/kjzhuiHao/search.mvc',params,callback);
    },
    //投注详情
    view(params,callback){
        apiUtil.doPost('/kjbetRecord/view.mvc',params,callback);
    },
    //追号详情
    zhuihaoView(params,callback){
        apiUtil.doPost('/kjzhuiHao/view.mvc',params,function (resp) {
            if(resp.data && resp.data.token_zh){
                appContext.tokens.token_zh=resp.data.token_zh;
            }
            if(callback){
                callback(resp);
            }
        });
    },
    //KG账变
    getKGLotteryProfitLossList(params,callback){
        apiUtil.doPost('/kjlotteryProfitLoss/search.mvc',params,callback);
    },
}
