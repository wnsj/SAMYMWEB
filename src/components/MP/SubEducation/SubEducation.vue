<!-- add and modify store -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}学历</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">

					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">学历名称</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="obj.eduName" placeholder="">
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
						 v-on:click="closeCurrentPage()">返回</button>
						<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
						 v-on:click="certainAction()">确认</button>
					</div>
				</form>
			</div>

		</div>

	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	export default {
		components: {
			dPicker,
		},
		data() {
			return {
				obj: {
					eduId: '',
					eduName: '',
				},
				title: '',
			};
		},
		methods: {
			// Initialization store’s content
			initData(param, objContent) {
				if (param == 'add') {
					//console.log('Initialization store’s content, which adds store')

					this.title = '新增'

					this.obj = {
						eduId: '',
						eduName: '',
					}

				} else if (param == 'modify') {
					//console.log('Initialization store’s content, which modifies store')

					this.title = '修改'
					Object.assign(this.obj, objContent)
				}
			},
			closeCurrentPage() {
				$("#subEducationContent").modal("hide")
			},
			//the event of addtional button
			certainAction() {

				if (this.isBlank(this.obj.eduName)) {
					alert("状态名不能为空")
					return
				}
				switch (this.title) {
					case '新增':
						var url = this.url + '/education/addEducation';
						break;
					case '修改':
						var url = this.url + '/education/updateEducation'
						break;
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.obj,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					//console.log('添加或者修改状态失败')
				});
			},

		}

	}
</script>

<style>


</style>
