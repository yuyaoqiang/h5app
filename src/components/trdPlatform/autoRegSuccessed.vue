<style scoped lang="less">
    .bdlogin-con {
        padding:0 0.15rem;
    }
    .bdsuccess-img {
        width: 50%;
        margin: 0.3rem auto 0.2rem;
        height: 1.2rem;
    }
    .bdsuccess-img img{
        width: 100%;
        height: 100%;
    }
    .success-info {
        color: #7f8580;
        font-size: 0.14rem;
        text-align: center;
    }
    .success-userinfo {
        margin-top: 0.3rem;
    }
    .success-userinfo li{
        width: 50%;
        margin: 0.1rem auto;
        text-align: left;
        color: #000;
    }
    .success-userinfo li span.title{
        color: #7f8580;
        font-size: 0.14rem;
    }
    .success-btn-gp {
        margin-top: 0.4rem;
    }
    .login-btn{
        font-weight: normal;
    }

</style>
<template>
    <div>
        <div>
            <section class="bdlogin-con">
                <div class="bdsuccess-img">
                    <img src="../../assets/images/wechat_bind.png" alt="">
                </div>
                <p class="success-info">恭喜您的{{typeDesc}}已成功绑定{{setting.name}}</p>
                <ul class="success-userinfo">
                    <li>
                        <span class="title">账号：</span>
                        <span >{{query.userName}}</span>
                    </li>
                    <li>
                        <span class="title">昵称：</span>
                        <span >{{query.nickName}}</span>
                    </li>

                    <li v-if="query.password != null">
                        <span class="title">密码：</span>
                        <span >{{query.password}}</span>
                    </li>

                </ul>
                <div class="success-btn-gp">
                    <button v-if="query.password != null" type="button"   @click="toModifyPassword" class="login-btn modify-password">修改密码</button>
                    <button type="button"   @click="toIndex" class="login-btn">进入游戏</button>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    import platformData from '../../assets/platform/main/platformData'

    import trdAuthAccount from "../../assets/js/api/trdAuthAccount";
    import securityApi from "../../assets/js/api/securityApi";
    import stringUtil from "../../assets/js/util/stringUtil";
    import userInfo from "../../assets/js/api/userInfo";
    import userBusiness from "../../assets/js/business/user/userBusiness";
    import trdAuthAccountBusiness from "../../assets/js/business/user/trdAuthAccountBusiness";

    export default {
        data(){
            return {
                headSetting: {
                    backButtonVisible: false
                },
                setting:null,

                query:{

                },
                typeDesc:null
            }
        },

        created(){
            this.setting = platformData.setting;
            this.query=this.$route.query;
            this.typeDesc=trdAuthAccountBusiness.getTrdAccountDesc(this.query.type);

        },

        methods: {

            toIndex(){
                this.$router.push({path:"index"})
            },

            toModifyPassword(){
                this.$router.push({path:"loadPassword"})
            }
        }
    }
</script>
