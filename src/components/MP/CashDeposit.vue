<!-- the page of department management -->
<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">定金管理</h1>
        </div>
        <el-collapse-transition>
        <div v-show="showSelect">
            <div class="row newRow">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-md-5 col-lg-5 text-right jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11">姓名</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="cashName">
                    </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-md-5 col-lg-5 text-right jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">手机号</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7">
                        <input class="form-control" type="text" value="" v-model="phone">
                    </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-md-5 col-lg-5 text-right jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">开始时间</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7">
                        <dPicker class="wd100" v-model="beginDate"></dPicker>
                    </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-md-5 col-lg-5 text-right jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">结束时间</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7">
                        <dPicker  class="wd100" v-model="endDate"></dPicker>
                    </div>
                </div>
            </div>

            <div class="row newRow">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-has="'SAMY:MP:STORE'">
                    <div class="col-md-5 col-lg-5 text-right jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">门店</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7">
                        <Store ref='store' @storeChange='storeChange'></Store>
                    </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">状态</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <select class="form-control" v-model="balanceState">
                            <option value="1">全部</option>
                            <option value="2">未用完</option>
                            <option value="3">已用完</option>
                        </select>
                    </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-md-5 col-lg-5 text-right jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">咨询师</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7">
                        <cou ref="couEmp" @employeeChange="couChange"></cou>
                    </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-md-5 col-lg-5 text-right jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">咨询顾问</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7">
                        <con ref="conEmp" @employeeChange="conChange"></con>
                    </div>
                </div>
            </div>

            <div class="row newRow">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-md-5 col-lg-5 text-right jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">缴费方式</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7">
                        <PayStyle ref="payStyleRef" @payStyleChange="psStyle"></PayStyle>
                    </div>
                </div>
                <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-35"
                        data-toggle="modal"
                        v-on:click="checkMember(1)">查询
                </button>
            </div>
        </div>
        </el-collapse-transition>
        <div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover" id="datatable">
                        <thead class="datathead">
                        <tr>
                            <th class="text-center">交费门店</th>
                            <!-- <th class="text-center">会员号</th> -->
                            <th class="text-center">姓名</th>
                            <th class="text-center">手机号</th>
							<th class="text-center">咨询师</th>
							<th class="text-center">咨询顾问</th>
                            <th class="text-center">定金金额</th>
                            <th class="text-center">缴费方式</th>
                            <th class="text-center">交定金时间</th>
                            <th class="text-center">定金余额</th>
                            <th class="text-center">操作人</th>
                            <th class="text-center"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in cashList" :key="index" v-on:dblclick="modifyMember(item)">
                            <td class="text-center jh-lh-33">{{item.storeName}}</td>
                            <!-- <td class="text-center jh-lh-33">{{item.memNum}}</td> -->
                            <td class="text-center jh-lh-33">{{item.cashName}}</td>
                            <td class="text-center jh-lh-33">{{item.phone}}</td>
							<td class="text-center jh-lh-33">{{item.couName}}</td>
							<td class="text-center jh-lh-33">{{item.conName}}</td>
                            <td class="text-center jh-lh-33">{{item.money}}</td>
                            <td class="text-center jh-lh-33">{{item.payTypeName}}</td>
                            <td class="text-center jh-lh-33">{{item.createDate |
                                dateFormatFilter("YYYY-MM-DD")}}
                            </td>
                            <td class="text-center jh-lh-33">{{item.balance}}</td>
                            <td class="text-center jh-lh-33">{{item.operatorName}}</td>
                            <td class="text-center">
                                <button type="button" class="btn btn-warning" v-on:click="modifyMember(item)" v-has="'SAMY:MP:CashDeposit:Update'">修改
                                </button>

                                <button type="button" class="btn btn-danger" v-on:click="refundModel(item)" v-has="'SAMY:MP:CashDeposit:Refund'">退费</button>
