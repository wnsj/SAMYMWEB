<template>
	<div> 
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">会员汇总</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">商铺</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<Store ref="store" @storeChange="storeChange"></Store>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">会员卡号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8"><input class="form-control" type="text" value="" v-model="memNum"></div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8"><input class="form-control" type="text" value="" v-model="memName"></div>
			</div>

			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">手机号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" value="" v-model="phone">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px;padding-left:20px;">开始时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<dPicker style="width:100%" v-model="begCreateDate"></dPicker>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">结束时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<dPicker style="width:100%" v-model="endCreateDate"></dPicker>
				</div>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-right:30px; padding-bottom:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
				 v-on:click="conditionCheck()">查询</button>
			</div>
		</div>

		<div>
			<div class="col-md-12 col-lg-12">
				<nobr class="widthmax">
					<div class="table-responsive pre-scrollable" style=" max-height:464px">
						<table class="table table-bordered table-hover user-table" id="datatable">
							<thead class="datathead">
								<tr>
									<th class="text-center">会员卡号</th>
									<th class="text-center">姓名</th>
									<th class="text-center">手机号</th>
									<th class="text-center">交费总额</th>
									<th class="text-center">消费总额</th>
									<th class="text-center">退费总额</th>
									<th class="text-center">剩余总额</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in memCostList" :key="index" v-on:dblclick="detailAction(item)">
									<td>{{item.MEM_NUM}}</td>
									<td>{{item.MEM_NAME}}</td>
									<td>{{item.PHONE}}</td>
									<td>{{item.TOTAL_RECHARGE}}</td>
									<td>{{item.TOTAL_CONSUMPTION}}</td>
									<td>{{item.TOTAL_REFUND}}</td>
									<td>{{item.TOTAL_BALANCE}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</nobr>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="detailMember">
				<div class="modal-dialog">
					<SubMember ref="member" @addmember='feedback'></SubMember>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import axios from 'axios'
	import dPicker from 'vue2-datepicker'
	import SubMember from '../MP/SubMember/SubMemberList'
	import Store from '../common/Store.vue'
	export default {
		name: 'employee',
		components: {
			dPicker,
			SubMember,
			Store
		},
		data() {
			return {
				memCostList: [],
				storeId: '',
				memNum: '',
				memName:'',
				phone:'',
				begCreateDate:'',
				endCreateDate:'',
			}
		},

		methods: {
			
			detailAction(param){
				this.$refs.member.conditionCheck(param)
				$("#detailMember").modal('show')
			},
		
			feedback() {
				this.conditionCheck()
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
			conditionCheck: function() {
				console.log('querying based on multiple conditions')
				
				if(!this.isBlank(this.begCreateDate)){
					this.begCreateDate = this.moment(this.begCreateDate,'YYYY-MM-DD 00:00:00.000')
				}
				if(!this.isBlank(this.endCreateDate)){
					this.endCreateDate = this.moment(this.endCreateDate,'YYYY-MM-DD 23:59:00.000')
				}
				
				var url = this.url + '/accountRecordAction/queryAccountRecordTotal'
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
						this.memCostList = res.retData;
					}
				}).catch((error) => {
					console.log('会员账目查询失败')
				});
			},
		},
		created() {
			this.conditionCheck()
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
