<template>
    <div class="info-nr" id="info-nr" v-if="this.isShow === true" @tap.stop="search()">
        <div id="info-nr-phone" class="info-nr-phone">
            <section id="toMenu"></section>
            <div class="menu_01"> </div>
            <div class="menu_02"> </div>
            <div class="menu_03"> </div>
            <div class="menu_04" @click="this.closeBall"> </div>  
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isShow:true
            }
        },
        created(){
        },
        mounted () {
            this.addListnerClass();
        },
        methods: {
            addListnerClass(){
                window.addEventListener("DOMContentLoaded", function () {
                    $("#toMenu").click(function(){
                        $(".info-nr-phone").toggleClass("info-nr-phone2");
                        $(".menu_01").toggleClass("to_01");
                        $(".menu_02").toggleClass("to_02");
                        $(".menu_03").toggleClass("to_03");
                        $(".menu_04").toggleClass("to_04");
                    });
                }, false);
            },
            closeBall(){
                this.isShow = false;
            },
            search:function(e){ 
                e.preventDefault();
            }
        }
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
.info-nr-phone>.to_01 {
    -webkit-transform: translate(-14px, -120px) rotate(720deg); 
    -moz-transform: translate(-14px, -120px) rotate(720deg);
    -ms-transform: translate(-14px, -120px) rotate(720deg); 
    -o-transform: translate(-14px, -120px) rotate(720deg);
        transform: translate(-14px, -65px) rotate(720deg);
        background:url('../../assets/images/dice-2.png') 50% 50% no-repeat rgb(153, 152, 152);
        background-size:auto 100%;}
.info-nr-phone>.to_02 {
    -webkit-transform: translate(-78px, -108px) rotate(720deg); 
    -moz-transform: translate(-78px, -108px) rotate(720deg);
    -ms-transform: translate(-78px, -108px) rotate(720deg); 
    -o-transform: translate(-78px, -108px) rotate(720deg); 
        transform: translate(-71px, -31px) rotate(720deg);
        background:url('../../assets/images/dice-3.png') 50% 50% no-repeat #fff;
        background-size:auto 100%;}
.info-nr-phone>.to_03 {
    -webkit-transform: translate(-85px, -80px) rotate(720deg); 
    -moz-transform: translate(-85px, -80px) rotate(720deg);
    -ms-transform: translate(-85px, -80px) rotate(720deg); 
    -o-transform: translate(-85px, -80px) rotate(720deg);
        transform: translate(-67px, 28px) rotate(720deg);
        background:url('../../assets/images/dice-4.png') 50% 50% no-repeat #fff;
        background-size:auto 100%;
    }
.info-nr-phone> .to_04{
    -webkit-transform: translate(-79px, -36px) rotate(720deg);
    -moz-transform: translate(-79px, -36px) rotate(720deg);
    -ms-transform: translate(-79px, -36px) rotate(720deg);
    -o-transform: translate(-79px, -36px) rotate(720deg); 
        transform: translate(-15px, 62px) rotate(720deg);
        background:url('../../assets/images/closeBall.png') 50% 50% no-repeat #fff;
        background-size:auto 100%;
} 
</style>