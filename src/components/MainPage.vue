<template>
	<div class="root">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 aside-logo">
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<h2 class="pull-left" style="margin-left: 60px;">
					<img style="width: 50px; height: 50px; float:left" src="../assets/img/logo1.png" /> <strong style="font-size: 35px;">
						圣安米悦</strong><br>
					<font>提 成 管 理 系 统</font>
				</h2>
			</div>
			<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 text-right">
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
					<ul id="aside-menu">
						<li>
							<p style=" font-size: 30px; " aria-hidden="true">功能列表</p>
						</li>
						<li class="li-active" v-if="has(1)">
							<i class="fa fa-table fa-circle" aria-hidden="true" v-on:click="selectRule('MemberSummary')">　会员总表</i>
						</li>
						<li v-if="has(1)">
							<i class="fa fa-table" aria-hidden="false" v-on:click="selectRule('SettleSummary')">　消费管理</i>
						</li>
						<li v-if="has(1)">
							<i class="fa fa-table" aria-hidden="false" v-on:click="selectRule('RoyaltySummary')">　提成汇总</i>
						</li>
						<li v-if="has(1)">
							<i class="fa fa-table" aria-hidden="false" v-on:click="selectRule('Member')">　会员管理</i>
						</li>
						<li v-if="has(1)">
							<i class="fa fa-table" aria-hidden="false" v-on:click="selectRule('Charge')">　充值管理(退费)</i>
						</li>
						<li v-if="has(1)">
							<i class="fa fa-table" aria-hidden="false" v-on:click="selectRule('Order')">　预约管理</i>
						</li>
						<li v-if="has(1)">
							<router-link to="/MP/CashDeposit"><i class="fa fa-table" aria-hidden="false">　定金管理</i></router-link>
							<!-- <i class="fa fa-table" aria-hidden="false" v-on:click="selectRule('CashDeposit')">　权限管理</i> -->
						</li>
						<li v-if="has(1)">
							<i class="fa fa-table" aria-hidden="false" v-on:click="selectRule('Employee')">　员工管理</i>
						</li>
						<li v-if="has(1)">
							<i class="fa fa-table" aria-hidden="false" v-on:click="selectRule('Royalty')">　提成规则管理</i>
						</li>
						<li v-if="has(1)">
							<i class="fa fa-table" aria-hidden="false" v-on:click="selectRule('Position')">　岗位管理</i>
						</li>
						<li v-if="has(1)">
							<i class="fa fa-table" aria-hidden="false" v-on:click="selectRule('Store')">　商铺管理</i>
						</li>
						<li v-if="has(1)">
							<i class="fa fa-table" aria-hidden="false" v-on:click="selectRule('RuleManager')">　权限管理</i>
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
	.li-active{
		color:#f2ad4e;
	}
	.li-active i{
		color:#f2ad4e;
	}
</style>
