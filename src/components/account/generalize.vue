<template>
    <div>
      <div class="generalize-bg"></div>
          <div  class="generalize">
            <header class="generalize-header">
              <span class="generalize-close" @click="toAgentCenter">
                <img src="../../assets/images/account/generalize-Close.png" alt="" >
                关闭</span>
              <h1>邀请推广</h1>
          </header>
          <main class="generalize-main">
              <div class="main-bgwz">
                  <img src="../../assets/images/account/generalize-wz.png" alt="">
              </div>
              <div class="main-box">
                  <p>长按保存您的专属二维码</p>
                  <div class="erweima">
                      <div class="link-code-img" style="display:none"></div>
                      <div class="link-code-img1"></div>
                  </div>
                  <div class="link-btn"  v-clipboard:copy="regUrl"
                                         v-clipboard:success="onCopy"
                                         v-clipboard:error="onError">
                      <img src="../../assets/images/account/generalize-btn.png" alt="">
                  </div>
                  <div class="link">
                      <span>{{regUrl}}</span>
                  </div>
              </div>
          </main>
          </div>
    </div>
</template>

<script>
import userInfoApi from '../../assets/js/api/userInfo'

    export default {
        data () {
            return {
              regUrl: "",
            }
        },
        methods: {
            toAgentCenter(){
              this.$router.push('/agentCenter');
            },
            createQRCode(url){
                $(".link-code-img").qrcode({
                    render: "canvas",
                    width: 200,
                    height: 200,
                    correctLevel: 0,
                    text: url,
                })
            },
            onCopy(e) {
                this.lalterSuccess("复制成功")
            },
            onError(e) {
                this.lalterError("复制失败")
            },
            convertCanvasToImage(canvas){
                var image = new Image();
                image.src = canvas.toDataURL("image/png");
                return image;
            },
        },
        created() {
            let _this = this;
            userInfoApi.regCode((res)=>{
                if(res.code == '200'){
                    if(res.data.sysDefaultRegCode != '' && res.data.sysDefaultRegCode !=null){
                        _this.regUrl = window.location.origin+window.location.pathname+`#/reg?code=${res.data.sysDefaultRegCode}`;
                    }
                    _this.createQRCode(_this.regUrl);
                    var myCanvas = document.getElementsByTagName("canvas")[0];
                    var img = _this.convertCanvasToImage(myCanvas);
                    $(".link-code-img1").append(img);
                }
            });
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/platform/main/platform.less";
    .generalize{
        position: relative;
        z-index: 1;
        .generalize-header {
            background: #ffffff;
            width: 100%;
            height: 0.44rem;
            line-height: 0.44rem;
            h1 {
                font-size: 0.16rem;
                font-weight: normal;
                text-align: center;
                color: rgb(51, 51, 51)
            }
        }
        .generalize-close {
            position: absolute;
            left: 0.08rem;
            top:0;
            z-index: 4;
            width: 0.46rem;
            height: 0.44rem;
            line-height: 0.44rem;
            text-align: center;
            font-size: 0.14rem;
            font-weight: 600;
            color: rgb(0, 0, 0);
            vertical-align:middle;
        }
        .generalize-main {
            padding: 0.2rem 0.2rem 0;
            .main-bgwz {
                margin-bottom: 0.1rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .main-box {
                // position: relative;
                border-radius: 0.14rem;
                background: #f5f6f7;
                text-align: center;
                margin: 0 auto;
                padding: 0.1rem 0.25rem 0.3rem;
                p {
                    font-size: 0.16rem;
                    color: rgb(0,0,0);
                }
                .erweima {
                    padding: 0.16rem 0 0.24rem;
                    .link-code-img1 {
                        width: 200px;
                        height:200px;
                        margin: 0 auto;
                    }
                }
                .link-btn img{
                    width: 100%;
                }
                .link {
                    position: relative;
                    height: 0.2rem;
                    margin-top: 0.15rem;
                    span {
                      font-size: 0.14rem;
                    }
                }
            }
        }
    }
    .link::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 0.04rem;
        top: -6px;
        display: block;
        box-shadow: 3px 0 0 -1px #846b57 inset, -3px 0 0 -1px #846b57 inset, 0 3px 0 -1px #846b57 inset;
        -webkit-box-shadow: 3px 0 0 -1px #846b57 inset, -3px 0 0 -1px #846b57 inset, 0 3px 0 -1px #846b57 inset;
    }
    .generalize-bg{
        position: fixed;
        left: 0;
        top:  0;
        right: 0;
        bottom: 0;
        background:url("../../assets/images/account/generalize-bg.jpg") no-repeat center top  #c70102;
        background-size: 100% 100%;
    }
</style>