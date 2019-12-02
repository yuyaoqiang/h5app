
//主入口
// import boot from './components/login/boot.vue';
const boot = () => import("./components/login/boot.vue")
// import login from './components/login/login.vue';
const login = () => import("./components/login/login.vue")
// import guid from './components/guid/guid.vue';
const guid = () => import("./components/guid/guid.vue")
// import index from './components/index/index.vue';
const index = () => import("./components/index/newIndex.vue")

// import index from './components/index/index.vue';
// const index = () => import("./components/index/index.vue")

// import jumpIndex from './components/index/jumpIndex.vue';
const jumpIndex = () => import("./components/index/jumpIndex.vue")
// import register from './components/register/register.vue';
const register = () => import("./components/register/register.vue")
// import download from "./components/download/download.vue";
const download = () => import("./components/download/download.vue")
// import chatroom from "./components/chatroom/chatroom.vue";
const chatroom = () => import("./components/chatroom/chatroom.vue")

//index 下面子路由
// import lottery from './components/lottery/lottery.vue'; //首页

const lottery = () => import("./components/lottery/lottery.vue")
const newLottery = () => import("./components/lottery/newLottery.vue")

// import result from './components/result/result.vue'; //开奖
const result = () => import("./components/result/result.vue")
// import account from './components/account/account.vue'; //账户
const account = () => import("./components/account/account.vue")
// import setting from './components/setting/setting.vue'; //设置
const setting = () => import("./components/setting/setting.vue")
// import lotteryHome from './components/lotteryHome/lotteryHome.vue'; //彩票大厅
const lotteryHome = () => import("./components/lotteryHome/lotteryHome.vue")
//account 里的页面
// import betrecord from './components/account/betrecord.vue'; //投注记录
const betrecord = () => import("./components/account/betrecord.vue")
// import KgBetrecord from './components/account/kg_betrecord.vue'; //kg投注记录
const KgBetrecord = () => import("./components/account/kg_betrecord.vue")
// import zuihaoRecord from './components/account/zuihaoRecord.vue'; //追号记录
const zuihaoRecord = () => import("./components/account/zuihaoRecord.vue")
// import KgZuihaoRecord from './components/account/kg_zuihaoRecord.vue'; //追号记录
const KgZuihaoRecord = () => import("./components/account/kg_zuihaoRecord.vue")
// import myReport from './components/account/myReport.vue'; //我的报表
const myReport = () => import("./components/account/myReport.vue")
// import moneyRecord from './components/account/moneyRecord.vue'; //帐变记录
const moneyRecord = () => import("./components/account/moneyRecord.vue")
// import agentCenter from './components/account/agentCenter.vue'; //代理中心
const agentCenter = () => import("./components/account/agentCenter.vue")
// import activity from './components/account/activity.vue'; //优惠活动
const activity = () => import("./components/account/activity.vue")
// import bonusDetails from './components/account/bonusDetails.vue'; //奖金详情
const bonusDetails = () => import("./components/account/bonusDetails.vue")
// import lotteryLimited from './components/account/lotteryLimited.vue'; //奖金详情
const lotteryLimited = () => import("./components/account/lotteryLimited.vue")
// import statis from './components/account/statis.vue'; //统计
const statis = () => import("./components/account/statis.vue")
// import fklb from './components/account/fklb.vue'; //反馈列表
const fklb = () => import("./components/account/fklb.vue")
// import fkyj from './components/account/fkyj.vue'; //反馈意见
const fkyj = () => import("./components/account/fkyj.vue")
// import email from './components/account/email.vue'; //站内信
const email = () => import("./components/account/email.vue")
// import emailDetails from './components/account/emailDetails.vue'; //站内信详情
const emailDetails = () => import("./components/account/emailDetails.vue")
// import emailSend from './components/account/emailSend.vue'; //站内信发送
const emailSend = () => import("./components/account/emailSend.vue")
// import memberManagement from './components/account/memberManagement.vue'; //会员管理
const memberManagement = () => import("./components/account/memberManagement.vue")
// import registerTheLink from './components/account/registerTheLink.vue'; //注册链接列表
const registerTheLink = () => import("./components/account/registerTheLink.vue")
// import newUsers from './components/account/newUsers.vue'; //新增用户
const newUsers = () => import("./components/account/newUsers.vue")
// import quotaConversion from './components/account/quotaConversion.vue'; //额度转换
const quotaConversion = () => import("./components/account/quotaConversion.vue")
// import chongzhi from './components/account/chongzhi.vue'; //充值
const chongzhi = () => import("./components/account/chongzhi.vue")
// import report from './components/account/report.vue'; //彩票，视讯报表
const report = () => import("./components/account/report.vue")
// import bettingDetails from './components/account/bettingDetails.vue'; //投注详情
const bettingDetails = () => import("./components/account/bettingDetails.vue")
// import newRegisterLink from './components/account/newRegisterLink.vue'; //新增注册链接
const newRegisterLink = () => import("./components/account/newRegisterLink.vue")
// import zbmx from './components/account/zbmx.vue'; //帐变明细
const zbmx = () => import("./components/account/zbmx.vue")
// import cpzb from './components/account/cpzb.vue'; //彩票账变
const cpzb = () => import("./components/account/cpzb.vue")
// import kgzb from './components/account/kgzb.vue'; //彩票账变
const kgzb = () => import("./components/account/kgzb.vue")
// import withdraw from './components/account/withdraw.vue'; //提现
const withdraw = () => import("./components/account/withdraw.vue")
// import team from './components/account/team.vue'; //报表总览,团队报表
const team = () => import("./components/account/team.vue")
// import teamReport from './components/account/teamReport.vue'; //团队盈亏
const teamReport = () => import("./components/account/teamReport.vue")
// import teamLottery from './components/account/teamLottery.vue'; //团队彩票
const teamLottery = () => import("./components/account/teamLottery.vue")
// import teamKGLottery from './components/account/teamKGLottery.vue'; //团队KG
const teamKGLottery = () => import("./components/account/teamKGLottery.vue")
// import generalize from './components/account/generalize.vue'; //邀请推广
const generalize = () => import("./components/account/generalize.vue")

