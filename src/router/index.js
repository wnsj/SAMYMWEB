import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import ComprehensivePatientInfo from '../components/MP/ComprehensivePatientInfo.vue'
import PP from '../components/MP/PayServiceProject.vue'
import Depart from '../components/MP/Department.vue'
import Charge from '../components/MP/Charge.vue'
import Summary from '../components/MP/Summary.vue'
import login from '@/components/login.vue'
import Medicalinsurance from '@/components/MP/Medicalinsurance.vue'
import PatientStype from '@/components/MP/PatientStype.vue'
import DataUpdate from '@/components/MP/DataUpdate.vue'
import test from '../components/MP/test.vue'
Vue.use(Router)

export default new Router({
    routes: [
			{
				path: '/login',
				component: login,
				hidden: true
			},
			{
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage,
      children: [{
          path: '/MP/ComprehensivePatientInfo',
          name: 'ComprehensivePatientInfo',
          component: ComprehensivePatientInfo,
        },
        {
          path: '/MP/PayServiceProject',
          name: 'PP',
          component: PP,
        },
        {
          path: '/MP/Department',
          name: 'Depart',
          component: Depart,
        },
        {
          path: '/MP/Charge',
          name: 'Charge',
          component: Charge,
        },
        {
          path: '/MP/Summary',
          name: 'Summary',
          component: Summary,
        },
        {
          path: '/MP/Medicalinsurance',
          name: 'Medicalinsurance',
          component: Medicalinsurance,
        },
				{
				  path: '/MP/PatientStype',
				  name: 'PatientStype',
				  component: PatientStype,
				},
				{
				  path: '/MP/DataUpdate',
				  name: 'DataUpdate',
				  component: DataUpdate,
				},
        {
          path: '/test',
          path: '/MP/test',
          name: 'test',
          component: test,
        }
      ],
      redirect: '/MP/ComprehensivePatientInfo'
    }]
})
