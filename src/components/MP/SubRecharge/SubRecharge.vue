<!-- add and modify consume -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h2 id="myModalLabel" class="modal-title">产品购买</h2>
		</div>
		<div class="modal-body  pos_r" style="max-height: 650px;overflow-y: scroll">
			<div class="tab-pane fade in active martop" id="basic">

				<!--				<div class="col-md-6 form-group clearfix">-->
				<!--					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">会员卡号</label><span-->
				<!--					 class="sign-left">:</span>-->
				<!--					<div class="col-md-7">-->
				<!--						<input type="text" class="form-control" v-model="member.memNum" v-on:change="checkMemNum(member.memNum)"-->
				<!--						 placeholder="卡号/手机号后4位">-->
				<!--					</div>-->
				<!--				</div>-->
				<div class="col-md-6 form-group clearfix">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.memName" :disabled="isShow==true">
					</div>
				</div>

				<div class="col-md-6 form-group clearfix">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.phone" :disabled="isShow==true">
					</div>
				</div>
				<div v-show="unfinishedProList.length > 0">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">已购产品</label><span
						 class="sign-left">:</span>
					</div>
					<div class="col-md-12 col-lg-12">
						<table class="table table-bordered table-hover">
							<thead class="datathead">
								<tr>
									<td></td>
									<td>产品名</td>
									<td>咨询师名</td>
									<td>产品类型</td>
									<td>余额</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in unfinishedProList">
									<td><input type="radio" name="radioGroup" @click="radioClick($event,item)" /></td>
									<td>{{item.proName}}</td>
									<td>{{item.counselorName}}</td>
									<td>{{transforProType(item.proType)}}</td>
									<td>{{item.balance}}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="col-md-12 col-lg-12" style="margin-bottom: 20px;line-height: 25px;">
						<p class="tips">注：1、上面是已购产品列表，如发生余额抵扣购买新产品，则请选中已购产品；否则，请不要点选。若已经勾选，则再次点击取消勾选
							<br>2、只能抵扣非欠费普通类型产品，月卡季卡等不可抵扣</p>
					</div>

				</div>
				<div class="col-md-6 form-group clearfix" v-show="member.balance>0">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">预购余额</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="member.balance" :disabled="isShow==true">
					</div>
				</div>
				<div class="col-md-12 col-lg-12" v-show="member.balance>0">
					<p class="tips">* 预购余额：只是用来作为变更咨询师时，购买产品使用；此会员购买产品咨询师未发生变更，此项不做任何参考</p>
				</div>
				<div class="col-md-12 form-group clearfix text-left">
					<h4 id="myModalLabel" class="modal-title">产品：</h4>
				</div>
				<div class="col-md-6 form-group clearfix">
					<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<emp ref="counselorEmp" @employeeChange="counselorEmpChange"></emp>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">产品</label><span
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
					<div class="col-md-7 pos-re">
						<input type="text" class="form-control" v-model="consume.discount" disabled="disabled">
						<span class="pos-ab pos-tr">%</span>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折前总额</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.preFoldTotalPrice" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折后总额</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.receivable" disabled="disabled">
					</div>
				</div>
			</div>
			<div class="tab-pane fade in active martop" v-show="isShow==true">
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
					<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否全额</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<select class="form-control" v-model="consume.isArrears">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">欠费金额</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.arrears">
					</div>
				</div>
			</div>
			<div class="tab-pane fade in active martop" v-show="isShow==true">
				<div class="col-md-12 form-group clearfix text-left" style="padding:0;">
					<div class="col-md-6 clearfix">
						<h4 id="myModalLabel" class="modal-title" style="line-height:39px;">客户：</h4>
					</div>
					<div class="col-md-6 clearfix" v-show="member.balance>0">
						<label class="bui-radios-label col-md-4 end-aline" style="padding:0; margin-right:0;">
							<input type="checkbox" v-model="isSelect" disabled="disabled" /><i class="bui-radios"></i>
							预购抵扣
						</label>
					</div>
				</div>
				<div class="col-md-12 clearfix" v-show="cash.balance>0" style="padding:0;">
					<div class="col-md-6 clearfix" v-show="cash.balance>0">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">
							定金抵扣
						</label>
						<span class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="cash.select" id="earn" @keyup.enter="count" @input="count($event)" />
						</div>
					</div>
					<div class="col-md-6 clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">定金余额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="cash.balance" id="cash" disabled="disabled">
						</div>
					</div>
				</div>
				<div class="col-md-6 clearfix">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">应交总额</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.receivable" disabled="disabled">
					</div>
				</div>
			</div>
			<div class="tab-pane fade in active martop" v-show="isShow==true">
				<div class="col-md-12 text-left clearfix">
					<h4 id="myModalLabel" class="modal-title" style="line-height:39px;">相关选择：</h4>
				</div>
				<div class="col-md-6 form-group clearfix">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">顾问</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<emp ref="emp" @employeeChange="empChange"></emp>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">访问类型</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<select class="form-control" v-model="consume.visitType" @change="visitTypeChange">
							<option value="1">初诊</option>
							<option value="2">复诊</option>
						</select>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">客户判定</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<VisitState ref="VisitStateRef" @objectChange="visitStateChange"></VisitState>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">续流状态</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<ContinState ref="ContinStateRef" @objectChange="continStateChange"></ContinState>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">交费方式</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<select class="form-control" v-model="consume.payType">
							<option value="1">现金</option>
							<option value="2">微信</option>
							<option value="3">支付宝</option>
							<option value="4">信用卡/银行卡</option>
							<option value="5">小程序</option>
							<option value="6">免费</option>
							<option value="7">其它</option>
						</select>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">流水单号</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.serialNo">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">收据</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.receipt">
					</div>
				</div>
			</div>
			<div class="col-md-12 form-group clearfix">
				<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
				 v-on:click="closeCurrentPage()">返回
				</button>
				<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
				 v-on:click="addFee()">确认
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import emp from '../../common/Employee.vue'
	import project from '../../common/Project.vue'
	import VisitState from '../../common/VisitState.vue'
	import ContinState from '../../common/VisitState.vue'

	export default {
		components: {
			dPicker,
			emp,
			project,
			VisitState,
			ContinState
		},
		data() {
			return {
				member: {
					memNum: '', //会员号
					memName: '', //会员名
					phone: '', //手机
					balance: '',
					counselorEmpId: '',
				},
				consume: {
					memNum: '', //会员名
					memName: '', //手机
					phone: '', //预约号
					appNum: '',
					receivable: 0, //应交(折前)
					preFoldTotalPrice: '', //折前总价
					realCross: '', //实缴（折后）
					actualCross: '0', //实交金额
					proId: '', //产品id
					discount: '', //折扣
					price: '', //折前单价
					disPrice: '', //折后单价
					totalCount: 0, //总次数
					actualCount: 0, //实际次数
					giveCount: 0, //赠送次数
					giveProId: 0, //赠送产品
					giveMoney: 0, //赠送金额
					counselor: '', //咨询师id
					empId: '', //咨询师助理id
					state: 0,
					/**状态 * 0：充值 * 1：完结 * 2：退费 */
					storeId: '', //店铺
					operatorId: '', //操作人
					consumCount: '0', //消费次数
					balance: '0',
					cashId: null, //使用定金
					cashMoney: '', //使用定金的金额
					payType: 1, //支付方式
					serialNo: null, //流水单号
					receipt: null, //收据
					isArrears: '1', //是否欠费
					arrears: '0', //欠费金额
				},
				cash: {
					cashId: '',
					memNum: '',
					balance: '',
					select: '',
					btn: false,
				},
				title: '',
				isShow: true,
				consumeReceivable: '',
				isSelect: false,
				cashSelect: true,
				unfinishedProList: [],
				clickItemObj: {
					itemId: 0,
					count: 0
				},
				projectObj: {}
			};
		},
		methods: {
			// Initialization consume’s content
			initData(title, param) {
				$('#rechargeContent').modal({
					backdrop: 'static',
					keyboard: false
				});
				this.clickItemObj = {
					itemId: 0,
					count: 0
				}
				this.projectObj = {}
				$("input[name='radioGroup']").prop("checked", "");
				this.consume = {
					memNum: param.visId, //会员名
					memName: param.visitorName,
					phone: param.phone,
					appNum: '', //预约号
					receivable: 0, //应交
					preFoldTotalPrice: '', //折前总价
					realCross: 0, //实缴
					actualCross: 0, //实交金额
					proId: '', //产品id
					discount: 0, //折扣
					price: 0, //折前单价
					disPrice: 0, //折后单价
					totalCount: 0, //总次数
					actualCount: 0, //实际次数
					giveCount: 0, //赠送次数
					giveProId: 0, //赠送产品
					giveMoney: 0, //赠送金额
					counselor: '', //咨询师id
					empId: '', //咨询师助理id
					state: 0,
					/**状态 * 0：充值 * 1：完结 * 2：退费 */
					storeId: this.storeId(), //店铺
					/** 0：初访 1：在访 */
					isfirst: null,
					/** 0:非初办 1:是 */
					operatorId: this.accountId(), //操作人
					firstCharge: null,
					/** 1:实体卡首充（不计算提成） 0:计算 */
					consumCount: '0', //消费次数
					visitType: 1,
					payType: 1, //支付方式
					serialNo: null, //流水单号
					receipt: null, //收据
					visitState: null, //访问状态
					continState: null, //续流状态
					isArrears: '1', //是否欠费
					arrears: '0', //欠费金额
				}
				this.$refs.counselorEmp.setPosName("咨询师")
				this.$refs.emp.setPosName("咨询顾问")
				this.$refs.counselorEmp.setEmp("")
				this.$refs.emp.setEmp("")
				this.$refs.project.setEmpId("0", 1)
				this.isShow = true
				this.isSelect = false
				this.$refs.VisitStateRef.getObj(1, 1)
				this.$refs.ContinStateRef.getObj(1, 2)
				this.queryUnfinishedPro(param.visId)
				this.checkMemCash(param.visId)
			},
			//咨询师
			counselorEmpChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.counselor = ""
				} else {
					this.consume.counselor = param.empId
					this.$refs.project.setEmpId(this.consume.counselor, 1)
					this.$refs.project.setProject("0")
					this.consume.price = 0
					this.consume.actualCount = 0
					this.consume.discount = 0
					this.consume.receivable = 0
					this.consume.realCross = 0
				}
			},
			//产品
			projectChange: function(param) {
				// //console.log(JSON.stringify(param))
				if (this.isBlank(param)) {
					this.consume.proId = ""
					this.projectObj = {}
				} else {
					this.consume.proId = param.proId
					this.consume.price = param.price //折前单价
					//this.consume.disPrice = param.price * param.discount / 100 //折后单价
					this.consume.actualCount = param.frequency //实际次数
					this.consume.discount = param.discount //折扣
					this.consume.preFoldTotalPrice = param.totalPrice //课程总额
					this.consume.receivable = param.discouAmount //应交
					// this.consume.realCross = param.discouAmount //实缴
					this.consume.proType = param.proType
					this.cash.select = '0'
					this.projectObj = param

					// if (this.member.counselorEmpId != this.consume.counselor) {
					//     //console.log("count1-2" + this.member.counselorEmpId + this.consume.counselor)
					//     if (param.proType == 0) {
					//         //console.log("count1-3")
					//         this.isSelect = false
					//         this.consumeReceivable = this.consume.realCross
					//     } else {
					//         //console.log("count1-4")
					//         this.isSelect = true
					//         this.consumeReceivable = this.consume.realCross - this.member.balance
					//     }
					// } else {
					//     //console.log("count1-5")
					//     this.isSelect = false
					//     this.consumeReceivable = this.consume.realCross
					// }
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
			count(event) {
				if (Number(this.cash.select) > Number(this.cash.balance)) {
					this.cash.select = this.cash.balance;
					$("#earn").val(this.cash.select);
				}
				// //console.log("count1")
				// if (this.member.counselorEmpId != this.consume.counselor) {
				//     //console.log("count2")
				//     if (this.consume.proType == 0) {
				//         //console.log("count4")
				//         this.isSelect = false
				//         this.consumeReceivable = this.consume.realCross
				//     } else {
				//         //console.log("count5")
				//         this.isSelect = true
				//         this.consumeReceivable = this.consume.realCross - this.member.balance - this.cash.select;
				//     }
				// } else {
				//     //console.log("count3")
				//     this.isSelect = false
				//     this.consumeReceivable = this.consume.realCross - this.cash.select;
				// }
			},
			//the event of addtional button
			addFee() {
				//console.log('the event of addtional button')
				if (this.cash.select > 0) {
					this.consume.cashId = this.cash.cashId;
					this.consume.cashMoney = this.cash.select;
				}
				// if (!this.isBlank(this.member.counselorEmpId) && this.member.counselorEmpId != this.consume.counselor) {
				//     if (!confirm("您给客户选择了不同咨询师的产品，是否继续？如果继续，将使用之前咨询师产品的余额进行购买新的产品，否则，请取消！！！")) {
				//         return
				//     }
				// }
				this.consume.totalCount = this.consume.actualCount
				//this.consume.totalCount = this.consume.actualCount + this.consume.giveCount //总次数

				if (this.isBlank(this.consume.memNum)) {
					alert("会员号不能为空")
					return
				}
				if (this.isBlank(this.consume.counselor)) {
					alert("咨询师不能为空")
					return
					//this.consume.counselor = null
				}
				if (this.isBlank(this.consume.proId)) {
					alert("购买产品不能为空")
					return
				}
				if (this.isBlank(this.consume.empId)) {
					alert("维护人不能为空")
					return
				}
				if (this.isBlank(this.consume.cashId)) {
					this.consume.cashId = null
				}
				// if (1 < this.projectObj.proType || this.projectObj.proType > 5) {
				//     alert("非月、季、半年、年卡、测评产品咨询师必须选择!")
				//     return;
				// } else {
				//     this.consume.counselor = null
				// }
				if (this.isBlank(this.consume.visitState)) {
					alert("客户判定不能为空!")
					return;
				}
				if (this.isBlank(this.consume.continState)) {
					alert("续流状态不能为空!")
					return;
				}

				//发生转卡，进余额抵扣
				if (this.clickItemObj.count % 2 != 0) {
					this.consume.piId = this.clickItemObj.itemId
				}

				var url = this.url + '/purchasedItemsAction/purchasedItemsProject'
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
					//console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.closeCurrentPage()
						this.$router.push({
							name: 'Charge',
						});
						this.jumpLeft(3);
						//this.$emit('func', 'Charge')
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					//console.log('请求失败处理')
				});
			},
			closeCurrentPage() {
				this.$emit('closeCurrentPage')
				//$("#addFee").modal("hide")
				//console.log('关闭添加患者界面')
			},
			jumpLeft(index) {
				$("#aside-menu li").removeClass("li-active");
				$("#aside-menu li").find("i.fa-table").removeClass("fa-circle");
				$("#aside-menu li").eq(index).addClass("li-active");
				$("#aside-menu li").eq(index).find("i.fa-table").addClass("fa-circle")
			},
			setCustom(param) {
				this.consume.memNum = param.memNum
				this.consume.memName = param.memName
				this.consume.phone = param.phone
			},

			//Query member's information based on the memNum
			checkMemNum(param) {
				//console.log('checkMemNum')
				if (this.isBlank(param)) {
					return
				}
				var url = this.url + '/purchasedItemsAction/queryMemUnfinished'
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
						this.member = res.retData.mem
						this.counselorList = res.retData.counselorList
						if (this.member != null) {
							this.setCustom(this.member)
							this.checkMemCash(this.member.memNum)
						} else {
							this.member = {
								memNum: '', //会员号
								memName: '', //会员名
								phone: '', //手机
								balance: '',
								counselorEmpId: '',
							}
							this.$refs.counselorEmp.setEmp("")
						}
						if (this.counselorList.length > 0) {
							//console.log("有未完成的产品")
							// var counselorEmpId = this.counselorList[0].counselor
							this.member.counselorEmpId = this.counselorList[0].counselor
						}
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					//console.log('会员查询请求失败')
				});
			},
			//Query member's based information of cash on the memNum
			checkMemCash(param) {
				if (this.isBlank(param)) {
					return
				}
				var url = this.url + '/cashAction/queryCash'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum: param,
						balanceState: '2',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.retData.length > 0) {
							this.cash = res.retData[0]
							this.cash.select = '0.0'
						} else {
							this.cash = {
								memNum: '', //会员号
								balance: '',
							}
						}
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					//console.log('会员查询请求失败')
				});
			},
			//切换访问类型
			visitTypeChange() {
				this.$refs.VisitStateRef.setObj(0)
				this.$refs.VisitStateRef.getObj(this.consume.visitType, 1)
				this.$refs.ContinStateRef.setObj(0)
				this.$refs.ContinStateRef.getObj(this.consume.visitType, 2)
			},
			//切换访问状态
			visitStateChange(param) {
				if (this.isBlank(param)) this.consume.visitState = null
				else this.consume.visitState = param.vsId
			},
			//切换续流状态
			continStateChange(param) {
				if (this.isBlank(param)) this.consume.continState = null
				else this.consume.continState = param.vsId
			},
			//查询已购买产品
			queryUnfinishedPro(param) {
				if (this.isBlank(param)) return
				var url = this.url + '/purchasedItemsAction/queryUnfinishedPro'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum: param,
						isArrears: '1',
						proType: '0',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.unfinishedProList = res.retData
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					//console.log('会员查询请求失败')
				});
			},
			//单选框选中处理
			radioClick(e, item) {
				if (this.clickItemObj.itemId == 0) {
					this.clickItemObj.itemId = item.piId
					this.clickItemObj.count = this.clickItemObj.count + 1
				} else {
					if (this.clickItemObj.itemId == item.piId) {
						if (this.clickItemObj.count % 2 == 0) {
							e.target.checked = false
						}
						this.clickItemObj.count = this.clickItemObj.count + 1
					} else {
						this.clickItemObj.itemId = item.piId
						this.clickItemObj.count = 0
					}
				}
			},
			//产品类型转换
			transforProType(proType) {
				if (proType == 0) return '普通'
				else if (proType == 1) return '月卡'
				else if (proType == 2) return '季卡'
				else if (proType == 3) return '半年卡'
				else if (proType == 4) return '年卡'
				else if (proType == 5) return '测评'
			}
		},
		mounted() {

		},
	}
</script>

<style>
	label.bui-radios-label {
		position: relative;
		line-height: 34px;
	}

	label.bui-radios-label input {
		position: absolute;
		opacity: 0;
		visibility: hidden;
	}

	label.bui-radios-label .bui-radios {
		display: inline-block;
		position: relative;
		width: 13px;
		height: 13px;
		background: #FFFFFF;
		border: 1px solid #979797;
		border-radius: 50%;
		vertical-align: -2px;
		box-sizing: content-box;
	}

	label.bui-radios-label input:checked+.bui-radios:after {
		position: absolute;
		content: "";
		width: 7px;
		height: 7px;
		background-color: #fff;
		border-radius: 50%;
		top: 3px;
		left: 3px;
	}

	label.bui-radios-label input:checked+.bui-radios {
		background: #00B066;
		border: 1px solid #00B066;
	}

	label.bui-radios-label input:disabled+.bui-radios {
		background-color: #e8e8e8;
		border: solid 1px #979797;
	}

	label.bui-radios-label input:disabled:checked+.bui-radios:after {
		background-color: #c1c1c1;
	}
</style>
