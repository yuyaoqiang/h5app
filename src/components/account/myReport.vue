<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>我的报表</h1>
            </header>
        </div>
        
        <section  class="report-height">
            <ul class="display-flex report-list"  @click="toReport({path:'report'})">
                <li  class="flex-box">盈亏报表</li>
                <li class="report-icon"><i class="el-icon-arrow-right"></i></li>
            </ul>
            <ul class="display-flex report-list" @click="toMoneyRecord({path:'moneyRecord'})">
                <li class="flex-box">账变记录</li>
                <li class="report-icon"><i class="el-icon-arrow-right"></i></li>
            </ul>
            <ul class="display-flex report-list" @click="toCpzb({path:'cpzb'})">
                <li class="flex-box">彩票账变</li>
                <li class="report-icon"><i class="el-icon-arrow-right"></i></li>
            </ul>

            <ul class="display-flex report-list" @click="toZbmx({path:'kgzb'})">
                <li class="flex-box">KG账变</li>
                <li class="report-icon"><i class="el-icon-arrow-right"></i></li>
            </ul>


            <ul class="display-flex report-list"  @click="toZbmx({path:'zbmx'})">
                <li  class="flex-box">账变明细</li>
                <li class="report-icon"><i class="el-icon-arrow-right"></i></li>
            </ul>
        </section>
    </div>
</template>

<script>
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    export default {
        data () {
            return {
                user:{},
            }
        },
        created() {
            var _this = this;
            userBusiness.getUser(_this,function (user) {
                _this.user = user;
            });
        },
        methods: {
            toMoneyRecord(path){
                var _this = this;
                var falg = userBusiness.checkIsTryPlayer();
                if(falg){
                    return;
                }
                var amps = userBusiness.getAccountMenuPermissions();
                var cztx = amps.cztx;
                if (cztx.persmission == true) {
                    var wycz = cztx.sub["充值记录"] || {};
                    if (wycz["all"] != true) {
                        _this.$router.push(path);
                        return;
                    }
                }
                _this.lalterWarning("账变记录功能暂时关闭,若有疑问请联系客服!");
            },
            toCpzb(path){
                var _this = this;
                var falg = userBusiness.checkIsTryPlayer();
                if(falg){
                    return;
                }
                var amps = userBusiness.getAccountMenuPermissions();
                var grzx = amps.grzx;
                if (grzx.permission == true) {
                    var myAccount = grzx.sub['我的报表'] || {};
                    if (myAccount["all"] != true) {
                        var cpzb = myAccount['彩票帐变'] || {};
                        if(cpzb["all"]!= true){
                            _this.$router.push(path);
                            return;
                        }
                    }
                }
                _this.lalterWarning("彩票账变功能暂时关闭,若有疑问请联系客服!");
            },
            toReport(path){

                var _this = this;
                var falg = userBusiness.checkIsTryPlayer();
                if(falg){
                    return;
                }
                var amps = userBusiness.getAccountMenuPermissions();
                var grzx = amps.grzx;
                if (grzx.permission == true) {
                    var myAccount = grzx.sub['我的报表'] || {};
                    if (myAccount["all"] != true) {
                        var ykbb = myAccount['日结报表'] || {};
                        if(ykbb["all"]!= true){
                            _this.$router.push(path);
                            return;
                        }
                    }
                }
                _this.lalterWarning("盈亏报表功能暂时关闭,若有疑问请联系客服!");
            },
            toZbmx(path){
                var _this = this;
                var falg = userBusiness.checkIsTryPlayer();
                if(falg){
                    return;
                }
                var amps = userBusiness.getAccountMenuPermissions();
                var grzx = amps.grzx;
                if (grzx.permission == true) {
                    var myAccount = grzx.sub['我的报表'] || {};
                    if (myAccount["all"] != true) {
                        var cpzb = myAccount['帐变明细'] || {};
                        if(cpzb["all"]!= true){
                            _this.$router.push(path);
                            return;
                        }
                    }
                }
                _this.lalterWarning("账变明细  功能暂时关闭,若有疑问请联系客服!");
            },
            goback: function() {
                this.$router.push('/account');
            }
        },
        components: {}
    }
</script>
