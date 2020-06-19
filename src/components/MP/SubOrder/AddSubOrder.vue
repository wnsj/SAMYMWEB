<!-- add and modify order -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 class="modal-title">{{title}}预约</h4>
        </div>
        <div class="modal-body  pos_r jh-mh-sc">
            <div class="tab-pane fade in active martop" id="basic">
                <form action="" class="clearfix">
<!--                    <div class="col-md-6 form-group clearfix">-->
<!--                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline"-->
<!--                               >会员号</label><span-->
<!--                        class="sign-left">:</span>-->
<!--                        <div class="col-md-8">-->
<!--                            <input type="text" class="form-control" v-model="orderClick.memNum"-->
<!--                                   v-on:change="checkMemNum(orderClick.memNum)">-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline">姓名</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="orderClick.appName" placeholder="" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline">手机号</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline">预约时间</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <dPicker v-model="orderClick.appDate" format="YYYY-MM-DD" class="wd100" v-on:change="checkEmpSchedule()"></dPicker>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline">咨询师</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <emp ref="counlorEmp" @employeeChange="counlorEmpChange"></emp>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline">产品</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <project ref="project" @projectChange="projectChange"></project>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline">咨询室</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <CounseRoom :disabled="true" ref="CounseRoomRef"></CounseRoom>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline">渠道</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="orderClick.channel">
                                <option value="1">线上电话</option>
                                <option value="2">线上面对面</option>
                                <option value="3">门店</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline">备注</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <textarea class="form-control" v-model="orderClick.remark">
                            </textarea>
                        </div>
                    </div>
                    <div class="col-md-12 form-group clearfix">
                        <h4 id="myModalLabel" class="modal-title pull-left">预约时间</h4>
                    </div>
                    <div class="col-md-12 form-group clearfix">
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[0]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time1" class="form-control"
                                       :disabled="order.time1Mod"
                                       v-on:click="setOrder(1,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[1]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time2" class="form-control"
                                       :disabled="order.time2Mod"
                                       v-on:click="setOrder(2,order)">
                            </div>
                        </div>

                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[2]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time3" class="form-control"
                                       :disabled="order.time3Mod"
                                       v-on:click="setOrder(3,order)">
                            </div>
                        </div>

                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[3]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time4" class="form-control"
                                       :disabled="order.time4Mod"
                                       v-on:click="setOrder(4,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[4]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time5" class="form-control"
                                       :disabled="order.time5Mod"
                                       v-on:click="setOrder(5,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[5]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time6" class="form-control"
                                       :disabled="order.time6Mod"
                                       v-on:click="setOrder(6,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[6]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time7" class="form-control"
                                       :disabled="order.time7Mod"
                                       v-on:click="setOrder(7,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[7]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time8" class="form-control"
                                       :disabled="order.time8Mod"
                                       v-on:click="setOrder(8,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[8]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time9" class="form-control"
                                       :disabled="order.time9Mod"
                                       v-on:click="setOrder(9,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[9]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time10" class="form-control"
                                       :disabled="order.time10Mod"
                                       v-on:click="setOrder(10,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[10]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time11" class="form-control"
                                       :disabled="order.time11Mod"
                                       v-on:click="setOrder(11,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[11]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time12" class="form-control"
                                       :disabled="order.time12Mod"
                                       v-on:click="setOrder(12,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[12]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time13" class="form-control"
                                       :disabled="order.time13Mod"
                                       v-on:click="setOrder(13,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[13]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time14" class="form-control"
                                       :disabled="order.time14Mod"
                                       v-on:click="setOrder(14,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[14]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time15" class="form-control"
                                       :disabled="order.time15Mod"
                                       v-on:click="setOrder(15,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[15]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time16" class="form-control"
                                       :disabled="order.time16Mod"
                                       v-on:click="setOrder(16,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[16]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time17" class="form-control"
                                       :disabled="order.time17Mod"
                                       v-on:click="setOrder(17,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[17]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time18" class="form-control"
                                       :disabled="order.time18Mod"
                                       v-on:click="setOrder(18,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[18]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time19" class="form-control"
                                       :disabled="order.time19Mod"
                                       v-on:click="setOrder(19,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[19]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time20" class="form-control"
                                       :disabled="order.time20Mod"
                                       v-on:click="setOrder(20,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[20]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time21" class="form-control"
                                       :disabled="order.time21Mod"
                                       v-on:click="setOrder(21,order)">
                            </div>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg">
                            <label class="col-md-8 control-label text-right nopad" >{{timeArr[21]}}</label>
                            <div class="col-md-4" >
                                <input type="checkbox" v-model="order.time22" class="form-control"
                                       :disabled="order.time22Mod"
                                       v-on:click="setOrder(22,order)">
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 form-group clearfix">
                            <button type="button" class="btn btn-warning pull-right margin-right-15"
                                    data-toggle="modal" v-on:click="closeCurrentPage()">返回
                            </button>
                            <button type="button" class="btn btn-primary pull-right margin-right-15"
                                    data-toggle="modal" v-on:click="addOrder(title)">确认
                            </button>
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
                    "time9": true,
                    "time9Mod": true,
                    "time10": true,
                    "time10Mod": true,
                    "time11": true,
                    "time11Mod": true,
                    "time12": true,
                    "time12Mod": true,
                    "time13": true,
                    "time13Mod": true,
                    "time14": true,
                    "time14Mod": true,
                    "time15": true,
                    "time15Mod": true,
                    "time16": true,
                    "time16Mod": true,
                    "time17": true,
                    "time17Mod": true,
                    "time18": true,
                    "time18Mod": true,
                    "time19": true,
                    "time19Mod": true,
                    "time20": true,
                    "time20Mod": true,
                    "time21": true,
                    "time21Mod": true,
                    "time22": true,
                    "time22Mod": true,
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
                    channel: 3,
                    remark: '',
                    sex:1
                },
                counselorList: [],
                numArr: [], //记录被选中的时间
                timeArr: [
                    '08:00-08:30',
                    '08:30-09:00',
                    '09:00-09:30',
                    '09:30-10:00',
                    '10:00-10:30',
                    '10:30-11:00',
                    '11:00-11:30',
                    '11:30-12:00',
                    '13:00-13:30',
                    '13:30-14:00',
                    '14:00-14:30',
                    '14:30-15:00',
                    '15:00-15:30',
                    '15:30-16:00',
                    '16:00-16:30',
                    '16:30-17:00',
                    '17:00-17:30',
                    '17:30-18:00',
                    '18:00-18:30',
                    '18:30-19:00',
                    '19:00-19:30',
                    '19:30-20:00',
                ]
            };
        },
        methods: {
            initData(flag,param) {
				$('#addSubOrderContent').modal({backdrop: 'static', keyboard: false});
                this.numArr = []
				console.log(param)
                if (flag == 'againAdd') {
                    this.$refs.counlorEmp.setPosName("咨询师")
                    this.$refs.counlorEmp.setEmp(param.empId)
					console.log("参数"+param)
                    this.$refs.project.setProject(param.proId)
                    this.orderClick = {
                        memNum: param.memNum,
                        appName: param.appName,
                        phone: param.phone,
                        storeId: this.storeId(),
                        appDate: param.appDate,
                        empId: param.empId,
                        proId: param.proId,
                        channel: param.channel,
                        remark: param.remark,
                        sex:param.sex
                    }
                } else {
                    this.$refs.counlorEmp.setPosName("咨询师")
                    this.$refs.counlorEmp.setEmp("")
                    this.$refs.project.setProject(0)
                    this.$refs.CounseRoomRef.setChaId(0)
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
                        "time9": true,
                        "time9Mod": true,
                        "time10": true,
                        "time10Mod": true,
                        "time11": true,
                        "time11Mod": true,
                        "time12": true,
                        "time12Mod": true,
                        "time13": true,
                        "time13Mod": true,
                        "time14": true,
                        "time14Mod": true,
                        "time15": true,
                        "time15Mod": true,
                        "time16": true,
                        "time16Mod": true,
                        "time17": true,
                        "time17Mod": true,
                        "time18": true,
                        "time18Mod": true,
                        "time19": true,
                        "time19Mod": true,
                        "time20": true,
                        "time20Mod": true,
                        "time21": true,
                        "time21Mod": true,
                        "time22": true,
                        "time22Mod": true,
                        "consultantRoomList": []
                    }
                    this.orderClick = {
                        memNum: param.visId, //会员名
                        phone: param.phone,
                        appName: param.visitorName,
                        storeId: this.storeId(),
                        appDate: new Date(),
                        empId: '',
                        proId: '',
                        channel: 3,
                        remark: '',
                        sex:param.sex,
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
                this.numArr = []
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
                if (this.isBlank(this.orderClick.empId)) {
                    alert('咨询师不能为空')
                    return
                }
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
                    item.remark = this.orderClick.remark
                    item.sex = this.orderClick.sex
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
                        this.closeCurrentPage()
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('预约提交请求失败')
                });
            },
            closeCurrentPage() {
                this.$emit('closeCurrentPage')
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
                this.numArr = []

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
        padding-left:0;padding-right:0;width:22%; margin-right:4%;
    }

    .btnBg label {
        margin-bottom: 0;
    }

    .btnBg input {
        margin-top: 10px;
    }
</style>
