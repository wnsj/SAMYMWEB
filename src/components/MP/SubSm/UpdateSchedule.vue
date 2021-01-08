<!-- add and modify order -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">修改排班</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <form action="" class="clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">咨询师</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <emp ref="counlorEmp" @employeeChange="counlorEmpChange" :disabled="isSelete"></emp>
                        </div>
                    </div>
                    <div class="col-md-12 form-group clearfix jh-pr-0">
                        <el-calendar v-model='curDate' ref="elCalendarRef">
                            <template slot="dateCell" slot-scope="{date, data}">
                                <div>
                                    <center>{{dateStrParseInt(data)}}</center>
                                </div>
                                <div v-if="data.type == 'current-month'">
                                    <div>{{createDateObj(data)}}</div>
                                    <input type="hidden" :id="data.inputSchId" :value="data.schId">
                                    <div>
                                        <!-- <center><input type="checkbox" v-model="data.morning" :id="data.inputMon"
                                                       :disabled="data.monModif == 1">上午
                                        </center> -->
                                        <center class="swxw">
                                            <input type="checkbox" v-model="data.morning" :id="data.inputMon" :disabled="data.monModif == 1">
                                            <label :for="data.inputMon">上午</label>
                                        </center>
                                    </div>
                                    <div>
                                        <!-- <center><input type="checkbox" v-model="data.afternoon" :id="data.inputAft"
                                                       :disabled="data.aftModif == 1">下午
                                        </center> -->
                                        <center class="swxw">
                                            <input type="checkbox" v-model="data.afternoon" :id="data.inputAft" :disabled="data.aftModif == 1">
                                            <label :for="data.inputAft">下午</label>
                                        </center>
                                    </div>
                                </div>
                            </template>
                        </el-calendar>
                    </div>

                    <div class="col-md-12 form-group clearfix">
                        <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-0"
                                    data-toggle="modal" v-on:click="closeCurrentPage()">返回
                        </button>
                        <button type="button" :disabled="isDisable" class="btn btn-primary pull-right m_r_10 jh-mr-1"
                                    data-toggle="modal" v-on:click="addOrder()">确认
                        </button>
                        <button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-0"
                                    data-toggle="modal" v-on:click="selectBox(2)">取消
                        </button>
                        <button type="button" class="btn btn-success pull-right m_r_10 jh-mr-0"
                                    data-toggle="modal" v-on:click="selectBox(1)">全选
                        </button>
                    </div>
                </form>
            </div>

        </div>

    </div>
</template>

