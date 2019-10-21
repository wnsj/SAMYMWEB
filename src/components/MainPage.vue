<template>
	<div class="root">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 aside-logo">
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<h2 class="pull-left" style="margin-left: 60px;">
					<img style="width: 50px; height: 50px; float:left" src="../assets/img/logo1.png" /> <strong style="font-size: 35px;"> 圣安米悦</strong><br><font>提 成 管 理 系 统</font>
				</h2>
			</div>
			<!-- <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<h2 class="pull-left" style="margin-left: 60px;">
					<img style="width: 50px; height: 50px; float:left" src="../assets/img/ja_logo.png" /> <strong style="font-size: 40px;">佶安</strong><br><font>收 费 管 理 系 统</font>
				</h2>
			</div> -->
			
			<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 text-right">
				<p style="color: #1b4fa3;">欢迎<span style="color: #d58512;"> {{accountName}} </span>来到，收费管理系统</p>
				<button class="btn btn-default m_r_10" style="margin-top: 40px;" v-on:click="loginOut()">退出</button>
			</div>
		</div>
		<div class="container-fluid clear-mp" id="Odiv">
			<div class="row clear-mp">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 my-aside clear-mp" id="Adiv" style="padding-top: 10px;">
					<ul id="aside-menu">
						<li>
							<p style=" font-size: 30px; padding-left: 15px;" aria-hidden="true">功能列表</p>
						</li>
						<li v-if="has(1)">
							<router-link to="/MP/RoyaltySummary"><i class="fa fa-table" aria-hidden="false">　提成汇总</i></router-link>
						</li>
						<li class="li-active" v-if="has(1)">
							<router-link to="/MP/MemberSummary"><i class="fa fa-table fa-circle" aria-hidden="true">　会员总表</i></router-link>
						</li>
						<li v-if="has(1)">
							<router-link to="/MP/SettleSummary"><i class="fa fa-table" aria-hidden="false">　消费管理</i></router-link>
						</li>
						<li v-if="has(1)">
							<router-link to="/MP/Member"><i class="fa fa-table" aria-hidden="false">　会员管理</i></router-link>
						</li>
						<li v-if="has(1)">
							<router-link to="/MP/Charge"><i class="fa fa-table" aria-hidden="false">　充值管理(退费)</i></router-link>
						</li>
						<li v-if="has(1)">
							<router-link to="/MP/Order"><i class="fa fa-table" aria-hidden="false" >　预约管理</i></router-link>
						</li>
						<li v-if="has(1)">
							<router-link to="/MP/Employee"><i class="fa fa-table" aria-hidden="false">　员工管理</i></router-link>
						</li>
						<li v-if="has(1)">
							<router-link to="/MP/Royalty"><i class="fa fa-table" aria-hidden="false" >　提成规则管理</i></router-link>
						</li>
						<li v-if="has(1)">
							<router-link to="/MP/Position"><i class="fa fa-table" aria-hidden="false" >　岗位管理</i></router-link>
						</li>
						
						
					</ul>
				</div>
				<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 embed-responsive embed-responsive-16by9" style="overflow: inherit; background-color:">
					<router-view />
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script type="module">
	import axios from 'axios'
	import Cookies from 'js-cookie'
	import {
		init
	} from '@/../static/js/common.js'
	export default {
		components: {},
		data() {
			return {
				title:'患者管理',
				accountName:this.accountName(),
			}
		},
		methods:{
			
			titleChange(param){
				console.log('param:'+param)
				this.title=param
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
			init()
		},
	}
</script>

<style>

</style>
