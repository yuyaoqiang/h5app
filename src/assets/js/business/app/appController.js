import appContext from "../../context/appContext"
import androidBusiness from "./androidController"
import iosBusiness from "./iosController"

export  default {
    isApp(){
        return this.getController() != null;
    },
    getController: function (view) {
        var ctrCode = appContext.current.$route.query.ctr;
        if (ctrCode == "android") {
            return androidBusiness.controller;
        }

        if (ctrCode == "ios") {
            return iosBusiness.controller;
        }
        return null;
    }
}