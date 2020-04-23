<!-- add and modify order -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 class="modal-title">{{title}}预约</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <form action="" class="clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">会员号</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="orderClick.memNum"
                                   v-on:change="checkMemNum(orderClick.memNum)">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">姓名</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="orderClick.appName" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">手机号</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="orderClick.phone" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">预约时间</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <dPicker v-model="orderClick.appDate" format="YYYY-MM-DD" style="width:100%;"
                                     v-on:change="checkEmpSchedule()"></dPicker>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">咨询师</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <emp ref="counlorEmp" @employeeChange="counlorEmpChange"></emp>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">课程</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <project ref="project" @projectChange="projectChange"></project>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">咨询室</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <CounseRoom :disabled="true" ref="CounseRoomRef"></CounseRoom>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">渠道</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="orderClick.channel">
                                <option value="1">线上电话</option>
                                <option value="2">线上面对面</option>
                                <option value="3">门店</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12 form-group clearfix">
                        <h4 id="myModalLabel" class="modal-title pull-left">预约时间</h4>
                    </div>
                    <div class="col-md-12 form-group clearfix">
                        <div class="col-md-3 form-group clearfix btnBg"
                             style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
                            <label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArr[0]}}</label>
                            <div class="col-md-4" style='line-height:34px;padding-right:0;'>
                                <input type="checkbox" v-model="order.time1" class="form-control"
                                       :disabled="order.time1Mod"
                                       v-on:click="setOrder(1,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg"
                             style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
                            <label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArr[1]}}</label>
                            <div class="col-md-4" style='line-height:34px;padding-right:0;'>
                                <input type="checkbox" v-model="order.time2" class="form-control"
                                       :disabled="order.time2Mod"
                                       v-on:click="setOrder(2,order)">
                            </div>
                        </div>

                        <div class="col-md-3 form-group clearfix btnBg"
                             style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
                            <label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArr[2]}}</label>
                            <div class="col-md-4" style='line-height:34px;padding-right:0;'>
                                <input type="checkbox" v-model="order.time3" class="form-control"
                                       :disabled="order.time3Mod"
                                       v-on:click="setOrder(3,order)">
                            </div>
                        </div>

                        <div class="col-md-3 form-group clearfix btnBg"
                             style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
                            <label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArr[3]}}</label>
                            <div class="col-md-4" style='line-height:34px;padding-right:0;'>
                                <input type="checkbox" v-model="order.time4" class="form-control"
                                       :disabled="order.time4Mod"
                                       v-on:click="setOrder(4,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg"
                             style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
                            <label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArr[4]}}</label>
                            <div class="col-md-4" style='line-height:34px;padding-right:0;'>
                                <input type="checkbox" v-model="order.time5" class="form-control"
                                       :disabled="order.time5Mod"
                                       v-on:click="setOrder(5,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg"
                             style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
                            <label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArr[5]}}</label>
                            <div class="col-md-4" style='line-height:34px;padding-right:0;'>
                                <input type="checkbox" v-model="order.time6" class="form-control"
                                       :disabled="order.time6Mod"
                                       v-on:click="setOrder(6,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg"
                             style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
                            <label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArr[6]}}</label>
                            <div class="col-md-4" style='line-height:34px;padding-right:0;'>
                                <input type="checkbox" v-model="order.time7" class="form-control"
                                       :disabled="order.time7Mod"
                                       v-on:click="setOrder(7,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg"
                             style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
                            <label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArr[7]}}</label>
                            <div class="col-md-4" style='line-height:34px;padding-right:0;'>
                                <input type="checkbox" v-model="order.time8" class="form-control"
                                       :disabled="order.time8Mod"
                                       v-on:click="setOrder(8,order)">
                            </div>
                        </div>
                    </div>

                    <div class="form-group clearfix">
                        <div class="col-md-12">
                            <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;"
                                    data-toggle="modal" v-on:click="closeCurrentPage()">返回
                            </button>
                            <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;"
                                    data-toggle="modal" v-on:click="addOrder(title)">确认
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>

    </div>
</template>