<script>
    var dateList2 = [];
    import dPicker from 'vue2-datepicker'
    import emp from '../../common/Employee.vue'
    import moment from 'moment'
    // import eleCalendar from 'ele-calendar'
    // import 'ele-calendar/dist/vue-calendar.css'
    export default {
        components: {
            dPicker,
            emp,
            // eleCalendar
        },
        data() {
            return {
                title: '新增',
                allDate: [],
                allWeek: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                allAddValueState: '',
                empId: '',
                isSelete: false,
                dateList: [],
                curDate: new Date(),
                updateList: [],
                tempDate: '',
                isDisable: false
            };
        },
        methods: {
            initData(obj) {
                this.isSelete = true;
                this.tempDate = obj.schedulingDate;
                this.curDate = obj.schedulingDate;
                this.$refs.counlorEmp.setEmp(obj.empId)
                this.empId = obj.empId
                this.querySched()
            },
            //feedback employee information
            counlorEmpChange: function (param) {
                if (this.isBlank(param)) {
                    this.empId = "";
                } else {
                    this.empId = param.empId;
                    for (var i = 0; i < this.dateList.length; i++) {
                        this.dateList[i].empId = param.empId;
                    }
                }
            },

            //the event of addtional button
            addOrder() {
                if (this.isBlank(this.empId)) {
                    alert("咨询师不能为空");
                    return
                }
                if (moment(this.curDate).format("YYYY-MM") !=  moment(this.tempDate).format("YYYY-MM")) {
                    alert("不可修改排班月份!");
                    return;
                }
                this.updateList = []
                var startDate = moment(this.curDate).startOf('month')
                var endDate = moment(this.curDate).endOf('month')
                for (var i = 1; i <= endDate.get('date'); i++) {
                    var inputMon = $("#inputSchMon_" + i).is(":checked");
                    var inputAft = $("#inputSchAft_" + i).is(":checked");
                    var schId = $("#inputSchId_" + i).val()
                    var obj = {
                        schId: schId,
                        morning: inputMon ? 1 : 0,
                        afternoon: inputAft ? 1 : 0,
                    };
                    this.updateList.push(obj)
                }

                this.isDisable = true
                setTimeout(() => {
                    this.isDisable = false
                }, 2000)
                
                var url = this.url + '/schedulingAction/updateSched';
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: this.updateList,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.$emit('addSchCloseFlash')
                        //$("#orderContent").modal("hide");
                    } else {
                        alert(res.retMsg);
                    }
                }).catch((error) => {
                    console.log('预约提交请求失败')
                });
            },
            closeCurrentPage() {
                this.$emit('addSchCloseFlash')
            },
            printLog(value) {
                // var ch = this.$refs.elCalendarRef.$children[0].$children
                // console.log(ch)
                // for (var i = 0; i < ch.length; i++) {
                //     ch[i].disabled = true
                // }
                //$(".el-calendar__button-group").attrs("")
                console.log($(".el-calendar__button-group"))
            },
            //创建日期对象
            createDateObj(data) {
                for (var i = 0; i < this.dateList.length; i++) {
                    var ite = this.dateList[i];
                    if (data.day == ite.schedulingDate) {
                        data.schId = ite.schId
                        data.empId = ite.empId
                        data.morning = ite.morning == 1 ? true : false;
                        data.afternoon = ite.afternoon == 1 ? true : false;
                        data.monModif = ite.monModif
                        data.aftModif = ite.aftModif
                        data.operatorId = this.accountId()
                        data.schedulingDate = data.day
                        data.i = this.retArrIndex(data)
                        var day = this.dateStrParseInt(data);
                        data.inputMon = 'inputSchMon_' + day
                        data.inputAft = 'inputSchAft_' + day
                        data.inputSchId = "inputSchId_" + day
                    }
                }
                //this.dateList.push(data)
                //dateList2.push(data)
            },
            //将日期天字符串转成数字
            dateStrParseInt(data) {
                return parseInt(data.day.split('-').slice(2))
            },
            //返回数组角标
            retArrIndex(data) {
                return this.dateStrParseInt(data) - 1;
            },
            async querySched() {
                if (this.isBlank(this.empId)) {
                    alert("咨询师不能为空");
                    return
                }
                this.dateList = []
                var startDate = moment(this.curDate).startOf('month')
                var endDate = moment(this.curDate).endOf('month')
                var url = this.url + '/schedulingAction/querySchedByAppoint';
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        empId: this.empId,
                        begDate: startDate.format("YYYY-MM-DD"),
                        endDate: endDate.format("YYYY-MM-DD")
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.dateList = res.retData;
                    } else {
                        alert(res.retMsg);
                    }
                }).catch((error) => {
                    console.log('预约提交请求失败')
                });
            },
            selectBox(param) {
                var startDate = moment(this.curDate).startOf('month')
                var endDate = moment(this.curDate).endOf('month')
                if (param == 1) {
                    for (var i = 1; i <= endDate.get('date'); i++) {
                        $("#inputSchMon_" + i).prop("checked", true);
                        $("#inputSchAft_" + i).prop("checked", true);
                    }
                } else {
                    for (var i = 1; i <= endDate.get('date'); i++) {
                        var inputMon = $("#inputSchMon_" + i).prop("disabled");
                        var inputAft = $("#inputSchAft_" + i).prop("disabled");
                        if (inputMon == false) $("#inputSchMon_" + i).prop("checked", false);
                        if (inputAft == false) $("#inputSchAft_" + i).prop("checked", false);
                    }
                }
            }
        },
        mounted() {
            //this.printLog()
        }
    }
</script>

<style>
    .schDate {
        display: flex;
        justify-content: space-between
    }

    .schDate b {
        width: 80px;
        line-height: 34px;
    }

    .schDate span {
        width: 80px;
        font-size: 12px;
        color: #A9A9AC;
    }

    .case {
        position: relative;
        width: 76px;
        height: 34px;
        font-size: 14px;
        line-height: 34px;
        background: #F7F7F8;
        color: #999;
        overflow: hidden;
    }

    .case label {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        margin-bottom: 0px;
        -webkit-touch-callout: none;
        /* iOS Safari */
        -webkit-user-select: none;
        /* Chrome/Safari/Opera */
        -khtml-user-select: none;
        /* Konqueror */
        -moz-user-select: none;
        /* Firefox */
        -ms-user-select: none;
        /* Internet Explorer/Edge */
        user-select: none;
        /* Non-prefixed version, currently */
    }

    .case input {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0;
        margin-top: 0;
    }

    .case input:checked + label {
        box-sizing: border-box;
        border: #F2AD4E solid 1px;
        background: #FFF5EA;
        color: #d47b00;
    }

    .case input:checked + label:after {
        position: absolute;
        right: -15px;
        top: -15px;;
        display: block;
        width: 30px;
        height: 30px;
        background: #F2AD4E;
        border-radius: 50%;
        font-size: 12px;
        color: #fff;
        text-align: left;
        text-indent: 5px;
        line-height: 42px;
        overflow: hidden;
        content: '√';
        font-family: Verdana, Geneva, sans-serif;
        font-weight: normal;
    }


    .swxw input[type="checkbox"] + label::before {
         content: "\a0";
         display: inline-block;
         /* vertical-align: .2em; */
         width: 1em;
         height: 1em;
         margin-right: .2em;
         border-radius: .2em;
         background-color: #ccc;
         /* text-indent: .15em; */
         line-height: 1em;
     }
     .swxw input[type="checkbox"]:checked + label::before {
         content: "\2713";
         background-color: #409eff;
     	color: #fff;
     	font-size: 1em;
     }
     .swxw input {
         position: absolute;
         visibility: hidden;
     }
     .swxw input[type="checkbox"]:focus + label::before {
         box-shadow: 0 0 .1em .1em #58a;
     }
     .swxw input[type="checkbox"]:disabled + label::before {
         background-color: gray;
         box-shadow: none;
         color: #555;
     }
</style>
