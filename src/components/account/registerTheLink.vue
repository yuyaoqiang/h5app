<template>
    <div>
        <div class="box-header">
            <header class="header-box">
                <div class="header-arrow-box" @click="goback">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <h1>注册链接列表</h1>
                <router-link tag="div" to="newRegisterLink"  class="member-icon">
                <i class="iconfont icon-tou_bianji"></i>
                </router-link>
            </header>
        </div>
        <section class="report-height" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10"
                 nfinite-scroll-immediate-check="false">
            <div v-for="item in registerLinkList.MIR" class="link-content">
                <ul class="display-flex link-time">
                    <li class="flex-box">生成时间：<span>{{item.createdt | time}}</span></li>
                    <li><span class="link-level">{{registerLinkList.TYPE[item.usertype]}}</span></li>
                </ul>
                <ul class="display-flex link-register">
                    <li class="flex-box link-address">推荐码：<span class="orange link-reg-code" >{{item.newRegCode}}</span></li>
                    </li>
                    <li class="link-img" @click="showDialog(item.currentRegUrl,'扫一扫注册')"><img
                            src="../../assets/images/code_icon.png"></li>
                    <li class="link-img" v-if="item.wechatRegUrl != null"
                        @click="showDialog(item.wechatRegUrl,'微信扫一扫登录')"><img
                            src="../../assets/images/code_icon_wechat.png"></li>
                </ul>
                <ul class="display-box link-delete">
                    <li>{{item.enabled==1?'已启用':'已禁用'}}</li>
                    <li class="last-link">{{item.regTypeDesc}}</li>
                    <li>返点:{{item.bonus}}</li>
                </ul>
                <ul class="display-box link-delete">
                    <li @click="linkOff(item.uniquess)">{{item.enabled==1?'禁用':'启用'}}</li>
                    <li @click="linkDelete(item.uniquess,$event)">删除</li>
                </ul>
            </div>
            <div class="recording-no"><i class="el-icon-loading" v-if="loadicon"></i><span>{{loadingDesc}}</span></div>
        </section>
        <div v-show="showCodeDialog">
            <div class="cover-bg"></div>
            <div class="link-alert">
                <span class="copy-url"
                      v-clipboard:copy="qrCodeVal"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError">
                    <img src="../../assets/images/copy.png" alt="copy">
                </span>
                <h1>{{qrCodeDesc}}</h1>
                <div class="link-code-img"></div>
            </div>
            <div class="alert-close" @click="showCodeDialog = false"></div>
        </div>
    </div>
</template>

