import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new  Vuex.Store({
   state:{
       msgCount: 0,
       allAuditStatus: 1 //1:完成所有审核 2：有未完成的审核
   },

   getters:{
       getMsgCount(state){
         return state.msgCount
       },
       getAuditStatus(state){
         return state.allAuditStatus
       }
   },

   mutations:{
       addCount(state, num){
           state.msgCount = state.msgCount + num
       },
       changeAuditStatus(state, num){
           state.allAuditStatus =  num
       }
   }

})
