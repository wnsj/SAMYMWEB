import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new  Vuex.Store({
   state:{
       msgCount: 0
   },
   
   getters:{
       getMsgCount(state){
         return state.msgCount
       }
   },
   
   mutations:{
       addCount(state, num){
           state.msgCount = state.msgCount + num
       }
   }

})
