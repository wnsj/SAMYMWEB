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
        <button class="btn btn-warning m_r_10" style="margin-top: 40px;" v-on:click="chargeManager()">课程购买</button>
        <button class="btn btn-success m_r_10" style="margin-top: 40px;" v-on:click="customAction()">课程消费</button>
        <button class="btn btn-danger m_r_10" style="margin-top: 40px;" v-on:click="refundAction()">课程退费</button>
        <button class="btn btn-default m_r_10" style="margin-top: 40px;" v-on:click="loginOut()">退出</button>
      </div>
    </div>
    <div class="container-fluid clear-mp" id="Odiv">
      <div class="row clear-mp">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 my-aside clear-mp" id="Adiv" style="padding-top: 10px;">
        	<p style=" display:block; width:190px; height:50px;margin:0 auto; line-height:50px; font-size: 30px;font-weight: bold;color: #795548;text-align: left; margin-bottom:10px;">功能列表</p>
          	 <div id="aside-menu">
				<dl v-bind:class="{noShow:num == 0}">
					<dt @click="onShow(0)">
						<i class="fa" v-bind:class="{'fa-folder-open':num==0,'fa-folder':num!=0}" aria-hidden="true">
							会员管理模块
						</i>
					</dt>
					<dd v-on:click="selectRule('MemberSummary')" v-bind:class="{'li-active':onString == 'MemberSummary'}">
						<i class="fa" aria-hidden="true">会员汇总</i>
					</dd>
					<dd v-on:click="selectRule('Member')"  v-bind:class="{'li-active':onString == 'Member'}">
						<i class="fa" aria-hidden="true">会员基本信息</i>
					</dd>
				</dl>
				<dl v-bind:class="{noShow:num == 1}">
					<dt @click="onShow(1)">
						<i class="fa" v-bind:class="{'fa-folder-open':num==1,'fa-folder':num!=1}" aria-hidden="true">
							消费管理模块
						</i>
					</dt>
					<dd v-on:click="selectRule('SettleSummary')" v-bind:class="{'li-active':onString == 'SettleSummary'}">
						<i class="fa" aria-hidden="true">消费汇总</i>
					</dd>
					<dd v-on:click="selectRule('Charge')" v-bind:class="{'li-active':onString == 'Charge'}">
						<i class="fa" aria-hidden="true">已购课程管理</i>
					</dd>
					<dd v-on:click="selectRule('Order')" v-bind:class="{'li-active':onString == 'Order'}">
						<i class="fa" aria-hidden="true">预约管理</i>
					</dd>
					<dd v-on:click="selectRule('CashDeposit')" v-bind:class="{'li-active':onString == 'CashDeposit'}">
						<i class="fa" aria-hidden="true">定金管理</i>
					</dd>	
				</dl>
				<dl v-bind:class="{noShow:num == 2}">
					<dt @click="onShow(2)">
						<i class="fa" v-bind:class="{'fa-folder-open':num==2,'fa-folder':num!=2}" aria-hidden="true">
							基础设置
						</i>
					</dt>
					<dd v-on:click="selectRule('Employee')" v-bind:class="{'li-active':onString == 'Employee'}">
						<i class="fa" aria-hidden="true">员工管理</i>
					</dd>
					<dd v-on:click="selectRule('ScheduleEmp')" v-bind:class="{'li-active':onString == 'ScheduleEmp'}">
						<i class="fa" aria-hidden="true">排班管理</i>
					</dd>
					<dd v-on:click="selectRule('Position')" v-bind:class="{'li-active':onString == 'Position'}">
						<i class="fa" aria-hidden="true">岗位管理</i>
					</dd>
					<dd v-on:click="selectRule('Store')" v-bind:class="{'li-active':onString == 'Store'}">
						<i class="fa" aria-hidden="true">门店管理</i>
					</dd>
					<dd v-on:click="selectRule('RuleManager')" v-bind:class="{'li-active':onString == 'RuleManager'}">
						<i class="fa" aria-hidden="true">权限管理</i>
					</dd>
					<dd v-on:click="selectRule('Royalty')" v-bind:class="{'li-active':onString == 'Royalty'}">
						<i class="fa" aria-hidden="true">提成规则管理</i>
					</dd>
					<dd v-on:click="selectRule('Project')" v-bind:class="{'li-active':onString == 'Project'}">
						<i class="fa" aria-hidden="true">课程管理</i>
					</dd>
				</dl>
				<dl>
					<dt v-on:click="selectRule('CurrentSummary')" v-bind:class="{'li-active':onString == 'CurrentSummary'}">
						<i class="fa fa-folder-open" aria-hidden="true">
							月入汇总
						</i>
					</dt>
				</dl>
				<dl>
					<dt v-on:click="selectRule('RoyaltySummary')" v-bind:class="{'li-active':onString == 'RoyaltySummary'}">
						<i class="fa fa-folder-open" aria-hidden="true">
							提成汇总
						</i>
					</dt>
				</dl>
				<dl>
					<dt v-on:click="selectRule('newtree')" v-bind:class="{'li-active':onString == 'newtree'}">
						<i class="fa fa-folder-open" aria-hidden="true">
							new权限
						</i>
					</dt>
				</dl>
		  	</div>
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
		<div class="row row_edit">
		  <div class="modal fade" id="addRefund">
		    <div class="modal-dialog">
		      <refund ref="refund"></refund>
		    </div>
		  </div>
		</div>
		<div class="row row_edit">
		  <div class="modal fade" id="addCustom">
		    <div class="modal-dialog">
		      <custom ref="custom"></custom>
		    </div>
		  </div>
		</div>
  </div>

