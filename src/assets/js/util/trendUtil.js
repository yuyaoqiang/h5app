import arrayUtil  from './arrayUtil'
export default {
    //数字比
    shuzibi : function(cnt,val,type,i,yilou,list){
        if(cnt){
            switch (val) {
                case "3:0":
                    if(i==0){
                        yilou[type+0] = 0;
                        cnt=false;
                        list.push({num:"3:0", active: true,attr:'yellow'});
                    }else{
                        //大小遗漏
                        if(yilou[type+i] != null){
                            yilou[type+i] = yilou[type+i]+1;
                        }else{
                            yilou[type+i] = 1;
                        }
                        list.push({num:yilou[type+i], active: false});
                    }
                    break;
                case "2:1":
                    if(i==1){
                        yilou[type+1] = 0;
                        cnt=false;
                        list.push({num:"2:1", active: true,attr:'yellow'});
                    }else{
                        //大小遗漏
                        if(yilou[type+i] != null){
                            yilou[type+i] = yilou[type+i]+1;
                        }else{
                            yilou[type+i] = 1;
                        }
                        list.push({num:yilou[type+i], active: false});
                    }
                    break;
                case "1:2":
                    if(i==2){
                        yilou[type+2] = 0;
                        cnt=false;
                        list.push({num:"1:2", active: true,attr:'yellow'});
                    }else{
                        //大小遗漏
                        if(yilou[type+i] != null){
                            yilou[type+i] = yilou[type+i]+1;
                        }else{
                            yilou[type+i] = 1;
                        }
                        list.push({num:yilou[type+i], active: false});
                    }
                    break;
                case "0:3":
                    if(i==3){
                        yilou[type+3] = 0;
                        cnt=false;
                        list.push({num:"0:3", active: true,attr:'yellow'});
                    }else{
                        //大小遗漏
                        if(yilou[type+i] != null){
                            yilou[type+i] = yilou[type+i]+1;
                        }else{
                            yilou[type+i] = 1;
                        }
                        list.push({num:yilou[type+i], active: false});
                    }
                    break;
                case "2:0":
                    if(i==0){
                        yilou[type+i] = 0;
                        cnt=false;
                        list.push({num:"2:0", active: true,attr:'yellow'});
                    }else{
                        //大小遗漏
                        if(yilou[type+i] != null){
                            yilou[type+i] = yilou[type+i]+1;
                        }else{
                            yilou[type+i] = 1;
                        }
                        list.push({num:yilou[type+i], active: false});
                    }
                    break;
                case "1:1":
                    if(i==1){
                        yilou[type+i] = 0;
                        cnt=false;
                        list.push({num:"1:1", active: true,attr:'yellow'});
                    }else{
                        //大小遗漏
                        if(yilou[type+i] != null){
                            yilou[type+i] = yilou[type+i]+1;
                        }else{
                            yilou[type+i] = 1;
                        }
                        list.push({num:yilou[type+i], active: false});
                    }
                    break;
                case "0:2":
                    if(i==2){
                        yilou[type+i] = 0;
                        cnt=false;
                        list.push({num:"0:2", active: true,attr:'yellow'});
                    }else{
                        //大小遗漏
                        if(yilou[type+i] != null){
                            yilou[type+i] = yilou[type+i]+1;
                        }else{
                            yilou[type+i] = 1;
                        }
                        list.push({num:yilou[type+i], active: false});
                    }
                    break;
                default:
                    break;
            }
        }else{
            //大小遗漏
            if(yilou[type+i] != null){
                yilou[type+i] = yilou[type+i]+1;
            }else{
                yilou[type+i] = 1;
            }
            list.push({num:yilou[type+i], active: false});
        }
    },
    //大小比
    daxiaobi : function(nums){
        var big = 0;
        var small = 0;
        for(var i = 0;i < nums.length;i++){
            if(nums[i] > 4){
                big++;
            }else{
                small++;
            }
        }
        return big+":"+small;
    },
    //大小比11选5
    daxiaobi_11xuan5 : function(nums){
        var big = 0;
        var small = 0;
        for(var i = 0;i < nums.length;i++){
            if(nums[i] > 5){
                big++;
            }else{
                small++;
            }
        }
        return big+":"+small;
    },
    //奇偶比
    jioubi : function(nums){
        var ji = 0;
        var ou = 0;
        for(var i = 0;i < nums.length;i++){
            if(nums[i]%2==1){
                ji++;
            }else{
                ou++;
            }
        }
        return ji+":"+ou;
    },
    //质合比
    zhihebi : function(nums){
        var zhi = 0;
        var he = 0;
        var zhishu = "2,3,5,7,01,02,03,05,07,11";
        for(var i = 0;i < nums.length;i++){
            if(zhishu.indexOf(nums[i]) > -1){
                zhi++;
            }else{
                he++;
            }
        }
        return zhi+":"+he;
    },
    //号码类型
    leixing : function(nums){
        var html = "";
        switch (nums.length) {
            case 1:
                html = "豹子";
                break;
            case 2:
                html = "组三";
                break;
            case 3:
                html = "组六";
                break;
            default:
                break;
        }
        return html;
    },
    //总和
    zonghe : function(nums){
        var num = 0;
        for(var i = 0;i < nums.length;i++){
            num += nums[i]/1;
        }
        return num;
    },
    //大小
    daxiao : function(nums){
        var html = "";
        for(var i = 0;i < nums.length;i++){
            if(nums[i] > 4){
                html += "大";
            }else{
                html += "小";
            }
        }
        return html;
    },
    //单双
    danshuang : function(nums){
        var html = "";
        for(var i = 0;i < nums.length;i++){
            if(nums[i]%2 == 0){
                html += "双";
            }else{
                html += "单";
            }
        }
        return html;
    },

    haomaleixin : function(nums,yilou_nums_sanxing,list){
        switch (nums.length) {
            case 1:
                yilou_nums_sanxing["baozi"] = 0;
                if(yilou_nums_sanxing["zusan"] == null){
                    yilou_nums_sanxing["zusan"] = 1;
                }else{
                    yilou_nums_sanxing["zusan"] = yilou_nums_sanxing["zusan"] + 1;
                }
                if(yilou_nums_sanxing["zuliu"] == null){
                    yilou_nums_sanxing["zuliu"] = 1;
                }else{
                   yilou_nums_sanxing["zuliu"] = yilou_nums_sanxing["zuliu"] + 1;
                }
                list.push({num:yilou_nums_sanxing["zusan"], active: false});
                list.push({num:yilou_nums_sanxing["zuliu"], active: false});
                list.push({num:'豹子', active: true,attr:'greed'});
                break;
            case 2:
                yilou_nums_sanxing["zusan"] = 0;
                if(yilou_nums_sanxing["baozi"] == null){
                    yilou_nums_sanxing["baozi"] = 1;
                }else{
                    yilou_nums_sanxing["baozi"] = yilou_nums_sanxing["baozi"] + 1;
                }
                if(yilou_nums_sanxing["zuliu"] == null){
                    yilou_nums_sanxing["zuliu"] = 1;
                }else{
                    yilou_nums_sanxing["zuliu"] = yilou_nums_sanxing["zuliu"] + 1;
                }
                list.push({num:'组三', active: true,attr:'greed'});
                list.push({num:yilou_nums_sanxing["zuliu"], active: false});
                list.push({num:yilou_nums_sanxing["baozi"], active: false});

                break;
            case 3:
                yilou_nums_sanxing["zuliu"] = 0;
                if(yilou_nums_sanxing["baozi"] == null){
                    yilou_nums_sanxing["baozi"] = 1;
                }else{
                    yilou_nums_sanxing["baozi"] = yilou_nums_sanxing["baozi"] + 1;
                }
                if(yilou_nums_sanxing["zusan"] == null){
                    yilou_nums_sanxing["zusan"] = 1;
                }else{
                    yilou_nums_sanxing["zusan"] = yilou_nums_sanxing["zusan"] + 1;
                }
                list.push({num:yilou_nums_sanxing["zusan"], active: false});
                list.push({num:'组六', active: true,attr:'greed'});
                list.push({num:yilou_nums_sanxing["baozi"], active: false});

                break;
            default:
                break;
        }
    },
    //五星和值
    createNums_wuxinghezhi : function(nums,yilou_nums,list){
        var num = this.zonghe(nums);
        if(num <= 13){
            yilou_nums[0] = 0;
            list.push({num:num, active: true,attr:'red'});
        }else{
            if(yilou_nums[0] == null){
                yilou_nums[0] = 1;
            }else{
                yilou_nums[0] = yilou_nums[0]+1;
            }
            list.push({num:yilou_nums[0], active: false});
        }
        for(var i=14;i<35;i++){
            if(num == i){
                yilou_nums[i] = 0;
                list.push({num:num, active: true,attr:'red'});
            }else{
                if(yilou_nums[i] == null){
                    yilou_nums[i] = 1;
                }else{
                    yilou_nums[i] = yilou_nums[i]+1;
                }
                list.push({num:yilou_nums[i], active: false});
            }
        }
        if(num >= 35){
            yilou_nums[35] = 0;
            list.push({num:num, active: true,attr:'red'});
        }else{
            if(yilou_nums[35] == null){
                yilou_nums[35] = 1;
            }else{
                yilou_nums[35] = yilou_nums[35]+1;
            }
            list.push({num:yilou_nums[35], active: false});
        }
    },
    createNums_weishu : function(nums,yilou_nums,list){
        var num = this.zonghe(nums);
        for(var i=0;i<10;i++){
            if(num%10 == i){
                yilou_nums[i+'h'] = 0;
                list.push({num:i, active: true});
            }else{
                if(yilou_nums[i+'h'] == null){
                    yilou_nums[i+'h'] = 1;
                }else{
                    yilou_nums[i+'h'] = yilou_nums[i+'h']+1;
                }
                list.push({num:yilou_nums[i+'h'], active: false});
            }
        }
    },
    //和值
    createNums_hezhi : function(nums,count,yilou_nums,list){
        var html = "";
        var num = this.zonghe(nums);
        for(var i=0;i<count;i++){
            if(num == i){
                yilou_nums[i] = 0;
                list.push({num:num, active: true,attr:'red'});
            }else{
                if(yilou_nums[i] == null){
                    yilou_nums[i] = 1;
                }else{
                    yilou_nums[i] = yilou_nums[i]+1;
                }
                list.push({num:yilou_nums[i], active: false});
            }
        }
        return html;
    },
    //形态走势
    createNums_xingtai : function(nums,yilou_nums,list){
        var html = "";
        arrayUtil.forEach(nums,function(num,i){
            if(num > 4){
                yilou_nums["big"+i] = 0;
                if(yilou_nums["small"+i]==null){
                    yilou_nums["small"+i] = 1;
                }else{
                    yilou_nums["small"+i] = yilou_nums["small"+i]+1;
                }
                list.push({num:'大', active: true,attr:i % 2 == 0 ?'greed':'yellow'});
                list.push({num:yilou_nums["small"+i], active: false});
            }else{
                yilou_nums["small"+i] = 0;
                if(yilou_nums["big"+i]==null){
                    yilou_nums["big"+i] = 1;
                }else{
                    yilou_nums["big"+i] = yilou_nums["big"+i]+1;
                }
                list.push({num:yilou_nums["big"+i], active: false});
                list.push({num:'小', active: true,attr:i % 2 == 0 ?'greed':'yellow'});
            }

            if(num%2 == 0){
                yilou_nums["ji"+i] = 0;
                if(yilou_nums["ou"+i]==null){
                    yilou_nums["ou"+i] = 1;
                }else{
                    yilou_nums["ou"+i] = yilou_nums["ou"+i]+1;
                }
                list.push({num:'奇', active: true,attr:i % 2 == 0 ?'greed':'yellow'});
                list.push({num:yilou_nums["ou"+i], active: false});
            }else{
                yilou_nums["ou"+i] = 0;
                if(yilou_nums["ji"+i]==null){
                    yilou_nums["ji"+i] = 1;
                }else{
                    yilou_nums["ji"+i] = yilou_nums["ji"+i]+1;
                }
                list.push({num:yilou_nums["ji"+i], active: false});
                list.push({num:'偶', active: true,attr:i % 2 == 0 ?'greed':'yellow'});
            }

            if("2,3,5,7,01,02,03,05,07,11".indexOf(num) > -1){
                yilou_nums["zhi"+i] = 0;
                if(yilou_nums["he"+i]==null){
                    yilou_nums["he"+i] = 1;
                }else{
                    yilou_nums["he"+i] = yilou_nums["he"+i]+1;
                }
                list.push({num:'质', active: true,attr:i % 2 == 0 ?'greed':'yellow'});
                list.push({num:yilou_nums["he"+i], active: false});
            }else{
                yilou_nums["he"+i] = 0;
                if(yilou_nums["zhi"+i]==null){
                    yilou_nums["zhi"+i] = 1;
                }else{
                    yilou_nums["zhi"+i] = yilou_nums["zhi"+i]+1;
                }

                list.push({num:yilou_nums["zhi"+i], active: false});
                list.push({num:'合', active: true,attr:i % 2 == 0 ?'greed':'yellow'});
            }
            if(i != nums.length-1){
                html += '<td class="lc-split">&nbsp;</td>';
            }
        })
        return html;
    },
    //振幅走势
     prevIssueno:'',
    createNums_zhenfu : function(nums,prevIssueno,yilou_nums,list){
        var html = "";
        var prevIssueno = prevIssueno;
        arrayUtil.forEach(nums,function(num,i){
            for(var j=0;j<10;j++){
                if(prevIssueno==null){
                    if(j==num){
                        yilou_nums[i+""+j] = 0;
                        list.push({num:num, active: true,attr:i % 2 == 0 ?'greed':'yellow'});

                    }else{
                        if(yilou_nums[i+""+j]==null){
                            yilou_nums[i+""+j] = 1
                        }else{
                            yilou_nums[i+""+j] = yilou_nums[i+""+j]+1;
                        }
                        list.push({num: yilou_nums[i+""+j], active: false});
                    }
                }else{
                    var zhenfu = Math.abs(num - prevIssueno[i]);
                    if(j==zhenfu){
                        yilou_nums[i+""+j] = 0;
                        list.push({num:zhenfu, active: true,attr:i % 2 == 0 ?'greed':'yellow'});
                    }else{
                        if(yilou_nums[i+""+j]==null){
                            yilou_nums[i+""+j] = 1
                        }else{
                            yilou_nums[i+""+j] = yilou_nums[i+""+j]+1;
                        }
                        list.push({num: yilou_nums[i+""+j], active: false});
                    }
                }
            }
        })
        return nums;
    },
    //跨度
    kuadu : function(nums,yilou_nums,list,substr){
        nums.sort();
        var index = (nums[nums.length-1] - nums[0]);
        for(var i = substr[0];i<=substr[1];i++){
            if(index == i){
                yilou_nums[i+'k'] = 0;
                list.push({num: index, active: true,attr:'yellow'});
            }else{
                if(yilou_nums[i+'k'] == null){
                    yilou_nums[i+'k'] = 1;
                }else{
                    yilou_nums[i+'k'] = yilou_nums[i+'k']+1;
                }
                list.push({num:yilou_nums[i+'k'], active: false});
            }
        }
    },
    //生成号码01-11
    createNums_11xuan5 : function(nums,yilou_nums){
        var missingList = new Array();
        for(var i=1;i < 12; i++){
            var cnt = true;
            for(var j=0; j < nums.length; j++){
                if(nums[j] == i){
                    yilou_nums[i] = 0;
                    missingList.push({num: nums[j], active: true,attr:'red'});
                    cnt = false;
                }
            }
            if(cnt){
                if(yilou_nums[i] != null){
                    yilou_nums[i] = yilou_nums[i]+1;
                }else{
                    yilou_nums[i] = 1;
                }
                missingList.push({num:yilou_nums[i],active: false});
            }
        }
        return missingList;
    },
    //11选5任选和值
    createNums_renxuanhezhi_11xuan5 : function(nums,begin,end,yilou_nums,list){
        var zonghe = this.zonghe(nums);
        for(var i=begin;i<end;i++){
            if(zonghe==i){
                yilou_nums[i] = 0;
                list.push({num: zonghe, active: true,attr:'red'});
            }else{
                if(yilou_nums[i] != null){
                    yilou_nums[i] = yilou_nums[i]+1;
                }else{
                    yilou_nums[i] = 1;
                }
                list.push({num:yilou_nums[i],active: false});
            }
        }
    },
    //生成大小比html
    createNums_daxiao_11xuan5 : function(nums,yilou_nums,list){
        var big = nums.length;
        var small = 0;
        var daxiaobi = this.daxiaobi_11xuan5(nums);
        for(var i=0;i<nums.length+1;i++){
            if(daxiaobi == (big+":"+small)){
                yilou_nums["daxiao"+i] = 0;
                list.push({num: daxiaobi, active: true,attr:'yellow'});
            }else{
                if(yilou_nums["daxiao"+i]==null){
                    yilou_nums["daxiao"+i] = 1;
                }else{
                    yilou_nums["daxiao"+i] = yilou_nums["daxiao"+i]+1;
                }
                list.push({num: yilou_nums["daxiao"+i], active: false});
            }
            big--;
            small++;
        }
    },
    //生成奇偶比html
    createNums_jiou_11xuan5 : function(nums,yilou_nums,list){
        var ji = nums.length;
        var ou = 0;
        var jioubi = this.jioubi(nums);
        for(var i=0;i<nums.length+1;i++){
            if(jioubi == (ji+":"+ou)){
                yilou_nums["jiou"+i] = 0;
                list.push({num: jioubi, active: true,attr:'greed'});
            }else{
                if(yilou_nums["jiou"+i]==null){
                    yilou_nums["jiou"+i] = 1;
                }else{
                    yilou_nums["jiou"+i] = yilou_nums["jiou"+i]+1;
                }
                list.push({num:  yilou_nums["jiou"+i],active: false});
            }
            ji--;
            ou++;
        }
    },
    //生成质合比html
    createNums_zhihe_11xuan5 : function(nums,yilou_nums,list){
        var zhi = nums.length;
        var he = 0;
        var zhihebi = this.zhihebi(nums);
        for(var i=0;i<nums.length+1;i++){
            if(zhihebi == (zhi+":"+he)){
                yilou_nums["zhihe"+i] = 0;
                list.push({num: zhihebi, active: true,attr:'yellow'});
            }else{
                if(yilou_nums["zhihe"+i]==null){
                    yilou_nums["zhihe"+i] = 1;
                }else{
                    yilou_nums["zhihe"+i] = yilou_nums["zhihe"+i]+1;
                }
                list.push({num:  yilou_nums["zhihe"+i],active: false});
            }
            zhi--;
            he++;
        }
    },
    //11选5前三直选
    createNums_qiansanzhixuan_11xuan5 : function(nums,yilou_nums){
        var list = new Array();
        for(var i=0;i<nums.length;i++){
            for(var j=1;j<12;j++){
                if(nums[i] == j){
                    yilou_nums[i+"_"+j] = 0;
                    list.push({num: nums[i], active: true,attr:i%2==1 ?'yellow' : 'greed'});
                }else{
                    if(yilou_nums[i+"_"+j] != null){
                        yilou_nums[i+"_"+j] = yilou_nums[i+"_"+j]+1;
                    }else{
                        yilou_nums[i+"_"+j] = 1;
                    }
                    list.push({num:  yilou_nums[i+"_"+j],active: false});
                }
            }
        }
        return list;
    },

    createNums_k3 : function(nums,yilou_nums,list){
        var html = "";
        arrayUtil.forEach(nums,function(num,i){
            for(var j=0;j<12;j++){
                if(prevIssueno==null){
                    if(j==num){
                        yilou_nums[i+""+j] = 0;
                        list.push({num:num, active: true,attr:i % 2 == 0 ?'greed':'yellow'});

                    }else{
                        if(yilou_nums[i+""+j]==null){
                            yilou_nums[i+""+j] = 1
                        }else{
                            yilou_nums[i+""+j] = yilou_nums[i+""+j]+1;
                        }
                        list.push({num: yilou_nums[i+""+j], active: false});
                    }
                }else{
                    var zhenfu = Math.abs(num - prevIssueno[i]);
                    if(j==zhenfu){
                        yilou_nums[i+""+j] = 0;
                        list.push({num:zhenfu, active: true,attr:i % 2 == 0 ?'greed':'yellow'});
                    }else{
                        if(yilou_nums[i+""+j]==null){
                            yilou_nums[i+""+j] = 1
                        }else{
                            yilou_nums[i+""+j] = yilou_nums[i+""+j]+1;
                        }
                        list.push({num: yilou_nums[i+""+j], active: false});
                    }
                }
            }
        })
        return nums;
    },

    //大小形态
    bigAndSmall(arr,item){
        var val = '';
        arrayUtil.forEach(arr,i=>{
            if(i >4){
                val+='大'
            }else{
                val+='小'
            }
        })
        item.push({num:val, active: true,attr:'blue-block'})
    },
    //单双形态
    doubleAndSingle(arr,item){
        var val = '';
        arrayUtil.forEach(arr,i=>{
            if(i %2==1){
                val+='单'
            }else{
                val+='双'
            }
        })
        item.push({num:val, active: true,attr:'greet-block'})
    },
    //总和
    zonghe3 : function(arr,item){
        var num = 0;
        for(var i = 0;i < arr.length;i++){
            num += arr[i] /1;
        }
        item.push({num:num, active: true,attr:'red-ball'});
    },
    haoleixin : function(nums,item){

        switch (nums.length) {
            case 1:
                item.push({num:'豹子', active: true,attr:'yellow-block'});
                item.push({num:'', active: false,attr:'leixin'});
                item.push({num:'', active:  false,attr:'leixin'});

                break;
            case 2:
                item.push({num:'', active: false,attr:'leixin'});
                item.push({num:'组三', active: true,attr:'yellow-block'});
                item.push({num:'', active: false,attr:'leixin'});
                break;
            case 3:
                item.push({num:'', active: false,attr:'leixin'});
                item.push({num:'', active: false,attr:'leixin'});
                item.push({num:'组六', active: true,attr:'yellow-block'});
                break;
            default:
                break;
        }
    },
    repeatArr(str){
        var n = [];
        for(var i = 0; i < str.length; i++)
        {
            if (n.indexOf(str[i]) == -1) n.push(str[i]);
        }
        return n;
    },
}