//setting 里的页面
// import bankControl from './components/setting/bankControl.vue'; //银行卡管理
const bankControl = () => import("./components/setting/bankControl.vue")
// import userInfor from './components/setting/userInfor.vue'; //用户信息
const userInfor = () => import("./components/setting/userInfor.vue")
// import loadPassword from './components/setting/loadPassword.vue'; //修改登录密码
const loadPassword = () => import("./components/setting/loadPassword.vue")
// import addBankcard from './components/setting/addBankcard.vue'; //添加银行卡
const addBankcard = () => import("./components/setting/addBankcard.vue")
// import modifyPassword from './components/setting/modifyPassword.vue'; //修改资金密码
const modifyPassword = () => import("./components/setting/modifyPassword.vue")
// import moreInfo from './components/setting/moreInfo.vue'; //更多信息
const moreInfo = () => import("./components/setting/moreInfo.vue")
// import maintain from './components/maintain/maintain.vue'; //维护页面
const maintain = () => import("./components/maintain/maintain.vue")
// import notice from './components/setting/notice.vue'; //公告页面
const notice = () => import("./components/setting/notice.vue")
// import question from './components/setting/question.vue'; //公告页面
const question = () => import("./components/setting/question.vue")
// import method from './components/setting/method.vue'; //玩法说明页面
const method = () => import("./components/setting/method.vue")
// import explain from './components/kggame/explain/explain.vue'; //玩法说明页面
const explain = () => import("./components/kggame/explain/explain.vue")
//result 里的页面
// import lotteryInformationTrend from './components/result/lotteryInformationTrend.vue'; //开奖信息
const lotteryInformationTrend = () => import("./components/result/lotteryInformationTrend.vue")
//lottery 里的页面
// import lotteryBet from './components/lottery/lotteryBet.vue'; //彩票投注
const lotteryBet = () => import("./components/lottery/lotteryBet.vue")
// import lotteryTrend from './components/lottery/lotteryTrend.vue'; //走势图
const lotteryTrend = () => import("./components/lottery/lotteryTrend.vue")
// import bettingList from './components/lottery/bettingList.vue'; //投注列表
const bettingList = () => import("./components/lottery/bettingList.vue")
// import lotteryFavorites from './components/lottery/lotteryFavorites.vue';
const lotteryFavorites = () => import("./components/lottery/lotteryFavorites.vue")
// import lotteryFavoritesEdit from './components/lottery/lotteryFavoritesEdit.vue';
const lotteryFavoritesEdit = () => import("./components/lottery/lotteryFavoritesEdit.vue")
// import thirdGame from './components/lottery/thirdGame.vue';
const thirdGame = () => import("./components/lottery/thirdGame.vue")
// import appTrend from './components/lottery/appTrend.vue';
const appTrend = () => import("./components/lottery/appTrend.vue")

