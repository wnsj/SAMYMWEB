<!-- add and modify consume -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h2 id="myModalLabel" class="modal-title">产品消费驳回修改</h2>
		</div>
		<div class="modal-body pos_r jh-mh-sc" v-if="destroy">
			<div class="tab-pane fade in active martop" id="basic">
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">姓名</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.memName" disabled="true">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">手机号</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.phone" disabled="true">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-1" data-toggle="modal" v-on:click="xiaofei()">舍弃</button>
				</div>


				<!-- <div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" >订单时间</label><span
					 class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" disabled="true">
					</div>
				</div> -->
				<div v-show="unfinishedProList.length > 0">
					<div class="col-md-12  clearfix jh-ad-0">
						<div class="col-md-6  clearfix jh-wd-33 jh-mb-0">
							<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">已购产品</label><span class="sign-left">:</span>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix text-left">
						<table class="table table-bordered table-hover jh-mb-0">
							<thead class="datathead">
								<tr>
									<td></td>
									<td>产品</td>
									<td>咨询师名</td>
									<td>项目类型</td>
									<td>总课时</td>
									<td>剩余课时</td>
									<td>是否全款</td>
									<td>欠费金额</td>
									<td>购买时间</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in unfinishedProList" :key="index">
									<td><input v-model="oRadioGroup" :value="index" type="radio" name="radioGroup" @click="radioClick($event,item)" /></td>
									<td>{{item.proName}}</td>
									<td>{{item.counselorName}}</td>
									<td>{{transforProType(item.proType)}}</td>
									<td>{{item.totalCount}}</td>
									<td>{{(item.totalCount-item.consumCount).toFixed(2)}}</td>
									<td>{{item.isArrears=='1' ? '全款' : '非全款'}}</td>
									<td>{{item.isArrears=='1' ? '无':item.arrears}}</td>
									<td>{{dateFormat(item.createDate)}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-md-12 form-group clearfix text-left">
					<h4 id="myModalLabel" class="modal-title">产品：</h4>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">咨询师</label><span class="sign-left">:</span>
					<!--<div class="col-md-7">
						<emp ref="counselorEmp" @employeeChange="counselorEmpChange" :disabled="counselorFlag"></emp>
					</div>-->
					<div class="col-md-7">
						<emp ref="counselorEmp" @employeeChange="counselorEmpChange"></emp>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label class="col-md-4 control-label text-right nopad end-aline">产品风格</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<select class="form-control" @change="proStyleChange" :disabled="projectFlag" v-model="consume.proStyle">
							<option value="">未选择</option>
							<option value="1">新产品</option>
							<option value="2">老产品</option>
						</select>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">产品</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<project ref="project" @projectChange="projectChange" :disabled="projectFlag"></project>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">单价</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.price" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">课时(次)</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.totalCount" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">折扣比例</label><span class="sign-left">:</span>
					<div class="col-md-7 pos-re">
						<input type="text" class="form-control" v-model="consume.discount" disabled="disabled">
						<span class="pos-ab pos-tr">%</span>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">折前总额</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.preFoldTotalPrice" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">折后总额</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.receivable" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">顾问</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<emp ref="emp" @employeeChange="empChange"></emp>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">访问类型</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<select class="form-control" v-model="consume.visitType" @change="visitTypeChange">
							<option value="1">初访</option>
							<option value="2">复访</option>
						</select>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">客户判定</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<VisitState ref="VisitStateRef" @objectChange="visitStateChange"></VisitState>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">续流状态</label><span class="sign-left">:</span>
					<div class="col-md-7">
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
				<div class="col-md-6 form-group clearfix jh-wd-33" v-if="projectFlag==false&&appShow==true">
					<label class="col-md-4 control-label text-right nopad end-aline">小程序编号</label><span class="sign-left">:</span>
					<div class="col-md-7  ">
						<input type="text" class="form-control" v-model="consume.appNumber">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label class="col-md-4 control-label text-right nopad end-aline">流水单号</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.serialNo">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label class="col-md-4 control-label text-right nopad end-aline">收据</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.receipt">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">咨询方向</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<DiseaseType ref="diseaseTypeRef" @objectChange="diseaseTypeChange"></DiseaseType>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label class="col-md-4 control-label text-right nopad end-aline">咨询问题</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<!-- <textarea class="form-control" v-model="consume.diseaseProblem" placeholder="限制输入100个字">
				        </textarea> -->
						<input class="form-control" v-model="consume.diseaseProblem" placeholder="限制输入100个字">
					</div>
				</div>
				<!-- <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           >咨询问题</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.diseaseProblem">
                    </div>
                </div> -->
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">咨询室</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<CounseRoom ref="counseRoomRef" @channelChange="counseRoomChange"></CounseRoom>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<b>*</b>
					<label class="col-md-4 control-label text-right nopad end-aline">开始-结束时间</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<dPicker class="wd100" v-model="dateArr" format="HH:mm:ss" type="time" valueType="format" range>
							<template v-slot:header="{ emit }">
								<div class="jh-ta-l"></div>
							</template>
						</dPicker>
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label class="col-md-4 control-label text-right nopad end-aline">陪同人</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.accompany">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33">
					<label class="col-md-4 control-label text-right nopad end-aline">陪同人关系</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.companionship">
					</div>
				</div>
			</div>
			<div class="youa" v-if="listCouponZhe.length||listCouponJian.length" style="display: block;">
				<div class="tab-pane fade in active martop">
					<div class="col-md-12 form-group clearfix text-left jh-mt-5">
						<h4 id="myModalLabel" class="modal-title">选择优惠券：</h4>
					</div>
					<div class="col-md-7 you1">
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
									<div class="manzu">满<span>{{item.fullCondition}}</span>元可用</div>
									<div class="youxiao" v-if="item.isLimit == 1">有效期<span>{{item.startTime | dateFormatFilter("YYYY-MM-DD HH:mm:ss")}}</span></div>
									<div class="niucha1" v-if="item.isLimit == 2">永久有效</div>
									<div class="niucha" v-if="item.isLimit == 1">
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
									<div class="youxiao" v-if="item.isLimit == 1">有效期<span>{{item.createTime | dateFormatFilter("yyyy-MM-DD HH:mm:ss")}}</span></div>
									<div class="niucha1" v-if="item.isLimit == 2">永久有效</div>
									<div class="niucha" v-if="item.isLimit == 1">
										<p class="xian"></p><span>{{item.endTime | dateFormatFilter("yyyy-MM-DD HH:mm:ss")}}</span>
									</div>
									<div class="gou1" style="display: block;" v-if="Number(item.checked)==1"><img src="../../../../static/img/youhui_xuanze1.png" alt=""></div>
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
			<div class="col-md-12 clearfix jh-ad-0" v-show="cash.balance>0">
				<div class="col-md-6 clearfix jh-wd-33" v-show="cash.balance>0">
					<label class="col-md-4 control-label text-right nopad end-aline">
						定金抵扣
					</label>
					<span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="cash.select" id="earn" @keyup.enter="count" @input="count($event)" />
					</div>
				</div>
				<div class="col-md-6 clearfix jh-wd-33">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">定金余额</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="cash.balance" id="cash" disabled="disabled">
					</div>
				</div>
			</div>
			<div class="tab-pane fade in active martop" id="basic" v-show="isShow==true">
				<div class="col-md-12 form-group clearfix text-left">
					<h4 id="myModalLabel" class="modal-title">合计：</h4>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33 shiji" v-show="selectObj == null">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">实交总额</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.realCross">
					</div>
				</div>
				<div class="col-md-6 form-group clearfix jh-wd-33 shiji1" style="display: none;">
					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">实交总额</label><span class="sign-left">:</span>
					<div class="col-md-7">
						<input type="text" class="form-control" v-model="consume.realCross1">
					</div>
				</div>
			</div>
			<div class="col-md-6 form-group clearfix jh-wd-33">
				<b>*</b>
				<label for="cyname" class="col-md-4 control-label text-right nopad end-aline">此次消费课时</label><span class="sign-left">:</span>
				<div class="col-md-7">
					<input type="text" class="form-control" v-model="consume.consumCount" @blur="computedRealCross">
				</div>
			</div>
			<div class="col-md-12 form-group clearfix">
				<button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-1" data-toggle="modal" v-on:click="closeCurrentPage()">返回
				</button>
				<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-1" data-toggle="modal" v-on:click="addFee()">确认
				</button>
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
	import DiseaseType from '../../common/DiseaseType.vue'
	import CounseRoom from '../../common/CounseRoom.vue'
	import {
		Decimal
	} from 'decimal.js'
	import dateUtil from "../../common/utils/dateUtil";
	export default {
		components: {
			dPicker,
			emp,
			project,
			VisitState,
			ContinState,
			DiseaseType,
			CounseRoom,
			PayStyle
		},
		data() {
			return {
				listCouponJian: [],
				listCouponZhe:[],
				oRadioGroup: '',
				realCrossCount: '',
				destroy: true,
				titttl: 0,
				firstFlag: false,
				counselorList: [],
				productId: '',
				userId: '',
				consume: {
					proStyle: '',
					memNum: '', //会员名
					memName: '', //手机
					sourceId: '',
					proType: '',
					phone: '', //预约号
					appNum: '',
					cId: '',
					receivable: '', //应交(折前)
					preFoldTotalPrice: '', //折前总价
					realCross: 0, //实缴（折后）
					realCross1: 0, //实缴（折后）
					proId: '', //项目id
					discount: '', //折扣
					price: '', //折前单价
					disPrice: '', //折后单价
					totalCount: '', //总次数
					actualCount: '', //实际次数
					consumedCount: '', //已经消费次数
					giveCount: '', //赠送次数
					giveProId: '', //赠送项目
					giveMoney: '', //赠送金额
					counselor: '', //咨询师id
					empId: '', //咨询师助理id
					state: '',
					/**状态 * 0：充值 * 1：完结 * 2：退费 */
					storeId: '', //店铺
					operatorId: '', //操作人
					consumCount: '0', //消费次数
					balance: '0',
					piId: '',
					appNumber: '', //小程序编号
					diseaseType: null, //咨询方向
					diseaseProblem: null, //咨询问题
					counseRoom: null, //咨询室
					actualBegDate: null, //实际开始时间
					actualEndDate: null, //实际结束时间
					cashId: null, //现金id
					accompany: null, //陪同人
					companionship: null, //陪同人关系
					startTime: ''
				},
				consumAuditId: '',
				isShow: true,
				consumeReceivable: '',
				isSelect: true,
				zhekou:0,
				manjianx:0,
				titles: 0,
				sameProject: false,
				appShow: false,
				unfinishedProList: [],
				clickItemObj: {
					itemId: 0,
					count: 0
				},
				//proList:[],//有剩余的产品信息
				selectObj: {},
				dateArr: [],
				projectFlag: false,
				counselorFlag: false,
				cash: {
					cashId: '',
					memNum: '',
					balance: '',
					select: 0,
					btn: false,
				}
			};
		},
		methods: {
			//优惠券使用张数增加
			btnAdd() {
				// 如果数量大于商品库存
				if (this.titles >= this.titttl) {
					alert('该优惠券不能使用更多了~')
					return false
				} else {
					this.titles++
					var mach= new Decimal(this.titles).mul(new Decimal(this.manjianx));
					var zz =  new Decimal(this.consume.receivable).sub(new Decimal(mach)).sub(new Decimal(this.cash.balance));
					var jh =  new Decimal(this.zhekou).div(new Decimal(10));
					//满减
					this.consume.realCross = zz;
					//满折
					this.consume.realCross1 = new Decimal(this.consume.receivable).mul(new Decimal(Math.pow(jh,this.titles))).sub(new Decimal(this.cash.balance)).toFixed(2, Decimal.ROUND_HALF_UP);
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
					var mach= new Decimal(this.titles).mul(new Decimal(this.manjianx));
					var zz =  new Decimal(this.consume.receivable).sub(new Decimal(mach)).sub(new Decimal(this.cash.balance));
					var jh =  new Decimal(this.zhekou).div(new Decimal(10));
					//满减
					this.consume.realCross = zz;
					//满折
					this.consume.realCross1 = new Decimal(this.consume.receivable).mul(new Decimal(Math.pow(jh,this.titles))).sub(new Decimal(this.cash.balance)).toFixed(2, Decimal.ROUND_HALF_UP);
					
				}
			},
			// destroyDom() {
			//     this.destroy = false
			//     this.$nextTick(()=>{
			//         this.destroy = true
			//     })
			// },
			// Initialization consume’s content
			initData(param) {
				this.firstFlag = false
				this.consumAuditId = param.cid;
				this.productId = param.empId;
				this.userId = param.memNum;
				// this.clickItemObj.itemId = 0
				$('#customContent').modal({
					backdrop: 'static',
					keyboard: false
				});
				this.consume = {
					proStyle: param.proType,
					startTime: param.createDate,
					piId: param.piId,
					sourceId: param.sourceId,
					memNum: param.memNum, //会员名
					memName: param.memName,
					phone: param.phone,
					appNum: param.appNum, //预约号
					receivable: param.receivable, //应交
					realCross: param.realCross, //实缴
					realCross1: param.realCross, //实缴
					proId: param.proId, //项目id
					proType: param.proType, //0:体验课（即单次）1:正式课
					discount: param.discount, //折扣
					price: param.price, //折前单价
					disPrice: param.disPrice, //折后单价
					totalCount: param.totalCount, //总次数
					actualCount: param.actualCount, //实际次数
					giveCount: param.giveCount, //赠送次数
					giveProId: param.giveProId, //赠送项目
					giveMoney: param.giveMoney, //赠送金额
					counselor: param.counselor, //咨询师id
					empId: param.empId, //咨询师助理id
					balance: param.balance, //备注
					state: param.state,
					/**状态 * 0：充值 * 1：完结 * 2：退费 */
					storeId: this.storeId(), //店铺
					/** 0：初访 1：在访 */
					isfirst: param.isfirst,
					/** 0:非初办 1:是 */
					operatorId: this.accountId(), //操作人
					firstCharge: param.firstCharge,
					/** 1:实体卡首充（不计算提成） 0:计算 */
					consumCount: param.consumCount, //消费次数
					visitType: param.visitType,
					payType: param.payType, //支付方式
					appNumber: '', //小程序编号
					serialNo: param.serialNo, //流水单号
					receipt: param.receipt, //收据
					visitState: param.visitState, //访问状态
					continState: param.continState, //续流状态
					diseaseType: param.diseaseType, //咨询方向
					diseaseProblem: param.diseaseProblem, //咨询问题
					counseRoom: param.counseRoom, //咨询室
					actualBegDate: param.actualBegDate, //实际开始时间
					actualEndDate: param.actualEndDate, //实际结束时间
					cashId: param.cashId, //现金id
					accompany: param.accompany, //陪同人
					companionship: param.companionship, //陪同人关系
					cashMoney: param.cashMoney,
					cId: param.sourceId,
					preFoldTotalPrice: parseInt(param.totalCount) * parseInt(param.price)
				}


				this.cash = {
					cashId: '',
					memNum: '',
					balance: '',
					select: 0,
					btn: false,
				}

				this.sameProject = false
				this.counselorList = []
				this.isShow = true
				this.isSelect = true
				this.consumeReceivable = 0
				this.$refs.counselorEmp.setPosName("咨询师")
				this.$refs.counselorEmp.setEmp(param.counselor)
				this.$refs.emp.setPosName("咨询顾问")
				this.$refs.emp.setEmp(param.empId)

				this.$refs.project.setEmpId(param.counselor, 1)
				this.$refs.project.setProject(param.proId)
				// this.$refs.project.setEmpId("0")
				this.queryUnfinishedPro(param.memNum, param.piId)

				this.$refs.VisitStateRef.setObj(param.visitState)
				this.$refs.ContinStateRef.setObj(param.continState)
				this.$refs.payStyle.setPsId(param.payType)
				this.$refs.diseaseTypeRef.setObj(param.diseaseType)
				this.$refs.counseRoomRef.setChaId(param.counseRoom)

				this.selectObj = null
				this.projectFlag = false
				this.counselorFlag = false
				this.dateArr = []
				this.dateArr.push(param.actualBegDate)
				this.dateArr.push(param.actualEndDate)

				$("input[name='radioGroup']").prop("checked", "");
				this.checkMemCash(param.memNum)
				this.oRadioGroup = ''
			},
			// 格式化时间
			dateFormat: function(cellValue) {
				return dateUtil.getFormateDateYMD(cellValue)
			},
			//咨询师
			counselorEmpChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.counselor = ""
				} else {
					this.consume.counselor = param.empId
					if (!this.projectFlag) {

						if (this.selectObj == null) {
							// console.log("nilaile")
							this.$refs.project.setEmpId(this.consume.counselor, 2)
						} else {
							this.$refs.project.setEmpId(this.consume.counselor, 1)
						}

						if (this.firstFlag) {
							this.$refs.project.setProject(0)
							this.consume.price = 0
							this.consume.actualCount = 0
							this.consume.discount = 0
							this.consume.receivable = 0
							this.consume.realCross = 0
							this.consume.realCross1 = 0
							this.consumeReceivable = 0
						}
						this.firstFlag = true

					}
				}
			},
			proStyleChange: function() {
				if (!this.projectFlag) {
					if (this.selectObj == null) {
						this.$refs.project.setProStyle(this.consume.proStyle, 2, this.consume.counselor)
					} else {
						this.$refs.project.setProStyle(this.consume.proStyle, 1, this.consume.counselor)
					}
					this.$refs.project.setProject(0)
					this.consume.price = 0
					this.consume.actualCount = 0
					this.consume.discount = 0
					this.consume.receivable = 0
					this.consume.realCross = 0
					this.consume.realCross1 = 0
					this.consumeReceivable = 0
				}
			},

			//产品
			projectChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.proId = ""
				} else {
					this.getCoupon(this.userId,param.proId)
					this.consume.proId = param.proId
					this.consume.price = param.price
					this.consume.totalCount = param.frequency
					this.consume.discount = param.discount
					this.consume.preFoldTotalPrice = param.totalPrice
					this.consume.receivable = param.discouAmount
					this.consume.proType = param.proType
				}
			},
			getCoupon(userId,proId){
				var url = this.url + '/couponController/selectCoupon'
				var formData = new FormData();
				formData.append('productId', proId);
				formData.append('userId', userId);
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
					if(0==res.data.retCode){
						let data=res.data.retData
						let listZhe=data['1']
						let listjian=data['2']
						listZhe.forEach((item)=>{
							item.checked=false
							item.recude=item.recude/10
						})
						listjian.forEach((item)=>{
							item.checked=false
						})
						this.listCouponZhe=listZhe
						this.listCouponJian=listjian
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			//付款方式
			payChange: function(param) {
				if (this.isBlank(param)) {
					this.appShow = false
					this.consume.payType = "0"
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
				if (this.isBlank(this.consume.memName)) {
					alert("姓名不能为空!")
					return
				}
				if (this.isBlank(this.consume.counselor)) {
					alert("咨询师不能为空!")
					return
				}
				if (this.isBlank(this.consume.proId)) {
					alert("消费产品不能为空")
					return
				}
				if (this.isBlank(this.consume.empId)) {
					alert("顾问不能为空!")
					return
				}
				if (this.isBlank(this.consume.consumCount)) {
					alert("消费产品课时不可为空!");
					return;
				}
				if (parseFloat(this.consume.consumCount) > parseFloat(this.consume.totalCount)) {
					alert("此次消费课时大于总课时!")
					return;
				}
				if (!this.isBlank(this.consume.diseaseProblem) && this.consume.diseaseProblem.length > 100) {
					alert("咨询问题请不要超过100个字符")
					return;
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
					alert("交费方式不能为空!")
					return;
				}

				if (this.isBlank(this.consume.diseaseType)) {
					alert("咨询方向不能为空!")
					return;
				}
				if (this.isBlank(this.consume.counseRoom)) {
					alert("咨询室不能为空!")
					return;
				}
				//选择了已购买的项目
				if (this.selectObj != null) {
					// if (!this.isBlank(this.selectObj.counselor) && this.selectObj.counselor != this.consume.counselor) {
					//     alert("你选择的咨询师与已购买项目中选择的咨询师不一致!");
					//     return;
					// }
					if (this.selectObj.proId != this.consume.proId) {
						alert("你选择的产品与已购买项目中选择的产品不一致!");
						return;
					}

					if (this.consume.consumCount > (this.selectObj.totalCount - this.selectObj.consumCount)) {
						alert("本次消费课时大于剩余课时!");
						return;
					}

					this.consume.piId = this.selectObj.piId
					this.consume.realCross = this.consume.consumCount * this.consume.price
				}
				if (this.dateArr.length > 1 && !this.isBlank(this.dateArr[0]) && !this.isBlank(this.dateArr[1])) {
					this.consume.actualBegDate = this.dateArr[0];
					this.consume.actualEndDate = this.dateArr[1];
				} else {
					alert('请选择本次消费的时间')
					return
				}
				if (this.cash.select > 0) {
					this.consume.cashId = this.cash.cashId;
					this.consume.cashMoney = this.cash.select;
				}

				if (this.selectObj) {
					// this.consume.realCross = (parseFloat(this.consume.realCross) * parseFloat(this.consume.discount) / 100).toFixed(2)
					var sur = this.selectObj.totalCount - this.selectObj.consumCount;
					if (this.consume.consumCount == sur) {
						if (this.selectObj.realCrossCount) {
							this.consume.realCross = new Decimal(this.consume.receivable).sub(new Decimal(this.selectObj.realCrossCount))
						} else {
							this.consume.realCross = new Decimal(this.consume.receivable)
						}

					} else {
						this.consume.realCross = new Decimal(this.consume.realCross).mul(new Decimal(this.consume.discount)).div(new Decimal(
							100)).toFixed(2, Decimal.ROUND_HALF_UP)
					}
				}

				var url = this.url + '/consumAuditBean/consumRecord'
				// var url = 'http://172.16.16.255:8080/consumAuditBean/consumRecord'
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
						this.$router.push({
							name: 'SettleSummary',
						});
						this.jumpLeft(2);
						this.closeCurrentPage()
						this.$emit('closeCurrentPage', 'succ')
						this.$store.commit('addCount', 1)
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					//console.log('请求失败处理')
				});
			},

			//选择满减优惠券
			dianji: function(item,index) {
				this.listCouponJian.forEach((item)=>{
					item.checked=false
				})
				this.productId = this.consume.proId;
				this.consume.couponId = item.couId;
				this.consume.couponName = item.couponName;
				this.consume.couponType = item.couponType;
				var res1 = item.recude;
				this.manjianx = item.recude;
				console.log(this.consume.proId)
				console.log(this.cash.select)
				if (this.dui) {
					this.listCouponJian[index].checked=!this.listCouponJian[index].checked
					this.listCouponZhe.forEach((item)=>{
						item.checked=false
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
							this.consume.couponNum = this.titles;
							var mach= new Decimal(this.titttl).mul(new Decimal(res1));
							var zz =  new Decimal(this.consume.receivable).sub(new Decimal(mach)).sub(new Decimal(this.cash.balance));
							this.consume.realCross = zz;
						} else {
							alert(res.retMsg)
						}
					}).catch((error) => {
						console.log('查询请求失败')
					});
				} else {
					this.titttl = 0;
					this.titles = 0;
					$(".you1 .man1 .gou1").eq(index).hide();
						var zx = new Decimal(this.consume.receivable);
						this.consume.realCross = zx;
				}
				this.dui = !this.dui
			},
			
			//选择满折优惠券
			dianji1: function(index, item) {
				this.listCouponZhe.forEach((item)=>{
					item.checked=false
				})
				this.productId = this.consume.proId;
				this.consume.couponId = item.couId;
				this.consume.couponName = item.couponName;
				this.consume.couponType = item.couponType;
				var re = item.recude;
				this.zhekou = item.recude;
				console.log(re)
				if (this.dui) {
					$(".shiji1").show();
					$(".shiji").hide();
					this.listCouponZhe[index].checked=!this.listCouponZhe[index].checked
					this.listCouponJian.forEach((item)=>{
						item.checked=false
					})
					var url = this.url + '/couponController/couponCalculate?productId=' + this.productId + '&couponId=' + this.consume.couponId + '&userId=' + this.userId
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
							this.consume.couponNum = this.titles;
							var jh = new Decimal(re).div(new Decimal(10));
							this.consume.realCross1 = new Decimal(this.consume.receivable).mul(new Decimal(Math.pow(jh,this.titttl))).sub(new Decimal(this.cash.balance)).toFixed(2, Decimal.ROUND_HALF_UP);
						} else {
							alert(res.retMsg)
						}
					}).catch((error) => {
						console.log('查询请求失败')
					});
				} else{
					$(".shiji1").hide();
					$(".shiji").show();
					this.titttl = 0;
					this.titles = 0;
					$(".you1 .man2 .gou1").eq(index).hide();
					var us = new Decimal(this.consume.receivable)
					this.consume.realCross1 = us;
				}
				this.dui = !this.dui
			},

			xiaofei() {
				var url = this.url + '/consumAuditBean/rejectConsumAbandon'
				// var url = 'http://172.16.16.255:8080/consumAuditBean/consumRecord'
				var formData = new FormData();
				formData.append('consumAuditId', this.consumAuditId)
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: formData,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					//console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$router.push({
							name: 'consumption',
						});
						this.jumpLeft(2);
						this.closeCurrentPage()
						this.$emit('closeCurrentPage', 'succ')
						this.$store.commit('addCount', 1)
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					//console.log('请求失败处理')
				});
			},
			closeCurrentPage() {
				this.$refs.counselorEmp.setPosName("咨询师")
				this.$refs.counselorEmp.setEmp("")
				this.$refs.emp.setPosName("咨询顾问")
				this.$refs.emp.setEmp("")
				this.$refs.counseRoomRef.setChaId('0')
				this.$refs.diseaseTypeRef.setObj('0')
				this.$refs.VisitStateRef.setObj('0')
				this.$refs.ContinStateRef.setObj('0')
				this.$emit('closeCurrentPage')
				//$("#addCustom").modal("hide")
				//console.log('关闭添加患者界面')
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
							this.consume.memNum = this.member.memNum
							this.consume.memName = this.member.memName
							this.consume.phone = this.member.phone
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
							//console.log("有未完成的项目")
							var counselorEmpId = this.counselorList[0].counselor
							this.$refs.counselorEmp.setEmp(counselorEmpId)
						}
					}
				}).catch((error) => {
					//console.log('会员查询请求失败')
				});
			},
			//查询已购买产品
			queryUnfinishedPro(param, piId) {
				console.log(piId)
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
						memNum: param
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.unfinishedProList = res.retData
						this.unfinishedProList.forEach((item, index) => {
							if (item.piId == piId) {
								// console.log(item)
								// console.log(index)
								this.oRadioGroup = index
								this.clickItemObj.itemId = item.piId
								this.clickItemObj.count = 0
								this.selectObj = item
								this.projectFlag = true
								this.counselorFlag = true
							}
						})

					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					//console.log('会员查询请求失败')
				});
			},
			// getCoByPiAndPro(item) {
			//     var url = this.url + '/consumAction/getCoByPiAndPro'
			//     this.$ajax({
			//         method: 'POST',
			//         url: url,
			//         headers: {
			//             'Content-Type': this.contentType,
			//             'Access-Token': this.accessToken
			//         },
			//         data: {
			//             proId: item.proId,
			//             piId: item.piId
			//         },
			//         dataType: 'json',
			//     }).then((response) => {
			//         var res = response.data
			//         if (res.retCode == '0000') {
			//             this.selectObj.realCrossCount = res.retData.realCrossCount;
			//         } else {
			//             alert(res.retMsg)
			//         }
			//     }).catch((error) => {
			//         //console.log('会员查询请求失败')
			//     });
			// },
			//单选框选中处理
			radioClick(e, item) {
				if (this.clickItemObj.itemId == 0) {
					this.selectObj = item;
					// this.getCoByPiAndPro(item)
					this.clickItemObj.itemId = item.piId
					this.clickItemObj.count = this.clickItemObj.count + 1
					if (item.proType != '0') {
						this.modCounselor(item)
						this.counselorFlag = false
					} else {
						this.counselorFlag = true
						this.$refs.counselorEmp.setPosName("咨询师")
						this.$refs.counselorEmp.setEmp(item.counselor)
						this.$refs.emp.setPosName("咨询顾问")
						this.$refs.emp.setEmp(item.empId)
						this.$refs.payStyle.setPsId(item.payType)
						this.consume.payType = item.payType
						this.consume.serialNo = item.serialNo
						this.consume.receipt = item.receipt
						this.isExistCon(item)
					}
					this.projectFlag = true
					this.$refs.project.setEmpId(this.consume.counselor, 1)
					this.consume.proStyle = item.proStyle
					this.$refs.project.setProject(item.proId)
					this.consume.proId = item.proId
					this.consume.price = item.price //折前单价
					this.consume.totalCount = item.totalCount //实际次数
					this.consume.discount = item.discount //折扣
					this.consume.receivable = item.receivable //应交
					this.consume.preFoldTotalPrice = parseInt(item.totalCount) * parseInt(item.price) //实缴
					this.consume.proType = item.proType
					return
				} else {
					if (this.clickItemObj.itemId == item.piId) {
						if (this.clickItemObj.count % 2 == 0) {
							this.selectObj = null
							e.target.checked = false
							this.consume.proStyle = ''
							this.$refs.project.setProject('0')
							this.$refs.counselorEmp.setPosName("咨询师")
							this.$refs.counselorEmp.setEmp("")
							this.$refs.emp.setEmp("")
							this.$refs.payStyle.setPsId('0')
							this.consume.payType = '0'
							this.consume.serialNo = ''
							this.consume.receipt = ''
							this.$refs.diseaseTypeRef.setObj('0')
							this.counselorFlag = false
						} else {
							if (item.proType != 0) {
								this.modCounselor(item)
								this.counselorFlag = false
							} else {
								this.counselorFlag = true
								this.$refs.counselorEmp.setPosName("咨询师")
								this.$refs.counselorEmp.setEmp(item.counselor)
								this.$refs.emp.setPosName("咨询顾问")
								this.$refs.emp.setEmp(item.empId)
								this.$refs.payStyle.setPsId(item.payType)
								this.consume.payType = item.payType
								this.consume.serialNo = item.serialNo
								this.consume.receipt = item.receipt
								this.isExistCon(item)
							}
							this.$refs.project.setEmpId(this.consume.counselor, 1)
							this.consume.proStyle = item.proStyle
							this.$refs.project.setProject(item.proId)
							this.consume.proId = item.proId
							this.consume.price = item.price //折前单价
							this.consume.totalCount = item.totalCount //实际次数
							this.consume.discount = item.discount //折扣
							this.consume.receivable = item.receivable //应交
							this.consume.realCross = item.realCross //实缴
							this.consume.proType = item.proType
							this.selectObj = item
							// this.getCoByPiAndPro(item)
						}
						this.clickItemObj.count = this.clickItemObj.count + 1
					} else {
						this.selectObj = item
						// this.getCoByPiAndPro(item)
						this.clickItemObj.itemId = item.piId
						this.clickItemObj.count = 0
						if (item.proType != 0) {
							this.modCounselor(item)
							this.counselorFlag = false
						} else {
							this.counselorFlag = true
							this.$refs.counselorEmp.setPosName("咨询师")
							this.$refs.counselorEmp.setEmp(item.counselor)
							this.$refs.emp.setPosName("咨询顾问")
							this.$refs.emp.setEmp(item.empId)
							this.$refs.payStyle.setPsId(item.payType)
							this.consume.payType = item.payType
							this.consume.serialNo = item.serialNo
							this.consume.receipt = item.receipt
							this.isExistCon(item)
						}
						this.$refs.project.setEmpId(this.consume.counselor, 1)
						this.consume.proStyle = item.proStyle
						this.$refs.project.setProject(item.proId)
						this.consume.proId = item.proId
						this.consume.price = item.price //折前单价
						this.consume.totalCount = item.totalCount //实际次数
						this.consume.discount = item.discount //折扣
						this.consume.receivable = item.receivable //应交
						this.consume.realCross = item.realCross //实缴
						this.consume.proType = item.proType
					}
				}
				this.projectFlag = e.target.checked
				this.consume.consumCount = 0
				//是否选中已购课程都清零
				//this.consume.realCross = '0'
				if (this.projectFlag == true) {
					this.consume.payType = item.payType
					this.appShow = true
					this.consume.appNumber = item.appNumber
					this.payChange()
				} else {
					this.appShow = false
					this.consume.appNumber = ''
					this.consume.payType = '0'
				}
			},
			isExistCon(item) {
				var url = this.url + '/consumAction/getLastedCon'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						piId: item.piId
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.retData) {
							this.consume.diseaseType = res.retData.diseaseType
							this.$refs.diseaseTypeRef.setObj(res.retData.diseaseType)
						}
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败' + error)
				});
			},
			//项目类型转换
			transforProType(proType) {
				if (proType == 0) return '普通'
				else if (proType == 1) return '月卡'
				else if (proType == 2) return '季卡'
				else if (proType == 3) return '半年卡'
				else if (proType == 4) return '年卡'
				else if (proType == 5) return '测评'
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
			//咨询方向切换
			diseaseTypeChange(param) {
				if (this.isBlank(param)) this.consume.diseaseType = null
				else this.consume.diseaseType = param.dtId
			},
			//咨询室切换
			counseRoomChange(param) {
				if (this.isBlank(param)) this.consume.counseRoom = null
				else this.consume.counseRoom = param.crId
			},
			//咨询师重新初始化
			modCounselor(item) {
				var param = {
					posId: null,
					posName: '咨询师',
					leader: null,
					storeId: this.storeId(),
					isuse: '1',
					level: null,
					lessThenEqual: item.counselorLevel,
				}
				this.$refs.counselorEmp.setQueryParam(param)
				this.$refs.counselorEmp.setEmp(item.counselor)
			},
			computedRealCross() {
				if (this.counselorFlag == true) {
					this.consume.realCross = this.consume.consumCount * this.consume.price
				}
			},
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
							this.cash.select = 0.0
						} else {
							this.cash = {
								memNum: '', //会员号
								balance: 0,
							}
						}
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('定金查询请求失败')
				});
			},
			count(event) {
				if (Number(this.cash.select) > Number(this.cash.balance)) {
					this.cash.select = this.cash.balance;
					$("#earn").val(this.cash.select);
				}
			},
		},
		mounted() {
			this.$refs.VisitStateRef.getObj(1, 1)
			this.$refs.ContinStateRef.getObj(1, 2)
		},

	}
</script>

<style>
 @import url("../../../assets/css/Custom.css");
</style>
