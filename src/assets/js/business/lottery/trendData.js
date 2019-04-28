import arrayUtil from '../../util/arrayUtil'
export  default {
    //最外分类
    settins:{
        init:false,
    },
    lotteryTrendData:[
        {
            name:'sscrules',
            currentPlay:'',
            currentName:'',
            fullNums:[],
            trendType:[
            {
                name:'号码走势',
                id:1,
            },{
                name:'和值走势',
                id:2
            },{
                name:'形态走势',
                id:3
            }
        ]
        },{
            name:'11c5rules',
            currentPlay:'',
            currentName:'',
            fullNums:[],
            trendType:[
            {
                name:'号码走势',
                id:4,
            },{
                name:'和值走势',
                id:5
            },{
                name:'形态走势',
                id:6
            }
        ]
        },{
            name:'k3rules',
            currentPlay:'',
            currentName:'',
            fullNums:[],
            trendType:[
            {
                name:'号码走势',
                id:7,
            }
        ]
        },{
            name:'3rules',
            currentPlay:'',
            currentName:'',
            fullNums:[],
            trendType:[
            {
                name:'号码走势',
                id:8,
            }
        ]
        },{
            name:'pcdd',
            currentPlay:'',
            currentName:'',
            fullNums:[],
            trendType:[
            {
                name:'号码走势',
                id:9,
            }
        ]
        },{
            name:'xglhc',
            currentPlay:'',
            currentName:'',
            fullNums:[],
            trendType:[
            {
                name:'号码走势',
                id:10,
            }
        ]
        },{
            name:'other',
            currentPlay:'',
            currentName:'',
            fullNums:[],
            trendType:[
            {
                name:'号码走势',
                id:11,
            }
        ]
        },{
            name:'xyxz',
            currentPlay:'',
            currentName:'',
            fullNums:[],
            trendType:[
            {
                name:'号码走势',
                id:12,
            }
        ]
        }
    ],
    typeList:[
        //detailedList数组与每个走势图页data里边的列表名与下标对应
        {pid:1, id:1, name:'基本走势',routerName:'basicTrend'},
        {pid:1, id:2, name:'三星组选走势',routerName:'sxzxTrend', detailedList:['组选分布','大小比','奇偶比','质和比','号码类型']},
        {pid:1, id:3, name:'二星组选走势',routerName:'exzxTrend', detailedList:['组选分布','大小比','奇偶比','质和比']},
        {pid:2, id:4, name:'五星和值走势',routerName:'wxhzTrend',  detailedList:['和值分布','和尾分布']},
        {pid:2, id:5, name:'三星和值走势',routerName:'sxhzTrend', detailedList:['和值分布','和尾分布']},
        {pid:2, id:6, name:'二星和值走势',routerName:'exhzTrend',detailedList:['和值分布','和尾分布']},
        {pid:3, id:7, name:'形态走势',routerName:'xtTrend',detailedList:['万位走势','千位走势','百位走势','十位走势','个位走势']},
        {pid:3, id:8, name:'振幅走势',routerName:'zfTrend',detailedList:['万位走势','千位走势','百位走势','十位走势','个位走势']},
        {pid:3, id:9, name:'三星跨度走势',routerName:'sxkdTrend',detailedList:['组选分布','跨度']},
        {pid:3, id:10,name:'二星和值走势',routerName:'exkdTrend',detailedList:['组选分布','跨度']},

        {pid:4, id:1, name:'基本走势',routerName:'basicTrend'},
        {pid:4, id:2, name:'任选基本走势',routerName:'rxjbzsTrend', detailedList:['组选分布','大小比','奇偶比','质和比']},
        {pid:4, id:3, name:'前三组选',routerName:'qszxTrend', detailedList:['组选分布','大小比','奇偶比','质和比']},
        {pid:4, id:4, name:'前二组选',routerName:'qezxTrend', detailedList:['组选分布','大小比','奇偶比','质和比']},
        {pid:5, id:6, name:'任选和值',routerName:'rxhzTrend', detailedList:['和值分布']},
        {pid:5, id:7, name:'前三和值',routerName:'qshzTrend', detailedList:['和值分布','和值分布']},
        {pid:5, id:8, name:'前二和值',routerName:'qehzTrend', detailedList:['和值分布','和值分布']},
        {pid:6, id:9, name:'形态走势',routerName:'xtxuan5Trend',detailedList:['万位走势','千位走势','百位走势','十位走势','个位走势']},
        {pid:6, id:10, name:'任选跨度',routerName:'rxkdTrend', detailedList:['组选分布','跨度']},
        {pid:6, id:11, name:'前三跨度',routerName:'qskdTrend', detailedList:['组选分布','跨度']},
        {pid:6, id:12, name:'前二跨度',routerName:'qekdTrend', detailedList:['组选分布','跨度']},

        {pid:7, id:13, name:'基本走势',routerName:'basicTrend',},
        {pid:7, id:14, name:'其他走势',routerName:'otherTrend',detailedList:['其他走势']},

        {pid:8, id:15, name:'基本走势',routerName:'basicTrend'},
        {pid:8, id:16, name:'其他走势',routerName:'otherTrend',detailedList:['其他走势']},

        {pid:9, id:23, name:'基本走势',routerName:'pcTrend',detailedList:['和值号码','其他走势']},


        {pid:10, id:17, name:'智能走势',routerName:'lhcTrend',detailedList:['平码走势','特码走势']},
        {pid:10, id:18, name:'号码走势',routerName:'numbersTrend',detailedList:['号码走势']},
        {pid:10, id:19, name:'特码走势',routerName:'temTrend',detailedList:['特码走势']},
        {pid:10, id:20, name:'生肖走势',routerName:'animalTrend',detailedList:['一岁生肖','二岁生肖','三岁生肖','四岁生肖','五岁生肖','六岁生肖','七岁生肖','八岁生肖','九岁生肖','十岁生肖','十一岁生肖','十二岁生肖',]},
        {pid:10, id:21, name:'尾号走势',routerName:'weihaoTrend',detailedList:['00尾','01尾','02尾','03尾','04尾','05尾','06尾','07尾','08尾','09尾']},
        {pid:10, id:22, name:'波色走势',routerName:'colorTrend',detailedList:['红波号码','蓝波号码','绿波号码']},
        {pid:10, id:23, name:'大小走势',routerName:'smallAndBigTrend',detailedList:['小','大']},
        {pid:10, id:24, name:'单双走势',routerName:'singleAndDoubleTrend',detailedList:['单','双']},
        {pid:10, id:25, name:'头数走势',routerName:'headTrend',detailedList:['0头','1头','2头','3头','4头']},
        {pid:10, id:26, name:'合数走势',routerName:'heTrend',detailedList:['合数双','合数单']},
        {pid:10, id:27, name:'家野走势',routerName:'jiayeTrend',detailedList:['野兽','家禽']},
        {pid:10, id:28, name:'段数走势',routerName:'duanshuTrend',detailedList:['00段','01段','02段','03段','04段','05段','06段','07段','08段','09段']},

        {pid:11, id:29, name:'基本走势',routerName:'basicTrend'},

        {pid:12, id:17, name:'智能走势',routerName:'xyxzlhcTrend',detailedList:['平码走势','特码走势']},
        {pid:12, id:18, name:'号码走势',routerName:'xyxznumbersTrend',detailedList:['号码走势']},
        {pid:12, id:19, name:'特码走势',routerName:'xyxztemTrend',detailedList:['特码走势']},
        {pid:12, id:20, name:'星座走势',routerName:'xyxzanimalTrend',detailedList:['摩羯','射手','天蝎','天秤','处女','狮子','巨蟹','双子','金牛','白羊','双鱼','水瓶']},
        {pid:12, id:21, name:'尾号走势',routerName:'xyxzweihaoTrend',detailedList:['00尾','01尾','02尾','03尾','04尾','05尾','06尾','07尾','08尾','09尾']},
        {pid:12, id:22, name:'波色走势',routerName:'xyxzcolorTrend',detailedList:['红波号码','蓝波号码','绿波号码']},
        {pid:12, id:23, name:'大小走势',routerName:'xyxzsmallAndBigTrend',detailedList:['小','大']},
        {pid:12, id:24, name:'单双走势',routerName:'xyxzsingleAndDoubleTrend',detailedList:['单','双']},
        {pid:12, id:25, name:'头数走势',routerName:'xyxzheadTrend',detailedList:['0头','1头','2头','3头','4头']},
        {pid:12, id:26, name:'合数走势',routerName:'xyxzheTrend',detailedList:['合数双','合数单']},

    ],
    init(){
        if(this.settins.init){
            return
        }
        arrayUtil.forEach(this.lotteryTrendData ,item=>{
                arrayUtil.forEach(item.trendType,i=>{
                    if(!i.typeList){
                        i.typeList =[];
                    }
                    arrayUtil.forEach(this.typeList,list=>{
                        if(i.id == list.pid){
                            i.typeList.push(list)
                        }
                    })
                })
            })
        this.settins.init = true;
    }
}