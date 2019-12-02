<template>
    <div id="app">
        <keep-alive>     <!--使用keep-alive会将页面缓存-->
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <transition :name="transitionName">
            <router-view  class="child-view" v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>

<script>
    import appContext  from './assets/js/context/appContext';
    import platformData from "./assets/platform/main/platformData"
    import arrayUtil from "./assets/js/util/arrayUtil"
    import userBusiness from "./assets/js/business/user/userBusiness"
    export default {
        name: '',
        data () {
            return {
                slideFlag:false,
            }
        },
        beforeCreate(){
            document.title='Welcome';
        },
        created(){
            
            appContext.current=this;
        },
        methods:{

        },
        components: {

        },
        watch:{
            "slideFlag":function(a,b){
                if(a==true){
                   methodsScroll.forbidScroll();  

                }else{
                   methodsScroll.enabledScroll();  

                }
            },
            "$route":function(to,from){
                this.slideFlag = false;
                let isBack = this.$router.isBack; 
                if(isBack) {
                    this.transitionName = 'slide-right'
                } else {
                    this.transitionName = 'slide-left'
                }
                this.$router.isBack = false
                methodsScroll.enabledScroll();  

            }
        },
    }
</script>
<style scoped>
    .child-view {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        }
        .slide-left-enter,
        .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(0.6rem, 0);
        transform: translate(0.6rem, 0);
        }
        .slide-left-leave-active,
        .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-0.6rem, 0);
        transform: translate(-0.6rem, 0);
    }
</style>
