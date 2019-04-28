/**
 * Created by Owner on 2017/3/25.
 */

import axios from 'axios';

export default {
    doPost(url, params, callback) {
        this.doAjax("post", url, params, callback);
    },
    doGet(url, params, callback) {
        this.doAjax("get", url, params, callback);
    },
    doAjax(method, url, params, callback) {
        axios({
            method: method,
            url: url,
            params: params,

        }).then((response) => {
            if (callback != null) {
                var data = response.data;

                if (data === undefined) {
                    data = {};
                }
                data.__HTTP_STATUS = response.status;

                callback(data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}