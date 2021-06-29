<template>
    <div class="modal-content">
        <div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h2 id="myModalLabel" class="modal-title">补充信息</h2>
        </div>
        <div class="modal-body  pos_r jh-mh-sc">
            <div class="tab-pane fade in active martop" id="basic">
                <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-3 control-label text-right nopad end-aline">消费状态</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <select class="form-control" v-model="orderClick.channel">
                            <option value="">--未选择--</option>
                            <option value="1">沉睡</option>
                            <option value="2">活跃</option>
                            <option value="3">暂停</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-3 control-label text-right nopad end-aline">婚姻状况</label><span
                    class="sign-left">:</span>
                    <div class="col-md-8">
                        <select class="form-control" v-model="orderClick.channel">
                            <option value="">--未选择--</option>
                            <option value="1">已婚</option>
                            <option value="2">未婚</option>
                            <option value="3">离婚</option>
                            <option value="4">再婚</option>
                            <option value="5">恋爱</option>
                            <option value="6">丧偶</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4 form-group clearfix jh-wd-33">
                    <label class="col-md-4 control-label text-right nopad end-aline">家庭成员数量</label><span
                    class="sign-left">:</span>
                    <div class="col-md-6">
                        <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" >
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-3 control-label text-right nopad end-aline">经济评估</label><span
                    class="sign-left">:</span>
                    <div class="col-md-8">
                        <select class="form-control" v-model="orderClick.channel">
                            <option value="1">富足：≥1000万</option>
                            <option value="2">偏富：300-1000万</option>
                            <option value="3">中等：80-300万</option>
                            <option value="4">普通：30-80万</option>
                            <option value="5">较差：15-30万</option>
                            <option value="6">很差：＜15万</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-3 control-label text-right nopad end-aline">到访频率</label><span
                    class="sign-left">:</span>
                    <div class="col-md-8">
                        <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" >
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-7 control-label text-right nopad end-aline">客户单次消费的心理价位</label><span
                    class="sign-left">:</span>
                    <div class="col-md-2 addflex">
                        <input type="text" class="form-control addinput" v-model="orderClick.phone" placeholder=""><span
                        class="sign-left">&nbsp;&nbsp;K</span>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-6 control-label text-right nopad end-aline">心理咨询的认知程度</label><span
                    class="sign-left">:</span>
                    <div class="col-md-5 addflex">
                        <select class="form-control addinput" v-model="orderClick.channel">
                            <option value="">--未选择--</option>
                            <option value="1">低</option>
                            <option value="2">中</option>
                            <option value="3">高</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix">
                    <b>*</b>
                    <label class="col-md-2 control-label text-right nopad end-aline" >初访时间</label><span
                        class="sign-left">:</span>
                    <div class="col-md-5">
                        <dPicker v-model="timeStart" format="YYYY-MM-DD" class="wd100" v-on:change="firstVisit()"></dPicker>
                    </div>
                </div>
                <!-- 问卷 单选 -->
                <div class="col-md-12 clearfix jh-ad-0 choosebox ">
                    <div class="question"> 是否填写现场调研问卷 </div>
                    <div class="radio cho1">
                        <input type="radio" id="1" name="one">
                        <label for="1"></label> 是
                    </div>
                    <div class="radio">
                        <input type="radio" id="2" name="one">
                        <label for="2"></label> 否
                    </div><br/>
                    <div class="question"> 是否有过自杀、自伤、攻击暴力冲动、幻视、幻听等类似情况 </div>
                    <div class="radio cho2">
                        <input type="radio" id="3" name="two">
                        <label for="3"></label> 是
                    </div>
                    <div class="radio">
                        <input type="radio" id="4" name="two">
                        <label for="4"></label> 否
                    </div><br/>
                    <div class="question"> 是否有过抑郁、焦虑、暴躁、长期情绪不稳等类似情况 </div>
                    <div class="radio cho3">
                        <input type="radio" id="5" name="three">
                        <label for="5"></label> 是
                    </div>
                    <div class="radio">
                        <input type="radio" id="6" name="three">
                        <label for="6"></label> 否
                    </div><br/>
                    <div class="question"> 是否有家族精神病史 </div>
                    <div class="radio cho4">
                        <input type="radio" id="7" name="four">
                        <label for="7"></label> 是
                    </div>
                    <div class="radio">
                        <input type="radio" id="8" name="four">
                        <label for="8"></label> 否
                    </div><br/>
                    <div class="question"> 是否有服用过精神药物或前往精神科/心理科就诊 </div>
                    <div class="radio cho5">
                        <input type="radio" id="9" name="five">
                        <label for="9"></label> 是
                    </div>
                    <div class="radio">
                        <input type="radio" id="10" name="five">
                        <label for="10"></label> 否
                    </div><br/>
                    <textarea class="form-control" placeholder="备注：就诊机构和就诊时间、服用药品" v-model="time"></textarea>
                    <div class="question"> 是否曾在其它心理咨询机构进行过心理咨询 </div>
                    <div class="radio cho6">
                        <input type="radio" id="11" name="six">
                        <label for="11"></label> 是
                    </div>
                    <div class="radio">
                        <input type="radio" id="12" name="six">
                        <label for="12"></label> 否
                    </div><br/>
                    <textarea class="form-control" placeholder="备注：机构、时间、次数、效果等" v-model="time"></textarea>
                    <div class="question"> 是否愿意接受满意度回访 </div>
                    <div class="radio cho7">
                        <input type="radio" id="13" name="seven">
                        <label for="13"></label> 是
                    </div>
                    <div class="radio">
                        <input type="radio" id="14" name="seven">
                        <label for="14"></label> 否
                    </div><br/>
                    <!-- 多选 -->
                    <div>
                        <span class="demonstration">可回访时间：</span>
                        <el-select v-model="timeselect" multiple placeholder="请选择">
                            <el-option
                            v-for="item in select"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="checkbox1">
                        <span class="demonstration">是否添加售后客服微信：</span>
                        <el-select v-model="value1" multiple placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <!-- <el-input class="inputWechat" disabled v-model="value1"></el-input> -->
                        <input type="text" disabled class="inputWechat" v-model="value1">
                    </div>
                    <div class="col-md-12  clearfix jh-ad-0">
                        <span>疾病史【疾病名称、程度、身体健康状况】</span><br/>
                        <textarea class="form-control" v-model="time"></textarea>
                    </div>
                    <div class="col-md-12  clearfix jh-ad-0">
                        <span>过敏史</span><br/>
                        <textarea class="form-control" v-model="time"></textarea><br/>
                    </div>
                </div>
                <!-- 课程详情 -->
                <div v-for='(item,index) in itemcount' :key="index" 
                class="col-md-10 clearfix jh-ad-0 choosebox1">
                    <div class="classtop">
                       <div class="classtop">
                            结课时间:&nbsp;
                            <dPicker v-model="timeStart" format="YYYY-MM-DD" ></dPicker>
                       </div>
                        <p >
                            填写人:789{{reason}}
                        </p>
                    </div>
                    <div  class="classtop reasons">
                        节课原因:
                        <textarea class="form-control reason" name="textarea" cols="80" rows="2" ></textarea><br/>
                    </div>
                    <button id="btn" type="button" :disabled="isDisable" class="btn btn-primary pull-right margin-right-15 station"
                            data-toggle="modal" v-on:click="addForm()">新增结课信息
                    </button>
                </div>
            </div>
            <!-- 关闭&返回 -->
            <div class="col-md-12 form-group clearfix">
				<button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-1" data-toggle="modal" v-on:click="closeCurrentPage()">返回
				</button>
				<button type="button" :disabled="isDisable" class="btn btn-primary pull-right m_r_10 jh-mr-1" :style="{disabled:succ?'':'disabled'}"
				 data-toggle="modal" v-on:click="addInformation()">确认
				</button>
			</div>
        </div>
    </div>