<script>
    import userInfo from "../../assets/js/api/userInfo";
    import arrayUtil from '../../assets/js/util/arrayUtil.js';
    import stringUtil from '../../assets/js/util/stringUtil.js';
    import   '../../assets/js/lib/jquery.qrcode.min.js';

    export default {
        data () {
            return {
                headSetting: {
                    title: '注册链接列表',
                    backButtonVisible: true,
                    menuButtonVisible: true,
                    showMenu: false,
                    showH5Head: false
                },
                showCodeDialog: false,

                registerLinkList: {
                    MIR: []
                },
                ccPage: 0,
                loading: false,
                loadicon: false,
                loadingDesc: "",
                qrCodeDesc: null,
                qrCodeVal: null,
                isHttps:'',
            }
        },
        created(){
            //this.search();
            this.isHttps = window.location.protocol;

        },

        methods: {
            onCopy(e) {
                this.lalterSuccess("复制成功")
            },
            onError(e) {
                this.lalterError("复制失败")
            },
            toNewRegisterLink(){
                this.$router.push({path: '/newRegisterLink'})
            },
            goback: function () {
                this.$router.go(-1);
            },
            showDialog(url, desc){
                var _this = this;
                $(".link-code-img").empty();


                _this.lshowWait("正在生成二维码")
                setTimeout(function () {
                    _this.lcloseWait();
                    _this.createQRCode(url);
                    _this.showCodeDialog = true;
                    _this.qrCodeVal = url;
                    _this.qrCodeDesc = desc;
                }, 300)
            },
            loadMore(){
                let _this = this;
                this.loading = true;
                this.loadicon = true;
                this.ccPage++;
                this.loadingDesc = "";
                let params = {ccPage: this.ccPage};
                userInfo.getRegisterCodeLink(params, (res) => {
                    var data = res.data;
                    _this.loading = data.PAGE.count < 10;
                    if (res.code == 200) {
                        _this.registerLinkList.TYPE = data.TYPE
                        _this.registerLinkList.ENABLED = data.ENABLED
                        _this.registerLinkList._CurrentURL = data._CurrentURL
                        let respData = data.MIR;

                        var wechatUrl = data.wechatUrl;
                        if (stringUtil.isBlank(wechatUrl) == false) {
                            wechatUrl = _this.correctUrl(wechatUrl);
                        }

                        var pcUrl = data._CurrentURL;
                        if(_this.isHttps=='https:'){
                            pcUrl = this.isHttps + data._CurrentURL.split(':')[1]
                        }
                        if (stringUtil.isBlank(pcUrl) == false) {
                            pcUrl = _this.correctUrl(pcUrl);
                        }


                        for (var i = 0; i < respData.length; i++) {
                            var item = respData[i];
                            item.userTypeDesc = data.TYPE[item.usertype];
                            item.regTypeDesc = data.regType[item.regType];


                            var regUri = data.regUri+"?code=" + item.newRegCode;
                            item.regUri="/"+regUri;

                            if (wechatUrl) {
                                item.wechatRegUrl = wechatUrl + regUri;
                            }

                            if(item.newRegCode){
                                item.currentRegUrl = pcUrl + regUri;
                            }else {
                                item.currentRegUrl =item.linkpwd;
                            }
                        }
                        arrayUtil.pushAll(_this.registerLinkList.MIR, data.MIR);
                        if (_this.registerLinkList.MIR.length == 0) {
                            _this.loadingDesc = "暂无数据";
                        } else {
                            _this.loadingDesc = "";
                        }
                    } else {
                        _this.lalterWarning(res.msg);
                    }
                    _this.loadicon = false;
                });
            },
            linkOpen: function (url) {
                window.open(url);
            },
            linkOff(uniquess){
                //禁用连接
                var _this = this;

                var item = arrayUtil.findFirst(_this.registerLinkList.MIR, m => {
                    return m.uniquess == uniquess
                });
                var params = {unique: item.uniquess};

                this.lconfirm("是否确定" + (item.enabled == 1 ? '禁用' : '启用'), null, function () {
                    userInfo.offLink(params, (res) => {
                        if (res.code == 200) {
                            _this.lalterSuccess(res.msg);
                            item.enabled = item.enabled == 1 ? 2 : 1;
                        } else {
                            _this.lalterError("操作失败");
                        }

                    });
                })
            },
            linkDelete(uniquess, event){
                //删除连接
                var _this = this;
                var params = {unique: uniquess}
                this.lconfirm("是否确定要删除", null, function () {
                    userInfo.deleteLink(params, function (res) {
                        _this.lalterSuccess(res.msg);
                        if (res.code == 200) {
                            $(event.target).parents(".link-content").hide();
                        }
                        _this.loadMore();
                    });
                })
            },

            correctUrl(url){
                if (url[url.length - 1] == "/") {
                    return url;
                }

                return url + "/";
            },
            createQRCode(url){
                let _this = this;
                $(".link-code-img").qrcode({
                    render: "canvas",
                    width: 200,
                    height: 200,
                    correctLevel: 0,
                    text: url,
                })
            }
        },

        components: {},
        watch:{
            "showCodeDialog":function(a,b){
                if(a==true){
                    methodsScroll.forbidScroll();  
                   
                }else{
                    methodsScroll.enabledScroll();  
                   
                }
            }
        }
    }
</script>
<style>

</style>
