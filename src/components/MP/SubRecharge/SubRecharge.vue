<!-- add and modify consume -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h2 id="myModalLabel" class="modal-title">{{title}}</h2>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">会员卡号</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memNum" v-on:change="checkMemNum(consume.memNum)">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memName" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.phone" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">金额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.momey" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">时间</label><span
						 class="sign-left">:</span>
						<dPicker class="col-md-7" style="width:59%;" v-model="consume.rechargetime" disabled="disabled"></dPicker>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">维护人</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<emp ref="emp" @employeeChange="empChange"></emp>
						</div>
					</div>
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="addFee()">确认</button>
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="closeCurrentPage()">返回</button>
						</div>
					</div>

				</form>
			</div>

		</div>

	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import emp from '../../common/Employee.vue'
	export default {
		components: {
			dPicker,
			emp,
		},
		data() {
			return {
				consume: {
					memNum: '',
					momey: '',
					empId: '',
					empName:'',
					phone:'',
					costType: '',
					balance:'',
				},
				title: '',
				accountId: this.accountId(),
			};
		},
		methods: {
			// Initialization consume’s content
			initData(param) {
				this.consume = {
					memNum: '',
					momey: '',
					empId: '',
					empName:'',
					phone:'',
					rechargetime:this.moment('','YYYY-MM-DD HH:mm:ss.000'),
					costType: '',
					balance:'',
				}
				if (param == 'recharge') {
					console.log('new increasing recharge')
					this.title = '充值'
					this.consume.consumeType='1'
				} else if (param == 'consume') {
					console.log('new increasing consume')
					this.title = '消费'
					this.consume.consumeType='2'
				} else if (param == 'refund') {
					console.log('new increasing refund')
					this.title = '退费'
					this.consume.consumeType='3'
				}
			},
			//feedback employee information
			empChange: function(param) {
				// console.log('科室：'+JSON.stringify(param))
				if (this.isBlank(param)) {
					this.consume.empId = ""
				} else {
					this.consume.empId = param.empId
				}
				console.log('员工：' + this.consume.empId)
			},
			
			//feedback consumeStype information
			psChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.patitypeid = ''
				} else {
					this.consume.patitypeid = param.patitypeid
				}
			},
			//feedback MedicalInsuranceStype information
			misChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.mitypeid = ''
				} else {
					this.consume.mitypeid = param.mitypeid
				}
			},
			//the event of addtional button
			addFee() {
				console.log('the event of addtional button')
				
				if (this.isBlank(this.consume.memNum)) {
					alert("会员卡号不能为空")
					return
				}
				if (this.isBlank(this.consume.momey)) {
					alert("金额不能为空")
					return
				}
				if (this.isBlank(this.consume.empId)) {
					alert("维护人不能为空")
					return
				}
				
				if (!this.isBlank(this.consume.rechargetime)) {
					this.consume.rechargetime = this.moment(this.consume.rechargetime, 'YYYY-MM-DD HH:mm:ss.000')
				}
				
				if(this.consume.consumeType=='2' && this.consume.balance < this.consume.momey){
					alert("您的余额不足，请充值")
					return
				}
				if(this.consume.consumeType=='3' && this.consume.balance < this.consume.momey){
					alert("您的余额不足，请查询余额后在进行退款")
					return
				}
				
				
				
				var url = this.url + '/accountRecordAction/addAccountRecord'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.consume,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						$("#addFee").modal("show")
					}else{
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			closeCurrentPage() {
				$("#addFee").modal("hide")
				console.log('关闭添加患者界面')
			},
			//Query member's information based on the memNum
			checkMemNum(param) {
				console.log('checkMemNum')
				if (this.isBlank(param)) {
					return
				}
				var url = this.url + '/memberAction/queryMember'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum: param,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						console.log('查到了'+JSON.stringify(res))
						
						this.consume.memNum=res.retData[0].memNum
						this.consume.memName=res.retData[0].memName
						this.consume.phone=res.retData[0].phone
						this.consume.balance=res.retData[0].balance
					} else {
						console.log('没有查到会员信息，请添加会员后充值')
						this.consume.memName=''
						this.consume.phone=''
					}
							
				}).catch((error) => {
					console.log('会员查询请求失败')
				});
			},

		}

	}
</script>

<style>

</style>
