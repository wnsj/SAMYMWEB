import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
import MainPage from '@/components/MainPage.vue'
/*------------*/
import Employee from '../components/MP/Employee.vue'
import Member from '../components/MP/Member.vue'
import Charge from '../components/MP/Charge.vue'
import Position from '../components/MP/Position.vue'
import Order from '../components/MP/Order.vue'
import Royalty from '../components/MP/Royalty.vue'
import SettleSummary from '../components/MP/SettleSummary.vue'
import MemberSummary from '../components/MP/MemberSummary.vue'
import RoyaltySummary from '../components/MP/RoyaltySummary.vue'
import Store from '../components/MP/Store.vue'
import RuleManager from '../components/MP/RuleManager.vue'
import CashDeposit from '../components/MP/CashDeposit.vue'
import test from '../components/MP/test.vue'

Vue.use(Router)

//解决路由多次跳转同一页面报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    //console.log("err：" + err)
  });
}

export default new Router({
  routes: [{
      path: '/login',
      component: login,
      hidden: true
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage,
      children: [{
          path: '/MP/RoyaltySummary',
          name: 'RoyaltySummary',
          component: RoyaltySummary,
        },
        {
          path: '/MP/MemberSummary',
          name: 'MemberSummary',
          component: MemberSummary,
        },
        {
          path: '/MP/SettleSummary',
          name: 'SettleSummary',
          component: SettleSummary,
        },
        {
          path: '/MP/Employee',
          name: 'Employee',
          component: Employee,
        },
        {
          path: '/MP/Charge',
          name: 'Charge',
          component: Charge,
        },
        {
          path: '/MP/Member',
          name: 'Member',
          component: Member,
        },
        {
          path: '/MP/Position',
          name: 'Position',
          component: Position,
        },
        {
          path: '/MP/Order',
          name: 'Order',
          component: Order,
        },
        {
          path: '/MP/Royalty',
          name: 'Royalty',
          component: Royalty,
        },
        {
          path: '/MP/Store',
          name: 'Store',
          component: Store,
        },
        {
          path: '/MP/RuleManager',
          name: 'RuleManager',
          component: RuleManager,
        },
        {
          path: '/MP/CashDeposit',
          name: 'CashDeposit',
          component: CashDeposit,
        },
        {
          path: '/MP/test',
          name: 'test',
          component: test,
        },
      ],
      redirect: '/MP/MemberSummary'
    }
  ]
})
