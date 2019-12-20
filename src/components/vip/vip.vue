<template>
    <div>
        <header class="pr header-box">
            <div class="header-arrow-box" id="back_icon" @click="goback">
                <i class="el-icon-arrow-left back-icon"></i>
            </div>
            <h1 class="header-title">VIP详情</h1>
        </header>
        <section class="vip-container-warp">
            <img class="top-img" src="../../assets/images/vip/top.png" alt="top">
            <div class="list_vip">
                <ul>
                    <li :class="userGrade>=item?'vip':''" v-for="(item) in vipLevel" :key="item">
                        <p>
                            <img  v-if="userGrade>=item" class="flare" src="../../assets/images/vip/flare.png" alt="">
                            <img  v-if="userGrade<item" class="vip-level-icon"  :src="require('../../assets/images/vip/vip'+item+'.png')"  alt="">
                            <img  v-if="userGrade>=item" class="vip-level-icon"  :src="require('../../assets/images/vip/vip'+item+'_x.png')"  alt="">
                        </p>
                        <span>vip{{item}}</span>
                    </li>
                </ul>
            </div>
            <div class="current-vip-wrap">
                 <section>
                     <h3>VIP等级：{{user.userGrade}}</h3>
                     <span>充值总额:{{grade.curMoney}}</span>
                     <span>成长积分:{{grade.curMoney}}</span>
                     <span>下次晋级奖励:{{grade.nextAward}}元</span>
                 </section>
                 <img class="top-img" src="../../assets/images/vip/vip-bg.png" alt="top">
                 <div class="vip-button-wrap" @click="receiveVipAward()">
                     <img src="../../assets/images/vip/vip-button.png"  alt="">
                 </div>
            </div>
        <article>
            <ul class="vip_table">
                <li>
                    <span>VIP等级</span>
                    <span>头 衔</span>
                    <span>充值总额(元)</span>
                    <span>成长积分</span>
                    <span>晋级奖励(元)</span>
                    <span>跳级奖励(元)</span>
                </li>
                <li class="vip_level_list vip1">
                    <span>VIP1</span>
                    <span>倔强青铜</span>
                    <span>0</span>
                    <span>0</span>
                    <span>0</span>
                    <span>0</span>
                </li>
                <li class="vip_level_list vip2">
                    <span>VIP2</span>
                    <span>秩序白银</span>
                    <span>100</span>
                    <span>100</span>
                    <span>1</span>
                    <span>1</span>
                </li>
                <li class="vip_level_list vip3">
                    <span>VIP3</span>
                    <span>荣耀黄金</span>
                    <span>5000</span>
                    <span>5000</span>
                    <span>5</span>
                    <span>6</span>
                </li>
                <li class="vip_level_list vip4">
                    <span>VIP4</span>
                    <span>尊贵铂金</span>
                    <span>10000</span>
                    <span>10000</span>
                    <span>10</span>
                    <span>16</span>
                </li>
                <li class="vip_level_list vip5">
                    <span>VIP5</span>
                    <span>梦幻水晶</span>
                    <span>50000</span>
                    <span>50000</span>
                    <span>38</span>
                    <span>54</span>
                </li>
                <li class="vip_level_list vip6">
                    <span>VIP6</span>
                    <span>永恒钻石</span> 
                    <span>100000</span>
                    <span>100000</span>
                    <span>88</span>
                    <span>142</span>
                </li>
                <li class="vip_level_list vip7">
                    <span>VIP7</span>
                    <span>贵族皇冠</span>
                    <span>500000</span>
                    <span>500000</span>
                    <span>588</span>
                    <span>730</span>
                </li>
                <li class="vip_level_list vip8">
                    <span>VIP8</span>
                    <span>至尊星耀</span>
                    <span>100万</span>
                    <span>100万</span>
                    <span>1888</span>
                    <span>2618</span>
                </li>
                <li class="vip_level_list vip9">
                    <span>VIP9</span>
                    <span>最强王者</span>
                    <span>500万</span>
                    <span>500万</span>
                    <span>8888</span>
                    <span>11506</span>
                </li>
                <li class="vip_level_list vip10">
                    <span>VIP10</span>
                    <span>超级彩神</span>
                    <span>1000万</span>
                    <span>1000万</span>
                    <span>18888</span>
                    <span>30394</span>
                </li>
            </ul>
        </article>
         <section class="vip_active-detail">
            <div class="vip-detail-title"><h4>活动说明</h4></div>
            <p class="vip-detail">1.会员每晋级一个等级，都会获得奖励，最高可获得<span class="color-red">18888</span>元,跳级奖励最高可获得<span class="color-red">30394</span>元</p>
            <p class="vip-detail">2.充值1元可获得1成长积分</p>
            <p class="vip-detail">3.充值后需要等待1小时,用户等级晋级后才可以领取奖励!如有任何疑问,请咨询亚博客服!</p>
        </section>    
        </section>
    </div>
</template>
<script>
    import userBusiness  from '../../assets/js/business/user/userBusiness';
    import userInfo from  "../../assets/js/api/userInfo";
