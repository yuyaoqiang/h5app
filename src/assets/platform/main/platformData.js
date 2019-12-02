import ptGameData from '../../../assets/js/data/ptGameData.js'
import mgGameData from '../../../assets/js/data/mgGameData.js'
export default {
    setting: {
        code: "my",
        name: "亚博彩票",
        title: "亚博彩票",
        url: "http://ybcp918.com/",
        allowTryPlay: true,
        allowRemoteUrl: true,
        mlink: '', //唤醒app
        staticResourceUrl: "https://555n9.com",
    },
    accountMenus: [
        { code: "recharge", name: "充值", permissionKey: "充值提现" },
        { code: "withdraw", name: "提现", permissionKey: "充值提现" },
        { code: "agentCenter", name: "代理中心", permissionKey: "代理中心" },
    ],

    lotteryDisplayTypes: [
        { name: "sscrules", desc: "高频彩", isTradition: true, isKg: true },
        { name: "11c5rules", desc: "11选5", isTradition: true, isKg: true },
        { name: "k3rules", desc: "3D/快三", isTradition: true, isKg: true },
        // { name: "keno", desc: "KENO", isTradition: true, isKg: true },
        { name: "klc", desc: "快乐彩", isTradition: true, isKg: true },
        { name: "kxc", desc: "开心彩", isTradition: false, isKg: true },
    ],

    lotteryGames: [
        // { id: 205, name: "欢乐球", logo: "icon_hlffc.png", type: "sscrules" },
        { id: 209, name: "极速快三", logo: "icon_jsks.png", type: "k3rules", },
        { id: 210, name: "三分六合彩", logo: "icon_sflhc.png", type: "xglhc", displayType: "kxc" },
        { id: 211, name: "五分六合彩", logo: "icon_wflhc.png", type: "xglhc", displayType: "kxc" },
        { id: 212, name: "疯狂快艇", logo: "icon_fkkt.png", type: "pk10rules", displayType: "klc" },
        { id: 63, name: "腾讯分分彩", logo: "icon_txffc.png", type: "sscrules", type: "sscrules", },
        { id: 202, name: "五分PK10", logo: "bdb5fpk10.png", type: "pk10rules", displayType: "klc", },
        // { id: 70, name: "新腾讯分分彩", logo: "icon_xtxffc.png", type: "sscrules" },
        { id: 1, name: "欢乐生肖", logo: "icon_hlsx.jpg", type: "sscrules", },
        { id: 208, name: "重庆时时彩", logo: "icon_cqssc.png", type: "sscrules", },
        { id: 9, name: "新疆时时彩", logo: "icon_xjssc.png", type: "sscrules", },
        { id: 10, name: "天津时时彩", logo: "icon_tjssc.png", type: "sscrules", },
        { id: 17, name: "东方五分彩", logo: "df5.png", type: "sscrules", },
        { id: 22, name: "东方二分彩", logo: "df2.png", type: "sscrules", },
        { id: 18, name: "东方分分彩", logo: "dff.png", type: "sscrules", },

        { id: 13, name: "山东11选5", logo: "icon_sd11x5.png", type: "11c5rules", },
        { id: 8, name: "江西11选5", logo: "icon_jx11x5.png", type: "11c5rules", },
        { id: 14, name: "广东11选5", logo: "icon_gd11x5.png", type: "11c5rules", },
        { id: 25, name: "东方11选5", logo: "df115.png", type: "11c5rules", },
        { id: 15, name: "上海11选5", logo: "icon_sh11x5.png", type: "11c5rules", },
        { id: 16, name: "安徽11选5", logo: "icon_aw11x5.png", type: "11c5rules", },
        { id: 21, name: "浙江11选5", logo: "icon_zj11x5.png", type: "11c5rules" },

        { id: 37, name: "重庆快乐农场", logo: "icon_cqnc.png", type: "kl10rules", displayType: "klc" },
        { id: 38, name: "广东快乐十分", logo: "icon_gd10.png", type: "kl10rules", displayType: "klc" },
        { id: 39, name: "天津快乐十分", logo: "icon_tj10.png", type: "kl10rules", displayType: "klc" },
        { id: 19, name: "北京Pk10", logo: "icon_home-page_PK10.png", type: "pk10rules", displayType: "klc", },
        { id: 40, name: "幸运飞艇", logo: "icon_tjft.png", type: "pk10rules", displayType: "klc" },

        { id: 201, name: "二分PK10", logo: "bdb2fpk10.png", type: "pk10rules", displayType: "klc", },
        { id: 200, name: "极速PK10", logo: "bdb1fpk10.png", type: "pk10rules", displayType: "klc", },

        { id: 204, name: "五分快三", logo: "wfk3.png", type: "k3rules", },
        { id: 206, name: "一分快三", logo: "yfk3.png", type: "k3rules", },
        { id: 207, name: "三分快三", logo: "sfk3.png", type: "k3rules", },
        { id: 28, name: "江苏快三", logo: "icon_jsk3.png", type: "k3rules", },
        { id: 29, name: "安徽快三", logo: "icon_awk3.png", type: "k3rules", },
        { id: 31, name: "湖北快三", logo: "icon_hbk3.png", type: "k3rules", },
        { id: 75, name: "北京快三", logo: "75.png", type: "k3rules", },
        { id: 77, name: "广西快三", logo: "77.png", type: "k3rules", },
        { id: 79, name: "河北快三", logo: "79.png", type: "k3rules", },
        { id: 83, name: "上海快三", logo: "83.png", type: "k3rules", },


        { id: 3, name: "上海时时乐", logo: "icon_shssc.png", type: "3rules", displayType: "k3rules", },
        { id: 4, name: "福彩3D", logo: "icon_home-page_3D.png", type: "3rules", displayType: "k3rules", },
        { id: 5, name: "排列3", logo: "icon_pl3.png", type: "3rules", displayType: "k3rules", },

        { id: 32, name: "北京5分彩", logo: "icon_bjwfc.png", type: "sscrules", displayType: "keno", },
        { id: 35, name: "台湾5分彩", logo: "icon_twwfc.png", type: "sscrules", displayType: "keno", },
        // { id: 41, name: "加纳1.5分彩", logo: "icon_jn1.5f.png", type: "sscrules", displayType: "keno", },
        // { id: 45, name: "菲律宾1.5分彩", logo: "icon_flb1.5f.png", type: "sscrules", displayType: "keno", },

        { id: 66, name: "香港六合彩", logo: "icon_xglhc.png", type: "xglhc", displayType: "kxc" },
        { id: 203, name: "极速六合彩", logo: "203.png", type: "xglhc", displayType: "kxc" },
        { id: 27, name: "PC蛋蛋", logo: "icon_pcdd.png", type: "pcdd", displayType: "kxc", },


    ],
    trdPlatforms: [
        { code: "AG", desc: "AGIN", value: 2, image: 'ag', platforms: [{ name: 'AG捕鱼王', type: 'ag_fish' }, { name: 'AG电子', type: 'ag_elec' }, { name: 'AG体育', type: 'ag_sprot' }, { name: 'AG视讯', type: 'ag_live' }] },
        { code: "BBIN", desc: "BBIN", value: 3, image: 'bbin', platforms: [{ name: 'BBIN捕鱼', type: 'bbin_fish' }, { name: 'BBIN体育', type: 'bbin_sprot' }, { name: 'BBIN视讯', type: 'bbin_live' }] },
        { code: "MG", desc: "MG", value: 4, image: 'mg', platforms: [{ name: 'MG电子', type: 'mg_elec' }] },
        { code: "PT", desc: "PT", value: 5, image: 'pt', platforms: [{ name: 'PT电子', type: 'pt_elec' }] },
        { code: "VR", desc: "VR", value: 9, image: 'vr_game', platforms: [{ name: 'VR彩票', type: 'vr_lottry' }] },
        { code: "SB", desc: "沙巴体育", value: 10, image: 'sb', platforms: [{ name: '沙巴体育', type: 'sb_sport' }] },
        { code: "KY", desc: "开元棋牌", value: 19, image: 'kyqp', platforms: [{ name: '开元棋牌', type: 'ky_chess' }] },
    ],
    trdGames: [
        {
            code: 'VR', name: "VR", permissionKey: "VR彩票", desc: "VR彩票", image: "index_live.png",
            list: [
                {
                    id: 10003, vrId: 1, name: "火星5分彩", platform: "VR", type: 1, playType: 'vr_lottry', image: "vr_hxwfc.png",
                    platforms: [
                        { id: 10003, vrId: 1, name: "火星5分彩", platform: "VR", permissionKey: "火星5分彩", image: "vr_hxwfc.png", type: 1 },
                        { id: 10000, vrId: 1, name: "金星1.5分彩", platform: "VR", permissionKey: "金星1.5分彩", image: "vr_jxc.png", type: 1 },
                        { id: 10001, vrId: 1, name: "赛车", platform: "VR", permissionKey: "赛车", image: "vr_sc.png", type: 1 },
                        { id: 10002, vrId: 1, name: "3分彩", platform: "VR", permissionKey: "3分彩", image: "vr_sfc.png", type: 1 },
                        { id: 10004, vrId: 1, name: "快艇", platform: "VR", permissionKey: "快艇", image: "vr_kt.png", type: 1 },
                        { id: 10005, vrId: 1, name: "彩票百家乐", platform: "VR", permissionKey: "彩票百家乐", image: "vr_bjl.png", type: 1 },
                        { id: 10006, vrId: 1, name: "六合彩", platform: "VR", permissionKey: "六合彩", image: "vr_lhc.png", type: 1 },
                    ]
                },
            ]
        }, {
            code: "live",
            name: "视讯",
            permissionKey: "视讯直播",
            typeVedio: true,
            image: "index_live.png",
            list: [
                {
                    platform: "AG", name: "AG旗舰厅", image: "ag_live.png", playType: 'ag_live', playType: 'ag_live', typeVedio: true,
                    platforms: [
                        { platform: "AG", name: "AG旗舰厅", permissionKey: "AG旗舰厅", image: "ag_live.png", type: "0" }
                    ]
                },
                {
                    platform: "BBIN", name: "BBIN银河厅", image: "bbin_live.png", playType: 'bbin_live', typeVedio: true,
                    platforms: [
                        { platform: "BBIN", name: "BBIN银河厅", permissionKey: "BBIN银河厅", image: "bbin_live.png", type: "live" }
                    ]
                },
            ]
        },
        {
            code: "elec",
            name: "电子",
            permissionKey: "电子游艺",
            image: "index_elec.png",
            list: [
                {
                    platform: "AG", name: "AG电子", image: "ag_elec.png", type: 'elec', playType: 'ag_elec',
                    platforms: [
                        { platform: "AG", name: "AG电子", permissionKey: "AG电子", image: "ag_elec.png" }
                    ]
                },
                {
                    platform: "PT", name: "PT电子", image: "ag_elec.png", type: 'elec', more: true, close: true, playType: 'pt_elec',
                    platforms: [
                        ...ptGameData.data
                    ]
                },
                {
                    platform: "MG", name: "MG电子", image: "ag_elec.png", type: 'elec', more: true, close: true, playType: 'mg_elec',
                    platforms: [
                        ...mgGameData.data
                    ]
                }
            ]
        },
        {
            code: "sport",
            name: "体育",
            permissionKey: "体育赛事",
            image: "index_sport.png",
            typeVedio: true,
            list: [
                {
                    platform: "BBIN", name: "BBIN体育", image: "bbin_sport.png", playType: 'bbin_sprot', typeVedio: true,
                    platforms: [
                        { platform: "BBIN", name: "BBIN体育", permissionKey: "BBIN体育", image: "bbin_sport.png", type: "ball", canTryPlay: true }
                    ]
                },
                {
                    platform: "AG", name: "AG体育", image: "ag_sport.png", playType: 'ag_sprot', playType: 'ag_sprot', typeVedio: true,
                    platforms: [
                        { platform: "AG", name: "AG体育", permissionKey: "AG体育", image: "ag_sport.png", type: "TASSPTA", canTryPlay: true }
                    ]
                },
                {
                    platform: "SB", name: "沙巴体育", image: "sb_sport.png", playType: 'sb_sprot', playType: 'sb_sport', typeVedio: true,
                    platforms: [
                        { platform: "SB", name: "沙巴体育", permissionKey: "沙巴体育", image: "sb_sport.png", type: "SB", canTryPlay: true }
                    ]
                },
            ]
        },
        {
            code: "chess",
            name: "棋牌",
            permissionKey: "棋牌游戏",
            image: "index_sport.png",
            list: [
                {
                    platform: "KY", name: "开元棋牌", permissionKey: "开元棋牌", image: "ky.png", type: "ky", canTryPlay: true, more: true, close: true, playType: 'ky_chess',
                    platforms: [
                        { platform: "KY", name: "德州扑克", image: "ky_dzpk.png", type: "620", canTryPlay: true },
                        { platform: "KY", name: "二八杠", image: "ky_ebg.png", type: "720", canTryPlay: true },
                        { platform: "KY", name: "抢庄牛牛", image: "ky_qznn.png", type: "830", canTryPlay: true },
                        { platform: "KY", name: "炸金花", image: "ky_zjh.png", type: "220", canTryPlay: true },
                        { platform: "KY", name: "三公", image: "ky_sg.png", type: "860", canTryPlay: true },
                        { platform: "KY", name: "押庄龙虎", image: "ky_yzlh.png", type: "900", canTryPlay: true },
                        { platform: "KY", name: "通比牛牛", image: "ky_tbnn.png", type: "870", canTryPlay: true },
                        { platform: "KY", name: "极速炸金花", image: "ky_jszjh.png", type: "230", canTryPlay: true },
                        { platform: "KY", name: "抢庄牌九", image: "ky_qzpj.png", type: "730", canTryPlay: true },
                        { platform: "KY", name: "十三水", image: "ky_sss.png", type: "630", canTryPlay: true },
                        { platform: "KY", name: "斗地主", image: "ky_ddz.png", type: "610", canTryPlay: true },
                        { platform: "KY", name: "百家乐", image: "ky_bjl.png", type: "910", canTryPlay: true },
                        { platform: "KY", name: "森林舞会", image: "ky_slfw.png", type: "920", canTryPlay: true },
                        { platform: "KY", name: "百人牛牛", image: "ky_brnn.png", type: "930", canTryPlay: true },
                        { platform: "KY", name: "万人炸金花", image: "ky_wrzjh.png", type: "1950", canTryPlay: true },
                        { platform: "KY", name: "血流成河", image: "ky_xlch.png", type: "650", canTryPlay: true },
                        { platform: "KY", name: "看牌抢庄牛牛", image: "ky_kpqznn.png", type: "890", canTryPlay: true },
                        { platform: "KY", name: "二人麻将", image: "ky_ermj.png", type: "740", canTryPlay: true },
                        { platform: "KY", name: "金鲨银鲨", image: "ky_jsys.png", type: "1940", canTryPlay: true },
                        { platform: "KY", name: "奔驰宝马", image: "ky_bcbm.png", type: "1960", canTryPlay: true },
                    ]
                },
            ]
        },
        {
            code: "fish",
            name: "捕鱼",
            permissionKey: "捕鱼游戏",
            image: "index_sport.png",
            list: [
                {
                    platform: "AG", name: "AG捕鱼", image: "ag_fish.png", playType: 'ag_fish',
                    platforms: [
                        { platform: "AG", name: "AG捕鱼王", image: "ag_fish.png", type: "6" },
                    ]
                },
                {
                    platform: "BBIN", name: "BBIN捕鱼", image: "ag_fish.png", playType: 'bbin_fish',
                    platforms: [
                        { platform: "BBIN", name: "捕鱼达人", image: "bbin_byds.png", type: "fisharea", canTryPlay: true },
                        { platform: "BBIN", name: "捕鱼达人2", image: "bbin_bydr2.png", type: "fisharea", canTryPlay: true },
                        { platform: "BBIN", name: "捕鱼大师", image: "bbin_bydr.png", type: "fisharea", canTryPlay: true }
                    ]
                },
            ]
        }
    ],
    indexBanners: ['banner1.png', 'banner2.png', 'banner3.png']

}