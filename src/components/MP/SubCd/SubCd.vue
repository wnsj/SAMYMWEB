<!-- add and modify FWRoyalty -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">{{title}}定金</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <form action="" class="clearfix">
                    <!--					<div class="col-md-6 form-group clearfix jh-wd-33">-->
                    <!--						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">会员卡号</label><span-->
                    <!--						 class="sign-left">:</span>-->
                    <!--						<div class="col-md-8">-->
                    <!--							<input type="text" class="form-control" v-model="cash.memNum" v-on:change="checkMemNum(cash.memNum)">-->
                    <!--						</div>-->
                    <!--					</div>-->
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline">姓名</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="cash.cashName" placeholder=""
                                   disabled="true">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <label class="col-md-3 control-label text-right nopad end-aline">手机号</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="cash.phone" placeholder="" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
						<b>*</b>
                        <label class="col-md-3 control-label text-right nopad end-aline">定金金额</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="cash.money" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
						<b>*</b>
                        <label class="col-md-3 control-label text-right nopad end-aline">交费时间</label><span
                        class="sign-left">:</span>
                        <dPicker class="col-md-8 subcd-h65" v-model="cash.createDate"
                                 v-on:click="dateAction()"></dPicker>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <b>*</b>
                        <label class="col-md-3 control-label text-right nopad end-aline">咨询师</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <cou ref="couEmp" @employeeChange="couChange"></cou>
                        </div>
                    </div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
                        <b>*</b>
					    <label class="col-md-3 control-label text-right nopad end-aline">咨询顾问</label><span
					    class="sign-left">:</span>
					    <div class="col-md-8">
					        <con ref="conEmp" @employeeChange="conChange"></con>
					    </div>
					</div>

<!--                     缴费方式-->
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <b>*</b>
                        <label class="col-md-3 control-label text-right nopad end-aline">缴费方式</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <PayStyle ref="payStyleRef" @payStyleChange="psStyle"></PayStyle>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <label class="col-md-3 control-label text-right nopad end-aline">收据</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="cash.receipt" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <label class="col-md-3 control-label text-right nopad end-aline">流水单号</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="cash.waterNum" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-35"
                                data-toggle="modal"
                                v-on:click="closeCurrentPage()">返回
                        </button>
                        <button type="button" :disabled="isDisable" class="btn btn-primary pull-right m_r_10 jh-mr-25"
                                data-toggle="modal"
                                v-on:click="certainAction()">确认
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import dPicker from 'vue2-datepicker'
    import cou from '../../common/Employee.vue' //咨询师
	import con from '../../common/Employee.vue'	//咨询顾问
    import PayStyle from '../../common/PayStyle.vue'
    export default {
        components: {
            dPicker,
            cou,
			con,
            PayStyle
        },
        data() {
            return {
                member: {
                    memNum: '',//会员号
                    memName: '',//会员名
                    phone: '',//手机
                },
                cash: {
                    cashId: '',
                    cashName: '',
                    phone: '',
                    money: '',
                    receipt: '',
                    waterNum: '',
                    createDate: this.moment(),
                    storeId: '',
                    state: '',
                    couId:'',
                    conId:'',
                    payType: '',
                    operatorId: '',
                    memNum: '',
                },
                title: '新增',
                isDisable: false
            };
        },
        methods: {
            // Initialization FWRoyalty’s content
            initData(param, cash) {
                // console.log(JSON.stringify(cash))
                $('#subCdContent').modal({backdrop: 'static', keyboard: false});
                if (param == 'add') {
                    console.log('Initialization FWRoyalty’s content, which adds FWRoyalty')
                    this.title = '新增'
                    this.cash = {
                        memNum: cash.visId,
                        cashId: '',
                        cashName: cash.visitorName,
						createDate: this.moment(),
                        money: '',
                        storeId: this.storeId(),
                        state: '0',
						couId:'',
						conId:'',
                        payType: '',
                        operatorId: this.accountId(),
                        phone: cash.phone
                    }
					this.$refs.couEmp.setPosName("咨询师")
					this.$refs.conEmp.setPosName("咨询顾问")

                } else if (param == 'modify') {
                    console.log('Initialization FWRoyalty’s content, which modifies FWRoyalty')

                    this.title = '修改'
                    Object.assign(this.cash, cash)
                    this.cash.operatorId = this.accountId()
                    this.$refs.couEmp.setPosName("咨询师")
					this.$refs.conEmp.setPosName("咨询顾问")
					this.$refs.couEmp.setEmp(this.cash.couId)
					this.$refs.conEmp.setEmp(this.cash.conId)
                    this.$refs.payStyleRef.setPsId(this.cash.payType)
                }
            },
            psStyle(data) {
                this.cash.payType = ''
                if (data != null) {
                    this.cash.payType = data
                }
            },
            dateAction() {
                if (this.isBlank(this.cash.createDate)) {
                    this.cash.createDate = this.moment(this.cash.createDate, "YYYY-MM-DD 00:00:00.000")
                }
            },
			couChange: function(param) {
				if (this.isBlank(param)) {
					this.cash.couId = ""
				} else {
					this.cash.couId = param.empId
				}
			},
			conChange: function(param) {
				if (this.isBlank(param)) {
					this.cash.conId = ""
				} else {
					this.cash.conId = param.empId
				}
			},
            setCash(param) {
                this.cash.memNum = param.memNum
                this.cash.cashName = param.memName
                this.cash.phone = param.phone
            },
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
                        if (res.retData.length > 0) {
                            this.member = res.retData[0]
                            this.setCash(this.member)
                        } else {
                            this.member = {
                                memNum: '',//会员号
                                memName: '',//会员名
                                phone: '',//手机
                            }
                        }
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    console.log('会员查询请求失败')
                });
            },
            //the event of addtional button
            certainAction() {
                console.log('the event of addtional button')
                var reg =
                    /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)|(^0{0,1}19[0-9]{9}$)/;

                if (this.isBlank(this.cash.cashName)) {
                    alert("姓名不能为空")
                    return
                }
                if (this.isBlank(this.cash.phone)) {
                    alert("手机号不能为空")
                    return
                }

                if (this.isBlank(this.cash.money)) {
                    alert("定金不能为空")
                    return
                }
				if (this.isBlank(this.cash.couId)) {
				    alert("咨询师不能为空")
				    return
				}
				if (this.isBlank(this.cash.conId)) {
				    alert("咨询顾问不能为空")
				    return
				}
                if (this.isBlank(this.cash.payType)) {
                    alert("缴费方式不能为空")
                    return
                }
                if (!this.isBlank(this.cash.createDate)) {
                    this.cash.createDate = this.moment(this.cash.createDate, 'YYYY-MM-DD 00:00:00.000')
                } else {
                    alert("交定金时间不能为空")
                    return
                }

                this.isDisable = true
                setTimeout(() => {
                    this.isDisable = false
                }, 2000)
                
                var url
                switch (this.title) {
                    case "新增":
                        url = this.url + '/cashAction/addCash'
                        break;
                    case "修改":
                        url = this.url + '/cashAction//updateCash'
                        break;
                }

                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: this.cash,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.closeCurrentPage()
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('会员相关操作失败')
                });
            },
            closeCurrentPage() {
                this.$refs.couEmp.setEmp('')
                this.$refs.conEmp.setEmp('')
                this.$refs.payStyleRef.setPsId('0')
                this.$emit('certainAction')
            },
        },
        mounted() {

        },

    }
</script>

<style>
    .subcd-h65{width:67%;}
    .pos-tr {
        top: 0;
        right: 20px;
        line-height: 34px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
