
export default {
    KEY_PREFIX:"LOTTERY",
    disable:false,
    localCache:{},
    sessionCache:{},
    setSessionStorage(key,val){
       this.setStorage(sessionStorage,this.sessionCache,key,val);
    },
    getSessionStorage(key){
        return this.getStorage(sessionStorage,this.sessionCache,key);
    },
    setLocalStorage(key,val){
       this.setStorage(localStorage,this.localCache,key,val);
    },
    getLocalStorage(key){
        return this.getStorage(localStorage,this.localCache,key);
    },

    setStorage(storage,cacheObj,key,val){
        if(this.disabled) return;
        cacheObj[key]=val;
        try {
            storage.setItem(key,val);
        }catch (e){
            console.error(e);
        }

    },
    getStorage(storage,cacheObj,key){
        if(this.disabled) return null;
        var  val = cacheObj[key];
        if(val != null){
            return val;
        }
        try {
            val = storage.getItem(key);
            this.localCache[key]=val;
            return val;
        }catch (e){
            console.error(e);
        }
        return null;
    },
    clearAllSession(){
        this.sessionCache={};
        sessionStorage.clear();
    }
}