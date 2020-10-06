import { extend, ValidationObserver, ValidationProvider, localize } from 'vee-validate'
import { required, email, min, between, numeric } from 'vee-validate/dist/rules'
import zh_CN from 'vee-validate/dist/locale/zh_CN.json'
localize('zh_cn',zh_CN) // 配置中文
export default {

install (Vue) {

  Vue.component('ValidationObserver', ValidationObserver)
  Vue.component('ValidationProvider', ValidationProvider)

 //引入验证规则
  extend('required', required)
  extend('email', email)
  extend('min', min)
  extend('between', between)
  extend('numeric', numeric)

  //覆盖默认提示信息
  extend('required', {
    ...required,
    message: '必填项'
  })
  extend('email', {
    ...email,
    message: '邮箱不合法'
  })

//自定义验证规则
  extend('phone', {
    message: '请输入11位的手机号码',
    validate: value => /(^[0-9]{3}\-[0-9]{8}$)|(^[0-9]{4}\-[0-9]{7}$)|(^0[0-9]{10}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)|(^0{0,1}19[0-9]{9}$)/.test(value)
  })

}}