//kggame 页面
// import kgGameBet from './components/kggame/kgGameBet.vue'; //kg投注
const kgGameBet = () => import("./components/kggame/kgGameBet.vue")

// import trdPlatformAuth from './components/trdPlatform/trdPlatformAuth.vue';
const trdPlatformAuth = () => import("./components/trdPlatform/trdPlatformAuth.vue")
// import bindUser from './components/trdPlatform/bindUser.vue'; //绑定登录
const bindUser = () => import("./components/trdPlatform/bindUser.vue")
// import newBindUser from './components/trdPlatform/newBindUser.vue'; //绑定登录
const newBindUser = () => import("./components/trdPlatform/newBindUser.vue")
// import autoRegSuccessed from './components/trdPlatform/autoRegSuccessed.vue'; //绑定成功
const autoRegSuccessed = () => import("./components/trdPlatform/autoRegSuccessed.vue")
// import trdAuthSuccessed from './components/trdPlatform/trdAuthSuccessed.vue'; //绑定成功
const trdAuthSuccessed = () => import("./components/trdPlatform/trdAuthSuccessed.vue")
// import createUser from './components/trdPlatform/createUser.vue'; //注册绑定登录
const createUser = () => import("./components/trdPlatform/createUser.vue")
// import newCreateUser from './components/trdPlatform/newCreateUser.vue'; //注册绑定登录
const newCreateUser = () => import("./components/trdPlatform/newCreateUser.vue")



//trends 页面
import basicTrend from './components/trends/basicTrend.vue';
import sxzxTrend from './components/trends/ssc/sxzxTrend.vue';
import qsTrend from './components/trends/ssc/qsTrend.vue';
import zsTrend from './components/trends/ssc/zsTrend.vue';
import hsTrend from './components/trends/ssc/hsTrend.vue';
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
        path: '/games',
        component: lottery,
        name:'indexH5app',
        meta: {
            title: "HelloWorld",
            show: true,
            index: 1,
        },
    },
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
            component: newLottery,
            name:'indexH5app',
            meta: {
                title: "HelloWorld",
                show: true,
                index: 1,
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
        path: '/account',
        component: account,
        meta: {
            title: "个人中心",
            show: true,
            index: 3,
        },
    },
    {
        path: '/lotteryTrend',
        component: lotteryTrend,
        children: [
            { path: '/jumpIndex', component: jumpIndex },
            { path: '/basicTrend', component: basicTrend },
            { path: '/sxzxTrend', component: sxzxTrend },
            { path: '/qsTrend', component: qsTrend },
            { path: '/zsTrend', component: zsTrend },
            { path: '/hsTrend', component: hsTrend },
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
        component: lottery,
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