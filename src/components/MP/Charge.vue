<!-- 充值管理页 -->
<template>
	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">充值管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>会员卡号：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" value="" v-model="hospNum">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>姓　　名：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" value="" v-model="name">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>推荐人姓名：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" value="" v-model="name">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>推荐人岗位：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" value="" v-model="name">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="col-md-1 col-lg-1 text-right" style="padding: 0; line-height: 34px;">
					<p>充值时间：</p>
				</div>
				<div class="col-md-8 col-lg-8 text-left">
					<span>
						<dPicker></dPicker>
					</span> —
					<span>
						<dPicker></dPicker>
					</span>
				</div>
			</div>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xs-offset-7 col-sm-offset-7 col-md-offset-7 col-lg-offset-7"
			 style="padding-right:30px;padding-bottom:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10" @click="exportTableToExcel('datatable','患者费用统计表')">导出</button>
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
								<th class="text-center" rowspan='2'>手机号</th>
								<th class="text-center" rowspan='2'>推荐人姓名</th>
								<th class="text-center" rowspan='2'>推荐人岗位</th>
								<th class="text-center" rowspan='2'>充值时间</th>
								<th class="text-center" rowspan='2'>充值金额(退款)</th>
								<th class="text-center" rowspan='2'>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index1) in chargeLsit" :key="index1">
								<td class="sign">{{item.memNum}}</td>
								<td class="sign">{{item.memName}}</td>
								<td>{{item.NAME}}</td>
								<td>{{item.empName}}</td>
								<td>{{item.DEPTNAME}}</td>
								<td>{{item.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td>{{item.momey}}</td>
								<td class="text-center" style="padding:0" v-if="has(2)"><button type="button" class="btn btn-warning"
									 v-on:click="modifyPatientCharge(patient)">编辑</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</nobr>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="addFee">
				<div class="modal-dialog">
					<SubRecharge ref='fee' @feedbackCharge="feedBack"></SubRecharge>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import adding from '../MP/Charge/Addingfees'
	import SubRecharge from '../MP/SubRecharge/SubRecharge.vue'
	export default {
		components: {
			dPicker,
			adding,
			SubRecharge,
		},
		data() {
			return {
				chargeLsit: [],
				patient: {},
				projectList: [],
				hospNum: '',
				name: '',
				deptId: '',
				patitypeid: '',
				mitypeid: '',
				patientList: [],
				inHosp: '0', //是否在院
				sex: '0', //性别
				hospTime: '',
				outHosp: '',
				fixedHeader: false,
				// endDate:this.endDate('2019-01-01',10),
			};
		},
		methods: {
			//go into the view of added patient charge
			addPatientCharge: function() {
				//this.$refs.fee.initData('add')
				$("#addFee").modal("show")
				console.log('进入添加患者界面')
			},
			//go into the view of modified patient charge
			modifyPatientCharge: function(param) {
				//this.$refs.fee.initData('modify',param)
				$("#addFee").modal("show")
				console.log('进入添加患者界面')
			},
			//date formatting
			dateAction(param) {
				if (param == '0') {
					if (!this.isBlank(this.hospTime)) {
						this.hospTime = this.moment(this.hospTime, 'YYYY-MM-DD HH:mm:ss.000')
					}
				} else if (param == '1') {
					if (!this.isBlank(this.outHosp)) {
						this.outHosp = this.moment(this.outHosp, 'YYYY-MM-DD HH:mm:ss.000')
					}
				}
			},
			departChange(param) {
				if (this.isBlank(param)) {
					this.deptId = ""
				} else {
					this.deptId = param.deptId
				}
			},
			
			//feedback from adding and modifying view
			feedBack() {
				this.conditionCheck()
				$("#addFee").modal("hide")
				$("#departmentContent").modal('hide')
			},

			
			//the list , which is detail infomation of patient,was checked.
			conditionCheck: function() {
				console.log('querying based on multiple conditions')
				var url = this.url + '/accountRecordAction/queryAccountRecord'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {

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
