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
                <!-- 验证 -->
                <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-3 control-label text-right nopad end-aline">初访时间</label><span
                    class="sign-left">:</span>
                    <div class="col-md-8 addflex">
                        <input type="text" class="form-control" v-model="orderClick.phone" placeholder="">
                    </div>  
                    <span class="sign-left">K</span>              
                </div>
                <!-- 问卷 单选 -->
                <div class="col-md-12  clearfix jh-ad-0">
                    <input style="display:none;"  type="radio" name="choose" value=""> 是否填写现场调研问卷 
                　　　　 <input type="radio" name="choose" value="1">  是
                　　　　 <input type="radio" name="choose" value="0"> 否 <br/>
                    <input style="display:none;" type="radio" name="one" value=""> 是否有过自杀、自伤、攻击暴力冲动、幻视、幻听等类似情况
                　　　　 <input type="radio" name="one" value="1">  是
                　　　　 <input type="radio" name="one" value="0"> 否 <br/>
                    <input style="display:none;"  type="radio" name="two" value=""> 是否有过抑郁、焦虑、暴躁、长期情绪不稳等类似情况
                　　　　 <input type="radio" name="two" value="1">  是
                　　　　 <input type="radio" name="two" value="0"> 否 <br/>
                    <input style="display:none;"  type="radio" name="three" value=""> 是否有家族精神病史
                　　　　 <input type="radio" name="three" value="1">  是
                　　　　 <input type="radio" name="three" value="0"> 否 <br/>
                    <input style="display:none;" type="radio" name="four" value=""> 是否有服用过精神药物或前往精神科/心理科就诊
                　　　　 <input type="radio" name="four" value="1">  是
                　　　　 <input type="radio" name="four" value="0"> 否 <br/>
                    <textarea name="textarea" cols="80" rows="3"></textarea><br/>
                    <input style="display:none;" type="radio" name="five" value="">是否愿意接受满意度回访
                　　　　 <input type="radio" name="five" value="1">  是
                　　　　 <input type="radio" name="five" value="0"> 否 <br/>
                    <!-- 多选 -->
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <label class="col-md-3 control-label text-right nopad end-aline">可回访时间</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <select multip class="form-control" v-model="orderClick.phone">
                                <option value="">未选择（可多选）</option>
                                <option value="1">9-12点</option>
                                <option value="2">12-14点</option>
                                <option value="3">14-18点</option>
                                <option value="3">18-20点</option>
                            </select>
                        </div>                        
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-3 control-label text-right nopad end-aline">婚姻状况</label><span
                    class="sign-left">:</span>
                    <div class="col-md-8">
                        <select class="form-control" v-model="orderClick.channel">
                            <option value="1">客服一</option>
                            <option value="2">客服二</option>
                        </select>
                        <input type="text">
                    </div>
                </div>
                <div class="col-md-12  clearfix jh-ad-0">
                    <span>疾病史【疾病名称、程度、身体健康状况】</span><br/>
                    <textarea name="textarea" cols="80" rows="3"></textarea><br/>
                </div>
                <div class="col-md-12  clearfix jh-ad-0">
                    <span>过敏史</span><br/>
                    <textarea name="textarea" cols="80" rows="3"></textarea><br/>
                </div>
                <!-- <div class="col-md-12  clearfix jh-ad-0">
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-3 control-label text-right nopad end-aline">结课时间</label><span
                    class="sign-left">:</span>
                    <div class="col-md-8">
                        <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" >
                    </div>
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-3 control-label text-right nopad end-aline">节课原因</label><span
                    class="sign-left">:</span>
                    <div class="col-md-8">
                        <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" >
                    </div>
                </div> -->
                <!-- </div> -->

                <!-- </div> -->

                <div class="col-md-12  clearfix jh-ad-0" id="basic">
                    <div class="col-md-6 form-group clearfix jh-wd-33">
                        <label class="col-md-3 control-label text-right nopad end-aline">消费状态</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="orderClick.channel">
                                <option value="">--未选择--</option>
                                <option value="1">沉睡</option>
                                <option value="2">活跃</option>
                                <option value="3">暂停</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12  clearfix jh-ad-0">
                        <label class="col-md-3 control-label text-right nopad end-aline">家庭成员数量</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" >
                        </div>
                    </div>
                </div>

                

                <!-- 关闭&返回 -->
                <div class="col-md-12 form-group clearfix">
                    <button type="button" class="btn btn-warning pull-right margin-right-15"
                            data-toggle="modal" v-on:click="closeCurrentPage()">返回
                    </button>
                    <button type="button" :disabled="isDisable" class="btn btn-primary pull-right margin-right-15"
                            data-toggle="modal" v-on:click="addInformation()">确认
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import multip from '../../../assets/js/selectMultip'
    import dPicker from 'vue2-datepicker'
    import emp from '../../common/Employee.vue'
    import project from '../../common/Project.vue'
    import CounseRoom from '../../common/CounseRoom.vue'
export default{
    components: {
        dPicker,
        emp,
        project,
        CounseRoom
    },
    data() {
        return {
            isDisable: false,
            orderClick:{
                channel:'',
                phone:''
            }
        }
    },
    methods: {
        initData(flag,param) {
			$('#addInformation').modal({backdrop: 'static', keyboard: false});
            console.log(param)
        },
        // 消费状态
        proStyleChange() {
            this.$refs.project.setProStyle(this.consume.proStyle, 1, this.consume.counselor)
            this.$refs.project.setProject("0")
            this.consume.price = 0
            this.consume.actualCount = 0
            this.consume.discount = 0
            this.consume.receivable = 0
            this.consume.realCross = 0
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