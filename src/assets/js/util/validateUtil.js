export default {

    //是否正整数
    isZzs(val) {
        var re = /^[1-9]+[0-9]*]*$/;
        if (!re.test(val)) {
            return false;
        } else {
            return true;
        }
    },
    //中文数字下划线字母
    isChAz09(val) {
        var r = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/;
        return r.test(val) == false;
    },
    isChAz(val) {

        var r = /[^\a-\z\A-\Z\u4E00-\u9FA5]/;
        return r.test(val) == false;
    },
    isChineseName(val) {

        var r = /[^\a-\z\A-\Z\u4E00-\u9FA5\.\·]/;
        return r.test(val) == false;
    },
    is09(val) {
        var r = /[^0-9]/;
        return r.test(val) == false;
    },
    isDecimal(val) {
        var r = /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
        return r.test(val) == false;
    },
    isMoney(amount) {
        var reg = /^[0-9]*(\.[0-9]{1,2})?$/;
        return reg.test(amount);
    },
    judgeMobeil() {
        let client = '';
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
            client = 'IOS';
        } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
            client = 'Android';
        } else {
            client = 'PC';
        }
        return client != 'PC' ? true : false
    },
}