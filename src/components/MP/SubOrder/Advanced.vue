<template>
    <div class="modal-content" >
        <div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">高级查询</h4>
		</div>
        <div class="modal-body  pos_r jh-mh-sc">
            <div class="tab-pane fade in active martop" id="basic">
                <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-3 control-label text-right nopad end-aline">消费状态</label><span
                    class="sign-left">:</span>
                    <div class="col-md-8">
                        <select class="form-control" v-model="orderClick.channel">
                            <option value="">未选择</option>
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
                            <option value="">未选择</option>
                            <option value="1">已婚</option>
                            <option value="2">未婚</option>
                            <!-- <option value="3">离婚</option>
                            <option value="4">再婚</option>
                            <option value="5">恋爱</option>
                            <option value="6">丧偶</option> -->
                        </select>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-6 control-label text-right nopad end-aline">心理咨询的认知程度</label><span
                    class="sign-left">:</span>
                    <div class="col-md-5 addflex">
                        <select class="form-control addinput" v-model="orderClick.channel">
                            <option value="">未选择</option>
                            <option value="1">低</option>
                            <option value="2">中</option>
                            <option value="3">高</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix jh-wd-33">
                    <label class="col-md-3 control-label text-right nopad end-aline">到访频率</label><span
                    class="sign-left">:</span>
                    <div class="col-md-3">
                        <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" >
                    </div>
                    <span
                        class="sign-left">~</span>
                    <div class="col-md-3">
                        <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" >
                    </div>
                </div>
                
                <div class="col-md-4 form-group clearfix jh-wd-33 titleinput2">
                    <label class="col-md-4 control-label text-right nopad end-aline">家庭成员数量</label><span
                    class="sign-left">:</span>
                    <div class="col-md-3">
                        <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" >
                    </div>
                    <span
                        class="sign-left">~</span>
                    <div class="col-md-3">
                        <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" >
                    </div>
                </div>
                <div class="col-md-6 form-group clearfix jh-wd-33 titleinput">
                    <label class="col-md-7 control-label text-right nopad end-aline ">客户单次消费的心理价位</label><span
                    class="sign-left">:</span>
                    <div class="col-md-3">
                        <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" >
                    </div>
                    <span
                        class="sign-left">~</span>
                    <div class="col-md-3">
                        <input type="text" class="form-control" v-model="orderClick.phone" placeholder="" >
                    </div>
                    <span class="sign-left">K</span>
                </div>
                <!-- 问卷 单选 -->
                <div class="col-md-12 clearfix jh-ad-0 chooseboxs">
                    <div class="choicesbox"> 是否有过自杀、自伤、攻击暴力冲动、幻视、幻听等类似情况 
                        <select  class="form-control choices cho2" v-model="orderClick.channel">
                            <option value="">未选择</option>
                            <option value="1">是</option>
                            <option value="2">否</option>
                        </select>
                    </div>
                    <div class="choicesbox"> 是否有过抑郁、焦虑、暴躁、长期情绪不稳等类似情况 
                        <select  class="form-control choices cho3" v-model="orderClick.channel">
                            <option value="">未选择</option>
                            <option value="1">是</option>
                            <option value="2">否</option>
                        </select>
                    </div>
                    
                    <div class="choicesbox"> 是否有家族精神病史 
                        <select  class="form-control choices cho4" v-model="orderClick.channel">
                            <option value="">未选择</option>
                            <option value="1">是</option>
                            <option value="2">否</option>
                        </select>
                    </div>
                    
                    <div class="choicesbox"> 是否有服用过精神药物或前往精神科/心理科就诊 
                        <select  class="form-control choices cho5" v-model="orderClick.channel">
                            <option value="">未选择</option>
                            <option value="1">是</option>
                            <option value="2">否</option>
                        </select>
                    </div>
                    
                    <div class="choicesbox"> 是否曾在其它心理咨询机构进行过心理咨询 
                        <select  class="form-control choices cho6" v-model="orderClick.channel">
                            <option value="">未选择</option>
                            <option value="1">是</option>
                            <option value="2">否</option>
                        </select>
                    </div>
                    
                    <div class="question"> 是否愿意接受满意度回访 
                        <select  class="form-control sumsele" v-model="orderClick.channel">
                            <option value="">未选择</option>
                            <option value="1">是</option>
                            <option value="2">否</option>
                        </select>
                    </div>
                    <div class="question">是否添加售后客服微信
                        <select  class="form-control sumsele" v-model="orderClick.channel">
                            <option value="">未选择</option>
                            <option value="1">是</option>
                            <option value="2">否</option>
                        </select>
                    </div>
                </div>
               
            </div>
            <!-- 关闭&返回 -->
            <div class="col-md-12 form-group clearfix clearBox">
                <button type="button" :disabled="isDisable" class="btn btn-primary pull-right m_r_10 jh-mr-1" :style="{disabled:succ?'':'disabled'}"
				 data-toggle="modal" v-on:click="certainAction()">搜索
				</button>
				<button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-1" data-toggle="modal" v-on:click="closeCurrentPage()">取消
				</button>
			</div>
        </div>
    </div>
</template>
<script>
    import dPicker from 'vue2-datepicker'
export default{
    components: {
        dPicker,
    },
    data() {
        return {
			succ: false,
            isDisable: false,
            
            accountName: this.accountName(),
            orderClick:{ //自定义表单绑定数据
                channel:'',
                phone:'' ,
                id:'',
                time:'', //心理咨询
            },
            timeStart:'',
            timeselect:[], // 回访时间
            value1: [], //微信多选绑定值
           
            
            
            }
    },
    methods: {
        initData(flag,param) {
			$('#advancedContent').modal({backdrop: 'static', keyboard: false});
            console.log(param)
        },
        
        // 确认按钮
        certainAction() {
            // if (this.isBlank(this.timeStart)) {
            //     alert("初访时间不能为空")
            //     return
            // }
            // this.idDisable = true
        },
        // 关闭弹窗
        closeCurrentPage() {
            this.$emit('closeCurrentPage')
        },
        // 初访
        firstVisit() {

        },

    },
   
}
</script>

<style  scoped>
    @import url("../../../assets/css/Custom.css");
</style>