<template>
    <div id="app">
        <keep-alive>     <!--使用keep-alive会将页面缓存-->
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive"></router-view>
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
                methodsScroll.enabledScroll();  

            }
        },
    }
</script>
<style scoped>
</style>
