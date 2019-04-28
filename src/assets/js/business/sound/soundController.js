import appContext from '../../context/appContext'
import cacheUtil from '../../util/cacheUtil'

export  default {
    setEnable(enable){
        cacheUtil.setLocalStorage("LOTTERY_SOUND_ENABLE",enable+"");
    },
    getEnable(){
       var enable = cacheUtil.getLocalStorage("LOTTERY_SOUND_ENABLE")||"true";
       return enable=="true";
    },

    play(sound){
        if(this.getEnable()==false){
            return;
        }

        this.stop();
        if(this.audio == null){
            this.audio= document.createElement("audio");
        }
        this.audio.src = appContext.buildStaticPath("sound/" + sound);
        this.audio.play();
    },
    stop(){
        if(this.audio) {
            var audio = this.audio;
            audio.pause();
            audio.currentTime = 0;
        }
    }
}