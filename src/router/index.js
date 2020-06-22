import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
// import MainPage from '@/components/MainPage.vue'
/*------------*/
// import Employee from '../components/MP/Employee.vue'
// import ScheduleEmp from '../components/MP/ScheduleEmp.vue'
// import Member from '../components/MP/Member.vue'
// import Charge from '../components/MP/Charge.vue'
// import Position from '../components/MP/Position.vue'
// import Order from '../components/MP/Order.vue'
// import Royalty from '../components/MP/Royalty.vue'
// import SettleSummary from '../components/MP/SettleSummary.vue'
// import MemberSummary from '../components/MP/MemberSummary.vue'
// import RoyaltySummary from '../components/MP/RoyaltySummary.vue'
// import Store from '../components/MP/Store.vue'
// import RuleManager from '../components/MP/RuleManager.vue'
// import CashDeposit from '../components/MP/CashDeposit.vue'
// import CurrentSummary from '../components/MP/CurrentSummary.vue'
// import Project from '../components/MP/Project.vue'
// import test from '../components/MP/test.vue'
// import newtree from '../components/MP/newtree.vue'
// import CounseRoomManage from '../components/MP/CounseRoomManage.vue'
// import Schedule2 from '@/components/MP/SubSm/Schedule2.vue'
// import ZxsSummary from '../components/MP/ZxsSummary.vue'
// import Visitor from '../components/MP/Visitor.vue'
// import VisitState from '../components/MP/VisitState.vue'
// import DiseaseType from '../components/MP/DiseaseType.vue'
// import MemberTotle from '../components/MP/MemberTotle.vue'
// import CounseRoomTimeTotal from '../components/MP/CounseRoomTimeTotal.vue'
// import NewRuleManager from '../components/MP/NewRuleManager.vue'
// import UmsPermissionManage from '../components/MP/UmsPermissionManage.vue'
// import Refund from '../components/MP/Refund.vue'
// import Region from '../components/MP/Region.vue'
// import Occupation from '../components/MP/Occupation.vue'
// import Education from '../components/MP/Education.vue'


Vue.use(Router)

//解决路由多次跳转同一页面报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
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
            component: () => import('@/components/MainPage'),
            children: [{
                path: '/MP/RoyaltySummary',
                name: 'RoyaltySummary',
                component: () => import('../components/MP/RoyaltySummary'),
            },
                {
                    path: '/MP/MemberSummary',
                    name: 'MemberSummary',
                    component: () => import('../components/MP/MemberSummary'),
                },
                {
                    path: '/MP/Visitor',
                    name: 'Visitor',
                    component: () => import('../components/MP/Visitor'),
                },
                {
                    path: '/MP/VisitState',
                    name: 'VisitState',
                    component: () => import('../components/MP/VisitState'),
                },
                {
                    path: '/MP/Education',
                    name: 'Education',
                    component: () => import("../components/MP/Education"),
                },
                {
                    path: '/MP/Occupation',
                    name: 'Occupation',
                    component: () => import('../components/MP/Occupation'),
                },
                {
                    path: '/MP/Region',
                    name: 'Region',
                    component: () => import('../components/MP/Region'),
                },
                {
                    path: '/MP/Refund',
                    name: 'Refund',
                    component: () => import('../components/MP/Refund'),
                },
                {
                    path: '/MP/DiseaseType',
                    name: 'DiseaseType',
                    component: () => import('../components/MP/DiseaseType'),
                },
                {
                    path: '/MP/NewRuleManager',
                    name: 'NewRuleManager',
                    component: () => import('../components/MP/NewRuleManager'),
                },
                {
                    path: '/MP/SettleSummary',
                    name: 'SettleSummary',
                    component: () => import('../components/MP/SettleSummary'),
                },
                {
                    path: '/MP/Employee',
                    name: 'Employee',
                    component: () => import('../components/MP/Employee'),
                },
                {
                    path: '/MP/ScheduleEmp',
                    name: 'ScheduleEmp',
                    component: () => import('../components/MP/ScheduleEmp'),
                },
                {
                    path: '/MP/Charge',
                    name: 'Charge',
                    component: () => import("../components/MP/Charge"),
                },
                {
                    path: '/MP/Member',
                    name: 'Member',
                    component: () => import('../components/MP/Member'),
                },
                {
                    path: '/MP/Position',
                    name: 'Position',
                    component: () => import('../components/MP/Position'),
                },
                {
                    path: '/MP/Order',
                    name: 'Order',
                    component: () => import('../components/MP/Order'),
                },
                {
                    path: '/MP/Royalty',
                    name: 'Royalty',
                    component: () => import('../components/MP/Royalty'),
                },
                {
                    path: '/MP/Store',
                    name: 'Store',
                    component: () => import('../components/MP/Store'),
                },
                {
                    path: '/MP/RuleManager',
                    name: 'RuleManager',
                    component: () => import('../components/MP/RuleManager'),
                },
                {
                    path: '/MP/CashDeposit',
                    name: 'CashDeposit',
                    component: () => import('../components/MP/CashDeposit'),
                },
                {
                    path: '/MP/CurrentSummary',
                    name: 'CurrentSummary',
                    component: () => import('../components/MP/CurrentSummary'),
                },
                {
                    path: '/MP/Project',
                    name: 'Project',
                    component: () => import('../components/MP/Project'),
                },
                {
                    path: '/MP/test',
                    name: 'test',
                    component: () => import('../components/MP/test'),
                },
                {
                    path: '/MP/newtree',
                    name: 'newtree',
                    component: () => import('../components/MP/newtree'),
                },
                {
                    path: '/MP/ZxsSummary',
                    name: 'ZxsSummary',
                    component: () => import('../components/MP/ZxsSummary'),
                },
                {
                    path: '/MP/MemberTotle',
                    name: 'MemberTotle',
                    component: () => import('../components/MP/MemberTotle'),
                },
                {
                    path: '/MP/Schedule2',
                    name: 'Schedule2',
                    component: () => import('@/components/MP/SubSm/Schedule2'),
                }, {
                    path: '/MP/CounseRoomManage',
                    name: 'CounseRoomManage',
                    component: () => import('../components/MP/CounseRoomManage'),
                }, {
                    path: '/MP/CounseRoomTimeTotal',
                    name: 'CounseRoomTimeTotal',
                    component: () => import('../components/MP/CounseRoomTimeTotal'),
                },
                {
                    path: '/MP/UmsPermissionManage',
                    name: 'UmsPermissionManage',
                    component: () => import("../components/MP/UmsPermissionManage"),
                }],
            redirect: '/MP/Visitor'
        }]
})
