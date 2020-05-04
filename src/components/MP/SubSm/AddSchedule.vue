<!-- add and modify order -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">新增排班</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <form action="" class="clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <emp ref="counlorEmp" @employeeChange="counlorEmpChange" :disabled="isSelete"></emp>
                        </div>
                    </div>
                    <div class="col-md-12 form-group clearfix" style="padding-right:0;">
                        <el-calendar v-model='curDate' ref="elCalendarRef">
                            <template slot="dateCell" slot-scope="{date, data}">
                                <div>
                                    <!--   <center>{{data.day.split('-').slice(1).join('-')}}</center> -->
                                    <center>{{dateStrParseInt(data)}}</center>
                                </div>
                                <div v-if="data.type == 'current-month'">
                                    <div>{{createDateObj(data)}}</div>
                                    <div>
                                        <!-- <center><input type="checkbox" v-model="data.morning" :id="data.inputMon"
                                                :value="data.morning"><span class="swxw">上午</span></center> -->
                                                <center class="swxw">
                                                    <input type="checkbox" v-model="data.morning" :id="data.inputMon" :value="data.morning">
                                                    <label :for="data.inputMon">上午</label>
                                                </center>
                                    </div>
                                    <div>
                                        <!-- <center><input type="checkbox" v-model="data.afternoon" :id="data.inputAft"
                                                :value="data.afternoon"><span class="swxw">下午</span></center> -->
                                                <center class="swxw">
                                                    <input type="checkbox" v-model="data.afternoon" :id="data.inputAft"  :value="data.afternoon">
                                                    <label :for="data.inputAft">下午</label>
                                                </center>
                                    </div>
                                </div>
                            </template>
                        </el-calendar>
                    </div>

                    <div class="form-group clearfix">
                        <div class="col-md-12" style="padding-right:0;">
                            <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:.7%;"
                                data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
                            <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;"
                                data-toggle="modal" v-on:click="addOrder()">确认</button>
							<button type="button" class="btn btn-success pull-right m_r_10" style="margin-right:1.5%;"
							    data-toggle="modal" v-on:click="setCheckBox(1)">全选</button>
								<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;"
								    data-toggle="modal" v-on:click="setCheckBox(0)">取消</button>
                        </div>
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
            };
        },
        methods: {
            //feedback employee information
            counlorEmpChange: function(param) {
                if (this.isBlank(param)) {
                    this.empId = "";
                } else {
                    this.empId = param.empId;
                    for (var i = 0; i < this.dateList.length; i++) {
                        this.dateList[i].empId = param.empId;
                    }
                }
            },
			setCheckBox:function(param){
				console.log('1')
				if(param==1){
					$("input[type='checkbox']").prop("checked","checked");
				}else{
					$("input[type='checkbox']").attr("checked",false);
				}
			},
            //the event of addtional button
            addOrder() {
                if (this.isBlank(this.empId)) {
                    alert("咨询师不能为空");
                    return
                }
                this.dateList = []
                var startDate = moment(this.curDate).startOf('month')
                var endDate = moment(this.curDate).endOf('month')
                for (var i = 1; i <= endDate.get('date'); i++) {
                    var inputMon = $("#inputMon_" + i).is(":checked");
                    var inputAft = $("#inputAft_" + i).is(":checked");
                    var obj = {
                        empId: this.empId,
                        morning: inputMon ? 1 : 0,
                        afternoon: inputAft ? 1 : 0,
                        operatorId: this.accountId(),
                        createDate: '',
                        schedulingDate: i - 1 == 0 ? startDate.format("YYYY-MM-DD") : startDate.add(1, 'days').format(
                            "YYYY-MM-DD")
                    };
                    this.dateList.push(obj)
                }
                var url = this.url + '/schedulingAction/addSched';
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: this.dateList,
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
                data.empId = ""
                data.morning = true
                data.afternoon = true
                data.operatorId = this.accountId()
                data.schedulingDate = data.day
                data.i = this.retArrIndex(data)
                var day = this.dateStrParseInt(data);
                data.inputMon = 'inputMon_' + day
                data.inputAft = 'inputAft_' + day
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

    .case input:checked+label {
        box-sizing: border-box;
        border: #F2AD4E solid 1px;
        background: #FFF5EA;
        color: #d47b00;
    }

    .case input:checked+label:after {
        position: absolute;
        right: -15px;
        top: -15px;
        ;
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
