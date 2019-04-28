import platformData from '../../../platform/main/platformData'


export default {
    regCode: null,
    init: false,
    getCurrentDomainRegCode: function () {
        if (this.init == true) {
            return this.regCode;
        }


        var domains = platformData.agentRegCodeDomains;
        if(!domains){
            return null;
        }
        var curHost = window.location.hostname.toLowerCase();

        var code = null;
        domains.forEach(item => {
            if (item.domain.toLowerCase().indexOf(curHost) >= 0) {
                code = item.code;
            }
        });
        this.init = true;
        this.regCode=code;
        return this.regCode;
    }
}

