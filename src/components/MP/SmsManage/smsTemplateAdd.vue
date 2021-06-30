<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">{{title}}模板</h4>
        </div>
        <div class="modal-body pos_r">
            <div class="col-md-12 form-group">
                <b>*</b>
                <label for="cyname" class="col-md-2 control-label text-right nopad end-aline temLeft" >模板名称</label><span class="sign-left">:</span>
                <div class="col-md-10 temRight">
                    <input type="text" class="form-control" v-model="form.temName" placeholder="请输入模板名称" maxlength="15">
                </div>
            </div>
            <div class="col-md-12 form-group">
                <b>*</b>
                <label for="cyname" class="col-md-2 control-label text-right nopad end-aline temLeft">短信内容</label><span class="sign-left">:</span>
                <div class="col-md-10 temRight">
                    <textarea class="form-control" v-model="form.temCon" rows="3" placeholder="请输入短信内容" maxlength="70"></textarea>
                </div>
            </div>
            <div class="col-md-12 form-group">
                <b>*</b>
                <label for="cyname" class="col-md-2 control-label text-right nopad end-aline temLeft" >使用状态</label><span class="sign-left">:</span>
                <div class="col-md-5">
                    <select class="form-control" v-model="form.state">
                            <option value="1">在用</option>
                            <option value="0">停用</option>
                        </select>
                </div>
            </div>
        </div>
        <div class="col-md-12form-group clearfix">
            <button type="button" :disabled="isDisable" class="btn btn-primary temBtn" data-toggle="modal" v-on:click="addTem()">确认
            </button>
            <button type="button" class="btn btn-warning temBtn" data-toggle="modal" v-on:click="closeCurrentPage()">取消
            </button>
        </div>
    </div>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
                title: '',             // 标题
                form: {
                    id: '',            // 模板ID
                    temName: '',       // 模板名称
                    temCon: '',        // 模板内容
                    state: 1           // 使用状态
                },
                isDisable: false       // 禁用

            }
        },
        methods:{
            initData(flag, param){
                if (flag == 'add') {
					this.title = '新增';

				} else if (flag == 'modify') {
                    this.title = '修改';
                    // console.log(param);
                    this.form.id = param.id;
                    this.form.temName = param.temName;
                    this.form.temCon = param.temCon;
                    this.form.state = param.state;

                }
            },
            closeCurrentPage() {
				$("#templateadd").modal("hide")
				console.log('关闭添加模板界面')
			},
            addTem(){
                if (this.isBlank(this.form.temName)) {
					alert("模板名称不能为空")
					return
				}
				if (this.isBlank(this.form.temCon)) {
					alert("短信内容不能为空")
					return
				}
				// switch(this.title){
				// 	case '新增':
				// 		var url = this.url+''
				// 		break;
				// 	case '修改':
				// 		var url = this.url+''
				// 		break;
				// }

				// this.isDisable = true
                // setTimeout(() => {
                //     this.isDisable = false
                // }, 2000)

				// this.$ajax({
				// 	method: 'POST',
				// 	url: url,
				// 	headers: {
				// 		'Content-Type': this.contentType,
				// 		'Access-Token': this.accessToken
				// 	},
				// 	data: this.form,
				// 	dataType: 'json',
				// }).then((response) => {
				// 	var res = response.data
				// 	console.log(res)
				// 	if (res.retCode == '0000') {
				// 		alert(res.retMsg)
				// 		this.$emit('addTem')
				// 	}else{
				// 		alert(res.retMsg)
				// 	}
				// }).catch((error) => {
				// 	console.log('请求失败')
				// });

            }

        },
		created() {
			
		},
        mounted() {
			
		}
    }
</script>

<style scoped="scoped">
.temLeft{ width: 12%;}
.temRight{ width: 87%; padding-right: 0;}
.temBtn{ margin: 5px 95px 25px; padding: 5px 28px;}

</style>
