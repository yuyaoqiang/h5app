<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>代理中心</h1>
            </header>
        </div>
        
        <section  class="report-height">
            <router-link tag="ul" to="teamReport"  class="display-flex report-list">
                <li class="flex-box">团队盈亏</li>
                <li class="report-icon"><i class="el-icon-arrow-right"></i></li>
            </router-link>
          <!--  <router-link tag="ul" to="team"  class="display-flex report-list">
                <li class="flex-box">团队总览</li>
                <li class="report-icon"><i class="el-icon-arrow-right"></i></li>
            </router-link>-->
            <router-link tag="ul" to="memberManagement"  class="display-flex report-list">
                <li class="flex-box">会员管理</li>
                <li class="report-icon"><i class="el-icon-arrow-right"></i></li>
            </router-link>
            <router-link  tag="ul" to="registerTheLink"  class="display-flex report-list">
                <li class="flex-box">注册链接</li>
                <li class="report-icon"><i class="el-icon-arrow-right"></i></li>
            </router-link>
            <router-link  tag="ul" to="teamLottery"  class="display-flex report-list">
                <li class="flex-box">团队彩票</li>
                <li class="report-icon"><i class="el-icon-arrow-right"></i></li>
            </router-link>
            <router-link  tag="ul" to="teamKGLottery"  class="display-flex report-list">
                <li class="flex-box">团队KG</li>
                <li class="report-icon"><i class="el-icon-arrow-right"></i></li>
            </router-link>
        </section>

        <footer class="footer-box" @click="toGeneralize" v-if="user.isShare==true">
            <img src="../../assets/images/pic.png" alt="">
        </footer>
    </div>
</template>

<script>
    import userBusiness from '../../assets/js/business/user/userBusiness.js';
    export default {
        data () {
            return {
                user: {},
            }
        },
        created(){
            let _this = this;

            userBusiness.getUser(this, function (user) {
                _this.user = user;
            },true)
        },
        methods: {
            goback: function(){
                this.$router.push('/account');
            },
            toGeneralize(){
                this.$router.push('/generalize');
            },
        },
    }
</script>