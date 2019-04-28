
//主入口
import boot from './components/login/boot.vue';
import login from './components/login/login.vue';
import guid from './components/guid/guid.vue';
import index from './components/index/index.vue';
import jumpIndex from './components/index/jumpIndex.vue';
import register from './components/register/register.vue';
import download from "./components/download/download.vue";
import chatroom from "./components/chatroom/chatroom.vue";

//index 下面子路由
import lottery from './components/lottery/lottery.vue'; //首页
import result from './components/result/result.vue'; //开奖
import account from './components/account/account.vue'; //账户
import setting from './components/setting/setting.vue'; //设置
import lotteryHome from './components/lotteryHome/lotteryHome.vue'; //彩票大厅

//account 里的页面
import betrecord from './components/account/betrecord.vue'; //投注记录
import KgBetrecord from './components/account/kg_betrecord.vue'; //kg投注记录
import zuihaoRecord from './components/account/zuihaoRecord.vue'; //追号记录
import KgZuihaoRecord from './components/account/kg_zuihaoRecord.vue'; //追号记录
import myReport from './components/account/myReport.vue'; //我的报表
import moneyRecord from './components/account/moneyRecord.vue'; //帐变记录
import agentCenter from './components/account/agentCenter.vue'; //代理中心
import activity from './components/account/activity.vue'; //优惠活动
import bonusDetails from './components/account/bonusDetails.vue'; //奖金详情
import lotteryLimited from './components/account/lotteryLimited.vue'; //奖金详情
import statis from './components/account/statis.vue'; //统计
import fklb from './components/account/fklb.vue'; //反馈列表
import fkyj from './components/account/fkyj.vue'; //反馈意见
import email from './components/account/email.vue'; //站内信
import emailDetails from './components/account/emailDetails.vue'; //站内信详情
import emailSend from './components/account/emailSend.vue'; //站内信发送
import memberManagement from './components/account/memberManagement.vue'; //会员管理
import registerTheLink from './components/account/registerTheLink.vue'; //注册链接列表
import newUsers from './components/account/newUsers.vue'; //新增用户
import quotaConversion from './components/account/quotaConversion.vue'; //额度转换
import chongzhi from './components/account/chongzhi.vue'; //充值
import report from './components/account/report.vue'; //彩票，视讯报表
import bettingDetails from './components/account/bettingDetails.vue'; //投注详情
import newRegisterLink from './components/account/newRegisterLink.vue'; //新增注册链接
import zbmx from './components/account/zbmx.vue'; //帐变明细
import cpzb from './components/account/cpzb.vue'; //彩票账变
import kgzb from './components/account/kgzb.vue'; //彩票账变
import withdraw from './components/account/withdraw.vue'; //提现
import team from './components/account/team.vue'; //报表总览,团队报表
import teamReport from './components/account/teamReport.vue'; //团队盈亏
import teamLottery from './components/account/teamLottery.vue'; //团队彩票
import teamKGLottery from './components/account/teamKGLottery.vue'; //团队KG
import generalize from './components/account/generalize.vue'; //邀请推广

//setting 里的页面
import bankControl from './components/setting/bankControl.vue'; //银行卡管理
import userInfor from './components/setting/userInfor.vue'; //用户信息
import loadPassword from './components/setting/loadPassword.vue'; //修改登录密码
import addBankcard from './components/setting/addBankcard.vue'; //添加银行卡
import modifyPassword from './components/setting/modifyPassword.vue'; //修改资金密码
import moreInfo from './components/setting/moreInfo.vue'; //更多信息
import maintain from './components/maintain/maintain.vue'; //维护页面
import notice from './components/setting/notice.vue'; //公告页面
import question from './components/setting/question.vue'; //公告页面
import method from './components/setting/method.vue'; //玩法说明页面
import explain from './components/kggame/explain/explain.vue'; //玩法说明页面

//result 里的页面
import lotteryInformationTrend from './components/result/lotteryInformationTrend.vue'; //开奖信息

