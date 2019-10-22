<!-- add and modify Addingfees -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}交费</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop pre-scrollable" id="basic" style="max-height: 500px; height:500px;">
				<form action="">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group clearfix" style="padding:0">
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-group clearfix" style="padding:0;">
							<label for="cyname" class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label text-right nopad" style="padding:0;line-height:34px;">住
								院 号：</label>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<input type="text" class="form-control" v-model="hospNum" placeholder="">
							</div>
						</div>
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="checkHosNum(hospNum)">查询</button>
						</div>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-group clearfix" style="padding:0;">
						<label for="cyname" class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label text-right nopad" style="padding:0;line-height:34px;">住
							院 号：</label>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
							<input type="text" class="form-control" :disabled="true" v-model="patient.name" placeholder="">
						</div>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-group clearfix" style="padding:0;">
						<label for="erpzh" class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label text-right nopad" style="padding:0;line-height:34px;">是否在院：</label>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
							<select class="form-control" :disabled="true" v-model="patient.inHosp">
								<option value="0">全部</option>
								<option value="1">是</option>
								<option value="2">否</option>
							</select>
						</div>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-group clearfix" style="padding:0;">
						<label for="cyname" class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label text-right nopad" style="padding:0;line-height:34px;">姓　　名：</label>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
							<input type="text" class="form-control" :disabled="true" v-model="patient.name" placeholder="">
						</div>
					</div>

					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-group clearfix" style="padding:0;">
						<label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label text-right nopad" style="padding:0;line-height:34px;">入院日期：</label>
						<dPicker class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style="width:66%;" :disabled="true" v-model="patient.hospTime"
						 v-on:change="dateAction('1')"></dPicker>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-group clearfix" style="padding:0;">
						<label for="sex" class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label text-right nopad" style="padding:0;line-height:34px;">性　　别：</label>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
							<select class="form-control" :disabled="true" v-model="patient.sex">
								<option value="0">全部</option>
								<option value="1">男</option>
								<option value="2">女</option>
							</select>
						</div>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-group clearfix" style="padding:0;">
						<label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label text-right nopad" style="padding:0;line-height:34px;">出院日期：</label>
						<dPicker class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style="width:66%;" :disabled="true" v-model="patient.outDate"
						 v-on:change="dateAction('2')"></dPicker>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-group clearfix" style="padding:0;">
						<label for="sex" class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label text-right nopad" style="padding:0;line-height:34px;">患者类型：</label>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
							<PS ref="ps" :disabled="true"></PS>
						</div>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-group clearfix" style="padding:0;">
						<label for="sex" class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label text-right nopad" style="padding:0;line-height:34px;">医保类型：</label>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
							<MIS ref="mis" :disabled="true"></MIS>
						</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 clearfix" style="padding:0; margin-top:-15px;">
						<hr>
					</div>
					<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 form-group clearfix" style="padding:0;">
						<label class="col-xs-3 col-sm-3 col-md-3 col-lg-3 control-label text-right nopad" style="padding:0;line-height:34px;">交费日期：</label>
						<dPicker class="col-xs-9 col-sm-9 col-md-9 col-lg-9" style="width:65%;" v-model="paymenttime" v-on:change="dateAction('3')"></dPicker>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group clearfix" style="padding:0;">
						<table class="table table-bordered table-hover user-table" id="" style="table-layout:automatic;">
							<thead>
								<tr>
									<th class="text-center">选择</th>
									<th class="text-center">项目</th>
									<th class="text-center">应收<br>费用</th>
									<th class="text-center">实收<br>费用</th>
									<th class="text-center">开始<br>时间</th>
									<th class="text-center">结束<br>时间</th>
								</tr>
							</thead>
							<!-- <input type="text" οnkeyup="this.value=this.value.replace(/\D/g,'')"> -->
							<tbody>
								<tr v-for="(item ,index) in patient.paymentList" :key='index'>
									<td class="text-center" style="position:relative;">
										<input type="checkbox" v-model="item.isuse" v-on:click="projectSelected(item)"
										@click="Popov(index)" class="checkbox" />
									</td>
									<td class="text-center">{{item.payserviceName}}</td>
									<td class="text-center"><input type="text" class="form-control" placeholder="" v-model="item.receivable"></td>
									<td class="text-center"><input type="text" class="form-control" placeholder="" v-model="item.actualpayment"></td>
									<td class="text-center" style="padding-left:2px;padding-right:2px;">
										<dPicker style="width:100%;" v-model="item.begtime"></dPicker>
									</td>
									<td class="text-center" style="padding-left:2px;padding-right:2px;">
										<dPicker style="width:100%;" v-model="item.endtime"></dPicker>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group clearfix" style="padding:0;">
						<label class="col-xs-2 col-sm-2 col-md-2 col-lg-2 control-label text-left nopad" style="padding:0;line-height:34px;">缴费备注：</label>
						<textarea class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-control" rows="3" v-model="remark"></textarea>
					</div>
					<div class="form-group clearfix">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<button type="button" v-show="isHidden" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;"
							 data-toggle="modal" v-on:click="cancelChargeInfo()">删除</button>
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="updateChargeInfo()">确认</button>
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="closeCurrentPage()">返回</button>
						</div>
					</div>

				</form>
			</div>

		</div>
		<div class="popo">
			<p><span>应收费用:</span>111</p>
			<p><span>实交费用:</span>111</p>
			<p><span>入院时间:</span>2019-02-23</p>
			<p><span>开始时间:</span>2019-02-23</p>
			<p><span>结束时间:</span>2019-02-23</p>
			<div class="triangle"></div>
		</div>
	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	export default {
		components: {
			dPicker,
		},
		data() {
			return {
				patient: {},
				paymentList: [],
				projectList: [],
				patientList: [],
				hospNum: '',
				title: '新增',
				isHidden: '',
				isuser: true,
				postType: '',
				paymenttime: this.moment('', 'YYYY-MM-DD HH:mm:ss.sss'),
				remark: '',
			};
		},
		methods: {
			// Initialization procject’s content
			initData(param, patient) {
				if (param == 'add') {
					console.log('Initialization procject’s content, which adds projcet')
					this.postType = 'add'
					this.title = '新增'
					this.isUse = true
					this.hospNum = ''
					this.isHidden = false
					this.patient = {}
					this.remark = ''
					// this.patient.updateTime
				} else if (param == 'modify') {
					console.log('Initialization procject’s content, which modifies projcet')
					this.patient = patient
					this.hospNum = ''
					this.isHidden = true
					this.postType = 'modify'
					this.title = '修改'
					this.updatePatientChargeInfo()
					// this.projectName=procject.name
					// this.payserviceId=procject.payserviceId
				}
			},
			//feedback department information
			departChange: function(param) {
				console.log('返回科室的全部信息')
			},
			dateAction(param) {
				if (param == '1') {
					if (!this.isBlank(this.patient.hospTime)) {
						this.patient.hospTime = this.moment(this.patient.hospTime, 'YYYY-MM-DD HH:mm:ss.000')
					}
				} else if (param == '2') {
					if (!this.isBlank(this.patient.outHosp)) {
						this.patient.hospTime = this.moment(this.patient.outHosp, 'YYYY-MM-DD HH:mm:ss.000')
					}
				} else if (param == '3') {
					if (!this.isBlank(this.paymenttime)) {
						this.paymenttime = this.moment(this.paymenttime, 'YYYY-MM-DD HH:mm:ss.000')
					}
				}
			},
			//the event of addtional button
			Patient() {
				console.log('the event of addtional button')
				
			},
			closeCurrentPage() {
				$("#addFee").modal("hide")
				console.log('关闭添加患者界面')
			},
			projectSelected(item) {
				// if(this.postType=='add'){
				item.receivable = null
				item.actualpayment = null
				item.begtime = null
				item.endtime = null
				console.log('isSelected' + item.isuse)
				// }
			},
			//check the hosNum if it is existent.
			checkHosNum(param) {
				console.log('checkProjcet')
				if (this.isBlank(param)) {
					return
				}
				var url = this.url + '/patientAction/fuzzyQueryByHospNum'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						hospNum: param
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						if (res.retData != null) {
							this.patient = res.retData
							this.isExist = '1'
							this.remark = this.patient.paymentList[0].paymentRemark
							this.$refs.ps.setObjId(this.patient.patitypeid)
							this.$refs.mis.setObjId(this.patient.mitypeid)
						} else {
							this.patient = {}
							alert("没有查到此住院号")
						}
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},

			//check the charge information of patient
			updatePatientChargeInfo() {
				console.log('updatePatientChargeInfo')
				var url = this.url + '/patientAction/queryPatientPaymentByIdTime'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						patientId: this.patient.PATIENT_ID,
						paymenttime: this.moment(this.patient.PAYMENTTIME, 'YYYY-MM-DD HH:mm:ss.000'),
						unAll: '1',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {
						this.patient = {}
						this.patient = res.retData
						console.log("修改查询患者项目信息：" + this.patient.paymentList[0].paymenttime)
						this.hospNum = this.patient.hospNum

						// Object.assign(this.patient,patient)
						this.paymenttime = this.moment(this.patient.paymentList[0].paymenttime,
							'YYYY-MM-DD HH:mm:ss.000')

					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},

			//cancel the hosNum if it is existent.
			cancelChargeInfo() {

				var url = this.url + '/paymentAction/deletePayment'


				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.patient.paymentList,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.feedbackCharge('cancel')
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},

			//check the hosNum if it is existent.
			updateChargeInfo() {
				if (this.isBlank(this.paymenttime)) {
					alert("请你选择缴费日期")
					return
				}
				for (var i = 0; i < this.patient.paymentList.length; i++) {
					var obj = this.patient.paymentList[i];
					var hms = this.moment('', 'HH:mm:ss.000')
					hms = this.moment(this.paymenttime, 'YYYY-MM-DD') + " " + hms;
					obj.paymentRemark = this.remark
					obj.accountId = this.accountId()
					obj.paymenttime = this.moment(hms, 'YYYY-MM-DD HH:mm:ss.000')
					if (!this.isBlank(obj.begtime)) {
						obj.begtime = this.moment(obj.begtime, 'YYYY-MM-DD HH:mm:ss.000')
					}
					if (!this.isBlank(obj.endtime)) {
						obj.endtime = this.moment(obj.endtime, 'YYYY-MM-DD HH:mm:ss.000')
					}
				}
				if (this.postType == 'add') {
					var url = this.url + '/paymentAction/addPayment'
				} else if (this.postType == 'modify') {
					var url = this.url + '/paymentAction/updatePayment'
				}

				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.patient.paymentList,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.feedbackCharge(this.postType)
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},

			//Query patient's information based on the hosNum
			conditionCheck(param) {
				console.log('checkhosNum')
				if (this.isBlank(this.hospNum)) {
					return
				}
				var url = this.url + '/patientAction/queryPatientByHospNum'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						hospNum: param
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						if (res.retData != null) {
							// 							this.patient = res.retData
							// 							console.log("paymentList:"+this.patient.paymentList)
							// 							this.isExist = '1'
							// 							this.$refs.dept.setDpart(this.patient.deptId)
						} else {
							// 							this.patient={}
							// 							alert("没有查到此住院号")
						}
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			feedbackCharge(param) {
				// console.log("feedbackCharge：" + param)
				this.$emit('feedbackCharge')
			},

			Popov(index){
				console.log($(".checkbox").eq(index).prop("checked")+index);
				if($(".checkbox").eq(index).prop("checked") === true){
					var checkheight = $(".checkbox").eq(index).offset().top
					$(".popo").css("top",(checkheight-44)+"px")
					$(".popo").slideDown();
				}else{
					$(".popo").slideUp()
				}
			},
		},
		created() {

		},
		mounted() {
			//在滚动时判断（实时判断）
			$('#basic').on('scroll',function(){
				$(".popo").slideUp()
			})
			$(window).on('click',function(){
				if($('#addFee').css('display') == 'none'){
					$(".popo").hide()
				}
			})
		},

	}
</script>

<style>
	.mx-input-append {
		height: auto !important;
	}
	.popo{
		width:200px; line-height:34px; position:absolute; top:0; margin-top:0; right:0; margin-right:-200px; z-index:9999;
		background: #F1F1F1; border: 1px solid #ccc; border-radius: 8px; display: none; opacity: 0.95;
	}
	.popo p{
		width:100%; margin: 0; text-align: left;
		padding:10px;
	}
	.popo p span{
		margin-right: 10px;
	}
	.triangle{
		position:absolute;
		top:12px;
		left:-24px;
		width: 0;
		height: 0;
		border-width: 14px;
		border-style: solid;
		border-color: transparent #F1F1F1 transparent transparent ;
	}
</style> 
