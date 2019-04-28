export default{


  /*  kgGames:[
        {id: 66, name: "香港六合彩", class: "xglhc",logo: "icon_xglhc.png",favorited:false,permission:true,
            type:{
                name:"xglhc",numLen:7,displayTrend:true,bits:[ "第七位", "第六位", "第五位", "第四位", "第三位", "第二位", "第一位"],
                fullNums:['01','02','03','04','05','06','07','08','09','10','11']
            },
            displayType: "kxc",},

        {
            id: 27, name: "PC蛋蛋", class: "pcdd",logo: "icon_pcdd.png",favorited:false,permission:true,
            type: {
                name: "pcdd",
                numLen: 3,
                displayTrend: true,
                bits: ["第一名", "第二名", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", "第九名", "第十名"],
                fullNums: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
                singleDx: {xiao: {begin: 0, end: 13}, da: {begin: 14, end: 27}},
                hasDXDS:true
            },
            displayType: "kxc",
        }
    ],


    kgDisplayTypes:[

    ],*/

    kgPlayTypes:[
        {"name":"sscrules",desc:"高频彩",bits:[
            {id: '1', desc: "第一球（万位）",isNum:true,isLmp:true},
            {id: '2', desc: "第二球（千位）",isNum:true,isLmp:true},
            {id: '3', desc: "第三球（百位）",isNum:true,isLmp:true},
            {id: '4', desc: "第四球（十位）",isNum:true,isLmp:true},
            {id: '5', desc: "第五球（个位）",isNum:true,isLmp:true},
            {id: '6', desc: "总和",isLmp:true},
            {id: '162', desc: "龙虎",isLmp:true},
            {id: '10', desc: "斗牛",isDn:true},
            {id: '7', desc: "前三",isTs:true},
            {id: '8', desc: "中三",isTs:true},
            {id: '9', desc: "后三",isTs:true},
            {id: '11', desc: "梭哈",isTs:true},

            { id:'656',desc:'一字组合',isOneSpan:true},
            { id:'653',desc:'前三跨度',isOneSpan:true},
            { id:'654',desc:'中三跨度',isOneSpan:true},
            { id:'655',desc:'后三跨度',isOneSpan:true},
        ]},
        {"name":"pk8rules",desc:"PK8",bits:[
                {id: '35', desc: "冠军", isLmp: true, isBall0104: true},
                {id: '36', desc: "亚军", isLmp: true, isBall0104: true},
                {id: '22', desc: "第一名",isLmp:true,isBall0104:true},
                {id: '23', desc: "第二名",isLmp:true,isBall0104:true},
                {id: '24', desc: "第三名",isLmp:true,isBall0104:true},
                {id: '25', desc: "第四名",isLmp:true,isBall0104:true},
                {id: '26', desc: "第五名",isLmp:true,isBall0508:true},
                {id: '27', desc: "第六名",isLmp:true,isBall0508:true},
                {id: '28', desc: "第七名",isLmp:true,isBall0508:true},
                {id: '29', desc: "第八名",isLmp:true,isBall0508:true},
                {id: '21', desc: "冠亚军和",isLmp:true,isGYH:true},
            ]},
        {"name":"pk10rules",desc:"PK10",bits:[
            {id: '35', desc: "冠军", isLmp: true, isBall0105: true},
            {id: '36', desc: "亚军", isLmp: true, isBall0105: true},
            {id: '22', desc: "第一名",isLmp:true,isBall0105:true},
            {id: '23', desc: "第二名",isLmp:true,isBall0105:true},
            {id: '24', desc: "第三名",isLmp:true,isBall0105:true},
            {id: '25', desc: "第四名",isLmp:true,isBall0105:true},
            {id: '26', desc: "第五名",isLmp:true,isBall0105:true},
            {id: '27', desc: "第六名",isLmp:true,isBall0610:true},
            {id: '28', desc: "第七名",isLmp:true,isBall0610:true},
            {id: '29', desc: "第八名",isLmp:true,isBall0610:true},
            {id: '30', desc: "第九名",isLmp:true,isBall0610:true},
            {id: '31', desc: "第十名",isLmp:true,isBall0610:true},
            {id: '21', desc: "冠亚军和",isLmp:true,isGYH:true},
        ]},
        {"name":"k3rules",desc:"快三",bits:[
            {id: '13', desc: "和值",isHZ:true},

            {id: '14', desc: "两连",isLLDD:true},
            {id:'649', desc: '三连', isLLDD: true },
            {id: '15', desc: "独胆",isLLDD:true},

            {id: '16', desc: "豹子",isBZDZ:true},
            {id: '17', desc: "对子",isBZDZ:true},

            { id:'652', desc: '不出号码',isTs: true,},
            { id:'650', desc: '跨度',isTs: true,},
            { id:'651', desc: '牌点',isTs: true,},
        ]},
        {"name":"kl10rules",desc:"快乐彩",bits:[
            {id: '1', desc: "第一球",isBall0102:true},
            {id: '2', desc: "第二球",isBall0102:true},
            {id: '3', desc: "第三球",isBall0304:true},
            {id: '4', desc: "第四球",isBall0304:true},
            {id: '5', desc: "第五球",isBall0506:true},
            {id: '18', desc: "第六球",isBall0506:true},
            {id: '19', desc: "第七球",isBall0708:true},
            {id: '20', desc: "第八球",isBall0708:true},
            {id: '6', desc: "总和",isZH:true}
        ]},
        {"name":"3rules",desc:"3D/排列3",bits:[
            {id: '1', desc: "第一球",isBall0103:true},
            {id: '2', desc: "第二球",isBall0103:true},
            {id: '3', desc: "第三球",isBall0103:true},
            {id: '6', desc: "总和",isTs:true},
            {id: '32', desc: "三连",isTs:true},
            {id: '33', desc: "跨度",isTs:true},
            {id: '15', desc: "独胆",isTs:true}
        ]},
        {
            "name": "pcdd", desc: "PC蛋蛋", bits: [
            {id: '51', desc: "特码", isBall: true},
            {id: '52', desc: "混合玩法", isTs: true},
            {id: '53', desc: "波色", isTs: true},
            {id: '54', desc: "豹子", isTs: true},
            {id: '55', desc: "特码三压一", isTs: true},
        ]
        },
        {
            name: "11c5rules",
            desc: "11选5",
            bits: [
                { id: '1', desc: "第一球", isNum:true, isLmp: true, },
                { id: '2', desc: "第二球", isNum:true, isLmp: true, },
                { id: '3', desc: "第三球", isNum:true, isLmp: true, },
                { id: '4', desc: "第四球", isNum:true, isLmp: true, },
                { id: '5', desc: "第五球", isNum:true, isLmp: true, },
                { id: '6', desc: "总和", isLmp: true },
                { id: '162', desc: "龙虎", isLmp: true },
            ]
        }
        /*{"name":"xglhc",desc:"香港六合彩",bits:[
         //lhcTwoface lhcZMGG lhcZMT lhcLM lhcLX lhcLW lhcSX lhcSB lhcTWS
         {id: '65', desc: "正码一",isTwoface:true,isZMGG:true,isZMT:true},
         {id: '66', desc: "正码二",isTwoface:true,isZMGG:true,isZMT:true},
         {id: '67', desc: "正码三",isTwoface:true,isZMGG:true,isZMT:true},
         {id: '68', desc: "正码四",isTwoface:true,isZMGG:true,isZMT:true},
         {id: '69', desc: "正码五",isTwoface:true,isZMGG:true,isZMT:true},
         {id: '70', desc: "正码六",isTwoface:true,isZMGG:true,isZMT:true},
         {id: '71', desc: "特别码",isTwoface:true},
         {id: '72', desc: "正码（所有）",isTwoface:true,isZMT:true},
         {id: '73', desc: "特别号A面",isZMT:true},
         {id: '74', desc: "特别号B面",isZMT:true},
         {id: '75', desc: "连码",isLM:true},
         {id: '76', desc: "自选不中",isLM:true},
         {id: '77', desc: "二肖连",isLX:true},
         {id: '78', desc: "三肖连",isLX:true},
         {id: '79', desc: "四肖连",isLX:true},
         {id: '80', desc: "五肖连",isLX:true},
         {id: '81', desc: "二尾碰",isLW:true},
         {id: '82', desc: "三尾碰",isLW:true},
         {id: '83', desc: "四尾碰",isLW:true},
         {id: '84', desc: "五尾碰",isLW:true},
         {id: '85', desc: "生肖",isSX:true},
         {id: '86', desc: "正肖",isSX:true},
         {id: '87', desc: "一肖",isSX:true},
         {id: '88', desc: "合肖",isSX:true},
         {id: '89', desc: "总肖",isSX:true},
         {id: '90', desc: "色波",isSB:true},
         {id: '91', desc: "半波",isSB:true},
         {id: '92', desc: "半半波",isSB:true},
         {id: '93', desc: "七色波",isSB:true},
         // {id: '94', desc: "头尾数",isTWS:true},
         {id: '95', desc: "特正尾数",isTWS:true},
         {id: '96', desc: "特码尾数",isTWS:true},
         {id: '97', desc: "特码头数",isTWS:true}
         ]}*/
    ],

    kgLhcPlayTypes:[
        {id:'56',desc:'特码',viewType:'lhcTM',name:'lhc'},
        {id:'57',desc:'正码',viewType:'lhcZM',name:'lhc'},
        {id:'58',desc:'两面',viewType:'lhcTwoface',name:'lhc'},
        {id:'59',desc:'连码',viewType:'lhcLM',name:'lhc'},
        {id:'60',desc:'连肖',viewType:'lhcLX',name:'lhc'},
        {id:'61',desc:'连尾',viewType:'lhcLW',name:'lhc'},
        {id:'62',desc:'生肖',viewType:'lhcSX',name:'lhc'},
        {id:'63',desc:'色波',viewType:'lhcSB',name:'lhc'},
        {id:'64',desc:'头尾数',viewType:'lhcTWS',name:'lhc'},
        {id:'88',desc:'合肖',viewType:'lhcHX',name:'lhc'}
    ],
    lhcBallColor:{
        "red":['1','01','2','02','7','07','8','08','12','13','18','19','23','24','29','30','34','35','40','45','46','红波'],
        "green":['5','05','6','06','11','16','17','21','22','27','28','32','33','38','39','43','44','49','绿波'],
        "blue":['3','03','4','04','9','09','10','14','15','20','25','26','31','36','37','41','42','47','48','蓝波']
    },
    pcddBallColor:{
        "red":['3','6','9','12','15','18','21','24'],
        "green":['1','4','7','10','16','19','22','25'],
        "blue":['2','5','8','11','17','20','23','26'],
        "gray":['0','13','14','27'],
    },

    kgXyxzPlayTypes:[
        { id: '599', desc: '特码', viewType: 'xyxzTM',name:'xyxz' },
        { id: '600', desc: '正码', viewType: 'xyxzZM' ,name:'xyxz' },
        { id: '601', desc: '两面', viewType: 'xyxzTwoface' ,name:'xyxz' },
        { id: '602', desc: '连码', viewType: 'xyxzLM' ,name:'xyxz' },
        { id: '603', desc: '连星座', viewType: 'xyxzLX' ,name:'xyxz' },
        { id: '604', desc: '连尾', viewType: 'xyxzLW' ,name:'xyxz' },
        { id: '605', desc: '星座', viewType: 'xyxzSX' ,name:'xyxz' },
        { id: '606', desc: '星色', viewType: 'xyxzSB' ,name:'xyxz' },
        { id: '607', desc: '头尾数', viewType: 'xyxzTWS' ,name:'xyxz' },
        { id: '631', desc: '合星座', viewType: 'xyxzHX' ,name:'xyxz' },
    ],

    xyxzBallColor: {
        "red": ['1', '01', '4', '04', '7', '07', '10', '13', '16', '19', '22', '25', '28', '31', '34', '红波'],
        "green": ['3', '03', '6', '06', '9', '09', '12', '15', '18', '21', '24','27', '30','33', '36', '绿波'],
        "blue": ['2', '02', '5', '05', '8', '08', '11', '14', '17', '20', '23', '26', '29', '32', '35', '蓝波']
    },
}