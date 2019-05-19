<template>
    <div class="info-nr" id="info-nr" v-show="this.isShow === true" @tap.stop="search()">
        <div id="info-nr-phone" class="info-nr-phone">
            <section id="toMenu" @click="addListnerClass"></section>
            <div :class="'menu_'+index" v-for="(item,index) in lines"  @click="changeDomain(item)">{{names[index]}}</div>
            <div :class="'menu_3'" @click="this.closeBall"> </div>  
        </div>
    </div>
</template>

<script>
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import cacheUtil from "../../assets/js/util/cacheUtil"
    export default {
        data () {
            return {
                isShow:false,
                lines:[],
                names:["线路一","线路二","线路三"]
            }
        },
        created(){
            this.onAndOff();
        },
        mounted () {
            var _this = this;
            userBusiness.getUser(this,function (user) {
            _this.lines=user.lines;
            });
        },
        methods: {
            onAndOff(){
                let isOn = cacheUtil.getSessionStorage("suspensionBall");
                if(isOn==="on"){
                    this.isShow = true;
                }
                if(!isOn){
                    this.isShow = true;
                    cacheUtil.setSessionStorage("suspensionBall", "on");
                }
            },
            changeDomain(item){
                window.location.replace("http://"+item+"/mobile#/newLogin");
            },
            addListnerClass(){
                $(".info-nr-phone").toggleClass("info-nr-phone2");
                $(".menu_0").toggleClass("to_01");
                $(".menu_1").toggleClass("to_02");
                $(".menu_2").toggleClass("to_03");
                switch(this.lines.length){
                    case 1: $(".menu_3").toggleClass("to_06")
                    break;
                    case 2: $(".menu_3").toggleClass("to_05")
                    break;
                    case 3: $(".menu_3").toggleClass("to_04")
                    break;
                }
            },
            closeBall(){
                this.isShow = false;
                 cacheUtil.setSessionStorage("suspensionBall", "off");
            },
            search:function(e){ 
                e.preventDefault();
            }
        },
    }
</script>
<style>
.info-nr {
    position:fixed;
    top:3rem;
    right:3px;
    z-index:900;
    tap-highlight-color: rgba(0, 0, 0, 0);
}     
#toMenu{
    display:block;
    width:45px!important;
    height:45px!important;
    border-radius:45px;
    position: absolute;
    bottom:0;
    right:0;
    z-index:9999;
    color:#fff;
    background:url('../../assets/images/speed.png') 50% 50% #ffffff;
    background-repeat: no-repeat;
    background-size:auto 70%;
    box-shadow:0 0 0 3px #cacaca, 0 2px 5px 0 #cacaca;
}
.info-nr-phone{height:45px;width:45px;}
#info-nr-phone{position:relative;}
.info-nr-phone>div {
    width:40px;
    height:40px;
    border-radius:40px;
    box-shadow:0 0 0 3px #FFFFFF, 0 2px 5px 0 rgba(0, 0, 0, 0.25);
    position:absolute;
    bottom:.0.02rem;
    right:.0.02rem;
    z-index:900;
    -moz-transition: transform 300ms;
    -webkit-transition: -webkit-transform 300ms;
    -ms-transition: transform 300ms;
}
.to_01,.to_02,.to_03,.to_04{
    font-size: 12px;
    line-height: 43px;
    font-weight: bold;
    text-align: center;
    color: #fff;
        background: #7d7979;
    background-size: auto 100%;
}
.info-nr-phone>.to_01 {
    transform: translate(-4px, -50px) rotate(720deg);
}
.info-nr-phone>.to_02 {
        transform: translate(-45px, -21px) rotate(720deg);
}
.info-nr-phone>.to_03 {
        transform: translate(-45px, 28px) rotate(720deg);
    }
.info-nr-phone> .to_04{
        transform: translate(-4px, 50px) rotate(720deg);
        background:url('../../assets/images/closeBall.png') 50% 50% no-repeat #fff;
        background-size:auto 100%;
}     
.info-nr-phone> .to_05{
        transform: translate(-45px, 28px) rotate(720deg);
        background:url('../../assets/images/closeBall.png') 50% 50% no-repeat #fff;
        background-size:auto 100%;
}
.info-nr-phone> .to_06{
        transform: translate(-45px, -21px) rotate(720deg);
        background:url('../../assets/images/closeBall.png') 50% 50% no-repeat #fff;
        background-size:auto 100%;
} 
</style>