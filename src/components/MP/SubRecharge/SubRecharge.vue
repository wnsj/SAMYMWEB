<!-- add and modify consume -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h2 id="myModalLabel" class="modal-title">产品购买</h2>
		</div>
		<div class="modal-body  pos_r jh-mh-sc">
			<div class="tab-pane fade in active martop" id="basic">
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline  ">姓名</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.memName" :disabled="isShow==true">
					</div>
				</div>

				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline  ">手机号</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.phone" :disabled="isShow==true">
					</div>
				</div>
				<div v-show="unfinishedProList.length > 0">
					<div class="col-md-12  clearfix jh-ad-0">
						<div class="col-md-6  clearfix jh-wd-33 jh-mb-0">
							<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">已购产品</label><span class="sign-left">:</span>
						</div>
					</div>
					<div class="col-md-12 col-lg-12">
						<table class="table table-bordered table-hover jh-mb-0">
							<thead class="datathead">
								<tr>
									<td>选择</td>
									<td>产品名</td>
									<td>咨询师名</td>
									<td>产品类型</td>
									<td>余额</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in unfinishedProList" class="zes" :key="index">
									<td v-if="item.auditState != 5 && item.auditState != 10"><input type="radio" name="radioGroup" @click="radioClick($event,item)"></td>
									<td v-if="item.auditState == 10 || item.auditState == 5"><input type="radio" name="radioGroup" @click="radioClick($event,item)"
										 disabled="disabled">
										<el-tooltip v-if="item.auditState == 10 || item.auditState == 5" popper-class="atooltip" class="item gantan0"
										 effect="light" content="由于审核原因，当前产品无法操作" placement="bottom">
											<div class="gan0">
												<p>!</p>
											</div>
										</el-tooltip>
									</td>
									<td>{{item.proName}}</td>
									<td>{{item.counselorName}}</td>
									<td>{{transforProType(item.proType)}}</td>
									<td>{{item.balance}}</td>
								</tr>
							</tbody>
						</table>


					</div>

					<div class="col-md-12 col-lg-12">
						<p class="tips" style="font-weight: bolder">注：1、上面是已购产品列表，如发生余额抵扣购买新产品，则请选中已购产品；否则，请不要点选。若已经勾选，则再次点击取消勾选
							<br>2、只能抵扣非欠费普通类型产品，月卡季卡等不可抵扣</p>
					</div>

				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33" v-show="member.balance>0">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline  ">预购余额</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="member.balance" :disabled="isShow==true">
					</div>
				</div>
				<div class="col-md-12 col-lg-12" v-show="member.balance>0">
					<p class="tips">* 预购余额：只是用来作为变更咨询师时，购买产品使用；此会员购买产品咨询师未发生变更，此项不做任何参考</p>
				</div>
				<div class="col-md-12 form-group clearfix text-left jh-mt-5">
					<h4 id="myModalLabel" class="modal-title">产品：</h4>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">咨询师</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<emp ref="counselorEmp" @employeeChange="counselorEmpChange"></emp>
					</div>
				</div>

				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label class="col-md-4 control-label text-right nopad end-aline">产品风格</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<select class="form-control" @change="proStyleChange" v-model="consume.proStyle">
							<option value="">--未选择--</option>
							<option value="1">新产品</option>
							<option value="2">老产品</option>
						</select>
					</div>
				</div>

				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">产品</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<project ref="project" @projectChange="projectChange"></project>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">单价</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.price" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">课时(次)</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.actualCount" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">折扣比例</label><span class="sign-left">:</span>
					<div class="col-md-7   pos-re">
						<input type="text" class="form-control" v-model="consume.discount" disabled="disabled">
						<span class="pos-ab pos-tr">%</span>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">折前总额</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.preFoldTotalPrice" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline  ">折后总额</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="receivables" disabled="disabled">
					</div>
				</div>
			</div>
			<div class="youthis"  v-if="listCouponZhe.length||listCouponJian.length" style="display: block;">
				<div class="tab-pane fade in active martop">
					<div class="col-md-12 form-group clearfix text-left jh-mt-5">
						<h4 id="myModalLabel" class="modal-title">选择优惠券：</h4>
					</div>
					<div class="col-md-7 you">
						<div class="man1">
							<div class="man">
								<div class="manjian"></div>
								<div class="manjian1">满减</div>
							</div>
							<ul>
								<li @click="dianji(item,index)" v-for="(item,index) in listCouponJian" :key="index">
									<div class="jia"><span>￥</span>{{item.recude}}</div>
									<div class="bianhaoasd">编号：<span>{{item.couId}}</span></div>
									<div class="titleSY">{{item.couponName}}</div>
									<div class="manzu" v-if="item.fullCondition !=null">满<span>{{item.fullCondition}}</span>元可用</div>
									<div class="manzu" v-else-if="item.fullCondition == null">满<span>0</span>元可用</div>
									<div class="youxiao" v-if="item.startTime != null">有效期<span>{{item.startTime | dateFormatFilter("YYYY-MM-DD HH:mm:ss")}}</span></div>
									<div class="niucha1" v-else-if="item.startTime == null">永久有效</div>
									<div class="niucha" v-if="item.endTime != null">
										<p class="xian"></p><span>{{item.endTime | dateFormatFilter("YYYY-MM-DD HH:mm:ss")}}</span>
									</div>
									<div class="gou1" v-if="item.checked"><img src="../../../../static/img/youhui_xuanze1.png" alt=""></div>
								</li>
							</ul>
						</div>
						<div class="man2">
							<div class="man">
								<div class="manjian"></div>
								<div class="manjian1">满折</div>
							</div>
							<ol>
								<li @click="dianji1(index,item)" v-for="(item,index) in listCouponZhe" :key="index">

									<div class="jia">{{item.recude}}<span>折</span></div>
									<div class="bianhaoasd">编号：<span>{{item.couId}}</span></div>
									<div class="titleSY">{{item.couponName}}</div>
									<div class="manzu">满<span>{{item.fullCondition}}</span>元可用</div>
									<div class="youxiao" v-if="item.startTime != null">有效期<span>{{item.startTime | dateFormatFilter("yyyy-MM-DD HH:mm:ss")}}</span></div>
									<div class="niucha1" v-else-if="item.startTime == null">永久有效</div>
									<div class="niucha" v-if="item.endTime != null">
										<p class="xian"></p><span>{{item.endTime | dateFormatFilter("yyyy-MM-DD HH:mm:ss")}}</span>
									</div>
									<div class="gou1" style="display: block;" v-if="Number(item.checked)==1"><img src="../../../../static/img/youhui_xuanze1.png"
										 alt=""></div>
								</li>
							</ol>
						</div>
					</div>
				</div>
				<div class="tab-pane fade in active martop">
					<div class="col-md-7">
						<ul class="btn-numbox1">
							<li class="shiyong2"><span class="number1">使用数量/张：</span></li>
							<li>
								<ul class="count1">
									<li><span class="num-jian1" @click="btnMinute()">-</span></li>
									<li><input type="text" class="input-num1" value="1" v-model="titles" /></li>
									<li><span class="num-jia1" @click="btnAdd()">+</span></li>
								</ul>
							</li>　
						</ul>
					</div>
				</div>
			</div>
			<div class="tab-pane fade in active martop" v-show="isShow==true">
				<div class="col-md-12 form-group clearfix text-left jh-ad-0 jh-mt-5">
					<div class="col-md-6 clearfix jh-wd-33">
						<h4 id="myModalLabel" class="modal-title jh-lh-39">客户：</h4>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33" v-show="cash.balance>0">
					<label class="col-md-4 control-label text-right nopad end-aline">
						定金抵扣
					</label>
					<span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="number" class="form-control" v-model="cash.select" id="earn" @keyup.enter="count" @input="count($event)"
						 @blur="dikou()" />
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33" v-show="cash.balance>0">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">定金余额</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="cash.balance" id="cash" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33 zongeb">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">应交总额</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.receivable" disabled="disabled">
					</div>
				</div>
			</div>
			<div class="tab-pane fade in active martop" v-show="isShow==true">
				<div class="col-md-12 form-group clearfix text-left jh-mt-5">
					<h4 id="myModalLabel" class="modal-title">合计：</h4>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33 shiji">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline  ">实交总额</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.realCross" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label class="col-md-4 control-label text-right nopad end-aline  ">是否全额</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<select @change="isArrearsChange" class="form-control" v-model="consume.isArrears">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33" v-show="isArrearsShow">
					<b>*</b>
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline  ">欠费金额</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="number" class="form-control" v-model="consume.arrears" @blur="qianfei()">
					</div>
				</div>
			</div>
			<div class="tab-pane fade in active martop" v-show="isShow==true">
				<div class="col-md-12 form-group clearfix text-left jh-ad-0 jh-mt-5">
					<div class="col-md-6 clearfix">
						<h4 id="myModalLabel" class="modal-title jh-lh-39">相关选择：</h4>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">顾问</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<emp ref="emp" @employeeChange="empChange"></emp>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">访问类型</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<select class="form-control" v-model="consume.visitType" @change="visitTypeChange">
							<option value="1">初访</option>
							<option value="2">复访</option>
						</select>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">客户判定</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<VisitState ref="VisitStateRef" @objectChange="visitStateChange"></VisitState>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">续流状态</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<ContinState ref="ContinStateRef" @objectChange="continStateChange"></ContinState>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">交费方式</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<PayStyle ref="payStyle" @payStyleChange="payChange"></PayStyle>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33" v-if="appShow==true">
					<label class="col-md-4 control-label text-right nopad end-aline">小程序编号</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.appNumber">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label class="col-md-4 control-label text-right nopad end-aline">流水单号</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.serialNo">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label class="col-md-4 control-label text-right nopad end-aline">收据</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.receipt">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label class="col-md-4 control-label text-right nopad end-aline">备注</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<textarea type="text" class="form-control" v-model="consume.remark" style="height: 34px;"></textarea>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33"></div>
			</div>
			<div class="col-md-12 form-group clearfix">
				<button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-35" data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
				<button type="button" :disabled="isDisable" class="btn btn-primary pull-right m_r_10 jh-mr-25" data-toggle="modal"
				 v-on:click="addFee(item)">确认</button>
			</div>
		</div>

	</div>
	</div>
