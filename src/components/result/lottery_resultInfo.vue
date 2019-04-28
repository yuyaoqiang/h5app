<template>
  <section class="display-vertical pl-height">
    <header class="pr header-box">
      <div class="header-arrow-box" id="back_icon" @click="goback">
        <i class="el-icon-arrow-left back-icon"></i>
      </div>
      <h1 class="header-title">重庆时时彩</h1>
    </header>
    <section class="tab-nav-box">
      <ul class="display-box text-center tab-nav1" v-for="item in resultRecord.current">
        <li>第{{item.issueno}}期</li>
        <li>距离开奖：<img src="../../assets/images/countdown-icon.png"
                      style="width: 0.32rem;height: 0.32rem;line-height: 0.96rem; text-align: center;vertical-align: middle;margin-right: 0.16rem"><span
                class="orange">03:29</span></li>
      </ul>
    </section>
    <div class="wrap-content">
      <section class="flex-box betting-main">
        <div class="display-flex lottery-info" v-for="item in resultRecord.history">
          <div class="fl">
            <span>第{{item.issueno}}期</span>
            <!--<p style="margin-left: 4rem;">29期</p>-->
          </div>
          <div class="fr">
            <div class="display-flex">
              <ul class="flex-box lottery-num">
                <li>{{item.nums | at(0)}}</li>
                <li>{{item.nums | at(1)}}</li>
                <li>{{item.nums | at(2)}}</li>
                <li>{{item.nums | at(3)}}</li>
                <li>{{item.nums | at(4)}}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="foot">
      <button type="submit">立即投注</button>
    </footer>
  </section>
</template>

<script>
//  import dateUtil  from './dateUtil.js';
  import RecordList  from '../../assets/js/api/recordSearchApi.js';


  var splitNumString = this.value.split(' ');
  export default {
    data () {
      return {
          resultRecord: {}
      }
    },
    methods: {
      goback: function(){
        this.$router.go(-1);
      }
    },
    created() {
      var params = {
        gameID: 10
      }
      var _this = this
      RecordList.LoadRecordList(params,function(res){
        _this.resultRecord = res.data
      });
    },

  }
</script>


<style scoped>


</style>