</template>

<script type="module">
  import SubRecharge from '../components/MP/SubRecharge/SubRecharge.vue'
	import refund from '../components/MP/SubRecharge/Refund.vue'
	import custom from '../components/MP/SubRecharge/Custom.vue'
	import axios from 'axios'
	import Cookies from 'js-cookie'
	import {
		init
	} from '@/../static/js/common.js'
	export default {
		components: {
			SubRecharge,
			refund,
			custom,
		},
		data() {
			return {
				accountName:this.accountName(),
				itemList:[],
				num:0,
				onString:'MemberSummary'
			}
		},
		methods:{
			chargeManager: function() {
				this.$refs.fee.initData();
				$("#addFee").modal("show");
			},
			refundAction(){
				this.$refs.refund.initData();
				$("#addRefund").modal("show");
			},
			customAction(){
				this.$refs.custom.initData();
				$("#addCustom").modal("show");
			},
			titleChange(param){
				console.log('param:'+param)
				this.title=param
			},
			onShow(index){			
				this.num= index;
			},
			selectRule(param){
				this.onString = param;
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
						modelGrade:'1',
						modelType:'',
						operateType:'',
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
						alert('您没有此权限，请联系管理员！！')
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
		created() {
		  
		}
	}
</script>

<style>
	#aside-menu{border-top:1px solid #ccc;}
	#aside-menu dl{ margin-bottom:0; height:50px;overflow:hidden; color:#795548;font-size:20px; background:#f1f1f1; }
	#aside-menu dl.noShow{height:auto; }
	#aside-menu dl dt{height:50px;text-align:center;background:#e6e6e6;border-bottom:1px solid #ccc;}
	#aside-menu dl dd{height:50px;text-align:center;border-bottom:1px solid #ccc;}
	#aside-menu dl dd:hover{background:#f5f5f5;color:#603b2c;}
	#aside-menu dl i{ position:relative; display:inline-block;width:200px;height:50px;text-align:left;line-height:50px;text-indent:25px;}
	#aside-menu dl i:before{position:absolute;left:-25px; display:block;}
 	#aside-menu dl dd.li-active {background:#fff}
  	.li-active i {color: #f2ad4e;}
	.root{width:100%; overflow-x:hidden;}
</style>
