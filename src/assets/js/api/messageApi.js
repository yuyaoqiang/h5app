import apiUtil from  "../api/common/apiUtil"

export default {
    updateStatus(params,callback){
        apiUtil.doPost("/message/updateState.mvc",params,callback);
    }
}