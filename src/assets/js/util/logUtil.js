
export  default {
    enableInfo:false,
    enableError:false,
    info(msg){
        if(this.enableInfo){
            console.log(msg);
        }
    },
    error(msg){
        if(this.enableError){
            console.error(msg);
        }
    }
}