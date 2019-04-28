import objectUtil from "../../util/objectUtil"
import validateUtil from "../../util/validateUtil"
export default {
    multipleChangeCheck(val,callback){
        var m = objectUtil.toString(val);
        if(m == ""){
            return false;
        }

        if (validateUtil.isZzs(m) == false) {

            setTimeout(function () {
                if (callback) {
                    callback(m.replace(/[^\d]/g, ''))
                }
            }, 200)
            return false;
        }
        return true;
    },
    moneyChangeCheck(val,callback){
        var val = objectUtil.toString(val);
        if(val==""){
            return false;
        }
        var isMoney = validateUtil.isMoney(val);
        if(isMoney==false){
            setTimeout(function () {
                if(callback){
                    callback(val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'));
                }
            },200)
        }
    }
}