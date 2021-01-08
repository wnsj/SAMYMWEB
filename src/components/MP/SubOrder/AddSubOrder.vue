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
<!--                    <div class="col-md-6 form-group clearfix jh-wd-33">-->
<!--                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline"-->
<!--                               >会员号</label><span-->
<!--                        class="sign-left">:</span>-->
<!--                        <div class="col-md-8">-->
<!--                            <input type="text" class="form-control" v-model="orderClick.memNum"-->
<!--                                   v-on:change="checkMemNum(orderClick.memNum)">-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="col-md-6 form-group clearfix jh-wd-33 ">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline">姓名</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="orderClick.appName" placeholder="" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <label class="col-md-3 control-label text-right nopad end-aline">手机号</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <label class="col-md-3 control-label text-right nopad end-aline">预约时间</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <dPicker v-model="orderClick.appDate" format="YYYY-MM-DD" class="wd100" v-on:change="checkEmpSchedule()"></dPicker>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <label class="col-md-3 control-label text-right nopad end-aline">咨询师</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <emp ref="counlorEmp" @employeeChange="counlorEmpChange"></emp>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <label class="col-md-3 control-label text-right nopad end-aline">产品</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <project ref="project" @projectChange="projectChange"></project>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <label class="col-md-3 control-label text-right nopad end-aline">咨询室</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <CounseRoom :disabled="true" ref="CounseRoomRef"></CounseRoom>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
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
                    <div class="col-md-6 form-group clearfix jh-wd-33">
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
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time1Mod}">
                            <input type="checkbox" id="checkbox1" v-model="order.time1" class="form-control" :disabled="order.time1Mod" v-on:click="setOrder(1,order)">
                            <label class="col-md-8 control-label text-right nopad"  for="checkbox1" >{{timeArr[0]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time2Mod}">
                            <input type="checkbox" id="checkbox2" v-model="order.time2" class="form-control" :disabled="order.time2Mod" v-on:click="setOrder(2,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox2" >{{timeArr[1]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time3Mod}">
                            <input type="checkbox" id="checkbox3" v-model="order.time3" class="form-control" :disabled="order.time3Mod" v-on:click="setOrder(3,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox3" >{{timeArr[2]}}</label>
                        </div>

                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time4Mod}">
                            <input type="checkbox" id="checkbox4" v-model="order.time4" class="form-control" :disabled="order.time4Mod" v-on:click="setOrder(4,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox4">{{timeArr[3]}}</label>
                        </div>

                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time5Mod}">
                            <input type="checkbox" id="checkbox5" v-model="order.time5" class="form-control" :disabled="order.time5Mod" v-on:click="setOrder(5,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox5">{{timeArr[4]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time6Mod}">
                            <input type="checkbox" id="checkbox6" v-model="order.time6" class="form-control" :disabled="order.time6Mod" v-on:click="setOrder(6,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox6">{{timeArr[5]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time7Mod}">
                            <input type="checkbox"  id="checkbox7" v-model="order.time7" class="form-control" :disabled="order.time7Mod" v-on:click="setOrder(7,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox7">{{timeArr[6]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time8Mod}">
                            <input type="checkbox" id="checkbox8" v-model="order.time8" class="form-control" :disabled="order.time8Mod" v-on:click="setOrder(8,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox8">{{timeArr[7]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time9Mod}">
                            <input type="checkbox"  id="checkbox9" v-model="order.time9" class="form-control" :disabled="order.time9Mod" v-on:click="setOrder(9,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox9">{{timeArr[8]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time10Mod}">
                            <input type="checkbox"  id="checkbox10" v-model="order.time10" class="form-control" :disabled="order.time10Mod" v-on:click="setOrder(10,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox10">{{timeArr[9]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time11Mod}">
                            <input type="checkbox"  id="checkbox11" v-model="order.time11" class="form-control" :disabled="order.time11Mod" v-on:click="setOrder(11,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox11">{{timeArr[10]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time12Mod}">
                            <input type="checkbox"  id="checkbox12" v-model="order.time12" class="form-control" :disabled="order.time12Mod" v-on:click="setOrder(12,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox12">{{timeArr[11]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time13Mod}">
                            <input type="checkbox"  id="checkbox13" v-model="order.time13" class="form-control" :disabled="order.time13Mod" v-on:click="setOrder(13,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox13">{{timeArr[12]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time14Mod}">
                            <input type="checkbox"  id="checkbox14" v-model="order.time14" class="form-control" :disabled="order.time14Mod" v-on:click="setOrder(14,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox14">{{timeArr[13]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time15Mod}">
                            <input type="checkbox"  id="checkbox15" v-model="order.time15" class="form-control" :disabled="order.time15Mod" v-on:click="setOrder(15,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox15">{{timeArr[14]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time16Mod}">
                            <input type="checkbox"  id="checkbox16" v-model="order.time16" class="form-control" :disabled="order.time16Mod" v-on:click="setOrder(16,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox16">{{timeArr[15]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time17Mod}">
                            <input type="checkbox"  id="checkbox17" v-model="order.time17" class="form-control" :disabled="order.time17Mod" v-on:click="setOrder(17,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox17">{{timeArr[16]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time18Mod}">
                            <input type="checkbox"  id="checkbox18" v-model="order.time18" class="form-control" :disabled="order.time18Mod" v-on:click="setOrder(18,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox18">{{timeArr[17]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time19Mod}">
                            <input type="checkbox"  id="checkbox19" v-model="order.time19" class="form-control" :disabled="order.time19Mod" v-on:click="setOrder(19,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox19">{{timeArr[18]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time20Mod}">
                            <input type="checkbox"  id="checkbox20" v-model="order.time20" class="form-control" :disabled="order.time20Mod" v-on:click="setOrder(20,order)">
                             <label class="col-md-8 control-label text-right nopad" for="checkbox20">{{timeArr[19]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time21Mod}">
                            <input type="checkbox"  id="checkbox21" v-model="order.time21" class="form-control" :disabled="order.time21Mod" v-on:click="setOrder(21,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox21">{{timeArr[20]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time22Mod}">
                            <input type="checkbox"  id="checkbox22" v-model="order.time22" class="form-control" :disabled="order.time22Mod" v-on:click="setOrder(22,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox22">{{timeArr[21]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time23Mod}">
                            <input type="checkbox"  id="checkbox23" v-model="order.time23" class="form-control" :disabled="order.time23Mod" v-on:click="setOrder(23,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox23">{{timeArr[22]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time24Mod}">
                            <input type="checkbox"  id="checkbox24" v-model="order.time24" class="form-control" :disabled="order.time24Mod" v-on:click="setOrder(24,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox24">{{timeArr[23]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time25Mod}">
                            <input type="checkbox"  id="checkbox25" v-model="order.time25" class="form-control" :disabled="order.time25Mod" v-on:click="setOrder(25,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox25">{{timeArr[24]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time26Mod}">
                            <input type="checkbox"  id="checkbox26" v-model="order.time26" class="form-control" :disabled="order.time26Mod" v-on:click="setOrder(26,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox26">{{timeArr[25]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time27Mod}">
                            <input type="checkbox"  id="checkbox27" v-model="order.time27" class="form-control" :disabled="order.time27Mod" v-on:click="setOrder(27,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox27">{{timeArr[26]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time28Mod}">
                            <input type="checkbox"  id="checkbox28" v-model="order.time28" class="form-control" :disabled="order.time28Mod" v-on:click="setOrder(28,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox28">{{timeArr[27]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time29Mod}">
                            <input type="checkbox"  id="checkbox29" v-model="order.time29" class="form-control" :disabled="order.time29Mod" v-on:click="setOrder(29,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox29">{{timeArr[28]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time30Mod}">
                            <input type="checkbox"  id="checkbox30" v-model="order.time30" class="form-control" :disabled="order.time30Mod" v-on:click="setOrder(30,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox30">{{timeArr[29]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time31Mod}">
                            <input type="checkbox"  id="checkbox31" v-model="order.time31" class="form-control" :disabled="order.time31Mod" v-on:click="setOrder(31,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox31">{{timeArr[30]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time32Mod}">
                            <input type="checkbox"  id="checkbox32" v-model="order.time32" class="form-control" :disabled="order.time32Mod" v-on:click="setOrder(32,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox32">{{timeArr[31]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time33Mod}">
                            <input type="checkbox"  id="checkbox33" v-model="order.time33" class="form-control" :disabled="order.time33Mod" v-on:click="setOrder(33,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox33">{{timeArr[32]}}</label>
                        </div>
                        <div class="col-md-3 form-group clearfix btnBg jh-ad-0" :class="{'dislab':order.time34Mod}">
                            <input type="checkbox"  id="checkbox34" v-model="order.time34" class="form-control" :disabled="order.time34Mod" v-on:click="setOrder(34,order)">
                            <label class="col-md-8 control-label text-right nopad" for="checkbox34">{{timeArr[33]}}</label>
                        </div>
                    </div>

                    <div class="col-md-12 form-group clearfix">
                            <button type="button" class="btn btn-warning pull-right margin-right-15"
                                    data-toggle="modal" v-on:click="closeCurrentPage()">返回
                            </button>
                            <button type="button" :disabled="isDisable" class="btn btn-primary pull-right margin-right-15"
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
                    "time23": true,
                    "time23Mod": true,
                    "time24": true,
                    "time24Mod": true,
                    "time25": true,
                    "time25Mod": true,
                    "time26": true,
                    "time26Mod": true,
                    "time27": true,
                    "time27Mod": true,
                    "time28": true,
                    "time28Mod": true,
                    "time29": true,
                    "time29Mod": true,
                    "time30": true,
                    "time30Mod": true,
                    "time31": true,
                    "time31Mod": true,
                    "time32": true,
                    "time32Mod": true,
                    "time33": true,
                    "time33Mod": true,
                    "time34": true,
                    "time34Mod": true,
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
                    '07:00-07:30',
                    '07:30-08:00',
                    '08:00-08:30',
                    '08:30-09:00',
                    '09:00-09:30',
                    '09:30-10:00',
                    '10:00-10:30',
                    '10:30-11:00',
                    '11:00-11:30',
                    '11:30-12:00',
                    '12:00-12:30',
                    '12:30-13:00',
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
                    '20:00-20:30',
                    '20:30-21:00',
                    '21:00-21:30',
                    '21:30-22:00',
                    '22:00-22:30',
                    '22:30-23:00',
                    '23:00-23:30',
                    '23:30-00:00'
                ],
                isDisable: false
            };
        },

        methods: {
            initData(flag,param) {
				$('#addSubOrderContent').modal({backdrop: 'static', keyboard: false});
                this.numArr = []
				// console.log(param)
                if (flag == 'againAdd') {
					this.order = { //预约数据
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
                        "time23": true,
                        "time23Mod": true,
                        "time24": true,
                        "time24Mod": true,
                        "time25": true,
                        "time25Mod": true,
                        "time26": true,
                        "time26Mod": true,
                        "time27": true,
                        "time27Mod": true,
                        "time28": true,
                        "time28Mod": true,
                        "time29": true,
                        "time29Mod": true,
                        "time30": true,
                        "time30Mod": true,
                        "time31": true,
                        "time31Mod": true,
                        "time32": true,
                        "time32Mod": true,
                        "time33": true,
                        "time33Mod": true,
                        "time34": true,
                        "time34Mod": true,
					}
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
                    this.$refs.counlorEmp.setEmp(param.empId)
                    this.$refs.project.setProject(param.proId)

                } else {
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
                        "time23": true,
                        "time23Mod": true,
                        "time24": true,
                        "time24Mod": true,
                        "time25": true,
                        "time25Mod": true,
                        "time26": true,
                        "time26Mod": true,
                        "time27": true,
                        "time27Mod": true,
                        "time28": true,
                        "time28Mod": true,
                        "time29": true,
                        "time29Mod": true,
                        "time30": true,
                        "time30Mod": true,
                        "time31": true,
                        "time31Mod": true,
                        "time32": true,
                        "time32Mod": true,
                        "time33": true,
                        "time33Mod": true,
                        "time34": true,
                        "time34Mod": true,
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
                this.isDisable = true
                setTimeout(() => {
                    this.isDisable = false
                }, 2000)

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
                        console.log('==============3=================');
                        console.log(res.retData)
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
                    console.log('==============4=================');
                    console.log(this.order);
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
            forId:function(index){
                return "checkbox_" +index
            },


        },
        created() {
			
        },
        mounted() {
			this.$refs.counlorEmp.setPosName("咨询师")
			this.$refs.counlorEmp.setEmp("")
        }

    }
</script>

<style>
    .btnBg {
        position:relative;
		width:100px;
		height:34px;
		font-size:14px;
		line-height:34px;
		background:#F7F7F8;
		color:#999;
        overflow:hidden;
        margin-right: 15px;
    }
    .btnBg label {
        position:relative;
		display:block;
		width:100%;
		height:100%;
		margin-bottom: 0px;
		text-align:center;
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Chrome/Safari/Opera */
		-khtml-user-select: none; /* Konqueror */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently */
    }

    .btnBg input {
        position:absolute;
		left:0;
		top:0;
		display:block;
		width:100%;
		height:100%;
		opacity:0 !important;
		margin-top:0;
    }

	.btnBg input:checked + label{
		box-sizing:border-box;
		border:#F2AD4E solid 1px;
		background:#FFF5EA;
		color:#EBCFA9;
    }
    .btnBg.dislab input:checked + label{
		box-sizing:border-box;
		border:#ccc solid 1px;
		background:#f5f5f5;
		color:#ccc;
    }

	.btnBg input:checked + label:after{
		position:absolute;
		right:-15px;
		top:-15px;;
		display:block;
		width:30px;
		height:30px;
		background:#F2AD4E;
		border-radius:50%;
		font-size:12px;
		color:#fff;
		text-align:left;
		text-indent:5px;
		line-height:42px;
		overflow:hidden;
		content: '√';
		font-family:Verdana, Geneva, sans-serif;
		font-weight:normal;
    }
    .btnBg.dislab input:checked + label:after{
        position:absolute;
		right:-15px;
		top:-15px;;
		display:block;
		width:30px;
		height:30px;
		background:#ccc;
		border-radius:50%;
		font-size:12px;
		color:#fff;
		text-align:left;
		text-indent:5px;
		line-height:42px;
		overflow:hidden;
		content: '√';
		font-family:Verdana, Geneva, sans-serif;
		font-weight:normal;
    }
</style>