<script>
    import dPicker from 'vue2-datepicker'
    import emp from '../../common/Employee.vue'
    import project from '../../common/Project.vue'
    import CounseRoom from '../../common/CounseRoom.vue'

    export default {
        components: {
            dPicker,
            emp,
            project,
            CounseRoom
        },
        data() {
            return {
                order: { //预约数据
                    afternoon: '',
                    createDate: '',
                    empId: '',
                    morning: '0',
                    storeId: this.storeId(),
                    operatorId: '',
                    schId: '1',
                    schedulingDate: this.moment('', 'YYYY-MM-DD'),
                    "time1": true,
                    "time1Mod": true,
                    "time2": true,
                    "time2Mod": true,
                    "time3": true,
                    "time3Mod": true,
                    "time4": true,
                    "time4Mod": true,
                    "time5": true,
                    "time5Mod": true,
                    "time6": true,
                    "time6Mod": true,
                    "time7": true,
                    "time7Mod": true,
                    "time8": true,
                    "time8Mod": true,
                    "consultantRoomList": []
                },
                title: '新增',
                testParam: true,
                orderCounselorOld: {},
                isContinnue: '0',
                orderClick: { //记录预约时间前的数据
                    memNum: '',
                    appName: '',
                    phone: '',
                    storeId: this.storeId(),
                    appDate: new Date(),
                    empId: '',
                    proId: '',
                    channel: 3
                },
                counselorList: [],
                numArr: [], //记录被选中的时间
                timeArr: [
                    "9:00-10:00",
                    "10:00-11:00",
                    "11:00-12:00",
                    "13:00-14:00",
                    "14:00-15:00",
                    "15:00-16:00",
                    "16:00-17:00",
                    "17:00-18:00",
                ]
            };
        },
        methods: {
            initData(param) {
                this.numArr = []
                if (!this.isBlank(param)) {
                    this.$refs.counlorEmp.setPosName("咨询师")
                    this.$refs.counlorEmp.setEmp(param.empId)
                    this.$refs.project.setProject(param.proId)
                    this.orderClick = {
                        memNum: param.memNum,
                        appName: param.appName,
                        phone: param.phone,
                        storeId: this.storeId(),
                        appDate: param.appDate,
                        empId: param.empId,
                        proId: param.proId,
                        channel: param.channel
                    }
                } else {
                    this.$refs.counlorEmp.setPosName("咨询师")
                    this.$refs.counlorEmp.setEmp("")
                    this.$refs.project.setProject(0)
                    this.order = { //预约数据
                        afternoon: '',
                        createDate: '',
                        empId: '',
                        morning: '0',
                        storeId: this.storeId(),
                        operatorId: '',
                        schId: '1',
                        schedulingDate: this.moment('', 'YYYY-MM-DD'),
                        "time1": true,
                        "time1Mod": true,
                        "time2": true,
                        "time2Mod": true,
                        "time3": true,
                        "time3Mod": true,
                        "time4": true,
                        "time4Mod": true,
                        "time5": true,
                        "time5Mod": true,
                        "time6": true,
                        "time6Mod": true,
                        "time7": true,
                        "time7Mod": true,
                        "time8": true,
                        "time8Mod": true,
                        "consultantRoomList": []
                    }
                    this.orderClick = {
                        memNum: '',
                        appName: '',
                        phone: '',
                        storeId: this.storeId(),
                        appDate: new Date(),
                        empId: '',
                        proId: '',
                        channel: 3
                    }
                }
            },
            itemAction(item, index) {
                console.log("item:" + JSON.stringify(item) + index)
            },
            setOrder(index, data) {
                var timeParam = 'time'.concat(index)
                if (data[timeParam] == false) {
                    this.numArr.push(index)
                } else {
                    for (var i = 0; i < this.numArr.length; i++) {
                        if (this.numArr[i] == index) {
                            this.numArr.splice(i, 1)
                        }
                    }
                }
            },

            //feedback employee information
            projectChange: function (param) {
                // console.log('科室：'+JSON.stringify(param))
                if (this.isBlank(param)) {
                    this.orderClick.proId = ""
                } else {
                    this.orderClick.proId = param.proId
                    // 					if (this.counselorList != null && this.counselorList.length > 0) {
                    // 						for (var i = 0; i < this.counselorList[0].proList.length; i++) {
                    // 							var project = this.counselorList[0].proList[i]
                    // 							if (this.consume.proId == project.proId) {
                    // 								this.orderClick.frequency = project.frequency + 1
                    // 								break;
                    // 							}
                    // 						}
                    // 					}
                }
            },
            //feedback employee information
            counlorEmpChange: function (param) {
                // console.log('科室：'+JSON.stringify(param))
                if (this.isBlank(param)) {
                    this.orderClick.empId = ""
                } else {
                    this.orderClick.empId = param.empId
                    this.$refs.project.setEmpId(this.orderClick.empId)
                    this.checkEmpSchedule()
                }
            },

            //the event of addtional button
            addOrder(param) {
                var reg =
                    /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;

                // console.log('orderClick:'+JSON.stringify(this.orderClick))
                if (this.isBlank(this.orderClick.appName)) {
                    alert("姓名不能为空")
                    return
                }
                if (this.isBlank(this.orderClick.phone)) {
                    alert("手机号不能为空")
                    return
                } else if (reg.test(this.orderClick.phone) == false) {
                    alert("不是完整的11位手机号或者正确的座机号！");
                    return
                }

                if (this.isBlank(this.orderClick.empId)) {
                    alert('咨询师不能为空')
                    return
                }
                // 				if(this.isBlank(this.orderClick.proId) || this.orderClick.proId=='0'){
                // 					alert('咨询师课程不能为空')
                // 					return
                // 				}
                if (!this.isBlank(this.orderClick.appDate)) {
                    this.orderClick.appDate = this.moment(this.orderClick.appDate, 'YYYY-MM-DD')
                } else {
                    alert("预约时间不能为空")
                    return
                }

                if (this.numArr.length <= 0) {
                    alert('没有预约时间，请选择预约时间')
                    return
                } else {
                    this.numArr = this.numArr.sort(function (a, b) {
                        return a - b;
                    })

                    if (this.numArr[this.numArr.length - 1] - this.numArr[0] != this.numArr.length - 1) {
                        alert('预约时间之间不能有间隔')
                        return
                    }
                }
                var dataList = [];
                for (var i = 0; i < this.numArr.length; i++) {
                    var item = {};
                    item.appName = this.orderClick.appName
                    item.memNum = this.orderClick.memNum
                    item.phone = this.orderClick.phone
                    item.appDate = this.orderClick.appDate
                    if (this.isBlank(this.orderClick.proId)) {
                        item.proId = null
                    } else {
                        item.proId = this.orderClick.proId
                    }

                    item.empId = this.orderClick.empId
                    item.storeId = this.orderClick.storeId
                    item.operatorId = this.getEmpId()
                    item.crId = this.orderClick.crId
                    item.atId = this.numArr[i]
                    item.channel = this.orderClick.channel
                    dataList.push(item)
                    //item.frequency
                    //item.visitType =
                    // item.begAppDate
                    // item.endAppDate
                    // item.clerkEmpId
                    // item.counlorEmpId
                }


                var url = this.url + '/appointmentAction/addAppointment';
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: dataList,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.$emit('addOrder')
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('预约提交请求失败')
                });
            },
            closeCurrentPage() {
                this.$emit('addOrder')
            },
            //咨询师排班
            checkEmpSchedule() {
                if (this.isBlank(this.orderClick.appDate)) {
                    return
                }
                if (this.isBlank(this.orderClick.empId)) {
                    return
                }
                this.orderClick.appDate = this.moment(this.orderClick.appDate, 'YYYY-MM-DD')

                var url = this.url + '/appointmentAction/queryAppointmentBySched'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        empId: this.orderClick.empId,
                        appDate: this.orderClick.appDate,
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.order = res.retData
                        if (this.order.consultantRoomList.length > 0) {
                            this.$refs.CounseRoomRef.setChaId(this.order.consultantRoomList[0].crId)
                            this.orderClick.crId = this.order.consultantRoomList[0].crId
                        } else {
                            this.$refs.CounseRoomRef.setChaId(0)
                        }
                    } else {
                        console.log('没有查到员工排班信息')
                    }
                }).catch((error) => {
                    console.log('员工排班信息查询失败')
                });
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
                        var member = res.retData.mem
                        // console.log('member'+JSON.stringify(member))
                        var counselorList = res.retData.counselorList
                        if (member != null) {
                            this.orderClick.memNum = member.memNum
                            this.orderClick.appName = member.memName
                            this.orderClick.phone = member.phone
                        }
                        if (counselorList.length > 0) {
                            console.log("有未完成的项目")
                            this.orderClick.empId = counselorList[0].counselor
                            this.$refs.counlorEmp.setEmp(this.orderClick.empId)
                        } else {
                            alert("没有未完成的项目，可以直接进行预约")
                        }
                    } else {
                        console.log('没有查到会员信息，请添加会员后充值')
                        this.consume.appName = ''
                        this.consume.phone = ''
                    }

                }).catch((error) => {
                    console.log('会员查询请求失败')
                });
            },

        },
        created() {

        },
        mounted() {

        }

    }
</script>

<style>
    .btnBg {
        background: #f5f5f5;
    }

    .btnBg label {
        margin-bottom: 0;
    }

    .btnBg input {
        margin-top: 10px;
    }
</style>