import messageBox from '../../controls/messageBox';
    export default {
        data () {
            return {
                vipLevel:[1,2,3,4,5,6,7,8,9,10],
                userGrade:1,
                user:{
                    userGrade:1
                },
                userGrade:0,
                grade:{},
            }
        },
        methods:{
            goback(){
                this.$router.push('/home')
            },
            getUserGradeList(){
                var _this = this;
                userInfo.getUserGradeList(res=>{
                    if(res.code==201){
                        _this.grade = res.data;
                 
                    }
                })
            },
            receiveVipAward(){
                userInfo.receiveVipAward({userGrade:this.user.userGrade},res=>{
                    messageBox.alterSuccess(res.msg);
                    this.getUser();
                    this.getUserGradeList();
                })
            },
            getUser(){
                var _this = this;
                userBusiness.getUser(this,function (user) {
                _this.user=user;
                _this.userGrade = user.userGrade?user.userGrade.slice(3):0;
            });
            }
        },
        created() {

            this.getUser();
            this.getUserGradeList();
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
    z-index: 9999;
 }
 .vip-container-warp{
     width: 100%;
     margin-top: 0.44rem;
     background: #ffffff;
     min-height: 100vh;
     text-align: center;
     display: flex;
     flex-flow: column;
     align-items: center;
     .top-img,.lb-img{
         width: 100%
     }
     .wm-img{
         width: 80%;
         margin: 0 auto 0.3rem auto;
     }
     .color-red{
         color: #f94245;
     }
    .vip_active-detail{
        margin-bottom: 0.1rem;
        width: 92%;
        padding: 0.05rem 0 0.08rem 0.1rem;
        border-radius: 0.1rem;
        background: #fff;        
        .vip-detail{
            text-align: left;
        }     
        .vip-detail-title{
            color: #f94245;
            border-bottom: 1px solid red;
            h4{
                padding: 0.05rem;
            }
        }
    }
     .current-vip-wrap{
        position: relative;
        margin-top: 0.1rem;
        width: 94%;
         .vip-button-wrap{
            position: absolute;
            right: 0.1rem;
            bottom: 0.1rem;
            width: 1rem; 
            img{
                width: 100%;
                animation: heart  0.8s infinite;
            }           
         }
         section{
             position: absolute;
             top: 0;    
             left: 0;
             color: #fff;
             display: flex;
             flex-flow: column;
             padding-left: 0.4rem;
             padding-top: 0.2rem;
             h3{
                 padding: 0.1rem 0;
             }
             span{
                 padding-bottom: 0.1rem;
             }
         }
         img{
             width: 100%;
         }
     }
    .list_vip{
        position: relative;
        background: #fff;
        p{
            position: relative;
            padding-top: 0.08rem;
        }
        ul{
            display: flex;
            flex-flow: wrap;
            display: flex;
            justify-content: center;
            background: #e6e3e3;
            // border-radius: 0.1rem;
            li{
                position: relative;
                box-shadow: -1px 0 0 #f4f4f4 inset, 0 -1px 0 #f4f4f4;
                -webkit-box-shadow: -1px 0 0 #f4f4f4 inset, 0 -1px 0 #f4f4f4;
                padding: 0.05rem 0;
                flex: 1 1 20%;
                display: flex;
                justify-content: center;
                flex-flow: wrap;
                .vip-level-icon{
                    position: relative;
                    width: 70%;
                }
                .flare{
                    position: absolute;
                    width: 70%;
                    animation: circle 3s infinite linear;
                    z-index: 9;
                    filter:sepia(50%)
                }
            }
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
                padding: 0 0.05rem;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: start;
                -ms-flex-pack: start;
                justify-content: flex-start;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                margin: 0.08rem 0;
                border-radius: 0.1rem;
                background: #f94245;
                -moz-box-shadow:0px 2px 7px 2px #fff;
                -webkit-box-shadow:0px 2px 7px 2px #fff;
                box-shadow:0px 2px 7px 2px #fff;
                span{
                    display: block;
                    width: 16.66%;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    color: #fff;
                }
            }
        }
 }
 .vip{
    background-color: #d6d6d6;
    background-image: linear-gradient(0deg, #d6d6d6 0%, #bfbfbf 50%, #9e9e9e 100%);
 }
 article{
     width: 100%;
 }
 .vip-detail{
     padding: 0.02rem 0 ;
 }
 .vip_level_list{
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
    padding: 0.08rem 0;
    margin: 0.08rem 0;
    border-radius: 0.1rem;
    border: 1px solid #c3c3c3;
    // -moz-box-shadow:0px 2px 7px 2px #fff;
    // -webkit-box-shadow:0px 2px 7px 2px #fff;
    // box-shadow:0px 2px 7px 2px #fff;
    span{
        display: block;
        width: 16.66%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #524e4e;
    }
 }
//  .vip1{
//        background: rgb(255, 196, 196);
//  }
//  .vip2{
//         background: rgb(250, 146, 150);
//  }
//  .vip3{
//        background: rgb(248, 138, 142);
//  }
//  .vip4{
//        background: rgb(250, 132, 136);
//  }
//  .vip5{
//        background: rgb(252, 123, 127);
//  }
//  .vip6{
//        background: rgb(250, 113, 118);
//  }
//  .vip7{
//        background: rgb(250, 104, 109);
//  }
//  .vip8{
//        background: rgb(253, 95, 100);
//  }
//  .vip9{
//        background: rgb(252, 82, 87);
//  }
//  .vip10{
//        background: rgb(255, 70, 75);
//  }
@keyframes circle{
0%{ 
    transform:rotate(0deg);
      transform-origin: 50% 50%;
     }
100%{ 
    transform:rotate(360deg);
     transform-origin: 50% 50%;
     }
}
@keyframes heart{
    0% {
    -webkit-transform: scale(0.95, 0.95);
    }
    25% {
        -webkit-transform: scale(1.05, 1.05);
    }
    100% {
        -webkit-transform: scale(0.95, 0.95);
    }
}
</style>
