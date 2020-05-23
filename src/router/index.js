import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
import MainPage from '@/components/MainPage.vue'
/*------------*/
import Employee from '../components/MP/Employee.vue'
import ScheduleEmp from '../components/MP/ScheduleEmp.vue'
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
import CurrentSummary from '../components/MP/CurrentSummary.vue'
import Project from '../components/MP/Project.vue'
import test from '../components/MP/test.vue'
import newtree from '../components/MP/newtree.vue'
import CounseRoomManage from '../components/MP/CounseRoomManage.vue'
import Schedule2 from '@/components/MP/SubSm/Schedule2.vue'
import ZxsSummary from '../components/MP/ZxsSummary.vue'
import Visitor from '../components/MP/Visitor.vue'
import VisitState from '../components/MP/VisitState.vue'
import DiseaseType from '../components/MP/DiseaseType.vue'
import MemberTotle from '../components/MP/MemberTotle.vue'
import CounseRoomTimeTotal from '../components/MP/CounseRoomTimeTotal.vue'
import NewRuleManager from '../components/MP/NewRuleManager.vue'
import UmsPermissionManage from '../components/MP/UmsPermissionManage.vue'

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
                    path: '/MP/Visitor',
                    name: 'Visitor',
                    component: Visitor,
                },
				{
				    path: '/MP/VisitState',
				    name: 'VisitState',
				    component: VisitState,
				},
				{
				    path: '/MP/DiseaseType',
				    name: 'DiseaseType',
				    component: DiseaseType,
				},
                {
                    path: '/MP/NewRuleManager',
                    name: 'NewRuleManager',
                    component: NewRuleManager,
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
                    path: '/MP/ScheduleEmp',
                    name: 'ScheduleEmp',
                    component: ScheduleEmp,
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
                    path: '/MP/CurrentSummary',
                    name: 'CurrentSummary',
                    component: CurrentSummary,
                },
                {
                    path: '/MP/Project',
                    name: 'Project',
                    component: Project,
                },
                {
                    path: '/MP/test',
                    name: 'test',
                    component: test,
                },
                {
                    path: '/MP/newtree',
                    name: 'newtree',
                    component: newtree,
                },
                {
                    path: '/MP/ZxsSummary',
                    name: 'ZxsSummary',
                    component: ZxsSummary,
                },
                {
                    path: '/MP/MemberTotle',
                    name: 'MemberTotle',
                    component: MemberTotle,
                },
                {
                    path: '/MP/Schedule2',
                    name: 'Schedule2',
                    component: Schedule2,
                }, {
                    path: '/MP/CounseRoomManage',
                    name: 'CounseRoomManage',
                    component: CounseRoomManage,
                }, {
                    path: '/MP/CounseRoomTimeTotal',
                    name: 'CounseRoomTimeTotal',
                    component: CounseRoomTimeTotal,
                },
                {
                    path: '/MP/UmsPermissionManage',
                    name: 'UmsPermissionManage',
                    component: UmsPermissionManage,
                }
            ],
            //redirect: '/MainPage'
        }
    ]
})
