<!-- add and modify consume -->
<template>
	<div class="modal-content1">
		<div class="modal-body  pos_r jh-mh-sc1">
			<div class="tab-pane fade in active martop" id="basic">
			<div class="tab-pane fade in active martop">
				<div class="col-md-12 form-group clearfix text-left jh-ad-0 jh-mt-5">
					<div class="col-md-6 clearfix">
						<h4 id="myModalLabel" class="modal-title jh-lh-39">基础信息：</h4>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<b>*</b>
					<label class="col-md-2 control-label text-right nopad end-aline">优惠券名称</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.serialNo">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<b>*</b>
					<label class="col-md-2 control-label text-right nopad end-aline">优惠券类型</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<emp ref="emp" @employeeChange="empChange" disabled></emp>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<b>*</b>
					<label class="col-md-2 control-label text-right nopad end-aline">状态</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<select class="form-control" v-model="consume.isuse">
						    <option value="">全部</option>
						    <option value="1">在用</option>
						    <option value="0">停用</option>
						</select>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<b>*</b>
					<label class="col-md-2 control-label text-right nopad end-aline">金额</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.serialNo" :disabled="true">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix" style="float: right;">
					<b>*</b>
					<label class="col-md-2 control-label text-right nopad end-aline">折扣</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.serialNo" :disabled="true">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix shiyong">
					<b>*</b>
					<label class="col-md-2 control-label text-right nopad end-aline">使用门槛</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<div class="xianzhi"><input class="xian" type="radio" name="radioGroup" @click="radioClick($event,item)" /><label class="xian1">无限制</label></div>
						<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup" @click="radioClick($event,item)" /><label class="xian1">满</label></div>
						<div class="xianzhi2"><input type="text" placeholder="0" :disabled="true"><span>元可用</span></div>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix"></div>
			</div>
			
			
			<div class="tab-pane fade in active martop">
				<div class="col-md-12 form-group clearfix text-left jh-ad-0 jh-mt-5">
					<div class="col-md-6 clearfix">
						<h4 id="myModalLabel" class="modal-title jh-lh-39">适用机制：</h4>
					</div>
				</div>
				<div class="col-md-12 form-group clearfix">
					<b>*</b>
					<label class="col-md-1 control-label text-right nopad end-aline">有效期</label><span class="sign-left">:</span>
					<div class="col-md-8 shiyong shiyong1">
						<div class="xianzhi"><input class="xian" type="radio" name="radioGroup" @click="radioClick($event,item)" /><label class="xian1">永久有效</label></div>
						<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup" @click="radioClick($event,item)" /><label class="xian1">日期范围：</label></div>
						<div class="xianzhi3"><dPicker class="wd100" v-model="dateArr" type="format" format="YYYY-MM-DD" range><template v-slot:header="{ emit }"><div class="text-left"></div></template></dPicker></div>
						<!-- <div class="xianzhi4"><input type="checkbox"><label class="xian1">自领取之日</label></div>
						<div class="xianzhi5"><input type="text" placeholder="0"><span>天内</span></div> -->
					</div>
				</div>
				<div class="col-md-12 form-group clearfix">
					<b>*</b>
					<label class="col-md-1 control-label text-right nopad end-aline">使用用户</label><span class="sign-left">:</span>
					<div class="col-md-8 shiyong shiyong1">
						<div class="xianzhi"><input class="xian" type="radio" name="radioGroup" @click="radioClick($event,item)" /><label class="xian1">全体用户</label></div>
						<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup" @click="radioClick($event,item)" /><label class="xian1">新用户</label></div>
						<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup" @click="radioClick($event,item)" /><label class="xian1">指定用户</label></div>
						<div class="xianzhi3_1"><p>选择用户</p></div>
					</div>
				</div>
				<div class="col-md-12 form-group clearfix">
					<b>*</b>
					<label class="col-md-1 control-label text-right nopad end-aline">选择产品</label><span class="sign-left">:</span>
					<div class="col-md-8 shiyong shiyong1">
						<div class="xianzhi"><input class="xian" type="radio" name="radioGroup" @click="radioClick($event,item)" /><label class="xian1">全品类</label></div>
						<div class="xianzhi1"><input class="xian" type="radio" name="radioGroup" @click="radioClick($event,item)" /><label class="xian1">指定分类</label></div>
						<div class="xianzhi3_1"><p>选择分类</p></div>
						<div class="xianzhi1" style="margin-left:25px;"><input class="xian" type="radio" name="radioGroup" @click="radioClick($event,item)" /><label class="xian1">指定产品</label></div>
						<div class="xianzhi3_1"><p>选择产品</p></div>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<b>*</b>
					<label class="col-md-3 control-label text-right nopad end-aline">每人限领/限用</label><span class="sign-left">:</span>
					<div class="col-md-7 shiyong shiyong1">
						<div class="xianzhi6"><input type="text" placeholder="0"><span>张</span></div>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix"></div>
			</div>
			
			<div class="tab-pane fade in active martop">
				<div class="col-md-12 form-group clearfix text-left jh-ad-0 jh-mt-5">
					<div class="col-md-6 clearfix">
						<h4 id="myModalLabel" class="modal-title jh-lh-39">发放机制：</h4>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix">
					<b>*</b>
					<label class="col-md-2 control-label text-right nopad end-aline">总发行量</label><span class="sign-left">:</span>
					<div class="col-md-7 shiyong shiyong1">
						<div class="xianzhi6"><input type="text" placeholder="0"><span>张</span></div>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix"></div>
			</div>
			<div class="col-md-12 form-group clearfix">
				<button type="button" class="btn btn-primary pull-center m_r_10 jh-mr-25" data-toggle="modal" v-on:click="addFee()">确认</button>
				<button type="button" class="btn btn-warning pull-center m_r_10 jh-mr-35" data-toggle="modal" v-on:click="closeCurrentPage()">取消</button>
			</div>
		</div>
		
	</div>
	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import emp from '../../common/Employee.vue'
	import PayStyle from '../../common/PayStyle.vue'
	import project from '../../common/Project.vue'
	import VisitState from '../../common/VisitState.vue'
	import ContinState from '../../common/VisitState.vue'

	export default {
		components: {
			dPicker,
			emp,
			project,
			VisitState,
			ContinState,
			PayStyle
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
					isuse: '1',
					dateArr: '',
					proStyle: '',
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
					payType: '', //支付方式
					appNumber: '', //小程序编号
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
				appShow: false,
				isArrearsShow: false,
				unfinishedProList: [],
				clickItemObj: {
					itemId: 0,
					count: 0
				},
				projectObj: {},
				dateArr: '',
				begDate: '',
				endDate: '',
			};
		},
		methods: {
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
					visitType: '1',
					payType: '', //支付方式
					appNumber: '', //小程序编号
					serialNo: null, //流水单号
					receipt: null, //收据
					visitState: null, //访问状态
					continState: null, //续流状态
					isArrears: '1', //是否欠费
					arrears: '0', //欠费金额
				}
				this.$refs.payStyle.setPsId('0')
				this.$refs.counselorEmp.setPosName("咨询师")
				this.$refs.emp.setPosName("咨询顾问")
				this.$refs.counselorEmp.setEmp("")
				this.$refs.emp.setEmp("")
				this.$refs.project.setEmpId("0", 1)
				this.isShow = true
				this.isSelect = false
				this.$refs.VisitStateRef.getObj(1, 1)
				this.$refs.ContinStateRef.getObj(1, 2)
				this.$refs.ContinStateRef.setObj('0')
				this.$refs.VisitStateRef.setObj('0')
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

			proStyleChange() {
				this.$refs.project.setProStyle(this.consume.proStyle, 1, this.consume.counselor)
				this.$refs.project.setProject("0")
				this.consume.price = 0
				this.consume.actualCount = 0
				this.consume.discount = 0
				this.consume.receivable = 0
				this.consume.realCross = 0
			},
			//付款方式
			payChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.payType = ""
				} else {
					this.consume.payType = param
					if (this.consume.payType == 5) {
						this.appShow = true
					} else {
						this.appShow = false
						this.consume.appNumber = ''
					}
				}
			},
			//产品
			projectChange: function(param) {
				// console.log(JSON.stringify(param))
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

				}
			},
			isArrearsChange() {
				if (this.consume.isArrears == '1') {
					this.isArrearsShow = false
				} else {
					this.isArrearsShow = true
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
			},
			//the event of addtional button
			addFee() {
				console.log('the event of addtional button')
				if (this.dateArr.length > 0 && !this.isBlank(this.dateArr[0]) && !this.isBlank(this.dateArr[1])) {
				    this.begDate = this.moment(this.dateArr[0], 'YYYY-MM-DD 00:00:00')
				    this.endDate = this.moment(this.dateArr[1], 'YYYY-MM-DD 23:59:59')
				} else {
				    this.begDate = ''
				    this.endDate = ''
				}
				if (this.cash.select > 0) {
					this.consume.cashId = this.cash.cashId;
					this.consume.cashMoney = this.cash.select;
				}
				this.consume.totalCount = this.consume.actualCount

				if (this.isBlank(this.consume.memNum)) {
					alert("会员号不能为空")
					return
				}
				if (this.isBlank(this.consume.counselor)) {
					alert("咨询师不能为空")
					return
				}
				if (this.isBlank(this.consume.proId)) {
					alert("购买产品不能为空")
					return
				}
				if (this.isBlank(this.consume.empId)) {
					alert("顾问不能为空")
					return
				}
				if (this.isBlank(this.consume.cashId)) {
					this.consume.cashId = null
				}
				if (this.isBlank(this.consume.visitState)) {
					alert("客户判定不能为空!")
					return;
				}
				if (this.isBlank(this.consume.continState)) {
					alert("续流状态不能为空!")
					return;
				}
				if (this.isBlank(this.consume.payType)) {
					alert("支付方式不能为空!")
					return;
				}

				if (this.consume.isArrears != '1' && (this.isBlank(this.consume.arrears) || parseInt(this.consume.arrears) == 0)) {
					alert("欠费金额不能为空!")
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
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.closeCurrentPage()
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			closeCurrentPage() {
				this.$emit('closeCurrentPage')
			},
			setCustom(param) {
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
							console.log("有未完成的产品")
							// var counselorEmpId = this.counselorList[0].counselor
							this.member.counselorEmpId = this.counselorList[0].counselor
						}
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('会员查询请求失败')
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
					console.log('会员查询请求失败')
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
					console.log('会员查询请求失败')
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
			var H = window.innerHeight;
			$(".modal-body").css({
				'maxHeight': H * .81
			})
		},
	}
</script>

<style scoped>
	::-webkit-input-placeholder {text-indent: 1em;}
	::-moz-placeholder {text-indent: 1em;}
	:-ms-input-placeholder {text-indent: 1em;}
	:-moz-placeholder {text-indent: 1em;}
	.shiyong{margin-top: 40px;}
	.shiyong1{margin-top: 0;}
	.shiyong .xianzhi{float: left;}
	.shiyong .xianzhi1{float: left;margin-left: 15px;}
	.shiyong .xianzhi4{float: left;margin-left: 15px;margin-top: 5px;}
	.shiyong .xianzhi2{float: left;width:105px;margin-left: 10px;margin-top: 5px;}
	.shiyong .xianzhi5{float: left;width:105px;margin-left: 10px;margin-top: 5px;}
	.shiyong .xianzhi6{float: left;width:120px;margin-left: 10px;margin-top: 5px;}
	.shiyong .xianzhi3{float: left;width:202px;}
	.shiyong .xianzhi3_1{float: left;width:80px;}
	.shiyong .xianzhi3_1 p{margin-left: 10px;margin-top: 5px;border-radius: 5px; width: 80px;height: 25px;line-height: 25px;text-align: center;color:#fff;background: rgba(72, 196, 65, 1);}
	.shiyong .xianzhi2 input{width: 100%; outline: none;border:1px solid #DDDDDD;height: 25px;position: relative;}
	.shiyong .xianzhi2 span{position: absolute;right: -20px;top: 10px;}
	.shiyong .xianzhi5 input{width: 100%; outline: none;border:1px solid #DDDDDD;height: 25px;position: relative;}
	.shiyong .xianzhi5 span{position: absolute;right: -15px;top: 10px;}
	.shiyong .xianzhi6 input{width: 100%; outline: none;border:1px solid #DDDDDD;height: 25px;position: relative;}
	.shiyong .xianzhi6 span{position: absolute;right: 90px;top: 10px;}
	.shiyong .xian{margin-top: 10px;}
	.shiyong .xian1{margin-left: 10px;}
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
	.modal-content1{
		padding-top: 20px!important;
		padding: 100px;
		overflow: auto;
	}
</style>
