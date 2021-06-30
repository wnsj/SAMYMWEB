<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">选择模板</h4>
        </div>
        <div class="modal-body pos_r">
            <el-table :data="tableData" border @selection-change="handleSelectionChange" ref="tb" @select-all="onSelectAll">
                <el-table-column type="selection" width="40px" label="选择"></el-table-column>
                <el-table-column prop="temName" label="模板名称" align="center" min-width="140"></el-table-column>
                <el-table-column prop="temCon" label="模板内容" align="center" min-width="520"></el-table-column>
            </el-table>
        </div>
        <div class="col-md-12form-group clearfix">
            <button type="button" :disabled="isDisable" class="btn btn-primary margin-right-tem35" data-toggle="modal" v-on:click="addTem()">确认
            </button>
            <button type="button" class="btn btn-warning margin-right-tem35" data-toggle="modal" v-on:click="closeCurrentPage()">取消
            </button>
        </div>
        <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">返回</button>
            <button type="button" class="btn btn-primary">确定</button>
        </div> -->
    </div>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
                tableData:[
                    {
                        id: 1,
                        temName: '售后模板',
                        temCon: '{姓名}您好，我们非常关注您的到店感受，将向您进行满意度回访，会于{时间}使用专线号码：{电话}与您联系，希望能够得到您的宝贵意见和建议'
                    },
                    {
                        id: 2,
                        temName: '回访模板',
                        temCon: '{姓名}您好，我们非常重视您参与沙龙活动的感受，将于{时间}使用专线号码：{电话}与您联系，希望能够了解到我们做出哪些改进会给您带来更好的服务感受。'
                    }
                ],
                chek: [],             // 单选
				isDisable: false

            }
        },
        methods:{
            initData(){
                // this.chek = [];         // 清空选中信息
            },
            closeCurrentPage() {
				this.$emit('getTemDetail')
			},
             handleSelectionChange(val){
                if(val.length > 1){
                    this.$refs.tb.clearSelection()
                    this.$refs.tb.toggleRowSelection(val.pop())
                }else{
                    this.chek = val;
                }  
            },
            onSelectAll () {
                this.$refs.tb.clearSelection()
            },
            addTem(){
                this.isDisable = true
                setTimeout(() => {
                    this.isDisable = false
				}, 2000)
                // 选中模板信息传至父组件
                this.$emit('getTemDetail',this.chek);
                
            },

        },
		created() {
			
		},
        mounted() {
			
		}
    }
</script>

<style scoped="scoped">
.margin-right-tem35{ margin: 5px 90px 20px; padding: 5px 28px;}
</style>
