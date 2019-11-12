<!-- 充值管理页 -->
<template>
	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">充值管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">会员卡号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" value="" v-model="memNum">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">费用类型</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<select class="form-control" v-model="costType">
						<option value="1">充值</option>
						<!-- <option value="2">消费</option> -->
						<option value="3">退款</option>
					</select>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">会员姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" value="" v-model="memName">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">推荐人</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<emp ref="emp" @employeeChange='empChange'></emp>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-left:0.8%;">
				<div class="col-md-2 col-lg-2 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:25px;">充值时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-4 col-lg-4">
					<dPicker style="width:100%" v-model="begCreateDate"></dPicker>
				</div>
				<div style="padding: 0; line-height: 34px; float:left">
					~
				</div>
				<div class="col-md-4 col-lg-4">
					<dPicker style="width:100%" v-model="endCreateDate"></dPicker>
				</div>
			</div>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xs-offset-7 col-sm-offset-7 col-md-offset-7 col-lg-offset-7"
			 style="padding-right:30px;padding-bottom:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
				 v-on:click="conditionCheck()">查询</button>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<nobr class="widthmax">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover user-table" id="datatable">
						<thead class="datathead">
							<tr class="datatr_1">
								<th class="text-center" rowspan='2'>会员卡号</th>
								<th class="text-center" rowspan='2'>姓名</th>
								<th class="text-center" rowspan='2'>推荐人姓名</th>
								<th class="text-center" rowspan='2'>充值时间(退款)</th>
								<th class="text-center" rowspan='2'>充值金额(退款)</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index1) in chargeLsit" :key="index1">
								<td class="sign">{{item.memNum}}</td>
								<td class="sign">{{item.memName}}</td>
								<td>{{item.empName}}</td>
								<td>{{item.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td>{{item.momey}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</nobr>
		</div>
	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import emp from '../common/Employee.vue'
	export default {
		components: {
			dPicker,
			emp,
		},
		data() {
			return {
				chargeLsit: [],
				costType:'1',//费用类型（1.充值，  2.消费，3.退款）
				memNum:'',
				memName:'',
				empId:'',
				begCreateDate:'',
				endCreateDate:'',
				
			};
		},
		methods: {	
			empChange(param) {
				console.log('员工信息：'+JSON.stringify(param))
				if (this.isBlank(param)) {
					this.empId = ""
				} else {
					this.empId = param.empId
				}
			},
			
			//feedback from adding and modifying view
			feedBack() {
				this.conditionCheck()
				$("#addFee").modal("hide")
			},

			
			//the list , which is detail infomation of patient,was checked.
			conditionCheck: function() {
				console.log('querying based on multiple conditions')
				if(!this.isBlank(this.begCreateDate)){
					this.begCreateDate=this.moment(this.begCreateDate,'YYYY-MM-DD 00:00:00.000')
				}
				if(!this.isBlank(this.endCreateDate)){
					this.endCreateDate=this.moment(this.endCreateDate,'YYYY-MM-DD 23:59:59.000')
				}
				var url = this.url + '/accountRecordAction/queryAccountRecord'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum:this.memNum,
						memName:this.memName,
						empId:this.empId,
						begCreateDate:this.begCreateDate,
						endCreateDate:this.endCreateDate,
						costType:this.costType,
						
						accountId: this.accountId(),
						modelGrade:'2',
						modelType:'',
						operateType:'',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {
						this.chargeLsit = res.retData
					}
				}).catch((error) => {
					console.log('充值查询请求失败')
				});
			},
			
		},
		created() {
			this.conditionCheck()
		}


	}
</script>

<style>
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

	#fHeader div.fth_1 {}

	#fHeader div.fth_2 {
		display: block;
		position: absolute;
		margin-top: -39px;
		right: 110px;
	}

	#fHeader div.text-center {
		float: left;
		display: table;
		padding: 8px;
		border: 1px solid #ddd;
		font-weight: bold;
		vertical-align: bottom;
		position: relative;
	}

	#fHeader div.text-center p {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	@media print {
		#fHeader {
			display: none
		}
	}
</style>
