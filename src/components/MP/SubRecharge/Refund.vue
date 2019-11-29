<!-- add and modify consume -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h2 id="myModalLabel" class="modal-title">课程退费</h2>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">会员卡号</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memNum" v-on:change="checkMemNum(consume.memNum)"
							 placeholder="卡号/手机号后4位">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memName" :disabled="isShow">
						</div>
					</div>
					
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.phone" :disabled="isShow">
						</div>
					</div>
					
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">维护人</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<emp ref="emp" @employeeChange="empChange"></emp>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix text-left">
						<h4 id="myModalLabel" class="modal-title">课程：</h4>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">项目</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<emp ref="emp" @employeeChange="empChange"></emp>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">单价</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memNum" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课时(次)</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memNum" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折扣比例</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memNum" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">已用课时</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memNum" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折前总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memNum" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">退费课时</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memNum" v-on:change="checkMemNum(consume.memNum)">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">退费金额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memNum" v-on:change="checkMemNum(consume.memNum)">
						</div>
					</div>
					<div class="col-md-12 col-lg-12">
						<p class="tips">* 退费将按照原价收取课时费用，并收取违约金</p>
					</div>
					<div class="col-md-12 form-group clearfix text-left">
						<h4 id="myModalLabel" class="modal-title">退费合计：</h4>
					</div>
					
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">实退总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memNum" v-on:change="checkMemNum(consume.memNum)">
						</div>
					</div>
					
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">违约总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memNum" v-on:change="checkMemNum(consume.memNum)">
						</div>
					</div>
					
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="closeCurrentPage()">返回</button>
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="addFee()">确认</button>
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
					empName: '',
					phone: '',
					rechargetime: '',
					costType: '',
					balance: '',
					storeId: '',
					clerkId:'',
					operatorId:'',
				},
				title: '',
				isShow:true,
				
			};
		},
		methods: {
			// Initialization consume’s content
			initData() {
				this.consume = {
					memNum: '', 
					memName: '',
					momey: '',
					empId: '',
					empName: '',
					phone: '',
					rechargetime: '',
					costType: '',
					balance: '',
					storeId: '',
					clerkId:'',
					operatorId:this.accountId(),
				}
				console.log('文员：'+this.consume.empId)
				this.$refs.emp.setEmp(this.consume.empId);
				this.title = '退费'
				this.isShow = true
			},
			//feedback employee information
			empChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.empId = ""
				} else {
					this.consume.empId = param.empId
				}
			},
			//feedback employee information
			clerkEmpChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.clerkId = ""
				} else {
					this.consume.clerkId = param.empId
				}
			},

			//the event of addtional button
			addFee() {
				console.log('the event of addtional button')

				switch (this.title) {
					case "购买":
						this.consume.costType = '1'
						break;
					case "消费":
						this.consume.costType = '2'
						this.consume.storeId = this.storeId()
						break;
					case "退费":
						this.consume.costType = '3'
						break;
				}
				console.log('费用类型：' + this.consume.costType)
				
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

				if (this.consume.consumeType == '2' && this.consume.balance < this.consume.momey) {
					alert("您的余额不足，请充值")
					return
				}
				if (this.consume.consumeType == '3' && this.consume.balance < this.consume.momey) {
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
						switch (this.title) {
							case "充值":
								this.$router.push({
									name: 'Charge',
								});
								this.jumpLeft(3);
								break;
							case "消费":
								this.$router.push({
									name: 'SettleSummary',
								});
								this.jumpLeft(2);
								break;
							case "退费":
								this.$router.push({
									name: 'Charge',
								});
								this.jumpLeft(3);
								break;
						}
						$("#addFee").modal("hide")
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			closeCurrentPage() {
				$("#addRefund").modal("hide")
				console.log('关闭添加患者界面')
			},
			jumpLeft(index){
				$("#aside-menu li").removeClass("li-active");
				$("#aside-menu li").find("i.fa-table").removeClass("fa-circle");
				$("#aside-menu li").eq(index).addClass("li-active");
				$("#aside-menu li").eq(index).find("i.fa-table").addClass("fa-circle")
			},
			//Query member's information based on the memNum
			checkMemNum(param) {
				console.log('checkMemNum')
				if (this.isBlank(param)) {
					return
				}
				console.log('费用类型3：' + this.consume.costType)
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
						// console.log('查到了' + JSON.stringify(res))
						if (res.retData.length > 0) {
							this.consume.memNum = res.retData[0].memNum
							this.consume.memName = res.retData[0].memName
							this.consume.phone = res.retData[0].phone
							this.consume.balance = res.retData[0].balance
							
						} else {
							console.log('没有查到会员信息，请添加会员后充值')
							this.consume.memName = ''
							this.consume.phone = ''
						}
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
