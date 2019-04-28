export default {
    toString:function (obj) {
        obj=obj||"";
        return obj+"";
    },
    deepCopy: function (source) {
        if(source == null) return null;
        var result = {};
        for (var key in source) {
            result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
        }
        return result;
    },
    fillProperties(target,src){
        for (var key in src){
            target[key]=src[key]
        }
    },
    hasProperty(obj){
        if(obj){
            for(var key in obj){
                return true;
            }
        }

        return false;
    },
    safeGet(obj,propName){
        return obj[propName]||{};
    },
    extendDeepCopy(source,newObj){
        var newObj  = newObj || {};
        for(var i in source){
            if(source[i] instanceof Object){
                newObj[i] = (source[i] instanceof Array)?[]:{}
                this.extendDeepCopy(source[i],newObj[i]);
            }else{
                newObj[i] = source[i];
            }
        }
        return newObj;
    },
}