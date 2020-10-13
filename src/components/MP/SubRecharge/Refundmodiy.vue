<!-- add and modify consume -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h2 id="myModalLabel" class="modal-title">产品退费驳回修改</h2>
		</div>
		<div class="modal-body  pos_r clearfix">
			<div class="tab-pane fade in active martop " id="basic">

					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">姓名</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.memName" :disabled="isShow">
						</div>
					</div>

					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">手机号</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.phone" :disabled="isShow">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">订单时间</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" :disabled="isShow">
						</div>
					</div>
					<div v-show="unfinishedProList.length > 0"> 
						<div class="col-md-12  clearfix jh-ad-0">
							<div class="col-md-6  clearfix jh-wd-33 jh-mb-0">
							<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" >已购产品</label><span
							 class="sign-left">:</span>
							</div>
						</div>
						<div class="col-md-12 form-group clearfix text-left">
							<table class="table table-bordered table-hover">
								<thead class="datathead">
									<tr>
										<td></td>
										<td>产品名</td>
										<td>咨询师名</td>
										<td>产品类型</td>
										<td>余额</td>
										<td>剩余课时</td>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in unfinishedProList">
										<td><input type="radio" name="radioGroup" @click="radioClick($event,item)" /></td>
										<td>{{item.proName}}</td>
										<td>{{item.counselorName}}</td>
										<td>{{transforProType(item.proType)}}</td>
										<td>{{item.balance}}</td>
										<td>{{(item.totalCount - item.consumCount).toFixed(2)}}</td>
									</tr>
								</tbody>
							</table>
						</div>	
					</div>


					<p class="tips col-md-12 col-lg-12">* 退费将按照原价收取课时费用，并收取违约金<br>* 实退总额 = 退费金额 - 违约金</p>

					<div class="col-md-12 form-group clearfix text-left padding-top-20">
						<h4 id="myModalLabel" class="modal-title">退费合计：</h4>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">退费课时</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.consumCount" @change="receivableAction()">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">退费金额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.money" disabled="disabled">
						</div>
					</div>

					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">实退总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.realCross">
						</div>
					</div>

					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">违约总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.balance">
						</div>
					</div>

					<div class="col-md-12 form-group clearfix">
						<button type="button" class="btn btn-warning pull-right margin-right-15" data-toggle="modal"
						 v-on:click="closeCurrentPage()">返回
						</button>
						<button type="button" class="btn btn-primary pull-right margin-right-15" data-toggle="modal"
						 v-on:click="addFee()">确认
						</button>
					</div>

			</div>
		</div>
	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import emp from '../../common/Employee.vue'
	import project from '../../common/Project.vue'
	import axios from "axios";

	export default {
		components: {
			dPicker,
			emp,
			project,
		},
		data() {
			return {
				refund: {
					consumCount: 0, //退课时
					receivable: '', //应退金额
					memNum: '', //会员号
					memName: '', //会员名
					phone: '', //手机
					piId: '', //产品Id
					realCross: '', //应退金额
					balance: '', //违约金
					money: 0, //退费金额
				},
				isShow: false,
				unfinishedProList: [],
				clickItemObj: {
					itemId: 0,
					count: 0,
				},
				selectObj: {
					price: '',
					piId: '',
					consumCount: '',
					actualCount: '',
				},
			};
		},
		methods: {
			// Initialization consume’s content
			initData(param) {
				$('#refundContent').modal({
					backdrop: 'static',
					keyboard: false
				});
				this.refund = {
					consumCount: 0, //退课时
					receivable: '', //应退金额
					memNum: param.visId, //会员号
					memName: param.visitorName, //会员名
					phone: param.phone, //手机
					piId: '', //产品Id
					realCross: '', //应退金额
					balance: '', //违约金
					operatorId: this.accountId(), //操作人
					money: 0, //退费金额
				}
				this.isShow = true
				this.queryUnfinishedPro(param.visId)
				this.clickItemObj = null;
				$("input[name='radioGroup']").prop("checked", "");
				this.clickItemObj = {
					itemId: 0,
					count: 0
				}
			},
			//公共请求方法,返回响应数据
			requestData(url, rquestParam) {
				return new Promise((resolve, reject) => {
					axios({
						method: "post",
						url: url,
						headers: {
							"Content-Type": this.contentType,
							"Access-Token": ''
						},
						data: rquestParam,
						dataType: "json"
					}).then((response) => {
						resolve(response.data);
					}).catch(
						function(error) {
							reject(error)
						}
					);
				});
			},
			//the event of addtional button
			addFee() {
				if (this.isBlank(this.refund.memNum)) {
					alert("会员号不能为空")
					return
				}
				if (this.isBlank(this.selectObj.piId)) {
					alert("请选择需要退费的产品!")
					return
				} else {
					this.refund.piId = this.selectObj.piId
				}

				if (!this.isBlank(this.refund.consumCount) && this.refund.consumCount >= 0 &&
					this.refund.consumCount <= (this.selectObj.actualCount - this.selectObj.consumCount)) {

				} else {
					alert("退费课时填写不正确")
					return
				}
				if (this.refund.realCross <= 0 && this.refund.balance <= 0) {
					alert("实退金额和违约金至少一个大于0")
					return
				}
				this.refund.money = this.selectObj.price * this.refund.consumCount
				var url = this.url + '/purchasedItemsAction/refundProject'
				this.requestData(url, this.refund).then((response) => {
					if (response.retCode == '0000') {
						alert(response.retMsg)
						this.closeCurrentPage()
					} else {
						alert(response.retMsg)
					}
				}, (error) => {
					//console.log("请求失败处理");
				})
			},
			closeCurrentPage() {
				this.$emit('closeCurrentPage')
			},
			jumpLeft(index) {
				$("#aside-menu li").removeClass("li-active");
				$("#aside-menu li").find("i.fa-table").removeClass("fa-circle");
				$("#aside-menu li").eq(index).addClass("li-active");
				$("#aside-menu li").eq(index).find("i.fa-table").addClass("fa-circle")
			},
			//Query member's information based on the memNum
			checkMemNum(param) {
				//console.log('checkMemNum')
				if (this.isBlank(param)) {
					return
				}
				//console.log('费用类型3：' + this.consume.costType)
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
							this.refund.memNum = this.member.memNum
							this.refund.memName = this.member.memName
							this.refund.phone = this.member.phone
						}
						if (this.counselorList.length > 0) {
							this.proList = this.counselorList[0].proList
							this.consume.counselorName = this.counselorList[0].counselorName
							this.refund.counselor = this.counselorList[0].counselor
						} else {
							alert("无可退费产品")
						}
					}

				}).catch((error) => {
					//console.log('会员查询请求失败')
				});
			},
			//查询已购买产品
			queryUnfinishedPro(param) {
				if (this.isBlank(param)) return
				var url = this.url + '/purchasedItemsAction/queryUnfinishedPro'
				var data = {
					memNum: param,
					isArrears: '1',
				}
				this.requestData(url, data).then((response) => {
					if (response.retCode == '0000') {
						this.unfinishedProList = response.retData
					} else {
						alert(response.retMsg)
					}
				}, (error) => {
					//console.log("请求失败处理");
				})
			},
			//产品类型转换
			transforProType(proType) {
				if (proType == 0) return '普通'
				else if (proType == 1) return '月卡'
				else if (proType == 2) return '季卡'
				else if (proType == 3) return '半年卡'
				else if (proType == 4) return '年卡'
				else if (proType == 5) return '测评'
			},
			//单选框选中处理
			radioClick(e, item) {
				if (this.clickItemObj.itemId == 0) {
					this.clickItemObj.itemId = item.piId
					this.clickItemObj.count = this.clickItemObj.count + 1
					this.selectObj = item
				} else {
					if (this.clickItemObj.itemId == item.piId) {
						if (this.clickItemObj.count % 2 == 1) {
							e.target.checked = false
							this.selectObj = {
								price: '',
								piId: '',
								consumCount: '',
								actualCount: '',
							}
						}
						this.clickItemObj.itemId = 0
						this.clickItemObj.count = this.clickItemObj.count + 1
					} else {
						this.clickItemObj.itemId = item.piId
						this.clickItemObj.count = 0
						this.selectObj = item
					}
				}
			},
			//计算退费金额
			receivableAction() {
				if (this.refund.consumCount != null && parseInt(this.refund.consumCount) > 0) {
					if (this.selectObj.price != null && parseInt(this.selectObj.price) > 0) {
						if (parseInt(this.refund.consumCount) > parseInt(this.selectObj.totalCount) - parseInt(this.selectObj.consumCount)) {
							this.refund.consumCount = parseInt(this.selectObj.totalCount) - parseInt(this.selectObj.consumCount)
							this.refund.money = this.selectObj.price * parseInt(this.refund.consumCount)
						} else {
							this.refund.money = this.selectObj.price * parseInt(this.refund.consumCount)
						}
					} else {
						alert('请您先选择退费课程')
					}
				} else {
					this.refund.money = 0
				}
			}
		},
		mounted() {

		}

	}
</script>

<style>

</style>
