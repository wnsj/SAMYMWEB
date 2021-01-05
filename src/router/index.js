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
					meta: {
						showName: '初诊咨询方向'
					}
				},
				{
					path: '/SummaryMenu/ProSummary',
					name: 'ProSummary',
					component: () => import('../components/SummaryMenu/ProSummary'),
					meta: {
						showName: '套餐产品消耗'
					}
				},
				{
					path: '/SummaryMenu/EmpConsumeSummary',
					name: 'EmpConsumeSummary',
					component: () => import('../components/SummaryMenu/EmpConsumeSummary'),
					meta: {
						showName: '收入情况核算'
					}
				},
				//项目审核
				{
					path: '/Reviewed/TobeReviewed/purchase',
					name: 'Tobepurchase',
					component: () => import('../components/Reviewed/TobeReviewed/purchase'),
					meta: {
						showName: '产品购买审核'
					}
				},
				{
					path: '/Reviewed/TobeReviewed/Refund',
					name: 'TobeRefund',
					component: () => import('../components/Reviewed/TobeReviewed/Refund'),
					meta: {
						showName: '退费审核'
					}
				},
				{
					path: '/Reviewed/TobeReviewed/consumption',
					name: 'Tobeconsumption',
					component: () => import('../components/Reviewed/TobeReviewed/consumption'),
					meta: {
						showName: '消费审核'
					}
				},
				{
					path: '/Reviewed/Reject/purchase',
					name: 'REpurchase',
					component: () => import('../components/Reviewed/Reject/purchase'),
					meta: {
						showName: '产品购买驳回'
					}
				},
				{
					path: '/Reviewed/Reject/consumption',
					name: 'REconsumption',
					component: () => import('../components/Reviewed/Reject/consumption'),
					meta: {
						showName: '消费驳回'
					}
				},
				{
					path: '/Reviewed/Reject/Refund',
					name: 'RERefund',
					component: () => import('../components/Reviewed/Reject/Refund'),
					meta: {
						showName: '退费驳回'
					}
				},
				{
					path: '/Reviewed/Statistics/purchase',
					name: 'RVpurchase',
					component: () => import('../components/Reviewed/Statistics/purchase'),
					meta: {
						showName: '产品购买统计'
					}
				},
				{
					path: '/Reviewed/Statistics/consumption',
					name: 'RVconsumption',
					component: () => import('../components/Reviewed/Statistics/consumption'),
					meta: {
						showName: '消费统计'
					}
				},
				{
					path: '/Reviewed/Statistics/Refund',
					name: 'RVRefund',
					component: () => import('../components/Reviewed/Statistics/Refund'),
					meta: {
						showName: '退费统计'
					}
				},



				{
					path: '/MP/Visitor',
					name: 'Visitor',
					component: () => import('../components/MP/Visitor'),
					meta: {
						showName: '客户管理'
					}
				},
				{
					path: '/MP/VisitState',
					name: 'VisitState',
					component: () => import('../components/MP/VisitState'),
					meta: {
						showName: '状态管理'
					}
				},
				{
					path: '/MP/Education',
					name: 'Education',
					component: () => import("../components/MP/Education"),
					meta: {
						showName: '学历管理'
					}
				},
				{
					path: '/MP/Occupation',
					name: 'Occupation',
					component: () => import('../components/MP/Occupation'),
					meta: {
						showName: '职业管理'
					}
				},
				{
					path: '/MP/Region',
					name: 'Region',
					component: () => import('../components/MP/Region'),
					meta: {
						showName: '区域管理'
					}
				},
				{
					path: '/MP/Refund',
					name: 'Refund',
					component: () => import('../components/MP/Refund'),
					meta: {
						showName: '退费管理'
					}
				},
				{
					path: '/MP/DiseaseType',
					name: 'DiseaseType',
					component: () => import('../components/MP/DiseaseType'),
					meta: {
						showName: '咨询方向'
					}
				},
				{
					path: '/MP/NewRuleManager',
					name: 'NewRuleManager',
					component: () => import('../components/MP/NewRuleManager'),
					meta: {
						showName: '角色设置'
					}
				},
				{
					path: '/MP/SettleSummary',
					name: 'SettleSummary',
					component: () => import('../components/MP/SettleSummary'),
					meta: {
						showName: '消费管理'
					}
				},
				{
					path: '/MP/Employee',
					name: 'Employee',
					component: () => import('../components/MP/Employee'),
					meta: {
						showName: '员工管理'
					}
				},
				{
					path: '/MP/ScheduleEmp',
					name: 'ScheduleEmp',
					component: () => import('../components/MP/ScheduleEmp'),
					meta: {
						showName: '排班管理'
					}
				},
				{
					path: '/MP/Charge',
					name: 'Charge',
					component: () => import("../components/MP/Charge"),
					meta: {
						showName: '已购产品管理'
					}
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
					meta: {
						showName: '岗位管理'
					}
				},
				{
					path: '/MP/Order',
					name: 'Order',
					component: () => import('../components/MP/Order'),
					meta: {
						showName: '预约管理'
					}
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
					meta: {
						showName: '定金管理'
					}
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
					meta: {
						showName: '产品管理'
					}
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
					meta: {
						showName: '咨询室管理'
					}
				}, {
					path: '/MP/CounseRoomTimeTotal',
					name: 'CounseRoomTimeTotal',
					component: () => import('../components/MP/CounseRoomTimeTotal'),
					meta: {
						showName: '咨询室总览'
					}
				},
				{
					path: '/MP/UmsPermissionManage',
					name: 'UmsPermissionManage',
					component: () => import("../components/MP/UmsPermissionManage"),
					meta: {
						showName: '权限设置'
					}
				},
				{
					path: '/SummaryMenu/FirstVdSummary',
					name: 'FirstVdSummary',
					component: () => import("../components/SummaryMenu/FirstVdSummary"),
					meta: {
						showName: '初访咨询方向'
					}
				},
				{
					path: '/SummaryMenu/VisitorDeSummary',
					name: 'VisitorDeSummary',
					component: () => import("../components/SummaryMenu/VisitorDeSummary"),
					meta: {
						showName: '访客跟踪明细'
					}
				},
				{
					path: '/SummaryMenu/VisitorConSummary',
					name: 'VisitorConSummary',
					component: () => import("../components/SummaryMenu/VisitorConSummary"),
					meta: {
						showName: '客户产品消耗'
					}
				},
				{
					path: '/SummaryMenu/VsMonthSummary',
					name: 'VsMonthSummary',
					component: () => import("../components/SummaryMenu/VsMonthSummary"),
					meta: {
						showName: '月度咨客状态'
					}
				},
				{
					path: '/SummaryMenu/CostMoneySummary',
					name: 'CostMoneySummary',
					component: () => import("../components/SummaryMenu/CostMoneySummary"),
					meta: {
						showName: '消耗金额核算'
					}
				},
				{
					path: '/SummaryMenu/ConsultStoreSummary',
					name: 'ConsultStoreSummary',
					component: () => import("../components/SummaryMenu/ConsultStoreSummary"),
					meta: {
						showName: '到店消费核算'
					}
				},
				{
					path: '/MP/Income',
					name: 'Income',
					component: () => import("../components/MP/Income"),
					meta: {
						showName: '收入记录明细'
					}
				},
				{
					path: '/MP/Questionnaire',
					name: 'Questionnaire',
					component: () => import("../components/MP/Questionnaire"),
					meta: {
						showName: '问卷调查管理'
					}
				},
				{
					path: '/MP/QueVsAnswer',
					name: 'QueVsAnswer',
					component: () => import("../components/MP/QueVsAnswer"),
					meta: {
						showName: '问卷调查结果'
					}
				},
				{
					path: '/MP/QuestionnaireSummary',
					name: 'QuestionnaireSummary',
					component: () => import("../components/MP/QuestionnaireSummary"),
					meta: {
						showName: '问卷调查汇总'
					}
				},
				{
					path: '/MP/Coupon',
					name: 'Coupon',
					component: () => import("../components/MP/Coupon"),
					meta: {
						showName: '优惠券管理'
					}
				},
				{
					path: '/MP/Coupon/CouponAdd',
					name: 'CouponAdd',
					component: () => import("../components/MP/Coupon/CouponAdd"),
					meta: {
						showName: '新增优惠券'
					}
				},
				{
					path: '/MP/Coupon/Couponcall',
					name: 'Couponcall',
					component: () => import("../components/MP/Coupon/Couponcall"),
					meta: {
						showName: '查看优惠券'
					}
				},
				{
					path: '/MP/Coupon/Couponupdate',
					name: 'Couponupdate',
					component: () => import("../components/MP/Coupon/Couponupdate"),
					meta: {
						showName: '修改优惠券'
					}
				},
				{
					path: '/MP/Coupon/selectAdd',
					name: 'selectAdd',
					component: () => import("../components/MP/Coupon/selectAdd"),
					meta: {
						showName: '选择指定用户'
					}
				},
				{
					path: '/MP/Coupon/updataselectAdd',
					name: 'updataselectAdd',
					component: () => import("../components/MP/Coupon/updataselectAdd"),
					meta: {
						showName: '选择指定用户'
					}
				},
				{
					path: '/MP/Coupon/selectcall',
					name: 'selectcall',
					component: () => import("../components/MP/Coupon/selectcall"),
					meta: {
						showName: '查看指定用户'
					}
				},
				{
					path: '/MP/Coupon/select-type',
					name: 'select-type',
					component: () => import("../components/MP/Coupon/select-type"),
					meta: {
						showName: '选择指定分类'
					}
				},
				{
					path: '/MP/Coupon/updataselect-type',
					name: 'updataselect-type',
					component: () => import("../components/MP/Coupon/updataselect-type"),
					meta: {
						showName: '选择指定分类'
					}
				},
				{
					path: '/MP/Coupon/select-type-call',
					name: 'select-type-call',
					component: () => import("../components/MP/Coupon/select-type-call"),
					meta: {
						showName: '查看指定分类'
					}
				},
				{
					path: '/MP/Coupon/select-chan',
					name: 'select-chan',
					component: () => import("../components/MP/Coupon/select-chan"),
					meta: {
						showName: '选择指定产品'
					}
				},
				{
					path: '/MP/Coupon/updataselect-chan',
					name: 'updataselect-chan',
					component: () => import("../components/MP/Coupon/updataselect-chan"),
					meta: {
						showName: '选择指定产品'
					}
				},
				{
					path: '/MP/Coupon/select-chan-call',
					name: 'select-chan-call',
					component: () => import("../components/MP/Coupon/select-chan-call"),
					meta: {
						showName: '查看指定产品'
					}
				}
			],
			redirect: '/MP/Visitor'
		}
	]
})
