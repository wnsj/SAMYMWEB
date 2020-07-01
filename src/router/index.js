import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'

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
				    path: '/SummaryMenu/EmpDtSummary',
				    name: 'EmpDtSummary',
				    component: () => import('../components/SummaryMenu/EmpDtSummary'),
				},
				{
				    path: '/SummaryMenu/ProSummary',
				    name: 'ProSummary',
				    component: () => import('../components/SummaryMenu/ProSummary'),
				},
				{
				    path: '/SummaryMenu/EmpConsumeSummary',
				    name: 'EmpConsumeSummary',
				    component: () => import('../components/SummaryMenu/EmpConsumeSummary'),
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
                },
                {
                    path: '/SummaryMenu/FirstVdSummary',
                    name: 'FirstVdSummary',
                    component: () => import("../components/SummaryMenu/FirstVdSummary"),
                },
                {
                    path: '/SummaryMenu/VisitorDeSummary',
                    name: 'VisitorDeSummary',
                    component: () => import("../components/SummaryMenu/VisitorDeSummary"),
                },
                {
                    path: '/SummaryMenu/VisitorConSummary',
                    name: 'VisitorConSummary',
                    component: () => import("../components/SummaryMenu/VisitorConSummary"),
                },
                {
                    path: '/SummaryMenu/VsMonthSummary',
                    name: 'VsMonthSummary',
                    component: () => import("../components/SummaryMenu/VsMonthSummary"),
                }],
            redirect: '/MP/Visitor'
        }]
})
