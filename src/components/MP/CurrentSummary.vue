<template>
	<div> 
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">月入汇总</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<Store ref="store" @storeChange="storeChange"></Store>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">月份</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<dPicker style="width:100%" format="YYYY-MM" v-model="createDate"></dPicker>
				</div>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-right:30px; padding-bottom:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10"  data-toggle="modal"
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
									<th class="text-center">时间</th>
									<th class="text-center">类型</th>
									<th class="text-center">金额</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in earningList" :key="index">
									<td>{{item.memNum}}</td>
									<td>{{item.name}}</td>
									<td>{{item.phone}}</td>
									<td>{{item.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
									<td v-show="item.type==1">定金收入</td>
									<td v-show="item.type==2">定金退费</td>
									<td v-show="item.type==3">充值</td>
									<td v-show="item.type==4">流水消费</td>
									<td v-show="item.type==5">项目退费</td>
									<td v-show="item.type==1">+{{item.money}}</td>
									<td v-show="item.type==2">-{{item.money}}</td>
									<td v-show="item.type==3">+{{item.money}}</td>
									<td v-show="item.type==4">+{{item.money}}</td>
									<td v-show="item.type==5">-{{item.money}}</td>
								</tr>
								<tr>
									<td>月总收入</td>
									<td>{{allMoney}} 元</td>
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
	export default {
		name: 'employee',
		components: {
			dPicker,
			memSum,
			Store
		},
		data() {
			return {
				earningList: [],
				storeId: '',
				earningTotle:{
					BALANCE:'',
				},
				createDate:'',
        allMoney:'',
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
				
			},
			//the list , which is detail infomation of member,was checked.
			conditionCheck: function() {
				
				if(!this.isBlank(this.createDate)){
					this.createDate = this.moment(this.createDate,'YYYY-MM-DD 00:00:00.000')
				}else {
				  this.createDate=this.moment(new Date(),'YYYY-MM-DD 00:00:00.000')
        }
				var url = this.url + '/accountRecordAction/queryGrossMomey'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						storeId: this.storeId,
						createDate:this.createDate,
						
						accountId: this.accountId(),
						// modelGrade:'2',
						// modelType:'',
						// operateType:'',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if(res.retData.grossInfo != null){
							this.earningList = res.retData.grossInfo;
						}else{
							this.earningList = [];
						}
						
						if(res.retData.gross != null){
							this.allMoney = res.retData.gross.allMoney
							console.log("剩余："+this.earningTotle.BALANCE)
						}else{
              this.allMoney=''
						}
					}
				}).catch((error) => {
					console.log('月入账目查询失败')
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
