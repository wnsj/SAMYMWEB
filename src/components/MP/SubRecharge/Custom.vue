<!-- add and modify consume -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h2 id="myModalLabel" class="modal-title">产品消费</h2>
        </div>
        <div class="modal-body  pos_r" style="max-height: 650px;overflow-y: scroll">
            <div class="tab-pane fade in active martop" id="basic">
                <div class="col-md-6 form-group clearfix">
                    <label for="cyname" class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">姓名</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.memName" disabled="true">
                    </div>
                </div>
                <!--				<div class="col-md-6 form-group clearfix">-->
                <!--					<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">会员卡号</label><span-->
                <!--					 class="sign-left">:</span>-->
                <!--					<div class="col-md-7">-->
                <!--						<input type="text" class="form-control" v-model="member.memNum" v-on:change="checkMemNum(member.memNum)"-->
                <!--						 placeholder="卡号/手机号后4位">-->
                <!--					</div>-->
                <!--				</div>-->


                <div class="col-md-6 form-group clearfix">
                    <label for="cyname" class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">手机号</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.phone" disabled="true">
                    </div>
                </div>
                <div v-show="unfinishedProList.length > 0">
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">已购项目</label><span class="sign-left">:</span>
                    </div>
                    <div class="col-md-12 form-group clearfix text-left">
                        <table class="table table-bordered table-hover">
                            <thead class="datathead">
                            <tr>
                                <td></td>
                                <td>项目名</td>
                                <td>咨询师名</td>
                                <td>项目类型</td>
                                <td>总课时</td>
                                <td>剩余课时</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in unfinishedProList">
                                <td><input type="radio" name="radioGroup" @click="radioClick($event,item)"/></td>
                                <td>{{item.proName}}</td>
                                <td>{{item.counselorName}}</td>
                                <td>{{transforProType(item.proType)}}</td>
                                <td>{{item.totalCount}}</td>
                                <td>{{item.totalCount - item.consumCount}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-12 form-group clearfix text-left">
                    <h4 id="myModalLabel" class="modal-title">产品：</h4>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">咨询师</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <emp ref="counselorEmp" @employeeChange="counselorEmpChange" :disabled="counselorFlag"></emp>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">

                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">产品</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <project ref="project" @projectChange="projectChange" :disabled="projectFlag"></project>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label for="cyname" class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">单价</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.price" disabled="disabled">
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label for="cyname" class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">课时(次)</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.totalCount" disabled="disabled">
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label for="cyname" class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">折扣比例</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7 pos-re">
                        <input type="text" class="form-control" v-model="consume.discount" disabled="disabled">
                        <span class="pos-ab pos-tr">%</span>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label for="cyname" class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">折前总额</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.receivable" disabled="disabled">
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label for="cyname" class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">折后总额</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.realCross" disabled="disabled">
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">维护人</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <emp ref="emp" @employeeChange="empChange"></emp>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">访问类型</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <select class="form-control" v-model="consume.visitType" @change="visitTypeChange">
                            <option value="1">初诊</option>
                            <option value="2">复诊</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">客户判定</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <VisitState ref="VisitStateRef" @objectChange="visitStateChange"></VisitState>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">续流状态</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <ContinState ref="ContinStateRef" @objectChange="continStateChange"></ContinState>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">交费方式</label><span
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
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">流水单号</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.serialNo">
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">收据</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.receipt">
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">咨询方向</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <DiseaseType @objectChange="diseaseTypeChange"></DiseaseType>
                    </div>
                </div>
				<div class="col-md-6 form-group clearfix">
				    <label class="col-md-4 control-label text-right nopad end-aline"
				           style="padding:0;line-height:34px;">咨询问题</label><span
				    class="sign-left">:</span>
				    <div class="col-md-7">
				        <textarea class="form-control" v-model="consume.diseaseProblem" placeholder="限制输入100个字">
				        </textarea>
				    </div>
				</div>
                <!-- <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">咨询问题</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.diseaseProblem">
                    </div>
                </div> -->
                <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">咨询室</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <CounseRoom @channelChange="counseRoomChange"></CounseRoom>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">开始-结束时间</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <dPicker v-model="dateArr" format="YYYY-MM-DD hh:mm:ss" style="width:100%"
                                 type="datetime" valueType="format" range>
                            <template v-slot:header="{ emit }">
                                <div style="text-align: left"></div>
                            </template>
                        </dPicker>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">陪同人</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.accompany">
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">陪同人关系</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.companionship">
                    </div>
                </div>
            </div>
            <div class="col-md-12 clearfix" v-show="cash.balance>0" style="padding:0;">
                <div class="col-md-6 clearfix" v-show="cash.balance>0">
                    <label class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">
                        定金抵扣
                    </label>
                    <span class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="cash.select" id="earn" @keyup.enter="count"
                               @input="count($event)"/>
                    </div>
                </div>
                <div class="col-md-6 clearfix">
                    <label for="cyname" class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">定金余额</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="cash.balance" id="cash"
                               disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="tab-pane fade in active martop" id="basic" v-show="isShow==true">
                <div class="col-md-12 form-group clearfix text-left">
                    <h4 id="myModalLabel" class="modal-title">合计：</h4>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <label for="cyname" class="col-md-4 control-label text-right nopad end-aline"
                           style="padding:0;line-height:34px;">实交总额</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="consume.realCross">
                    </div>
                </div>
            </div>
            <div class="col-md-6 form-group clearfix">
                <label for="cyname" class="col-md-4 control-label text-right nopad end-aline"
                       style="padding:0;line-height:34px;">此次消费课时</label><span
                class="sign-left">:</span>
                <div class="col-md-7">
                    <input type="text" class="form-control" v-model="consume.consumCount" @blur="computedRealCross">
                </div>
            </div>
            <div class="form-group clearfix">
                <div class="col-md-12">
                    <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;"
                            data-toggle="modal"
                            v-on:click="closeCurrentPage()">返回
                    </button>
                    <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;"
                            data-toggle="modal"
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
    import VisitState from '../../common/VisitState.vue'
    import ContinState from '../../common/VisitState.vue'
    import DiseaseType from '../../common/DiseaseType.vue'
    import CounseRoom from '../../common/CounseRoom.vue'

    export default {
        components: {
            dPicker,
            emp,
            project,
            VisitState,
            ContinState,
            DiseaseType,
            CounseRoom
        },
        data() {
            return {
                counselorList: [],
                consume: {
                    memNum: '', //会员名
                    memName: '', //手机
                    phone: '', //预约号
                    appNum: '',
                    receivable: '', //应交(折前)
                    realCross: '', //实缴（折后）
                    proId: '', //项目id
                    discount: '', //折扣
                    price: '', //折前单价
                    disPrice: '', //折后单价
                    totalCount: '', //总次数
                    actualCount: '', //实际次数
                    consumedCount: '',//已经消费次数
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
                    diseaseType: null,//咨询方向
                    diseaseProblem: null,//咨询问题
                    counseRoom: null,//咨询室
                    actualBegDate: null,//实际开始时间
                    actualEndDate: null,//实际结束时间
                    cashId: null,//现金id
                    accompany: null,//陪同人
                    companionship: null,//陪同人关系
                },
                isShow: true,
                consumeReceivable: '',
                isSelect: true,
                sameProject: false,
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
                    select: '',
                    btn: false,
                }
            };
        },
        methods: {
            // Initialization consume’s content
            initData(param) {
				$('#customContent').modal({backdrop: 'static', keyboard: false});
                this.consume = {
                    memNum: param.visId, //会员名
                    memName: param.visitorName,
                    phone: param.phone,
                    appNum: '',//预约号
                    receivable: 0, //应交
                    realCross: 0, //实缴
                    proId: '', //项目id
                    discount: 0, //折扣
                    price: 0, //折前单价
                    disPrice: '', //折后单价
                    totalCount: 0, //总次数
                    actualCount: 0, //实际次数
                    giveCount: 0, //赠送次数
                    giveProId: 0, //赠送项目
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
                    consumCount: 0, //消费次数
                    visitType: 1,
                    payType: 1,//支付方式
                    serialNo: null,//流水单号
                    receipt: null,//收据
                    visitState: null,//访问状态
                    continState: null,//续流状态
                    diseaseType: null,//咨询方向
                    diseaseProblem: null,//咨询问题
                    counseRoom: null,//咨询室
                    actualBegDate: null,//实际开始时间
                    actualEndDate: null,//实际结束时间
                    cashId: null,//现金id
                    accompany: null,//陪同人
                    companionship: null,//陪同人关系
                    cashMoney:0
                }
                this.cash = {
                    cashId: '',
                    memNum: '',
                    balance: '',
                    select: '',
                    btn: false,
                }

                this.sameProject = false
                this.counselorList = []
                this.isShow = true
                this.isSelect = true
                this.consumeReceivable = 0
                this.$refs.counselorEmp.setPosName("咨询师")
                this.$refs.counselorEmp.setEmp("")
                this.$refs.emp.setPosName("咨询顾问")
                this.$refs.emp.setEmp("")
                this.$refs.project.setEmpId("0")
                this.queryUnfinishedPro(param.visId)
                this.$refs.VisitStateRef.getObj(1, 1)
                this.$refs.ContinStateRef.getObj(1, 2)
                this.selectObj = null
                this.projectFlag = false
                this.counselorFlag = false
                this.dateArr = []
                $("input[name='radioGroup']").prop("checked", "");
                this.checkMemCash(param.visId)
            },
            //咨询师
            counselorEmpChange: function (param) {
                if (this.isBlank(param)) {
                    this.consume.counselor = ""
                } else {
                    this.consume.counselor = param.empId
                    if (!this.projectFlag) {
                        this.$refs.project.setEmpId(this.consume.counselor)
                        this.$refs.project.setProject(0)
                        this.consume.price = 0
                        this.consume.actualCount = 0
                        this.consume.discount = 0
                        this.consume.receivable = 0
                        this.consume.realCross = 0
                        this.consumeReceivable = 0
                    }
                }
            },
            //产品
            projectChange: function (param) {
                if (this.isBlank(param)) {
                    this.consume.proId = ""
                } else {
                    this.consume.proId = param.proId
                    this.consume.price = param.price
                    this.consume.totalCount = param.frequency
                    this.consume.discount = param.discount
                    this.consume.receivable = param.totalPrice
                    this.consume.realCross = param.discouAmount
                    this.consume.proType = param.proType
                }
            },
            //feedback employee information
            empChange: function (param) {
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
                    alert("购买产品不能为空")
                    return
                }
                if (this.isBlank(this.consume.empId)) {
                    alert("维护人不能为空!")
                    return
                }
                if (this.isBlank(this.consume.consumCount)) {
                    alert("消费产品课时不可为空!");
                    return;
                }
                if (this.consume.consumCount > this.consume.totalCount) {
                    alert("此次消费课时大于总课时!")
                    return;
                }
				if (this.consume.diseaseProblem.length > 100 ) {
				    alert("咨询问题请不要超过100个字符")
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
                }
                if (this.dateArr.length > 1) {
                    this.consume.actualBegDate = this.dateArr[0];
                    this.consume.actualEndDate = this.dateArr[1];
                }
                if (this.cash.select > 0) {
                    this.consume.cashId = this.cash.cashId;
                    this.consume.cashMoney = this.cash.select;
                }

                var url = this.url + '/purchasedItemsAction/consumProject'
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
                        this.$router.push({
                            name: 'SettleSummary',
                        });
                        this.jumpLeft(2);
                        this.closeCurrentPage()
                        //this.$emit('func2', 'SettleSummary')
                        alert(res.retMsg)
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('请求失败处理')
                });
            },
            closeCurrentPage() {
                this.$emit('closeCurrentPage')
                //$("#addCustom").modal("hide")
                console.log('关闭添加患者界面')
            },
            jumpLeft(index) {
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
                            console.log("有未完成的项目")
                            var counselorEmpId = this.counselorList[0].counselor
                            this.$refs.counselorEmp.setEmp(counselorEmpId)
                        }
                    }
                }).catch((error) => {
                    console.log('会员查询请求失败')
                });
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
                        memNum: param
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
                    this.selectObj = item;
                    this.clickItemObj.itemId = item.piId
                    this.clickItemObj.count = this.clickItemObj.count + 1
                    if (item.proType != '0') {
                        this.modCounselor(item)
                        this.counselorFlag = false
                    } else {
                        this.counselorFlag = true
                        this.$refs.counselorEmp.setPosName("咨询师")
                        this.$refs.counselorEmp.setEmp(item.counselor)
                    }
                    this.$refs.project.setEmpId(item.counselor)
                    this.$refs.project.setProject(item.proId)
                    this.consume.proId = item.proId
                    this.consume.price = item.price //折前单价
                    this.consume.totalCount = item.totalCount //实际次数
                    this.consume.discount = item.discount //折扣
                    this.consume.receivable = item.receivable //应交
                    this.consume.realCross = item.realCross //实缴
                    this.consume.proType = item.proType
                } else {
                    if (this.clickItemObj.itemId == item.piId) {
                        if (this.clickItemObj.count % 2 == 0) {
                            this.selectObj = null
                            e.target.checked = false
                            this.$refs.counselorEmp.setPosName("咨询师")
                            this.$refs.counselorEmp.setEmp("")
                            this.counselorFlag = false
                        } else {
                            if (item.proType != 0) {
                                this.modCounselor(item)
                                this.counselorFlag = false
                            } else {
                                this.counselorFlag = true
                                this.$refs.counselorEmp.setPosName("咨询师")
                                this.$refs.counselorEmp.setEmp(item.counselor)
                            }
                            this.$refs.project.setEmpId(item.counselor)
                            this.$refs.project.setProject(item.proId)
                            this.consume.proId = item.proId
                            this.consume.price = item.price //折前单价
                            this.consume.totalCount = item.totalCount //实际次数
                            this.consume.discount = item.discount //折扣
                            this.consume.receivable = item.receivable //应交
                            this.consume.realCross = item.realCross //实缴
                            this.consume.proType = item.proType
                            this.selectObj = item
                        }
                        this.clickItemObj.count = this.clickItemObj.count + 1
                    } else {
                        this.selectObj = item
                        this.clickItemObj.itemId = item.piId
                        this.clickItemObj.count = 0
                        if (item.proType != 0) {
                            this.modCounselor(item)
                            this.counselorFlag = false
                        } else {
                            this.counselorFlag = true
                            this.$refs.counselorEmp.setPosName("咨询师")
                            this.$refs.counselorEmp.setEmp(item.counselor)
                        }
                        this.$refs.project.setEmpId(item.counselor)
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
                else this.consume.counseRoom = param.chaId
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
                this.consume.realCross = this.consume.consumCount * this.consume.price
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
            count(event) {
                if (Number(this.cash.select) > Number(this.cash.balance)) {
                    this.cash.select = this.cash.balance;
                    $("#earn").val(this.cash.select);
                }
                // console.log("count1")
                // if (this.member.counselorEmpId != this.consume.counselor) {
                //     console.log("count2")
                //     if (this.consume.proType == 0) {
                //         console.log("count4")
                //         this.isSelect = false
                //         this.consumeReceivable = this.consume.realCross
                //     } else {
                //         console.log("count5")
                //         this.isSelect = true
                //         this.consumeReceivable = this.consume.realCross - this.member.balance - this.cash.select;
                //     }
                // } else {
                //     console.log("count3")
                //     this.isSelect = false
                //     this.consumeReceivable = this.consume.realCross - this.cash.select;
                // }
            },
        },
        mounted() {
            
        },

    }
</script>

<style>

</style>
