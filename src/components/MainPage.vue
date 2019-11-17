<template>
  <div class="root">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 aside-logo">
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 con-cen" style="height:100%;">
        <h2 class="pull-left" style="padding:10px 0; height:100%;">
          <img style="width: 50px; height: 50px;" src="../assets/img/logo1.png" /> <strong style=" display:inline-block;font-size: 35px; line-height:40px;">
            圣安米悦</strong><br />
          <font style=" disply:block; font-size:26px;line-height:30px;">提 成 管 理 系 统</font>
        </h2>
      </div>
      <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-right">
        <p style="color: #1b4fa3;">欢迎<span style="color: #d58512;"> {{accountName}} </span>来到，提成管理系统</p>
        <button class="btn btn-warning m_r_10" style="margin-top: 40px;" v-on:click="chargeManager('recharge')">充值</button>
        <button class="btn btn-success m_r_10" style="margin-top: 40px;" v-on:click="chargeManager('consume')">消费</button>
        <button class="btn btn-danger m_r_10" style="margin-top: 40px;" v-on:click="chargeManager('refund')">退费</button>
        <button class="btn btn-default m_r_10" style="margin-top: 40px;" v-on:click="loginOut()">退出</button>
      </div>
    </div>
    <div class="container-fluid clear-mp" id="Odiv">
      <div class="row clear-mp">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 my-aside clear-mp" id="Adiv" style="padding-top: 10px;">
          <p style=" display:block; width:190px; height:50px;margin:0 auto; line-height:50px; font-size: 30px;font-weight: bold;color: #1b4fa3;text-align: left; margin-bottom:10px;">功能列表</p>
          <ul id="aside-menu">
            <li class="li-active" v-on:click="selectRule('MemberSummary')">
              <i class="fa fa-table fa-circle" aria-hidden="true">　会员总表</i>
            </li>
            <li v-on:click="selectRule('Member')">
              <i class="fa fa-table" aria-hidden="false">　会员管理</i>
            </li>
            <li v-on:click="selectRule('SettleSummary')">
              <i class="fa fa-table" aria-hidden="false">　消费管理</i>
            </li>
            <li v-on:click="selectRule('Charge')">
              <i class="fa fa-table" aria-hidden="false">　充值/退费管理</i>
            </li>
            <li v-on:click="selectRule('Order')">
              <i class="fa fa-table" aria-hidden="false">　预约管理</i>
            </li>
            <li v-on:click="selectRule('CashDeposit')">
              <i class="fa fa-table" aria-hidden="false">　定金管理</i>
            </li>
            <li v-on:click="selectRule('RoyaltySummary')">
              <i class="fa fa-table" aria-hidden="false">　提成汇总</i>
            </li>
            <li v-on:click="selectRule('Royalty')">
              <i class="fa fa-table" aria-hidden="false">　提成规则管理</i>
            </li> 
            <li v-on:click="selectRule('Employee')">
              <i class="fa fa-table" aria-hidden="false">　员工管理</i>
            </li>
            <li v-on:click="selectRule('Position')">
              <i class="fa fa-table" aria-hidden="false">　岗位管理</i>
            </li>
            <li v-on:click="selectRule('Store')">
              <i class="fa fa-table" aria-hidden="false">　商铺管理</i>
            </li>
            <li v-on:click="selectRule('RuleManager')">
              <i class="fa fa-table" aria-hidden="false">　权限管理</i>
            </li>
            <!-- <li v-if="has(1)">
							<router-link to="/MP/test"><i class="fa fa-table" aria-hidden="false">　权限管理</i></router-link>
							<i class="fa fa-table" aria-hidden="false" v-on:click="selectRule('43')">　权限管理</i>
						</li> -->

          </ul>
        </div>
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 embed-responsive embed-responsive-16by9" style="overflow: inherit; background-color:">
          <router-view />
        </div>
      </div>
    </div>
    <div class="row row_edit">
      <div class="modal fade" id="addFee">
        <div class="modal-dialog">
          <SubRecharge ref="fee"></SubRecharge>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="module">
  import SubRecharge from '../components/MP/SubRecharge/SubRecharge.vue'
	import axios from 'axios'
	import Cookies from 'js-cookie'
	import {
		init
	} from '@/../static/js/common.js'
	export default {
		components: {
			SubRecharge,
		},
		data() {
			return {
				accountName:this.accountName(),
			}
		},
		methods:{
			chargeManager: function(param) {
				this.$refs.fee.initData(param)
				$("#addFee").modal("show")
			},
			titleChange(param){
				console.log('param:'+param)
				this.title=param
			},
			selectRule(param){
				var url = this.url + '/ruleAction/queryRule'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						accountId: this.accountId(),
						moduleGrade:'1',
						urlName:param,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if(res.retData=='0010'){
							this.$router.push({ name: param, });

						}else{
							alert('您没有此权限，请联系管理员！！')
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('商铺查询请求失败')
				});
			},
			//用户退出
			loginOut() {
				if (confirm("确定退出?") == false) {
					return;
				} else {
					//删除cookie
					Cookies.remove("accountData");
					Cookies.remove("accessToken");
					this.$parent.setRouter("/login");
					this.accountId = '';
				}
			},
		},
		mounted() {
			init();
			this.selectRule('MemberSummary');
		},
	}
</script>

<style>
  .li-active {
    color: #f2ad4e;
  }

  .li-active i {
    color: #f2ad4e;
  }
  .root{
    width:100%; 
    overflow-x:hidden;
  }
  .fa-table{
    color:#337ab7;
  }
  .fa-table:hover{
    color:#1b4fa3;
  }
  .fa-circle:hover{
    color:#f2ad4e;
  }
</style>
