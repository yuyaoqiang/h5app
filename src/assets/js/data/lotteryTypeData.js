export default {
    types: [{
            name: "sscrules",
            numLen: 5,
            displayTrend: true,
            bits: ["万位", "千位", "百位", "十位", "个位"],
            fullNums: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            hasLzt: true,
            singleDx: { xiao: { begin: 0, end: 4 }, da: { begin: 5, end: 9 } },
            sumDx: { xiao: { begin: 0, end: 22 }, da: { begin: 23, end: 1000000 } },
            hasDXDS: true
        },
        {
            name: "11c5rules",
            numLen: 5,
            displayTrend: true,
            bits: ["万位", "千位", "百位", "十位", "个位"],
            fullNums: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
            hasDXDS: true
        },
        {
            name: "kl10rules",
            numLen: 8,
            displayTrend: true,
            bits: ["第一位", "第二位", "第三位", "第四位", "第五位", "第六位", "第七位", "第八位"],
            fullNums: ['01', '02', '03', '04', '05', '06', '07', '08', '09',
                '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
            ],
            hasLzt: true,
            noHotCod: true,
            singleDx: { xiao: { begin: 0, end: 10 }, da: { begin: 11, end: 1000000 } },
            sumDx: { xiao: { begin: 36, end: 83 }, da: { begin: 85, end: 132 } },
            hasDXDS: true
        },
        {
            name: "k3rules",
            numLen: 3,
            displayTrend: true,
            bits: [],
            fullNums: ['1', '2', '3', '4', '5', '6'],
            hasDXDS: false,
            hasLzt: true,
            singleDx: { xiao: { begin: 0, end: 3 }, da: { begin: 4, end: 6 } },
            sumDx: { xiao: { begin: 0, end: 10 }, da: { begin: 11, end: 1000000 } },
        },
        {
            name: "3rules",
            numLen: 3,
            displayTrend: true,
            bits: ["百位", "十位", "个位"],
            fullNums: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            hasDXDS: true,
            hasLzt: true,
            singleDx: { xiao: { begin: 0, end: 4 }, da: { begin: 5, end: 9 } },
            sumDx: { xiao: { begin: 0, end: 13 }, da: { begin: 14, end: 1000000 } },
        },
        {
            name: "pk10rules",
            numLen: 10,
            displayTrend: true,
            bits: ["第一名", "第二名", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", "第九名", "第十名"],
            fullNums: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
            hasLzt: true,
            singleDx: { xiao: { begin: 0, end: 5 }, da: { begin: 6, end: 100000 } },
            sumDx: { xiao: { begin: 0, end: 50 }, da: { begin: 51, end: 100000000 } },
            hasDXDS: true
        },
        /*新增彩种*/
        {
            name: "pk8rules",
            numLen: 8,
            displayTrend: true,
            bits: ["第一名", "第二名", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", ],
            fullNums: ['01', '02', '03', '04', '05', '06', '07', '08', ],
            hasLzt: false,
            singleDx: { xiao: { begin: 0, end: 4 }, da: { begin: 5, end: 100000 } },
            sumDx: { xiao: { begin: 0, end: 50 }, da: { begin: 51, end: 100000000 } },
            hasDXDS: true
        },
        {
            name: "xglhc",
            numLen: 7,
            displayTrend: false,
            bits: ["第七位", "第六位", "第五位", "第四位", "第三位", "第二位", "第一位"],
            fullNums: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
        },
        {
            name: "pcdd",
            numLen: 3,
            displayTrend: false,
            bits: ["第一名", "第二名", "第三名", ],
            fullNums: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
            hasDXDS: true,
            hasLzt: true,
            singleDx: { xiao: { begin: 0, end: 4 }, da: { begin: 5, end: 9 } },
            sumDx: { xiao: { begin: 0, end: 13 }, da: { begin: 14, end: 1000000 } },
        },
        {
            name: "xyxz",
            numLen: 7,
            displayTrend: false,
            bits: ["第七位", "第六位", "第五位", "第四位", "第三位", "第二位", "第一位"],
            fullNums: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
        },
    ],


}