// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import Cookies from 'js-cookie'
import constant from '../src/assets/js/constant'
import vueBeauty from 'vue-beauty'
import elementUi from 'element-ui'
import elementUiCss from 'element-ui/lib/theme-chalk/index.css'
import store from './store'



// import 'default-passive-events'

// import TreeTable from '@weilan/el-tree-table'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import Validate from './assets/js/validate.js'
Vue.use(Validate)


// import utilDate from '../src/assets/js/utilDate'
import {
    exportTableToExcel
} from 'vendor/Export2Excel.js'

Vue.use(vueBeauty)
Vue.use(VXETable)
Vue.use(elementUi)
Vue.use(elementUiCss)
Vue.prototype.$ajax = axios
Vue.prototype.url = process.env.API_HOST

// 给 vue 实例挂载全局窗口对象
Vue.prototype.$XModal = VXETable.modal

Vue.config.productionTip = false


//权限判断方法（包含返回true，反之false）
Vue.prototype.has = function (param) {
    return constant.has(param);
}

// 路由卫士
router.beforeEach((to, from, next) => {

    if (to.path == '/login' && from.path == '/MainPage') {
        next();
    } else if (to.path == '/login') {
        next();
    } else if (to.path == '/MemberTotle') {
        next();
    } else {
        let token = Cookies.get('accessToken');
        let accountData = Cookies.get('accountData');
        //console.log("token:" + token + ",accountData:" + accountData);
        if (constant.isBlank(token) || constant.isBlank(accountData)) {
            if (from.path == '/login') {
                alert('没有查到用户信息，或者用户信息存储失败')
            }
            next('/login');
        } else if (to.path == '/') {
            next('/MainPage');
        } else if (to.path == '/login') {
            next();
        } else {
            if (to.path == '/samy/dist/index.html') {
                next('/MainPage');
            } else {
                let jsonString = Cookies.get('upUriList');
                if (constant.isBlank(jsonString)) {
                    next('/login');
                }
                let itemRuleList = JSON.parse(jsonString);
                let hasRule = false;

                for (var i = 0; i < itemRuleList.length; i++) {
                    let item = itemRuleList[i];
                    if (to.path == item) {
                        hasRule = true
                        break;
                    }
                }
                // console.log("main:" + to.path + from.path)
                if (hasRule) {
                    next()
                } else {
                    next(from.path)
                    alert("您还没有此模块权限，请联系管理员添加权限!")
                }
            }
        }
    }
});

//token存储在cookie中的过期时间1天，必须是整数
Vue.prototype.accessTokenLife = 0.01
Vue.prototype.accountDataLife = 0.01

//是否使用前端设置cookie
Vue.prototype.isUseSetCookie = true

Vue.prototype.contentType = 'application/json;charset=utf-8'
Vue.prototype.formDataType = 'application/x-www-form-urlencoded;charset=UTF-8'
/**
 * 判断是否为null
 */
Vue.prototype.isBlank = function (param) {
    return constant.isBlank(param)
}
/**
 * 时间过滤器
 */
Vue.filter('dateFormat', function (time, formatStr = 'YYYY-MM-DD HH:mm') {
    if (constant.isBlank(time)) {
        return null
    } else {
        return moment(time).format(formatStr)
    }
})
Vue.filter('dateFormatFilter', function (time, format) {
    var formatStr = 'YYYY-MM-DD HH:mm'
    if (constant.isBlank(time)) {
        return null;
    } else {
        formatStr = constant.isBlank(format) ? formatStr : format;
        return moment(time).format(formatStr)
    }
})
Vue.filter('month', function (time, formatStr = 'YYYY-MM') {
    if (constant.isBlank(time)) {
        return null
    } else {
        return moment(time).format(formatStr)
    }
})
Vue.prototype.moment = function (targetDate, format) {
    var formatStr = "YYYY-MM-DD HH:mm:ss"
    var momentObj = moment();
    if (!constant.isBlank(targetDate)) {
        momentObj = moment(targetDate);
    }
    if (!constant.isBlank(format)) formatStr = format;
    return momentObj.format(formatStr);
}
// Vue.prototype.endDate = function(beginDate,index){
//
// 	return utilDate.calculateEndDate(beginDate,index);
// }
/**
 * 导出表格
 */
Vue.prototype.exportTableToExcel = function (tbId, fileName) {
    if (!confirm("确定导出?")) {
        return;
    }
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    exportTableToExcel(tbId, fileName + '_' + year + '_' + month + '_' + date);
}


//账户的名字
Vue.prototype.accountName = function () {
    return constant.accountName();
}
//账户的ID
Vue.prototype.accountId = function () {
    return constant.accountId();
}
//账户岗位的ID
Vue.prototype.accountPosId = function () {
    return constant.accountPosId();
}
//账户的类型
Vue.prototype.accountType = function () {
    if (!constant.isBlank(constant.accountType()) && constant.accountType() == 1) return true;
    else return false;
}
//商铺ID
Vue.prototype.storeId = function () {
    if (!constant.isBlank(constant.storeId())){
		return constant.storeId();
	}else{
		return '';
	}
}
//手机号判断
Vue.prototype.phoneNum = function (phoneNum) {
    return constant.phone(phoneNum);
}
//获取IP地址
Vue.prototype.ipAddress = function () {
    return constant.ipAddress();
}
//获取员工信息
Vue.prototype.getEmpData = function () {
    return constant.getEmpData()
}
//获取员工Id
Vue.prototype.getEmpId = function () {
    return constant.getEmpId()
}
//获取账户信息
Vue.prototype.getAccData = function () {
    return constant.getAccData()
}
// 角色id
Vue.prototype.roleId = function () {
    return constant.roleId()
}

/*
 **权限判断使用方法:
 ** 1.<div v-has='1'> 测试内容1</div>
 ** 2.<div v-if='has(25)'> 测试内容2</div>
 */
//自定义指令v-has(不包含则删除该标签)
Vue.directive('has', {
    inserted: function (el, binding) {
        if (!constant.has(binding.value)) {
            el.parentNode.removeChild(el);
        }
    }
});
// 孙云龙添加
//http request拦截器
var ip = sessionStorage.getItem("IP")
axios.interceptors.request.use(

    config =>{
        //设置公共的请求参数
        let test = config.data;
        if(test){
            if (ip) {
                config.data['ip']= ip;
            }
            if (JSON.parse(sessionStorage.getItem("user"))) {
                config.data['user'] = JSON.parse(sessionStorage.getItem("user"))
            }

        }

        return config;
    },
    err =>{
        return Promise.reject(err);
    }
)
// end
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
