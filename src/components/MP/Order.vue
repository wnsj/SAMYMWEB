<!-- the page of department management -->
<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">预约管理</h1>
        </div>
        <el-collapse-transition>
        <div v-show="showSelect">
            <div class="row newRow">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-md-5 col-lg-5 text-right nopad">
                        <p class="end-aline col-md-11 col-lg-11" >姓名</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7" style="padding-right: 0;"><input class="form-control" type="text" value="" v-model="appName"></div>
                </div>

                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-md-5 col-lg-5 text-right nopad">
                        <p class="end-aline col-md-11 col-lg-11" >手机号</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7" style="padding-right: 0;">
                        <input class="form-control" type="text" value="" v-model="phone">
                    </div>
                </div>

                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5  text-right nopad">
                        <p class="end-aline col-md-11 col-lg-11" style="padding-left: 0;padding-right: 0;">是否到店</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7" style="padding-right: 0;">
                        <select class="form-control" v-model="arrival">
                            <option value="">--未选择--</option>
                            <option value="0">未到店</option>
                            <option value="1">已到店</option>
                        </select>
                    </div>
                </div>

                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-has="'SAMY:MP:STORE'">
                    <div class="col-md-5 col-lg-5 text-right nopad">
                        <p class="end-aline col-md-11 col-lg-11" >门店</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7" style="padding-right: 0;">
                        <store ref='store' @storeChange='storeChange'></store>
                    </div>
                </div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-md-5 col-lg-5 text-right nopad">
                        <p class="end-aline col-md-11 col-lg-11" >咨询师</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7" style="padding-right: 0;">
                        <emp ref="counlorEmp" @employeeChange="counlorEmpChange"></emp>
                    </div>
                </div>
            </div>
            <div class="row newRow">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="col-md-5 col-lg-5 text-right nopad">
                        <p class="end-aline col-md-11 col-lg-11" >渠道</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-md-7 col-lg-7" style="padding-right: 0;">
                        <select class="form-control" v-model="channel">
                            <option value="">--未选择--</option>
                            <option value="1">线上电话</option>
                            <option value="2">线上面对面</option>
                            <option value="3">门店</option>
                        </select>
                    </div>
                </div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" >
				    <div class="col-md-5 col-lg-5 text-right nopad">
				        <p class="end-aline col-md-11 col-lg-11" style="padding-left: 0; padding-right: 0;">是否取消</p><span
				        class="sign-left">:</span>
				    </div>
				    <div class="col-md-7 col-lg-7" style="padding-right: 0;">
				        <select class="form-control" v-model="state">
				            <option value="">--未选择--</option>
				            <option value="1">未取消</option>
				            <option value="0">已取消</option>
				        </select>
				    </div>
				</div>
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" >
                    <div class="col-md-2 col-lg-2 text-right nopad orderwd20" style="padding-right: 5px;">
                        <p class="end-aline col-md-11 col-lg-11" style="padding-left: 0;padding-right: 0;">预约时间</p><span class="sign-left">:</span>
                    </div>
                    <div class="col-md-4 col-lg-4" style="margin-left: -3.5px;">
                        <dPicker class="wd100" v-model="begAppDate"></dPicker>
                    </div>
                    <div class="pull-left end-aline nopad">
                        ~
                    </div>
                    <div class="col-md-4 col-lg-4">
                        <dPicker class="wd100" v-model="endAppDate"></dPicker>
                    </div>
                </div>
				<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-30"
				        data-toggle="modal"
				        @click="checkOrderList(1)">查询
				</button>
            </div>
           <!-- <div class="row newRow">
                
                <button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-30"
                        data-toggle="modal"
                        @click="checkOrderList(1)">查询
                </button>
            </div> -->
        </div>
        </el-collapse-transition>
        <div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover" id="datatable" >
                        <thead class="datathead">
                        <tr>
                            <th class="text-center" >预约号</th>
                            <th class="text-center" >姓名</th>
                            <!--                            <th class="text-center" >手机号</th>-->
                            <th class="text-center" >性别</th>
                            <!-- <th class="text-center">访问类型</th> -->
                            <th class="text-center" >咨询师</th>
                            <th class="text-center" >预约时间</th>
                            <th class="text-center" >咨询室</th>
                            <th class="text-center" >渠道</th>
                            <th class="text-center" >来电时间</th>
                            <th class="text-center" >门店</th>
                            <!--  <th class="text-center" >取消</th> -->
                            <th class="text-center" >到店</th>
                            <th class="text-center" >备注</th>
                            <th class="text-center" >操作人</th>
                            <th class="text-center" >编辑</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in orderList" :key="index" @dblclick="updateOrder(item)">
                            <td class="text-center" >{{item.memNum}}</td>
                            <td class="text-center" >{{item.appName}}</td>
                            <!--                            <td class="text-center" >{{item.phone}}</td>-->
                            <td class="text-center" >{{item.sex == 1 ? '男' : '女'}}</td>
                            <td class="text-center" >{{item.empName}}</td>
                            <!-- <td class="text-center">{{item.visitType=='0' ? "初访" : "复访"}}</td> -->
                            <td class="text-center" >{{item.appDate |
                                dateFormatFilter("YYYY-MM-DD")}}
                                {{retDate(1,item.begAppDate)}}--{{retDate(2,item.endAppDate)}}
                            </td>
                            <td class="text-center" >{{item.crName}}</td>
                            <td class="text-center" >{{item.channel == 1 ? '线上电话' :
                                item.channel == 2 ? '线上面对面' : '门店' }}
                            </td>
                            <td class="text-center" >{{item.createDate |
                                dateFormatFilter("YYYY-MM-DD")}}
                            </td>
                            <td class="text-center" >{{item.storeName}}
                            </td>

                            <!--            <td class="text-center" v-bind:class="{ onOffState:!item.state}" >{{item.state=='0' ? '已取消' : '未取消'}}</td> -->
                            <td class="text-center" :class="{ onOffArrival:!item.arrival}" >
                                {{item.arrival=='0' ? '未到店' : '已到店'}}
                            </td>
                            <td class="text-center" >{{item.remark}}</td>
                            <td class="text-center" >{{item.operatorName}}</td>
                            <td class="text-center">
                                <button type="button" class="btn btn-warning" @click="updateOrder(item)"
                                        v-has="'SAMY:MP:Order:Update'" :disabled="item.state == 0">修改
                                </button>
                                <button type="button" style="margin-left: 10px;" class="btn btn-primary" @click="caAction(item,'cancel')"
                                        :disabled="item.state == 0">
                                    {{item.state=='0' ? '已取消' : '点击取消'}}
                                </button>
                                <button type="button" style="margin-left: 10px;" class="btn btn-primary" @click="caAction(item,'arrival')"
                                        :disabled="item.state == 0 || item.arrival == 1">
                                    {{item.arrival=='0' ? '点击到店' : '已到店'}}
                                </button>
								<br>
                                <button type="button" style="margin-top: 10px;margin-right:49px;" class="btn btn-primary" @click="queryPhone(item)"
                                        v-has="'SAMY:MP:Order:QueryPhone'" :disabled="item.state == 0">查看手机号码
                                </button>
                                <button type="button" style="margin-top: 10px;" class="btn btn-primary" @click="againAdd(item)"
                                        v-has="'SAMY:MP:Order:Add'">再来一条
                                </button>
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
            <div class="modal fade" id="orderContent">
                <div class="modal-dialog wd1000">
                    <!-- <SubOrder ref='order' @addOrder='feedBack'></SubOrder> -->
                    <UpdateSubOrder ref="UpdateSubOrderRef" @addOrder='feedBack'></UpdateSubOrder>
                </div>
            </div>
            <div class="modal fade" id="addAppointContent">
                <div class="modal-dialog wd1000">
                    <AddSubOrder ref="AddSubOrderRef" @closeCurrentPage='feedBack'></AddSubOrder>
                </div>
            </div>
            <div class="modal fade" id="showPhoneContent">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×
                            </button>
                            <h4 id="myModalLabel" class="modal-title">电话</h4>
                        </div>
                        <div class="modal-body  pos_r">
                            <div class="tab-pane fade in active martop" id="basic">
                                <form action="" class="clearfix">
                                    <div class="col-md-12 form-group clearfix">
                                        <label class="col-md-3 control-label text-right nopad end-aline ">电话号</label><span class="sign-left">:</span>
                                        <div class="col-md-8">
                                            <label class="form-control">{{phoneNoX}}</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12 form-group clearfix">
                                        <label class="col-md-3 control-label text-right nopad end-aline ">分机号</label><span
                                        class="sign-left">:</span>
                                        <div class="col-md-8">
                                            <label class="form-control">{{extension}}</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12 form-group clearfix">
                                        <label class="col-md-3 control-label text-right nopad end-aline">失效时间</label><span class="sign-left">:</span>
                                        <div class="col-md-8">
                                            <label class="form-control">{{endDate}}</label>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left tips">
                                            注：拨打手机号，听到提示后输入分机号，按#号结束。<br>过了失效时间，通过这个手机号将无法联系到客户。
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import store from '../common/Store.vue'
    import SubOrder from '../MP/SubOrder/SubOrder.vue'
    import AddSubOrder from '../MP/SubOrder/AddSubOrder.vue'
    import UpdateSubOrder from '../MP/SubOrder/UpdateSubOrder.vue'
    import emp from '@/components/common/Employee.vue'
    import dPicker from 'vue2-datepicker'
    import Paging from '../common/paging'
    import {
        init
    } from '@/../static/js/common.js'
    export default {
        components: {
            SubOrder,
            dPicker,
            Paging,
            store,
            AddSubOrder,
            UpdateSubOrder,
            emp
        },
        data() {
            return {
                memNum: "",
                appName: "",
                phone: "",
                visitType: "",
                begCreateDate: "",
                endCreateDate: "",
                begAppDate: "",
                endAppDate: "",
                orderList: [],
                arrival: '0',
                state: '1',
                storeId: this.storeId(),
                accountType: this.accountType(),
                empId: '',
                channel: '',
                phoneNoX: '',
                extension: '',
                endDate: '',
                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: '', //数据的数量
                showSelect:true,
                addClass: false,
            };
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function (page) {
                this.current = page
                this.checkOrderList(page);
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
            selectRule(param, item) {
                if (param == 1) {
                    this.$refs.AddSubOrderRef.initData()
                    $("#addAppointContent").modal('show')
                } else if (param == 3) {
                    if (!this.has("SAMY:MP:Order:Update")) {
                        alert("暂无权限!")
                        return
                    }
                    this.$refs.UpdateSubOrderRef.initData(item)
                    $("#orderContent").modal('show')
                }
            },
            updateOrder(item) {
                if (item.arrival == '1') {
                    alert("已到店，不能进行修改")
                } else {
                    this.selectRule('3', item)
                }
            },
            storeChange(param) {
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }
            },
            //feedback from adding and modifying view
            feedBack() {
                this.checkOrderList(1)
                $("#orderContent").modal('hide')
                $("#addAppointContent").modal('hide')
            },
            caAction(item, param) {
                var url = ''
                var obj = {
                    'empId': item.empId,
                    'appDate': item.appDate,
                    'createDate': item.createDate
                }
                if (param == 'cancel') {
                    if (item.arrival == '1') {
                        alert("已到店，不能修改")
                        return
                    } else {
                        if (!confirm('是否确认取消')) {
                            return
                        }
                        obj.state = 0
                        url = this.url + '/appointmentAction/updateAppoint'
                    }
                } else if (param == 'arrival') {
                    if (item.arrival != '1') {
                        if (!confirm('请确认到店后，点确定')) {
                            return
                        }
                        obj.arrival = '1'
                        url = this.url + '/appointmentAction/updateAppoint'
                    } else {
                        alert("已到店，不能修改")
                        return
                    }
                }
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: obj,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    alert(res.retMsg)
                    this.checkOrderList(1)
                }).catch((error) => {
                    //console.log('预约相关提交请求失败')
                });
            },
            //check the list of orderContent
            checkOrderList(page) {
                this.showSelect = false
                var url = this.url + '/appointmentAction/queryAppointment'
                if (!this.isBlank(this.begCreateDate)) {
                    this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
                }
                if (!this.isBlank(this.endCreateDate)) {
                    this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 00:00:00.000')
                }
                if (!this.isBlank(this.begAppDate)) {
                    this.begAppDate = this.moment(this.begAppDate, 'YYYY-MM-DD 00:00:00.000')
                }
                if (!this.isBlank(this.endAppDate)) {
                    this.endAppDate = this.moment(this.endAppDate, 'YYYY-MM-DD 00:00:00.000')
                }
                // 				if(this.accountType!=1){
                // 					this.storeId = this.storeId()
                // 				}else{
                // 					this.storeId = ""
                // 				}
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        memNum: this.memNum,
                        appName: this.appName,
                        phone: this.phone,
                        visitType: this.visitType,
                        arrival: this.arrival,
                        state: this.state,
                        begCreateDate: this.begCreateDate,
                        endCreateDate: this.endCreateDate,
                        begAppDate: this.begAppDate,
                        endAppDate: this.endAppDate,
                        storeId: this.storeId,
                        empId: this.empId,
                        channel: this.channel,
                        page: page.toString(),
                        pageSize: this.pageSize
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    ////console.log(JSON.stringify(res))
                    if (res.retCode == '0000') {
                        this.pages = res.retData.pages //总页数
                        this.current = res.retData.current //当前页码
                        this.pageSize = res.retData.size //一页显示的数量  必须是奇数
                        this.total = res.retData.total //数据的数量
                        this.$refs.paging.setParam(this.pages, this.current, this.total)
                        this.orderList = res.retData.records
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    //console.log('请求失败处理')
                });
            },
            handleScroll(e) {
                var self = this
                var etop = e.target.scrollTop
                var fHeaderwidth = $("#fHeader").width($(".datathead").width())
                var fHeaderheight = $("#fHeader").height($(".datathead").height())
                var theadheight = $(".datathead").height()
                var thlength = $(".datathead tr th").length
                for (var i = 0; i < thlength; i++) {
                    $("#fHeader div").eq(i).width(
                        $(".datathead tr th").eq(i).width()
                    )
                    $("#fHeader div").eq(i).height(
                        $(".datathead tr th").eq(i).height()
                    )
                }
                if (etop > 0) {
                    self.fixedHeader = true
                    $("#fHeader").css("top", etop)
                } else {
                    self.fixedHeader = false
                }
            },
            retDate(type, date) {
                var begDateArr = [
                    '07:00',
                    '07:30',
                    '08:00',
                    '08:30',
                    '09:00',
                    '09:30',
                    '10:00',
                    '10:30',
                    '11:00',
                    '11:30',
                    '12:00',
                    '12:30',
                    '13:00',
                    '13:30',
                    '14:00',
                    '14:30',
                    '15:00',
                    '15:30',
                    '16:00',
                    '16:30',
                    '17:00',
                    '17:30',
                    '18:00',
                    '18:30',
                    '19:00',
                    '19:30',
                    '20:00',
                    '20:30',
                    '21:00',
                    '21:30',
                    '22:00',
                    '22:30',
                    '23:00',
                    '23:30',
                ]
                var endDateArr = [
                    '07:30',
                    '08:00',
                    '08:30',
                    '09:00',
                    '09:30',
                    '10:00',
                    '10:30',
                    '11:00',
                    '11:30',
                    '12:00',
                    '12:30',
                    '13:00',
                    '13:30',
                    '14:00',
                    '14:30',
                    '15:00',
                    '15:30',
                    '16:00',
                    '16:30',
                    '17:00',
                    '17:30',
                    '18:00',
                    '18:30',
                    '19:00',
                    '19:30',
                    '20:00',
                    '20:30',
                    '21:00',
                    '21:30',
                    '22:00',
                    '22:30',
                    '23:00',
                    '23:30',
                    '00:00',
                ]
                return type == 1 ? begDateArr[date - 1] : endDateArr[date - 1]
            },
            counlorEmpChange: function (param) {
                if (this.isBlank(param)) {
                    this.empId = ""
                } else {
                    this.empId = param.empId
                }
            },
            againAdd(item) {
                this.$refs.AddSubOrderRef.initData('againAdd',item)
                $("#addAppointContent").modal('show')
            },
            queryPhone(item) {
                var url = this.url + '/visitorAction/requirePhone'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        visId: item.memNum,
                        accId: this.accountId(),
                        moduleId: '2',
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    ////console.log(JSON.stringify(res))
                    if (res.retCode == '0000') {
                        this.phoneNoX = res.retData.phoneNoX
                        this.extension = res.retData.extension
                        this.endDate = res.retData.endDate
                        $("#showPhoneContent").modal('show')
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    //console.log('请求失败处理')
                });
            },
            closeCurrentPage() {
                $("#showPhoneContent").modal('hide')
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true);
            init();
            this.$refs.counlorEmp.setPosName("咨询师")
            this.$refs.counlorEmp.setEmp("")
        },
        created() {
            // this.checkOrderList(1)
        }
    }
</script>

<style scoped="scoped">
	.newRow .col-xs-3,.newRow .col-sm-3,.newRow .col-md-3,.newRow .col-lg-3{
		width: 20%!important;
	}
    .orderwd20{width: 20.5%;}
    .orderwd27{width: 27.3%;}
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
    .trueDate {
        background: #6CA1BF;
        color: #fff;
    }
    .onOffState {
        background: #D9524E;
        color: #fff;
    }
    .onOffArrival {
        background: #5CB95C;
        color: #fff;
    }
</style>
