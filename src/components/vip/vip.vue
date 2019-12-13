<template>
    <div>
        <header class="pr header-box">
            <div class="header-arrow-box" id="back_icon" @click="goback">
                <i class="el-icon-arrow-left back-icon"></i>
            </div>
            <h1 class="header-title">VIP详情</h1>
        </header>
        <section class="vip-container-warp">
            <img class="top-img" src="../../assets/images/vip/top.jpg" alt="top">
            <img class="wm-img" src="../../assets/images/vip/wm.png" alt="wm" >
            <img class="lb-img" src="../../assets/images/vip/lb.png" alt="zg">
            <div class="list_vip">
            <i class="jiao1"> </i> 
            <i class="jiao2"></i>
            <i class="jiao3"></i> 
            <i class="jiao4"></i> 
                <ul>
                    <li>
                        <img src="../../assets/images/vip/vip_level.png" alt="">
                    </li>
                </ul>
            </div>
            <p  class="vip_j"><span data-v-f8f9989a="">VIP等级：<small data-v-f8f9989a="">1</small></span> <span data-v-f8f9989a="">累计流水：18万+</span></p>
            <img  class="fs" src="data:image/png;base64,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" alt="zg">
        <ul class="vip_table">
            <li>
                <span>VIP等级</span>
                <span>头 衔</span>
                <span>充值总额</span>
                <span>成长积分</span>
                <span>晋级奖励</span>
                <span>跳级奖励</span>
            </li>
        </ul>
        </section>
    </div>
</template>
<script>
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import userInfo from  "../../assets/js/api/userInfo";
    export default {
        data () {
            return {
            }
        },
        methods:{
            goback(){
                this.$router.push('/home')
            },
        },
        created() {
            var _this = this;
            // userBusiness.getUser(this,function (user) {
            //     _this.user=user;
            // });
            // this.getDividendAvailable(true);
        },
    }
</script>


<style lang="less" scoped>
 .header-box{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 0.44rem;
    width: 100%;
 }
 .vip-container-warp{
     width: 100%;
     margin-top: 0.44rem;
     background: #081025;;
     min-height: 100vh;
     text-align: center;
     .top-img,.lb-img{
         width: 100%
     }
     .wm-img{
         width: 80%;
         margin: 0 auto 0.3rem auto;
     }
    .list_vip{
        position: relative;
        width: calc(100% - 8vw);
        margin: 0.2rem auto;
        border: 0.01rem solid #eec569;
        background: #091837;
        i{
            position: absolute;
            display: block;
            width: 0.25rem;
            height: 0.28rem;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAuCAYAAACxkOBzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdDOTM5NjA3MTgyRDExRUE5RDM1ODk0ODgyMzNEMjZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdDOTM5NjA4MTgyRDExRUE5RDM1ODk0ODgyMzNEMjZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0M5Mzk2MDUxODJEMTFFQTlEMzU4OTQ4ODIzM0QyNkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0M5Mzk2MDYxODJEMTFFQTlEMzU4OTQ4ODIzM0QyNkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WfriHAAAC80lEQVR42uyZ30sUURTHz4wzu7O7s7M/3NV2S7fWdUNbS7M0tB+iQqElboKEWaAQFAQRmP0g6KEeoiik/onIoCwqCEF6sZ6CLITwJRAXE93a2t/Oj8760kuZP2a2u7ED8zT3Hj5877nnfu8ZirOWK5AjD0MSjI6l4dOz4B+/0yTBCjwL8aSYWWnqdy9ZsCYdxOKikhPKFlr1EIktSjkB63YaYG4hmRuwHjcPDEOFcgK2LuBI76osfJkTsNt8VoamqafEw9oEPRg5JlOiRok/FBprnDAXTnwvc4gy8cru21kMs/PJD6oft6HnrZoAh8LiR028gbt9VDXI/bXFcKEvoNRuYc4sN46INAi2lEI0vviWeNdVZOegud6FvoANghQBopU92VEGiaQ4qZciX4hWNmNcetq8ik3QdYKUJtt8nz9RKXP6gjFUdWol4/9ZGgR8Vuhq9YBBX3CM6GsNy9Bw/3K9hKoOoarzRMNeOVUllrhMIQQdWM28rKfBwcaN0vF2r1JAU3tXOzersNv9NuXepToK06AbVZ0mFtZXaoYHtw8oeN0eRNAna4mRFVi/R4DHQ80y7vwbCHpnrXE0h90dcMCju00yb2SuIug1YjsyvYe9Crop2WxiuxB0ZL3xNIHNdFZunquVG6qdcTQojQg6oUZc1WFb9rjg+tkaBXf8mMWsO4SgolqxGTV3+8W+Kqj0WdK8gel1cPFhkJKqCrFu2PJSAU53+6GhukiZ/5Z66HYae1BNWYv0WjNsfZUT+oM+qPBaYHo29oY3skc8tvTC3wx01mAz7Z2OphJISxQM9geUzzPR1xNTX9uONpgTADHN6zW1XOfbyDFQU2FfutDhma6YjYycWpTfuxyGAVzqsWz7iiVl8WSBokIDlG3icaMI4N8syDu22qHYzlHhSCpK09S7kg2mWwj4YmnWCly9ZrCTI50Q+ZGWULUolpwZC8+OI+AwfnqFBZ2UPsivnMWaSNT/BaLbR3nYPGweNg/7n8L+FGAAbezR1aSzrGsAAAAASUVORK5CYII=) 0 0 no-repeat;
            background-size: 100%;
        }
        .jiao1{
            top: -0.02rem;
            left: -0.02rem;
        }
        .jiao2{
            top: -0.03rem;
            right: 0rem;
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }
        .jiao3{
            right: -0.02rem;
            bottom: -0.02rem;
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
        }
        .jiao4{
            left: 0;
            bottom: -0.03rem;
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg);
        }
    }
        .vip_j{
            width: calc(100% - 8vw);
            margin: 0.1rem auto;
            border-radius: 0.03rem;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 0.08rem;
            background-image: -webkit-gradient(linear, left top, right top, from(#FFD451), color-stop(#FEED93), to(#FFD451));
            background-image: linear-gradient(to right, #FFD451, #FEED93, #FFD451);
            span {
                color: #000;
                small{
                color: #D45229;
                font-size: 0.14rem;
                }
            }
        }
        .fs{
            width: 80%;
            margin: 0.1rem auto;
        }
        .vip_table{
            width: calc(100%-8vw);
            margin: 0 auto;
            li:nth-child(1) {
                width: 100%;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: start;
                -ms-flex-pack: start;
                justify-content: flex-start;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                span{
                    display: block;
                    width: 16.66%;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    background: #40587E;
                    color: #fff;
                    border-left: 1px solid #27314B;
                    border-bottom: 1px solid #27314B;
                }
            }
        }
 }
</style>
