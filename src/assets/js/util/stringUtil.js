export default {
    isBlank(val){
        val=val||"";
        if(val.trim()=="") return true;
        return false;
    },
    isNotBlank(val){
        return this.isBlank(val)==false;
    }
}