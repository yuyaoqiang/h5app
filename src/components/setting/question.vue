<template>
    <div>
      <div class="box-header">
        <header class="header-box">
            <div class="header-arrow-box" @click="goback">
                <i class="el-icon-arrow-left"></i>
            </div>
            <h1>常见问题</h1>
        </header>
      </div>
        
        <section class="report-height problem-main" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10" nfinite-scroll-immediate-check="false">
              <dl>
                  <dt>如何识别域名是否归属本平台？</dt>
                  <dd>
                      <b>1.</b>通过唯一的域名验证网址<a :href="setting.url">{{setting.url}}</a>验证域名是否属于本平台；
                  </dd>
                 <!-- <dd><b>2.</b>使用在<a :href="setting.url">{{setting.url}}</a>（我爱发）验证通过的网址登陆账号。</dd>-->
                        <!-- 在账户中心的修改密码中设置“登陆问候语”，设置后每次登陆平台都会提示此问候语，问候语与您  设置的一致，则是正确网址，反之则是仿冒平台。 -->
              </dl>
              <dl>
                <dt>登陆过程中跳转到谷歌界面？</dt>
                <dd><b>1.</b>账号输入错误导致。</dd>
                <dd><b>2.</b>帐号不存在。</dd>
                <dd><b>3.</b>当前域名为非系统指定域名，请联系上级或客服获取最新域名。</dd>
              </dl>
              <dl>
                <dt>公告提示有新功能，为何不能显示？</dt>
                <dd><b>1.</b>单击右键，点击重新载入页面，或者按下F5/Ctrl+F5刷新页面。</dd>
                <dd><b>2.</b>清理当前浏览器的本地缓存。</dd>
              </dl>
              <dl>
                <dt>忘记密码怎么办？</dt>
                <dd><b>1.</b>登录密码遗忘，可通过资金密码在平台登陆口重新设定登录密码。</dd>
                <dd><b>2.</b>资金密码遗忘，但有登录密码请联系在线客服协助处理。</dd>
                <dd><b>3.</b>建议您初始拿到帐号请到平台“账户中心”进行登陆密码、资金密码、登陆问候语的设定；并请妥善保管好您的资金密码，
                    如果资金密码和登录密码遗忘请联系在线客服协助修改。</dd>
              </dl>
              <dl>
                <dt>如何绑定银行卡？</dt>
                <dd><b>1.</b>请右在下角的【设置】点击【银行卡管理】，验证资金密码无误后即可进入银行卡信息页面，点击平台右上方或者左下方的“绑定银行卡”，
                    按照提示步骤即可绑定银行卡。</dd>
              </dl>
              <dl>
                <dt>无法绑定银行卡的原因：</dt>
                <dd><b>1.</b>您的这张银行卡在之前是否被绑定过（不可以重复绑定）；</dd>
                <dd><b>2.</b>您的开户人姓名是否与已绑定的银行卡开户人是一样的；</dd>
                <dd><b>3.</b>点击“绑定银行卡”后的第一步是验证已经绑定在平台上的银行卡，这一步需要输入的是已绑定的银行卡信息，不是新绑定的银行卡信息。</dd>
              </dl>
              <dl>
                <dt>平台充值限额及服务时间：</dt>
                <dd>
                  <p><b>1.</b>“工行在线充值”</p>
                  <p>服务时间：7*24小时</p>
                  <p>充值限额：单笔最低充值50，最高充值50000。</p>
                </dd>
                <dd>
                  <p><b>2.</b>“招行在线充值”</p>
                  <p>服务时间：7*24小时。</p>
                  <p>充值限额：单笔最低充值100，最高充值50000。</p>
                </dd>
                <dd>
                  <p><b>3.</b>“农行跨行到招行在线充值”</p>
                  <p>服务时间：7*24小时。</p>
                  <p>充值限额：充值限额：单笔最低充值100，最高充值50000。</p>
                </dd>
                <dd>
                  <p><b>4.</b>“建行跨行到招行在线充值”</p>
                  <p>服务时间：7*24小时。</p>
                  <p>充值限额：单笔最低充值100，最高充值50000。</p>
                </dd>
                <dd>
                  <p><b>5.</b>“他行跨行到民生银行在线充值”</p>
                  <p>服务时间：7*24小时。</p>
                  <p>充值限额：单笔最低充值100，最高充值50000。</p>
                </dd>
              </dl>
              <dl>
                <dt>平台提现限额及服务时间？</dt>
                <dd>
                  <p><b>1.</b>平台提现支持“工商银行”、“农业银行”等等。</p>
                  <p>服务时间：7*24小时。</p>
                  <p>提现限额：单笔最低提现100，最高提现50000。</p></dd>
              </dl>
              <dl>
                <dt>充值、提现如何免手续费？</dt>
                <dd><b>1.</b>同行充值返手续费：工行充值金额大于等于100；民生充值金额大于等于200；招行同行充值金额大于等于800；</dd>
                <dd><b>2.</b>跨行充值返手续费：工、农、建、交转民生，充值大于等于100；招行转民生，充值大于等于1000；农行、建行转招行，充值大于等于800；</dd>
                <dd><b>3.</b>提现：单笔提现金额100及100以上，并且投注额达到2天累计充值金额的10%后，提现免手续费。</dd>
              </dl>
              <dl>
                <dt>为什么充值没有即时到帐？ 以下几点都会引起您的充值不能到账，如果出现以下问题，请及时联系在线客服并提供银行回单截图。</dt>
                <dd><b>1.</b>汇款时未使用平台提供的最新银行信息；</dd>
                <dd><b>2.</b>汇款时附言（充值编码）填写错误或者未填写；</dd>
                <dd><b>3.</b>平台填写金额与实际汇款金额不一致；</dd>
                <dd><b>4.</b>建行在线充值时未使用绑定在平台的建行卡进行支付；</dd>
                <dd><b>5.</b>充值时间在平台服务时间外。</dd>
              </dl>
              <dl>
                <dt>游戏撤单问题？</dt>
                <dd><b>1.</b>任何彩种游戏的撤单都必须在停止投注之前进行，当期投注时间截止后将无法再进行撤单操作；</dd>
                <dd><b>2.</b>追号单的撤单需要到“追号任务信息”里面进行终止任务。</dd>
                <dd><b>3.</b>超过5000的撤单，将收取0.5%的手续费</dd>
              </dl>
              <dl>
                <dt>什么是“奖金限额”？平台奖金限额是多少？</dt>
                <dd><b>1.</b>每个账号在同一游戏、同一玩法、同一奖期中购买相同号码的最大可中奖金额。</dd>
                <dd><b>2.</b>高频彩（时时彩、时时乐、11选5）的奖金限额30万，低频彩（3D、排列三/五）的奖金限额15万。</dd>
              </dl>
              <dl>
                <dt>关于第3方开奖机构不开奖问题？</dt>
                <dd><b>1.</b>所有游戏，如遇第3方开奖机构不开奖,如果平台当日销售结束后官方依然没有开出号码,平台会对未获得开奖号码的期数进行撤单返款。
                    撤单后无论第三方以任何形式补开，平台均维持撤单处理。</dd>
              </dl>
              <dl>
                <dt>什么是动态奖金返点？</dt>
                <dd><b>1.</b>在投注的时候，会有个“选择奖金返点”，即动
                  态奖金返点。动态奖金返点是根据用户自身的返点，然后利用舍弃返点，来提高中奖金额的一种模式。</dd>
                <dd><b>2.</b>比如您重庆时时彩的前三直选的奖金是1800，返点是5%，那么在投注的时候可以选择动态奖金1900，
                    返点0%。这种情况下如果您中奖，那么奖金便是1900。</dd>
              </dl>
        </section>
    </div>
</template>
<script>

    import platformData from '../../assets/platform/main/platformData'
    import appController from '../../assets/js/business/app/appController'

    export default {
        data () {
            return {
                notices:{ },
                noticeDetails:{},
                dialogVisible: false,
                loading:false,
                loadicon:false,
                loadingDesc:"",
                setting:{}
            }
        },
        created(){
            this.setting=platformData.setting;
        },
        methods: {
            goback: function () {
                var appCtr = appController.getController();
                if (appCtr != null) {
                    appCtr.goback();
                    return;
                }
                this.$router.go(-1);
            },
            loadMore() {}
        }
    }
</script>


<style  scoped>
   .question_item{
      background: #fff;
      border: 1px solid #c1c1c1;
      padding: .2rem;
      cursor: pointer;
      font-size: 0.24rem;
      width: 85%;
      margin: 0.2rem auto;
      text-align:justify
   }
   .question_item>p {
      font-size:0.26rem;
      font-weight: bold;
      color: #d91e38;
   }
   .question_item li {
      margin: 0.1rem 0 0.1rem 0.2rem;
      text-align:justify;
   }
   .question_item li>span{
      color: #d91e38;
   }  
</style>
