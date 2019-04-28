
import appContext from "../../../js/context/appContext"
import arrayUtil from "../../../js/util/arrayUtil"


export default {

    getRedirectParam(){

        var result = appContext.current.$route.query.result;
        if(result == null){
            return null;
        }

        result = decodeURIComponent(result);
        var param =JSON.parse(result);

        return param;
    },

    trdAccountList:[
        {code:"WECHAT",desc:"微信"},
        {code:"QQ",desc:"QQ"},
        {code:"WEIBO",desc:"微博"}
    ],
    getTrdAccountDesc(type){
       var account = arrayUtil.findFirst(this.trdAccountList,item=>{
            return item.code==type;
        });
       if(account == null){
           return null;
       }
       return account.desc;
    }
}