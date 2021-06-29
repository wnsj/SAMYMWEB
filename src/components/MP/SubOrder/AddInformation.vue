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
                <div class="col-md-6 form-group clearfix jh-wd-33">
                    <b>*</b>
                    <label class="col-md-3 control-label text-right nopad end-aline">初访时间</label><span
                    class="sign-left">:</span>
                    <div class="col-md-8 addflex">
                        <input type="text" class="form-control" v-model="orderClick.phone" placeholder="">
                    </div>  
                    <span class="sign-left">K</span>              
                </div>
                <!-- 问卷 单选 -->
                <div class="col-md-12 clearfix jh-ad-0 choosebox ">
                    <input style="display:none;"  type="radio" name="choose" value=""> 是否填写现场调研问卷 
                　　　　 <input type="radio" name="choose" value="1" class="cho1">  是
                　　　　 <input type="radio" name="choose" value="0"> 否 <br/>
                    <input style="display:none;" type="radio" name="one" value=""> 是否有过自杀、自伤、攻击暴力冲动、幻视、幻听等类似情况
                　　　　 <input type="radio" name="one" value="1" class="cho2">  是
                　　　　 <input type="radio" name="one" value="0"> 否 <br/>
                    <input style="display:none;"  type="radio" name="two" value=""> 是否有过抑郁、焦虑、暴躁、长期情绪不稳等类似情况
                　　　　 <input type="radio" name="two" value="1" class="cho3">  是
                　　　　 <input type="radio" name="two" value="0"> 否 <br/>
                    <input style="display:none;"  type="radio" name="three" value=""> 是否有家族精神病史
                　　　　 <input type="radio" name="three" value="1" class="cho4">  是
                　　　　 <input type="radio" name="three" value="0"> 否 <br/>
                    <input style="display:none;" type="radio" name="four" value=""> 是否有服用过精神药物或前往精神科/心理科就诊
                　　　　 <input type="radio" name="four" value="1" class="cho5">  是
                　　　　 <input type="radio" name="four" value="0"> 否 <br/>
                    <textarea name="textarea" class="text" cols="105" rows="2" placeholder="备注：就诊机构和就诊时间、服用药品"></textarea><br/>
                    <input style="display:none;" type="radio" name="five" value=""> 是否曾在其它心理咨询机构进行过心理咨询
                　　　　 <input type="radio" name="five" value="1" class="cho6">  是
                　　　　 <input type="radio" name="five" value="0"> 否 <br/>
                        <textarea name="textarea" cols="105" rows="2" placeholder="备注：机构、时间、次数、效果等"></textarea><br/>
                    <input style="display:none;" type="radio" name="six" value="">是否愿意接受满意度回访
                　　　　 <input type="radio" name="six" value="1" class="cho7">  是
                　　　　 <input type="radio" name="six" value="0"> 否 <br/>
                    <!-- 多选 -->
                    <div class="checkbox1">
                        <label class="col-md-1 control-label text-right nopad end-aline">可回访时间</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8 timeselect">
                            <select multip class="form-control" v-model="orderClick.phone">
                                <option choose value="">未选择（可多选）</option>
                                <option value="1">9-12点</option>
                                <option value="2">12-14点</option>
                                <option value="3">14-18点</option>
                                <option value="3">18-20点</option>
                            </select>
                        </div>                        
                    </div>
                    <div class="checkbox1">
                        <label class="col-md-2 control-label text-right nopad end-aline">是否添加售后客服微信</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8 timeselect">
                            <select  class="form-control" v-model="orderClick.channel">
                                <option choose value="客服一">客服一</option>
                                <option value="客服二">客服二</option>
                            </select>
                        </div>
                        <input class="inputWechat" v-model="orderClick.channel">
                    </div>
                    <div class="col-md-12  clearfix jh-ad-0">
                        <span>疾病史【疾病名称、程度、身体健康状况】</span><br/>
                        <textarea name="textarea" cols="105" rows="2" ></textarea><br/>
                    </div>
                    <div class="col-md-12  clearfix jh-ad-0">
                        <span>过敏史</span><br/>
                        <textarea name="textarea" cols="105" rows="2"></textarea><br/>
                    </div>
                </div>
                <!-- 课程详情 -->
                <div v-for='(item,index) in itemcount' :key="index" 
                class="col-md-12 clearfix jh-ad-0 choosebox1">
                    <div class="top">
                        <div>结课时间:&nbsp;&nbsp;&nbsp;
                            <input v-model="time">
                        </div>
                        <p>
                            填写人:789{{reason}}
                        </p>
                    </div>
                    <div id="div" class="top">
                        节课原因:
                        <textarea name="textarea" cols="90" rows="2" ></textarea><br/>
                    </div>
                    <!-- <button>新增结课信息</button> -->
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
            orderClick:{
                channel:'',
                phone:'' ,
            },
            reduce:[], //课程详情
            time:'',
            reason:'',

        }
    },
    methods: {
        multip:function(){
        },
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

    }
   
}
</script>

<style  scoped>
    @import url("../../../assets/css/Custom.css");
</style>