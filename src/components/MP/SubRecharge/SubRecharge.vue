<!-- add and modify consume -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h2 id="myModalLabel" class="modal-title">课程购买</h2>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">会员卡号</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="member.memNum" v-on:change="checkMemNum(member.memNum)"
							 placeholder="卡号/手机号后4位">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="member.memName" :disabled="isShow==true">
						</div>
					</div>
					
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="member.phone" :disabled="isShow==true">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix" v-show="member.balance>0">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">预购余额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="member.balance" :disabled="isShow==true">
						</div>
					</div>
					<div class="col-md-12 col-lg-12">
						<p class="tips">* 预购余额：只是用来作为变更咨询师时，购买项目使用；此会员购买项目咨询师未发生变更，此项不做任何参考</p>
					</div>
					<div class="col-md-12 form-group clearfix text-left">
						<h4 id="myModalLabel" class="modal-title">课程：</h4>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<emp ref="counselorEmp" @employeeChange="counselorEmpChange"></emp>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课程</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<project ref="project" @projectChange="projectChange"></project>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">单价</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.price" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课时(次)</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.actualCount" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折扣比例</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.discount" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折前总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.receivable" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折后总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.realCross" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">赠送课时</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.giveCount" :disabled="isShow==false">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">赠送金额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.giveMoney" :disabled="isShow==false">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">维护人</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<emp ref="emp" @employeeChange="empChange"></emp>
						</div>
					</div>
			</div>
			<div class="tab-pane fade in active martop" id="basic" v-show="isShow==true">
					<div class="col-md-12 form-group clearfix text-left">
						<h4 id="myModalLabel" class="modal-title">合计：</h4>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">实交总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.realCross">
						</div>
					</div>
					
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">赠送总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.giveMoney">
						</div>
					</div>
			</div>
			<div class="tab-pane fade in active martop" id="basic" v-show="isShow==true">
				<div class="col-md-12 form-group clearfix text-left">
					<div class="col-md-12 clearfix">
						<h4 id="myModalLabel" class="modal-title">客户：</h4>
					</div>
				</div>
				<div class="col-md-6 clearfix">
					<div class="col-md-3">
						<input type="checkbox" class="form-control" v-model="isSelect" disabled="disabled">
					</div>
					<label for="cyname" class="col-md-9 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">预购余额抵扣</label><span
					 class="sign-left">:</span>
				</div>
				<div class="col-md-6 clearfix">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">应交总额</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consumeReceivable" disabled="disabled">
					</div>
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

		</div>

	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import emp from '../../common/Employee.vue'
	import project from '../../common/Project.vue'
	export default {
		components: {
			dPicker,
			emp,
			project,
		},
		data() {
			return {
				member:{
					memNum: '',//会员号
					memName: '',//会员名
					phone: '',//手机
					balance:'',
					counselorEmpId:'',
				},
				consume: {
					memNum: '',//会员名
					memName: '',//手机
					phone: '',//预约号
					appNum: '',
					receivable: '',//应交(折前)
					realCross: '',//实缴（折后）
					proId: '',//项目id
					discount: '',//折扣
					price: '',//折前单价
					disPrice: '',//折后单价
					totalCount: '',//总次数
					actualCount: '',//实际次数
					giveCount: '',//赠送次数
					giveProId: '',//赠送项目
					giveMoney: '',//赠送金额
					counselor: '',//咨询师id
					empId: '',//咨询师助理id
					state: '',/**状态 * 0：充值 * 1：完结 * 2：退费 */
					storeId: '',//店铺
					operatorId: '', //操作人
					consumCount: '0',//消费次数
					balance:'0',
				},
				title: '',
				isShow:true,
				consumeReceivable:'',
				isSelect:true,
			};
		},
		methods: {
			// Initialization consume’s content
			initData(param) {
				this.member={
					memNum: '',//会员号
					memName: '',//会员名
					phone: '',//手机
					balance:'',
					counselorEmpId:'',
				},
				this.consume = {
					memNum: '',//会员名
					memName: '',//手机
					phone: '',//预约号
					appNum: '',
					receivable: '0.0',//应交
					realCross: '0.0',//实缴
					proId: '',//项目id
					discount: '0',//折扣
					price: '0.0',//折前单价
					disPrice: '',//折后单价
					totalCount: '0',//总次数
					actualCount: '0',//实际次数
					giveCount: '0',//赠送次数
					giveProId: '',//赠送项目
					giveMoney: '0.0',//赠送金额
					counselor: '',//咨询师id
					empId: '',//咨询师助理id
					state: '',/**状态 * 0：充值 * 1：完结 * 2：退费 */
					storeId: this.storeId(),//店铺
					visitType: '',/** 0：初访 1：在访 */
					isfirst: '',/** 0:非初办 1:是 */
					operatorId:this.accountId(),//操作人
					firstCharge: '',/** 1:实体卡首充（不计算提成） 0:计算 */
					consumCount: '0',//消费次数
				}
				this.consumeReceivable='0.0'
				this.$refs.counselorEmp.setPosName("咨询师")
				this.$refs.emp.setPosName("咨询顾问")
				this.$refs.counselorEmp.setEmp("")
				this.$refs.emp.setEmp("")
				this.$refs.project.setEmpId("0")
				
				this.isShow = true
				
			},
			//咨询师
			counselorEmpChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.counselor = ""
				} else {
					this.consume.counselor = param.empId
					this.$refs.project.setEmpId(this.consume.counselor)
					this.consume.price = '0'
					this.consume.actualCount = '0'
					this.consume.discount= '0'
					this.consume.receivable='0'
					this.consume.realCross='0'
					this.consumeReceivable=''
				}
			},
			//课程
			projectChange: function(param) {
				
				if (this.isBlank(param)) {
					this.consume.proId = ""
				} else {
					this.consume.proId = param.proId
					this.consume.price = param.price//折前单价
					this.consume.disPrice=param.price*param.discount/100//折后单价
					this.consume.actualCount = param.frequency//实际次数
					this.consume.discount= param.discount//折扣
					this.consume.receivable=param.price*param.frequency//应交
					this.consume.realCross=param.price*param.frequency*param.discount/100//实缴
					
				
					
					if(this.member.counselorEmpId != this.consume.counselor){
						this.consumeReceivable=this.consume.realCross-this.member.balance
					}else{
						this.consumeReceivable=this.consume.realCross
					}
				}
			},
			//feedback employee information
			empChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.empId = ""
				} else {
					this.consume.empId = param.empId
				}
			},
			//the event of addtional button
			addFee() {
				console.log('the event of addtional button')
				
				if(!this.isBlank(this.member.counselorEmpId) && this.member.counselorEmpId != this.consume.counselor){
					if(!confirm("您给客户选择了不同咨询师的课程，是否继续？如果继续，将使用之前咨询师课程的余额进行购买新的项目，否则，请取消！！！")){
						return
					}
				}
				
				this.consume.totalCount=this.consume.actualCount+this.consume.giveProId//总次数
				
				
				if (this.isBlank(this.consume.memNum)) {
					alert("会员号不能为空")
					return
				}
				if (this.isBlank(this.consume.counselor)) {
					alert("咨询师不能为空")
					return
				}
				if (this.isBlank(this.consume.proId)) {
					alert("购买课程不能为空")
					return
				}
				if (this.isBlank(this.consume.empId)) {
					alert("维护人不能为空")
					return
				}

				var url = this.url + '/purchasedItemsAction/purchasedItems'
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
				$("#addFee").modal("hide")
				console.log('关闭添加患者界面')
			},
			jumpLeft(index){
				$("#aside-menu li").removeClass("li-active");
				$("#aside-menu li").find("i.fa-table").removeClass("fa-circle");
				$("#aside-menu li").eq(index).addClass("li-active");
				$("#aside-menu li").eq(index).find("i.fa-table").addClass("fa-circle")
			},
			setCustom(param){
				this.consume.memNum = param.memNum
				this.consume.memName = param.memName
				this.consume.phone = param.phone
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
						if (res.retData.length > 0) {
							
							this.member = res.retData[0]
							console.log(JSON.stringify(this.member))
							this.setCustom(this.member)
						}else{
							this.member={
								memNum: '',//会员号
								memName: '',//会员名
								phone: '',//手机
								balance:'',
								counselorEmpId:'',
							}
						}
					}else{
						alert(res.retMsg)
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
