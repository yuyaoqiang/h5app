export default  {
    loadSrcs:[],
    loadScript(src,callback) {
        var _this=this;
        if(_this.loadSrcs.indexOf(src,0)>-1){
            if (typeof callback === 'function') {
                callback();
            }
            return;
        }
        setTimeout(function () {
            _this.doLoadScript(src, callback)
        }, 10)


    },
    doLoadScript(src, callback) {
        var _this=this;

        var script = document.createElement('script');
        var head = document.getElementsByTagName('head')[0];
        var loaded;
        script.src = src;
        if (typeof callback === 'function') {
            script.onload = script.onreadystatechange = function () {
                if (!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))) {
                    script.onload = script.onreadystatechange = null;
                    loaded = true;
                    _this.loadSrcs.push(src);
                    callback();
                }
            }
        }
        head.appendChild(script);
    }
}