//lottery 里的页面
import lotteryBet from './components/lottery/lotteryBet.vue'; //彩票投注
import lotteryTrend from './components/lottery/lotteryTrend.vue'; //走势图
import bettingList from './components/lottery/bettingList.vue'; //投注列表
import lotteryFavorites from './components/lottery/lotteryFavorites.vue';
import lotteryFavoritesEdit from './components/lottery/lotteryFavoritesEdit.vue';
import thirdGame from './components/lottery/thirdGame.vue';
import appTrend from './components/lottery/appTrend.vue';

//kggame 页面
import kgGameBet from './components/kggame/kgGameBet.vue'; //kg投注


import trdPlatformAuth from './components/trdPlatform/trdPlatformAuth.vue';
import bindUser from './components/trdPlatform/bindUser.vue'; //绑定登录
import newBindUser from './components/trdPlatform/newBindUser.vue'; //绑定登录
import autoRegSuccessed from './components/trdPlatform/autoRegSuccessed.vue'; //绑定成功
import trdAuthSuccessed from './components/trdPlatform/trdAuthSuccessed.vue'; //绑定成功
import createUser from './components/trdPlatform/createUser.vue'; //注册绑定登录
import newCreateUser from './components/trdPlatform/newCreateUser.vue'; //注册绑定登录



//trends 页面
import basicTrend from './components/trends/basicTrend.vue';
import sxzxTrend from './components/trends/ssc/sxzxTrend.vue';
import exzxTrend from './components/trends/ssc/exzxTrend.vue';
import wxhzTrend from './components/trends/ssc/wxhzTrend.vue';
import sxhzTrend from './components/trends/ssc/sxhzTrend.vue';
import exhzTrend from './components/trends/ssc/exhzTrend.vue';
import xtTrend from './components/trends/ssc/xtTrend.vue';
import zfTrend from './components/trends/ssc/zfTrend.vue';
import sxkdTrend from './components/trends/ssc/sxkdTrend.vue';
import exkdTrend from './components/trends/ssc/exkdTrend.vue';
import rxjbzsTrend from './components/trends/xuan5/rxjbzsTrend.vue';
import qszxTrend from './components/trends/xuan5/qszxTrend.vue';
import qezxTrend from './components/trends/xuan5/qezxTrend.vue';
import rxhzTrend from './components/trends/xuan5/rxhzTrend.vue';
import qshzTrend from './components/trends/xuan5/qshzTrend.vue';
import qehzTrend from './components/trends/xuan5/qehzTrend.vue';
import xtxuan5Trend from './components/trends/xuan5/xtTrend.vue';
import rxkdTrend from './components/trends/xuan5/rxkdTrend.vue';
import qskdTrend from './components/trends/xuan5/qskdTrend.vue';
import qekdTrend from './components/trends/xuan5/qekdTrend.vue';
import otherTrend from './components/trends/k3/otherTrend.vue';
import pcTrend from './components/trends/lhc/pcTrend.vue';
import lhcTrend from './components/trends/lhc/lhcTrend.vue';
import numbersTrend from './components/trends/lhc/numbersTrend.vue';
import temTrend from './components/trends/lhc/temTrend.vue';
import animalTrend from './components/trends/lhc/animalTrend.vue';
import weihaoTrend from './components/trends/lhc/weihaoTrend.vue';
import colorTrend from './components/trends/lhc/colorTrend.vue';
import smallAndBigTrend from './components/trends/lhc/smallAndBigTrend.vue';
import singleAndDoubleTrend from './components/trends/lhc/singleAndDoubleTrend.vue';
import headTrend from './components/trends/lhc/headTrend.vue';
import heTrend from './components/trends/lhc/heTrend.vue';
import jiayeTrend from './components/trends/lhc/jiayeTrend.vue';
import duanshuTrend from './components/trends/lhc/duanshuTrend.vue';

import xyxzlhcTrend from './components/trends/xyxz/lhcTrend.vue';
import xyxznumbersTrend from './components/trends/xyxz/numbersTrend.vue';
import xyxztemTrend from './components/trends/xyxz/temTrend.vue';
import xyxzanimalTrend from './components/trends/xyxz/animalTrend.vue';
import xyxzweihaoTrend from './components/trends/xyxz/weihaoTrend.vue';
import xyxzcolorTrend from './components/trends/xyxz/colorTrend.vue';
import xyxzsmallAndBigTrend from './components/trends/xyxz/smallAndBigTrend.vue';
import xyxzsingleAndDoubleTrend from './components/trends/xyxz/singleAndDoubleTrend.vue';
import xyxzheadTrend from './components/trends/xyxz/headTrend.vue';
import xyxzheTrend from './components/trends/xyxz/heTrend.vue';


