
export default {
    toMoneyFixed(val,defaultVal){
        return this.toFixed(val,3,defaultVal);
    },
    toFixed(val,len,defaultVal){
        if(val==undefined){
            if(defaultVal != undefined) {
                return defaultVal;
            }
            return val;
        }
        var tmp=val/1;
        return tmp.toFixed(len);
    },
    toIntger(val){
        if(val != undefined){
           return Number.parseInt(val);
        }
        return val
    },
    isDecimalTwo(val){
        var flag = false;
        var str = val.toString();
        if(str.indexOf(".") != -1){
            var splitVal = str.split(".")[1];
            if(splitVal.length==2){
                flag = true;
            }
        }
        return flag;
    },
    toNumber(val,defaultVal){
        try{
            if(val.toString()==""){
                return defaultVal;
            }
            return val;
        }catch(err) {
            return defaultVal;
        }
    },
}