<!--                                <button v-if="item.memNum==null||item.memNum==''" type="button" class="btn btn-primary"-->
<!--                                        v-on:click="transferMember(item)" v-has="'SAMY:MP:CashDeposit:ZhuanMember'">转会员-->
<!--                                </button>-->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
				<p class="tips">* 双击单行，可对当前数据进行修改</p>

                <!--分页插件-->
                <div class="page">
                    <!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
                    <paging ref="paging" @change="pageChange"></paging>
                </div>
            </div>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="cdContent">
                <div class="modal-dialog wd1000">
                    <SubCd ref='subCd' @certainAction='feedBack'></SubCd>
                </div>
            </div>
        </div>

        <div class="row row_edit">
            <div class="modal fade" id="xfContent">
                <div class="modal-dialog">
                    <SubCdConsumption ref='subCdConsumption' @certainAction='feedBack'></SubCdConsumption>
                </div>
            </div>
        </div>

        <div class="row row_edit">
            <div class="modal fade" id="tfContent">
                <div class="modal-dialog">
                    <SubCdRefund ref='subCdRefund' @certainAction='feedBack'></SubCdRefund>
                </div>
            </div>
        </div>
        <!--转会员-->
        <div class="row row_edit">
            <div class="modal fade" id="toMember">
                <div class="modal-dialog">
                    <SubTransferMember ref='toMember' @certainAction='feedBack'></SubTransferMember>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import dPicker from 'vue2-datepicker'
    import SubCd from '../MP/SubCd/SubCd.vue'
    import Store from '../common/Store.vue'
    import SubCdConsumption from '../MP/SubCd/SubCdConsumption'
    import SubCdRefund from '../MP/SubCd/SubCdRefund'
    import Paging from '../common/paging'
    import SubTransferMember from '../MP/SubCd/SubTransferMember'
	import cou from '../common/Employee.vue' //咨询师
	import con from '../common/Employee.vue'	//咨询顾问
    import PayStyle from '../common/PayStyle.vue'

    export default {
        components: {
            dPicker,
            SubCd,
            Store,
			cou,
			con,
            PayStyle,
            SubCdConsumption,
            SubCdRefund,
            Paging,
            SubTransferMember
        },
        data() {
            return {
                cashList: [],
                cashName: '',
                phone: '',
                beginDate: '',
                endDate: '',
				couId: '',
				conId: '',
                storeId: this.storeId(),
                state: '',
                payType: '',
                balanceState: "2",
                accountType: this.accountType(),
                addClass: false,

                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: '', //数据的数量
                showSelect:true
            };
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function (page) {
                this.current = page
                this.checkMember(page);
            },
            selectRule(param, item) {
                if (param == 1) {
                    this.$refs.subCd.initData('add', '')
                    $("#cdContent").modal('show')
                } else if (param == 3) {
                    this.$refs.subCd.initData('modify', item)
                    $("#cdContent").modal('show')
                }
            },
            dataOpen(){
                if(this.showSelect) return
                this.showSelect = true;
            },
            dataClose(){
                this.showSelect = !this.showSelect
                this.addClass = true;

                setTimeout(()=>{
                    this.addClass = false;
                },400)
            },
            transferMember(item) {
                console.log(item)
                this.$refs.toMember.initData(item)
                $("#toMember").modal('show')
            },
			couChange: function(param) {
				if (this.isBlank(param)) {
					this.couId = ""
				} else {
					this.couId = param.empId
				}
			},
            psStyle(data) {
                this.payType = ''
                if (data != null) {
                    this.payType = data
                }
            },
			conChange: function(param) {
				if (this.isBlank(param)) {
					this.conId = ""
				} else {
					this.conId = param.empId
				}
			},
            //消费模态框
            consumptionModel(item) {
                if (item.state == '1') {
                    alert("已经撤销，不能进行消费")
                    return
                }
                if (!this.isBlank(item.memNum)) {
                    alert("会员不可直接消费");
                    return
                }
                if (parseFloat(item.balance) <= parseFloat('0')) {
                    alert("余额为0,不可消费");
                    return
                }


                this.$refs.subCdConsumption.initData(item);
                $("#xfContent").modal('show');
            },
            //退费模态框
            refundModel(item) {
                if (item.state == '1') {
                    alert("已经撤销，不能进行消费");
                    return
                }
                if (parseFloat(item.balance) <= parseFloat('0')) {
                    alert("余额为0,没有可退费用");
                    return
                }
                this.$refs.subCdRefund.initData(item);
                $("#tfContent").modal('show');
            },
            //modify the cotent of member
            modifyMember(item) {
                if (item.state == '1') {
                    alert("已经撤销，不能进行修改")
                    return
                }
                if (item.isConsume == '1') {
                    alert("已经消费过，不能进行修改")
                    return
                }
                if (!this.has("SAMY:MP:CashDeposit:Update")){
                    alert("暂无权限!");
                    return;
                }
                this.selectRule('3', item)
            },
            storeChange(param) {
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }
            },
            feedBack() {
                this.checkMember(1)
                $("#cdContent").modal('hide')
                $("#xfContent").modal('hide')
                $("#toMember").modal('hide')
                $("#tfContent").modal('hide')
            },
            //check the list of member
            checkMember(page) {
                console.log('checkMember')
                this.showSelect = false
                var url = this.url + '/cashAction/queryCash'
                if (!this.isBlank(this.beginDate)) {
                    this.beginDate = this.moment(this.beginDate, 'YYYY-MM-DD 00:00:00.000')
                }
                if (!this.isBlank(this.endDate)) {
                    this.endDate = this.moment(this.endDate, 'YYYY-MM-DD 23:59:00.000')
                }
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        cashName: this.cashName,
                        phone: this.phone,
                        beginDate: this.beginDate,
                        endDate: this.endDate,
                        storeId: this.storeId,
						couId:this.couId,
						conId:this.conId,
                        payType: this.payType,
                        balanceState: this.balanceState,
                        page: page.toString(),
                        pageSize: this.pageSize
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    // console.log(res)
                    if (res.retCode == '0000') {
                        this.pages = res.retData.pages //总页数
                        this.current = res.retData.current //当前页码
                        this.pageSize = res.retData.size //一页显示的数量  必须是奇数
                        this.total = res.retData.total //数据的数量
                        this.$refs.paging.setParam(this.pages, this.current, this.total)
                        this.cashList = res.retData.records
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    console.log('定金查询失败')
                });
            },
            cancelCush(item) {
                var url = this.url + '/cashAction/updateCash'
                if (item.state == '1') {
                    alert("已经撤销，不能进行修改")
                    return
                }

                item.updateDate = this.moment('', 'YYYY-MM-DD 00:00:00.000')

                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        state: '1',
                        cashId: item.cashId,
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    // console.log(res)
                    if (res.retCode == '0000') {
                        item.state = '1'
                    }

                }).catch((error) => {
                    console.log('定金查询失败')
                });
            },
        },
        mounted() {
			this.$refs.couEmp.setPosName("咨询师")
			this.$refs.conEmp.setPosName("咨询顾问")
        },
        created() {
            //this.checkMember(1)
        }
    }
</script>

<style>
    #datatable {
        position: relative;
    }

    #fHeader {
        position: absolute;
        top: 0;
        left: 0;
        background: #eeeeee;
        overflow: hidden;
    }

    #fHeader div.text-center {
        float: left;
        display: inline-block;
        padding: 8px;
        border: 1px solid #ddd;
        font-weight: bold;
    }

    @media print {
        #fHeader {
            display: none
        }
    }
</style>