//电子游戏页面
import mgElec from './components/trdPlatform/mgElec.vue'
import ptElec from './components/trdPlatform/ptElec.vue'

//定义路由
const routes = [
    { path: '/', component: boot },
    {
        path: '/index',
        component: index,
        meta: {
            title: "HelloWorld", //要现实的title
            show: true, //设置导航隐藏显示
            index: 1,
        },
        children: [{
            path: '/',
            component: lottery,
            name:'indexH5app',
            meta: {
                title: "HelloWorld",
                show: true,
                index: 1,
            },
        },

            {
                path: '/account',
                component: account,
                meta: {
                    title: "个人中心",
                    show: true,
                    index: 3,
                },
            },
            {
                path: '/setting',
                component: setting,
                meta: {
                    title: "设置",
                    show: true,
                    index: 4,
                },
            },
            {
                path: '/lotteryHome',
                component: lotteryHome,
                meta: {
                    title: "HelloWorld",
                    show: false,
                    index: 1,
                },
            },
        ]
    },
    {
        path: '/lotteryTrend',
        component: lotteryTrend,
        children: [
            { path: '/jumpIndex', component: jumpIndex },
            { path: '/basicTrend', component: basicTrend },
            { path: '/sxzxTrend', component: sxzxTrend },
            { path: '/exzxTrend', component: exzxTrend },
            { path: '/wxhzTrend', component: wxhzTrend },
            { path: '/sxhzTrend', component: sxhzTrend },
            { path: '/exhzTrend', component: exhzTrend },
            { path: '/xtTrend', component: xtTrend },
            { path: '/zfTrend', component: zfTrend },
            { path: '/sxkdTrend', component: sxkdTrend },
            { path: '/exkdTrend', component: exkdTrend },
            { path: '/rxjbzsTrend', component: rxjbzsTrend },
            { path: '/qszxTrend', component: qszxTrend },
            { path: '/qezxTrend', component: qezxTrend },
            { path: '/rxhzTrend', component: rxhzTrend },
            { path: '/qshzTrend', component: qshzTrend },
            { path: '/qehzTrend', component: qehzTrend },
            { path: '/qehzTrend', component: qehzTrend },
            { path: '/xtxuan5Trend', component: xtxuan5Trend },
            { path: '/rxkdTrend', component: rxkdTrend },
            { path: '/qskdTrend', component: qskdTrend },
            { path: '/qekdTrend', component: qekdTrend },
            { path: '/otherTrend', component: otherTrend },
            { path: '/pcTrend', component: pcTrend },
            { path: '/lhcTrend', component: lhcTrend },
            { path: '/numbersTrend', component: numbersTrend },
            { path: '/temTrend', component: temTrend },
            { path: '/animalTrend', component: animalTrend },
            { path: '/weihaoTrend', component: weihaoTrend },
            { path: '/colorTrend', component: colorTrend },
            { path: '/smallAndBigTrend', component: smallAndBigTrend },
            { path: '/singleAndDoubleTrend', component: singleAndDoubleTrend },
            { path: '/headTrend', component: headTrend },
            { path: '/heTrend', component: heTrend },
            { path: '/jiayeTrend', component: jiayeTrend },
            { path: '/duanshuTrend', component: duanshuTrend },

            { path: '/xyxzlhcTrend', component: xyxzlhcTrend },
            { path: '/xyxznumbersTrend', component: xyxznumbersTrend },
            { path: '/xyxztemTrend', component: xyxztemTrend },
            { path: '/xyxzanimalTrend', component: xyxzanimalTrend },
            { path: '/xyxzweihaoTrend', component: xyxzweihaoTrend },
            { path: '/xyxzcolorTrend', component: xyxzcolorTrend },
            { path: '/xyxzsmallAndBigTrend', component: xyxzsmallAndBigTrend },
            { path: '/xyxzsingleAndDoubleTrend', component: xyxzsingleAndDoubleTrend },
            { path: '/xyxzheadTrend', component: xyxzheadTrend },
            { path: '/xyxzheTrend', component: xyxzheTrend },
        ]
    },
    {
        path: '/result',
        component: result,
        meta: {
            title: "购彩大厅",
            show: true,
            index: 2,
        },
    },
    { path: '/activity', component: activity },
    { path: '/bonusDetails', component: bonusDetails },
    { path: '/lotteryLimited', component: lotteryLimited },
    { path: '/statis', component: statis },
    { path: '/fklb', component: fklb },
    { path: '/fkyj', component: fkyj },
    { path: '/email', component: email },
    { path: '/emailDetails', component: emailDetails },
    { path: '/emailSend', component: emailSend },
    { path: '/betrecord', component: betrecord },
    { path: '/zuihaoRecord', component: zuihaoRecord },
    { path: '/KgBetrecord', component: KgBetrecord },
    { path: '/KgZuihaoRecord', component: KgZuihaoRecord },
    { path: '/myReport', component: myReport },
    { path: '/moneyRecord', component: moneyRecord },
    { path: '/agentCenter', component: agentCenter },
    { path: '/bankControl', component: bankControl },
    { path: '/userInfor', component: userInfor },
    { path: '/loadPassword', component: loadPassword },
    { path: '/modifyPassword', component: modifyPassword },
    { path: '/addBankcard', component: addBankcard },
    { path: '/memberManagement', component: memberManagement },
    { path: '/registerTheLink', component: registerTheLink },
    { path: '/newUsers', component: newUsers },
    { path: '/lotteryInformationTrend', component: lotteryInformationTrend },
    { path: '/quotaConversion', component: quotaConversion },
    { path: '/lotteryBet', component: lotteryBet, },
    { path: '/kgGameBet', component: kgGameBet },
    { path: '/newLogin', component: login },
    /* { path: '/login', component: login },*/
    { path: '/reg', component: register },
    { path: '/guid', component: guid },
    { path: '/lotteryTrend', component: lotteryTrend },
    { path: '/bettingList', component: bettingList },
    { path: '/lotteryFavorites', component: lotteryFavorites },
    { path: '/lotteryFavoritesEdit', component: lotteryFavoritesEdit },
    { path: '/thirdGame', component: thirdGame },
    { path: '/jumpTrdGame', component: thirdGame },
    { path: '/chongzhi', component: chongzhi },
    { path: '/report', component: report },
    { path: '/bettingDetails', component: bettingDetails },
    { path: '/moreInfo', component: moreInfo },
    { path: '/newRegisterLink', component: newRegisterLink },
    { path: '/zbmx', component: zbmx },
    { path: '/cpzb', component: cpzb },
    { path: '/kgzb', component: kgzb },
    { path: '/withdraw', component: withdraw },
    { path: '/team', component: team },
    { path: '/teamReport', component: teamReport },
    { path: '/teamLottery', component: teamLottery },
    { path: '/teamKGLottery', component: teamKGLottery },
    { path: '/generalize', component: generalize },
    { path: '/maintain', component: maintain },
    { path: '/notice', component: notice },
    { path: '/question', component: question },
    { path: '/method', component: method },
    { path: '/explain', component: explain },
    { path: '/download', component: download },
    { path: "/chatroom", component: chatroom ,meta:{keepAlive:true}},
    { path: '/appTrend', component: appTrend },
    {path: '/trdPlatformAuth', component: trdPlatformAuth},
    {path: '/bindUser', component: bindUser},
    {path: '/newBindUser', component: newBindUser},
    {path: '/autoRegSuccessed', component: autoRegSuccessed},
    {path: '/trdAuthSuccessed', component: trdAuthSuccessed},
    {path: '/createUser', component: createUser},
    {path: '/newCreateUser', component: newCreateUser},
    {path: '/mg_elec', component: mgElec},
    {path: '/pt_elec', component: ptElec},
    { path: '/*', component: jumpIndex },
]
export default routes