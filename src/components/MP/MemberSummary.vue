<template>
	<div class="wraper"> 
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">会员汇总</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-show="accountType==true">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<Store ref="store" @storeChange="storeChange"></Store>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">会员卡号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="memNum"></div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="memName"></div>
			</div>

			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">手机号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<input class="form-control" type="text" value="" v-model="phone">
				</div>
			</div>
		</div>
		<div class="row" style="margin-top: 15px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px;padding-left:20px;">开始时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<dPicker style="width:100%" v-model="begCreateDate"></dPicker>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">结束时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<dPicker style="width:100%" v-model="endCreateDate"></dPicker>
				</div>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-right:30px; padding-bottom:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10"  data-toggle="modal"
				 v-on:click="conditionCheck(1)">查询</button>
			</div>
		</div>

		<div>
			<div class="col-md-12 col-lg-12">
				<nobr class="widthmax">
					<div class="table-responsive pre-scrollable">
						<table class="table table-bordered table-hover user-table" id="datatable">
							<thead class="datathead">
								<tr>
									<th class="text-center">会员卡号</th>
									<th class="text-center">姓名</th>
									<th class="text-center">手机号</th>
									<th class="text-center">购项次数</th>
									<th class="text-center">课时总数</th>
									<th class="text-center">已使用课时</th>
									<th class="text-center">剩余课时</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in memCostList" :key="index" v-on:dblclick="detailAction(item)">
									<td>{{item.memNum}}</td>
									<td>{{item.memName}}</td>
									<td>{{item.phone}}</td>
									<td>{{item.itemNums}}</td>
									<td>{{item.numberOfContracts}}</td>
									<td>{{item.consumptionTimes}}</td>
									<td>{{item.residualTimes}}</td>
								</tr>
							</tbody>
						</table>
					</div>
          <!--分页插件-->
          <div class="page">
            <!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
            <paging ref="paging" @change="pageChange"></paging>
          </div>
				</nobr>
			</div>
			<div class="col-md-12 col-lg-12 posAb">
				<p class="tips ">* 双击单行，可查看会员的充值、消费、退费详情</p>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="detailMember">
				<div class="modal-dialog">
					<memSum ref="member" @addmember='feedback'></memSum>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import axios from 'axios'
	import dPicker from 'vue2-datepicker'
	import memSum from '../MP/SubMemSum/SubMemSum'
	import Store from '../common/Store.vue'
  	import Paging from '../common/paging'
	import {
		init
	} from '@/../static/js/common.js'
	export default {
		name: 'employee',
		components: {
			dPicker,
			memSum,
			Store,
      Paging
		},
		data() {
			return {
				memCostList: [],
				storeId: this.storeId(),
				memNum: '',
				memName:'',
				phone:'',
				begCreateDate:'',
				endCreateDate:'',

				accountType:this.accountType(),


        //分页需要的数据
        pages: '', //总页数
        current: 1, //当前页码
        size: 10, //一页显示的数量
        total: '', //数据的数量
			}
		},

		methods: {
      //子级传值到父级上来的动态拿去
      pageChange: function(page) {
        this.current = page
        this.conditionCheck(page);
      },
			detailAction(param){
				this.$refs.member.conditionCheck(param)
				$("#detailMember").modal('show')
			},
		
			feedback() {
				this.conditionCheck(1)
				$("#detailMember").modal('hide')
			},
			//feedback store information
			storeChange: function(param) {
				if (this.isBlank(param)) {
					this.storeId = ""
				} else {
					this.storeId = param.storeId
				}
				console.log('store' + this.storeId)
			},
			//the list , which is detail infomation of member,was checked.
			conditionCheck: function(page) {
				console.log('querying based on multiple conditions')
				
				if(!this.isBlank(this.begCreateDate)){
					this.begCreateDate = this.moment(this.begCreateDate,'YYYY-MM-DD 00:00:00.000')
				}
				if(!this.isBlank(this.endCreateDate)){
					this.endCreateDate = this.moment(this.endCreateDate,'YYYY-MM-DD 23:59:00.000')
				}
				
				var url = this.url + '/accountRecordAction/queryAccountRecordTotal/'+page+'/'+this.size
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						storeId: this.storeId,
						memNum: this.memNum,
						memName:this.memName,
						memNumNotNull:'1',//用来判断数据库的非空会员
						phone:this.phone,
						begCreateDate:this.begCreateDate,
						endCreateDate:this.endCreateDate,
						
						accountId: this.accountId(),
						modelGrade:'2',
						modelType:'',
						operateType:'',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
            this.pages=res.retData.pages //总页数
            this.current=res.retData.current //当前页码
            this.size=res.retData.size//一页显示的数量  必须是奇数
            this.total=res.retData.total //数据的数量
            this.$refs.paging.setParam(this.pages,this.current,this.total)
						this.memCostList = res.retData.records;
					}
				}).catch((error) => {
					console.log('会员账目查询失败')
				});
			},
		},
		mounted() {
			init();
		},
		created() {
			 this.conditionCheck(1);
			
		},

	}
</script>


<style scoped="scoped">
	.widthmax {
		width: auto;
		overflow-x: scroll;
	}

	#datatable {
		position: relative;
	}

	#fHeader {
		position: absolute;
		top: 0;
		left: 0;
		background: #eeeeee;
		overflow: hidden;
	}

	#fHeader div.text-center {
		float: left;
		display: inline-block;
		padding: 8px;
		border: 1px solid #ddd;
		font-weight: bold;
	}

	@media print {
		#fHeader {
			display: none
		}
	}
</style>