</template>

<script>
	import {
		Decimal
	} from 'decimal.js'
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
				lifh: true,
				recude: 0,
				yongjiu: false,
				jinqian: '',
				member: {
					memNum: '', //会员号
					memName: '', //会员名
					phone: '', //手机
					balance: '',
					counselorEmpId: '',
				},
				receivables: 0, //折前
				// preFoldTotalPrice: 0, //折前总价
				consume: {
					proStyle: '1',
					memNum: '', //会员名
					memName: '', //手机
					phone: '', //预约号
					appNum: '',
					couponId: 0,
					couponType: 0,
					couponNum: 0,
					couponName: '',
					receivable: 0, //应交
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
					remark: '',
					state: 0,
					/**状态 * 0：充值 * 1：完结 * 2：退费 */
					storeId: '', //店铺
					operatorId: '', //操作人
					consumCount: '0', //消费次数
					balance: 0,
					cashId: null, //使用定金
					cashMoney: '', //使用定金的金额
					payType: '', //支付方式
					appNumber: '', //小程序编号
					serialNo: null, //流水单号
					receipt: null, //收据
					isArrears: '1', //是否欠费
					arrears: 0, //欠费金额
				},
				cash: {
					cashId: '',
					memNum: '',
					balance: 0,
					select: 0,
					btn: false,
				},
				// titll: '',
				productId: '',
				couponId: '',
				dui: true,
				dis: true,
				shs: true,
				zhekou: 1,
				manjian: 1,
				titles: 0,
				xuanze1: '',
				userId: '',
				titttl: 0,
				isShow: true,
				consumeReceivable: '',
				isSelect: false,
				cashSelect: true,
				appShow: false,
				isArrearsShow: false,
				unfinishedProList: [],
				listCouponJian: [],
				listCouponZhe: [],
				auditState: '',
				clickItemObj: {
					itemId: 0,
					count: 0
				},
				clickItemObj1: {
					itemId: 0,
					count: 0
				},
				projectObj: {},
				isLine: true,
				isDisable: false
			};
		},
		methods: {

			// Initialization consume’s content
			initData(title, param) {
				console.log(param)
				this.userId = param.visId;
				// console.log(param.visitorName)
				// return false
				$('#rechargeContent').modal({
					backdrop: 'static',
					keyboard: false
				});

				this.clickItemObj = {
					itemId: 0,
					count: 0
				}
				this.clickItemObj1 = {
					itemId: 0,
					count: 0
				}
				this.projectObj = {}
				$("input[name='radioGroup']").prop("checked", "");
				this.consume = {
					memNum: param.visId, //会员名
					memName: param.visitorName,
					phone: param.phone,
					couponId: null,
					couponType: null,
					couponNum: 0,
					couponName: '',
					appNum: '', //预约号
					receivable: 0, //折前
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
					remark: '',
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
				// this.youhui(param.couId)
				this.checkMemCash(param.visId)
			},
			//优惠券使用张数增加
			btnAdd() {
				// 如果数量大于商品库存
				if (this.titles >= this.titttl) {
					alert('该优惠券不能使用更多了~')
					return false
				} else {
					this.titles++
					this.consume.couponNum = this.titles;
					//满减
					if (this.consume.couponType == 2) {
						var mach = new Decimal(this.titles).mul(new Decimal(this.manjian));
						var zz = new Decimal(this.receivables).sub(new Decimal(mach));
						this.consume.receivable = zz;
						this.consume.realCross = zz;
					}
					//满折
					if (this.consume.couponType == 1) {
						var jh = new Decimal(this.zhekou).div(new Decimal(10));
						this.consume.receivable = new Decimal(this.receivables).mul(new Decimal(Math.pow(jh, this.titles))).toFixed(
							2, Decimal.ROUND_HALF_UP);
						this.consume.realCross = new Decimal(this.receivables).mul(new Decimal(Math.pow(jh, this.titles))).toFixed(
							2, Decimal.ROUND_HALF_UP);
					}
				}
			},
			//优惠券使用张数减少
			btnMinute() {
				if (this.titles <= 1) {
					alert('该优惠券不能减少了哟~')
					return false
				} else {
					// return false
					this.titles--
					this.consume.couponNum = this.titles;
					//满减
					if (this.consume.couponType == 2) {
						var mach = new Decimal(this.titles).mul(new Decimal(this.manjian));
						var zz = new Decimal(this.receivables).sub(new Decimal(mach));
						this.consume.receivable = zz;
						this.consume.realCross = zz;
					}
					//满折
					if (this.consume.couponType == 1) {
						var jh = new Decimal(this.zhekou).div(new Decimal(10));
						this.consume.receivable = new Decimal(this.receivables).mul(new Decimal(Math.pow(jh, this.titles))).toFixed(
							2, Decimal.ROUND_HALF_UP);
						this.consume.realCross = new Decimal(this.receivables).mul(new Decimal(Math.pow(jh, this.titles))).toFixed(
							2, Decimal.ROUND_HALF_UP);
					}
				}
			},
			resetDate(row, column, cellValue, index) {
				if (cellValue !== '' && cellValue !== null && cellValue !== undefined) {
					return cellValue.substring(0, 10)
				}
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
				this.productId = param.proId;
				console.log(this.productId)
				if (this.isBlank(param)) {
					this.consume.proId = ""
					this.projectObj = {}
				} else {
					var url = this.url + '/couponController/selectCoupon'
					var formData = new FormData();
					formData.append('productId', this.productId);
					formData.append('userId', this.userId);
					this.$ajax({
						method: 'POST',
						url: url,
						headers: {
							'Content-Type': 'x-www-form-urlencoded',
							'Access-Token': this.accessToken
						},
						data: formData,
						dataType: 'json',
					}).then((res) => {
						if (0 == res.data.retCode) {
							let data = res.data.retData
							let listZhe = data['1']
							let listjian = data['2']
							listZhe.forEach((item) => {
								item.checked = false
								item.recude = item.recude / 10
							})
							listjian.forEach((item) => {
								item.checked = false
							})
							this.listCouponZhe = listZhe
							this.listCouponJian = listjian
						}
					}).catch((error) => {
						console.log(error)
						console.log('请求失败处理')
					});
					this.consume.proId = param.proId
					this.consume.price = param.price //折前单价
					//this.consume.disPrice = param.price * param.discount / 100 //折后单价
					this.consume.actualCount = param.frequency //实际次数
					this.consume.discount = param.discount //折扣
					this.consume.preFoldTotalPrice = param.totalPrice //课程总额
					this.consume.receivable = param.discouAmount //应交
					if (this.consume.price == null || this.consume.actualCount == null || this.consume.discount == null) {
						this.consume.price = 0;
						this.consume.actualCount = 0;
						this.consume.discount = 0;
					} else {
						// this.preFoldTotalPrice = new Decimal(this.consume.price).mul(new Decimal(this.consume.actualCount));
						this.receivables = new Decimal(this.consume.price).mul(new Decimal(this.consume.actualCount)).mul(new Decimal(
							this.consume.discount)).div(new Decimal(100));
					}

					this.consume.realCross = param.discouAmount //实缴
					this.consume.proType = param.proType
					this.cash.select = '0'
					this.projectObj = param

				}
			},
			isArrearsChange() {
				if (this.consume.isArrears == '1') {
					this.isArrearsShow = false
					var ss = new Decimal(this.consume.receivable)
					this.consume.realCross = ss;
				} else {
					this.isArrearsShow = true
				}
			},
			dikou() {
				if (this.cash.select != '') {
					var ss = new Decimal(this.consume.receivable).sub(new Decimal(this.cash.select))
					this.consume.realCross = ss;
				}
			},
			qianfei() {
				if (this.consume.arrears != '') {
					var ss = new Decimal(this.consume.receivable).sub(new Decimal(this.consume.arrears))
					this.consume.realCross = ss;
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

			addFee: function() {
				// return false
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

				this.isDisable = true
				setTimeout(() => {
					this.isDisable = false
				}, 2000)

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
						$(".youthis").hide()
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			closeCurrentPage() {
				this.$emit('closeCurrentPage')
				$(".youthis").hide()
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
					console.log('查询请求失败')
				});
			},
			//单选框选中处理
			radioClick(e, item) {
				console.log(item.balance)
				this.jinqian = item.balance;
				if (this.clickItemObj.itemId == 0) {
					if (this.jinqian != '') {
						var ss = new Decimal(this.consume.receivable).sub(new Decimal(this.jinqian))
						this.consume.realCross = ss;
					}
					this.clickItemObj.itemId = item.piId
					this.clickItemObj.count = this.clickItemObj.count + 1
				} else {
					if (this.clickItemObj.itemId == item.piId) {
						if (this.clickItemObj.count % 2 == 0) {
							e.target.checked = false
							var ss = new Decimal(this.consume.receivable)
							this.consume.realCross = ss;

						} else {

							if (this.jinqian != '') {
								var ss = new Decimal(this.consume.receivable).sub(new Decimal(this.jinqian))
								this.consume.realCross = ss;
							}
						}
						this.clickItemObj.count = this.clickItemObj.count + 1
					} else {
						this.clickItemObj.itemId = item.piId
						this.clickItemObj.count = 0
						var ss = new Decimal(this.consume.receivable)
						this.consume.realCross = ss;

						if (this.jinqian != '') {
							var ss = new Decimal(this.consume.receivable).sub(new Decimal(this.jinqian))
							this.consume.realCross = ss;
						}
					}
				}
			},
			//选择满减优惠券
			dianji: function(item, index) {
				this.listCouponJian.forEach((item) => {
					item.checked = false
				})
				this.consume.couponNum = this.titttl;
				this.productId = this.consume.proId;
				this.consume.couponId = item.couId;
				this.consume.couponName = item.couponName;
				this.consume.couponType = item.couponType;
				var res1 = item.recude;
				this.manjian = item.recude;
				if (this.dui) {
					this.listCouponJian[index].checked = !this.listCouponJian[index].checked
					this.listCouponZhe.forEach((item) => {
						item.checked = false
					})
					var url = this.url + '/couponController/couponCalculate?productId=' + this.productId + '&couponId=' + this.consume
						.couponId +
						'&userId=' + this.userId
					this.$ajax({
						method: 'GET',
						url: url,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
							'Access-Token': this.accessToken
						},
						// param: formData,
						dataType: 'json',
					}).then((response) => {
						var res = response.data
						if (res.retCode == '0000') {
							this.titttl = res.retData;
							this.titles = res.retData;
							this.consume.couponNum = this.titttl;
							if (item.couponType == 2) {
								var mach = new Decimal(this.titttl).mul(new Decimal(res1));
								var zz = new Decimal(this.receivables).sub(new Decimal(mach));
								this.consume.receivable = zz;
								this.consume.realCross = zz;
							}

						} else {
							alert(res.retMsg)
						}
					}).catch((error) => {
						console.log('查询请求失败')
					});
				} else {
					this.titttl = 0;
					this.titles = 0;
					if (item.couponType == 2) {
						var zy = new Decimal(this.receivables)
						this.consume.receivable = zy;
						this.consume.realCross = zy;
					}

				}

				this.dui = !this.dui
			},
			//选择满折优惠券
			dianji1: function(index, item) {
				this.listCouponZhe.forEach((item) => {
					item.checked = false
				})
				this.$forceUpdate()
				this.productId = this.consume.proId;
				this.consume.couponId = item.couId;
				this.consume.couponName = item.couponName;
				this.consume.couponType = item.couponType;
				var re = item.recude;
				this.zhekou = item.recude;
				console.log(this.zhekou)
				console.log(re)
				if (this.dui) {
					this.listCouponZhe[index].checked = !this.listCouponZhe[index].checked
					this.listCouponJian.forEach((item) => {
						item.checked = false
					})
					var url = this.url + '/couponController/couponCalculate?productId=' + this.productId + '&couponId=' + this.consume
						.couponId +
						'&userId=' + this.userId
					this.$ajax({
						method: 'GET',
						url: url,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
							'Access-Token': this.accessToken
						},
						// param: formData,
						dataType: 'json',
					}).then((response) => {
						var res = response.data
						if (res.retCode == '0000') {
							this.titttl = res.retData;
							this.titles = res.retData;
							this.consume.couponNum = this.titttl;
							if (item.couponType == 1) {
								var jh = new Decimal(re).div(new Decimal(10));
								this.consume.receivable = new Decimal(this.receivables).mul(new Decimal(Math.pow(jh, this.titttl))).toFixed(
									2, Decimal.ROUND_HALF_UP);
								this.consume.realCross = new Decimal(this.receivables).mul(new Decimal(Math.pow(jh, this.titttl))).toFixed(
									2, Decimal.ROUND_HALF_UP);
							}

						} else {
							alert(res.retMsg)
						}
					}).catch((error) => {
						console.log('查询请求失败')
					});
				} else {
					this.titttl = 0;
					this.titles = 0;
					if (item.couponType == 1) {
						var us = new Decimal(this.receivables).div(new Decimal(re)).mul(new Decimal(re))
						this.consume.receivable = us;
						this.consume.realCross = us;
					}

				}
				this.dui = !this.dui
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

<style>
	@import url("../../../assets/css/SubRecharge.css");
</style>
