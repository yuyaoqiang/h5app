export default {
    setting: {
        code: "my",
        name: "亚博彩票",
        title: "亚博彩票",
        url: "http://xxxxxx.com/",
        allowTryPlay: true,
        allowRemoteUrl: true,
        mlink: '', //唤醒app
    },
    accountMenus: [
        { code: "recharge", name: "充值", permissionKey: "充值提现" },
        { code: "withdraw", name: "提现", permissionKey: "充值提现" },
        { code: "agentCenter", name: "代理中心", permissionKey: "代理中心" },
    ],

    lotteryDisplayTypes: [
        { name: "sscrules", desc: "高频彩", isTradition: true, isKg: true },
        { name: "11c5rules", desc: "11选5", isTradition: true, isKg: true },
        { name: "k3rules", desc: "3D/P3", isTradition: true, isKg: true },
        { name: "keno", desc: "KENO", isTradition: true, isKg: true },
        { name: "klc", desc: "快乐彩", isTradition: true, isKg: true },
        { name: "kxc", desc: "开心彩", isTradition: false, isKg: true },
    ],

    lotteryGames: [
        { id: 205, name: "欢乐球", logo: "icon_hlffc.png", type: "sscrules" },
        { id: 63, name: "腾讯分分彩", logo: "icon_txffc.png", type: "sscrules" },
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

        // { id: 84, name: "北京11选5", logo: "icon_bj11x5.png", type: "11c5rules" },
        // { id: 85, name: "河北11选5", logo: "icon_hb11x5.png", type: "11c5rules" },
        // { id: 86, name: "江苏11选5", logo: "icon_js11x5.png", type: "11c5rules" },
        // { id: 87, name: "福建11选5", logo: "icon_fj11x5.png", type: "11c5rules" },
        // { id: 88, name: "甘肃11选5", logo: "icon_gs11x5.png", type: "11c5rules" },
        // { id: 89, name: "广西11选5", logo: "icon_gx11x5.png", type: "11c5rules" },
        // { id: 90, name: "贵州11选5", logo: "icon_gz11x5.png", type: "11c5rules" },
        // { id: 91, name: "辽宁11选5", logo: "icon_ln11x5.png", type: "11c5rules" },
        // { id: 92, name: "内蒙古11选5", logo: "icon_nmg11x5.png", type: "11c5rules" },
        // { id: 93, name: "陕西11选5", logo: "icon_sx11x5.png", type: "11c5rules" },

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
        //{ id: 76, name: "福建快三", logo: "76.png", type: "k3rules",  },
        { id: 77, name: "广西快三", logo: "77.png", type: "k3rules", },
        //{ id: 78, name: "贵州快三", logo: "78.png", type: "k3rules",  },
        { id: 79, name: "河北快三", logo: "79.png", type: "k3rules", },
        // { id: 80, name: "吉林快三", logo: "80.png", type: "k3rules",  },
        // { id: 81, name: "江西快三", logo: "81.png", type: "k3rules",  },
        // { id: 82, name: "内蒙古快三", logo: "82.png", type: "k3rules",  },
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
        { code: "AG", desc: "AGIN", value: 2 },
        { code: "BBIN", desc: "BBIN", value: 3 },
        { code: "MG", desc: "MG", value: 4 },
        { code: "PT", desc: "PT", value: 5 },
        { code: "SB", desc: "沙巴", value: 10 },
        { code: "KY", desc: "棋牌", value: 19 },
    ],
    trdGames: [{
            code: "live",
            name: "视讯",
            permissionKey: "视讯直播",
            image: "index_live.png",
            list: [
                { platform: "AG", name: "AG旗舰厅", permissionKey: "AG旗舰厅", image: "ag_live.png", type: "0" },
                { platform: "BBIN", name: "BBIN银河厅", permissionKey: "BBIN银河厅", image: "bbin_live.png", type: "live" },
            ]
        },
        {
            code: "elec",
            name: "电子",
            permissionKey: "电子游艺",
            image: "index_elec.png",
            list: [
                { platform: "AG", name: "AG电子", permissionKey: "AG电子", image: "ag_elec.png",},
                { platform: "AG", name: "AG捕鱼", permissionKey: "AG捕鱼", image: "ag_fish.png", type: "6" },
                // { platform: "BBIN", name: "BBIN电子", permissionKey: "BBIN电子", image: "bbin_elec.png", type: "game" },
                { platform: "PT", name: "PT电子", permissionKey: "PT电子", image: "pt_elec.png",path:'pt_elec'},
                { platform: "MG", name: "MG电子", permissionKey: "MG电子", image: "mg_elec.png",path:'mg_elec'}
            ]
        },
        {
            code: "sport",
            name: "体育",
            permissionKey: "体育赛事",
            image: "index_sport.png",
            list: [
                { platform: "BBIN", name: "BBIN体育", permissionKey: "BBIN体育", image: "bbin_sport.png", type: "ball", canTryPlay: true },
                { platform: "AG", name: "AG体育", permissionKey: "AG体育", image: "ag_sport.png", type: "TASSPTA", canTryPlay: true },
                { platform: "SB", name: "沙巴体育", permissionKey: "沙巴体育", image: "sb_sport.png", type: "SB", canTryPlay: true },
            ]
        },
        {
            code: "ky",
            name: "棋牌",
            permissionKey: "棋牌游戏",
            image: "index_sport.png",
            list: [
                { platform: "KY", name: "棋牌游戏", permissionKey: "KY体育", image: "ky.png", type: "ky", canTryPlay: true },
            ]
        }
    ],
    indexBanners: ['banner1.png', 'banner2.png', 'banner3.png']

}