</template>
<script>
    import dPicker from 'vue2-datepicker'
    import emp from '../../common/Employee.vue'
    import CounseRoom from '../../common/CounseRoom.vue'
export default{
    components: {
        dPicker,
        emp,
        CounseRoom,
    },
    data() {
        return {
			succ: false,
            isDisable: false,
            itemcount:1,
            orderClick:{ //自定义表单绑定数据
                channel:'',
                phone:'' ,
            },
            timeStart:'', //时间选择器
            timeselect:[], // 回访时间
            value1: [], //微信多选绑定值
            time:'',  //结课时间
            reason:'', //节课原因
            options: [{   //微信绑定值
            value: '客服一',
            label: '客服一'
            }, {
            value: '客服二',
            label: '客服二'
            }],
            select: [{   //回访时间绑定值
            value: '1',
            label: '9-12点'
            }, {
            value: '2',
            label: '12-14点'
            }, {
            value: '3',
            label: '14-18点'
            }, {
            value: '4',
            label: '18-20点'
            }
            ],
            
            }
    },
    methods: {
        initData(flag,param) {
			$('#addInformation').modal({backdrop: 'static', keyboard: false});
            console.log(param)
        },
        // 点击新增课程
        addForm() {
            console.log(this.itemcount);
            this.itemcount +=1;
        }, 
        // 确认按钮
        addInformation() {

        },
        // 关闭弹窗
        closeCurrentPage() {
            this.$emit('closeCurrentPage')
        },
        // 初访
        firstVisit() {

        },

    }
   
}
</script>

<style  scoped>
    @import url("../../../assets/css/Custom.css");
</style>