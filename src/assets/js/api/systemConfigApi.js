
import apiUtil  from './common/apiUtil';

export default {
    getConfig(callback){
        apiUtil.doGet("/system-config/front.mvc",null, callback);
    }
}