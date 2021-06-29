<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">{{title}}模板</h4>
        </div>
        <div class="modal-body pos_r">
        </div>
        <div class="col-md-12form-group clearfix">
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
                title: '',    // 标题

            }
        },
        methods:{
            initData(param){
                if (param == 'add') {
					console.log('Initialization employee’s content, which adds employee')
					this.title = '新增'

				} else if (param == 'modify') {
                    this.title = '修改'

                }
            },
            closeCurrentPage() {
				$("#templateadd").modal("hide")
				console.log('关闭添加模板界面')
			},

        },
		created() {
			
		},
        mounted() {
			
		}
    }
</script>

<style scoped="scoped">

</style>
