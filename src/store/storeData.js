/**
 * Created by Owner on 2017/4/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        touzhuList:0,
        winLossReport:{}
    },
    mutations: {
        //暂时测试使用
        zhudan(state,choiceData){
            state.touzhuList += choiceData
        }
    }
})