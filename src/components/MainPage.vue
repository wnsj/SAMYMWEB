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
						<i class="fa" v-bind:class="{bg1:num==0,bg2:num!=0,'fa-minus-square':num==0,'fa-plus-square':num!=0}" aria-hidden="true">
							<span class="fa fa-square-o" aria-hidden="true">会员管理模块</span>
						</i>
					</dt>
					<dd v-on:click="selectRule('MemberSummary')">
						<i class="bg3 fa fa-square-o" aria-hidden="true">会员汇总</i>
					</dd>
					<dd v-on:click="selectRule('Member')">
						<i class="bg4 fa fa-square-o" aria-hidden="true">会员基本信息</i>
					</dd>
				</dl>
				<dl v-bind:class="{noShow:num == 1}">
					<dt @click="onShow(1)">
						<i class="fa fa-plus-square" v-bind:class="{bg5:num==1,bg8:num!=1,'fa-minus-square':num==1,'fa-plus-square':num!=1}" aria-hidden="true">
							<span class="fa fa-square-o" aria-hidden="true">消费管理模块</span>
						</i>
					</dt>
					<dd v-on:click="selectRule('SettleSummary')">
						<i class="bg3 fa fa-square-o" aria-hidden="true">消费汇总</i>
					</dd>
					<dd v-on:click="selectRule('Charge')">
						<i class="bg3 fa fa-square-o" aria-hidden="true">已购课程管理</i>
					</dd>
					<dd v-on:click="selectRule('Order')">
						<i class="bg3 fa fa-square-o" aria-hidden="true">预约管理</i>
					</dd>
					<dd v-on:click="selectRule('CashDeposit')">
						<i class="bg4 fa fa-square-o" aria-hidden="true">定金管理</i>
					</dd>	
				</dl>
				<dl v-bind:class="{noShow:num == 2}">
					<dt @click="onShow(2)">
						<i class="fa" v-bind:class="{bg5:num==2,bg8:num!=2,'fa-minus-square':num==2,'fa-plus-square':num!=2}" aria-hidden="true">
							<span class="fa fa-square-o" aria-hidden="true">基础设置</span>
						</i>
					</dt>
					<dd v-on:click="selectRule('Employee')">
						<i class="bg3 fa fa-square-o" aria-hidden="true">员工管理</i>
					</dd>
					<dd v-on:click="selectRule('ScheduleEmp')">
						<i class="bg3 fa fa-square-o" aria-hidden="true">排班管理</i>
					</dd>
					<dd v-on:click="selectRule('Position')">
						<i class="bg3 fa fa-square-o" aria-hidden="true">岗位管理</i>
					</dd>
					<dd v-on:click="selectRule('Position')">
						<i class="bg3 fa fa-square-o" aria-hidden="true">门店管理</i>
					</dd>
					<dd v-on:click="selectRule('RuleManager')">
						<i class="bg3 fa fa-square-o" aria-hidden="true">权限管理</i>
					</dd>
					<dd v-on:click="selectRule('Royalty')">
						<i class="bg3 fa fa-square-o" aria-hidden="true">提成规则管理</i>
					</dd>
					<dd v-on:click="selectRule('Project')">
						<i class="bg4 fa fa-square-o" aria-hidden="true">课程管理</i>
					</dd>
				</dl>
				<dl>
					<dt v-on:click="selectRule('CurrentSummary')">
						<i class="bg6 fa fa-minus-square" aria-hidden="true">
							<span class="fa fa-square-o" aria-hidden="true">月入汇总</span>
						</i>
					</dt>
				</dl>
				<dl>
					<dt v-on:click="selectRule('RoyaltySummary')">
						<i class="bg7 fa fa-minus-square" aria-hidden="true">
							<span class="fa fa-square-o" aria-hidden="true">提成汇总</span>
						</i>
					</dt>
				</dl>
		  	</div>
		  
		  
		 <!--<ul id="aside-menu">
            <li class="li-active" v-on:click="selectRule('MemberSummary')">
              <i class="fa fa-table fa-circle" aria-hidden="true">　会员汇总</i>
            </li>
            <li v-on:click="selectRule('Member')">
              <i class="fa fa-table" aria-hidden="false">　会员管理</i>
            </li>
            <li v-on:click="selectRule('SettleSummary')">
              <i class="fa fa-table" aria-hidden="false">　消费汇总</i>
            </li>
            <li v-on:click="selectRule('Charge')">
              <i class="fa fa-table" aria-hidden="false">　购买课程管理</i>
            </li>
            <li v-on:click="selectRule('Order')">
              <i class="fa fa-table" aria-hidden="false">　预约管理</i>
            </li>
            <li v-on:click="selectRule('CashDeposit')">
              <i class="fa fa-table" aria-hidden="false">　定金管理</i>
            </li>
						<li v-on:click="selectRule('CurrentSummary')">
						  <i class="fa fa-table" aria-hidden="false">　月入汇总</i>
						</li>
            <li v-on:click="selectRule('RoyaltySummary')">
              <i class="fa fa-table" aria-hidden="false">　提成汇总</i>
            </li>
						<li v-on:click="selectRule('Project')">
							<i class="fa fa-table" aria-hidden="false">　课程管理</i>
						</li>
            <li v-on:click="selectRule('Royalty')">
              <i class="fa fa-table" aria-hidden="false">　提成规则管理</i>
            </li> 
            <li v-on:click="selectRule('Employee')">
              <i class="fa fa-table" aria-hidden="false">　员工管理</i>
            </li>
						<li>
							<router-link to="/MP/ScheduleEmp"><i class="fa fa-table" aria-hidden="false">　排班管理</i></router-link>
						</li>
            <li v-on:click="selectRule('Position')">
              <i class="fa fa-table" aria-hidden="false">　岗位管理</i>
            </li>
            <li v-on:click="selectRule('Store')">
              <i class="fa fa-table" aria-hidden="false">　门店管理</i>
            </li>
            <li v-on:click="selectRule('RuleManager')">
              <i class="fa fa-table" aria-hidden="false">　权限管理</i>
            </li>
          </ul>-->
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
				onOff:[
					false,
					true,
					true,
				],
				num:0,
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
        console.log(1);
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
	#aside-menu{}
	#aside-menu dl{ margin-bottom:0; height:50px;overflow:hidden; color:#795548;font-size:20px; }
	#aside-menu dl.noShow{height:auto; }
	#aside-menu dl dt{height:50px;text-align:center;}
	#aside-menu dl dd{height:50px;text-align:center;}
	#aside-menu dl i{ display:inline-block;width:200px;height:50px;text-align:left;line-height:50px;}
	#aside-menu dl i.bg1{background:url(../assets/img/sub_bg1.jpg)}
	#aside-menu dl i.bg2{background:url(../assets/img/sub_bg2.jpg)}
	#aside-menu dl i.bg3{background:url(../assets/img/sub_bg3.jpg)}
	#aside-menu dl i.bg4{background:url(../assets/img/sub_bg4.jpg)}
	#aside-menu dl i.bg5{background:url(../assets/img/sub_bg5.jpg)}
	#aside-menu dl i.bg6{background:url(../assets/img/sub_bg6.jpg)}
	#aside-menu dl i.bg7{background:url(../assets/img/sub_bg7.jpg)}
	#aside-menu dl i.bg8{background:url(../assets/img/sub_bg8.jpg)}
	#aside-menu dl i:before{ margin-right:10px;}
	#aside-menu dl span{ display:inline-block; line-height:50px;}
	#aside-menu dl span:before{ margin-right:8px;}
	#aside-menu dl dd i{ text-indent:27px;}
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
    color:#795548;
  }
  .fa-table:hover{
    color:#9a773b;
  }
  .fa-circle:hover{
    color:#f2ad4e;
  }
</style>
