<!-- add and modify employee -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">新增权限</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">账户名</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<acc ref="acc" @accountChange="accountChange"></acc>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">账户类型</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="ruleContent.employeeType">
								<option value="0">未选择</option>
								<option value="1">超级管理员</option>
								<option value="2">店铺管理员</option>
								<option value="3">财务管理员</option>
								<option value="4">普通员</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">模块级别</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="ruleContent.moduleGrade">
								<option value="">--未选择--</option>
								<option value="1">第一级模块</option>
								<option value="2">第二级模块</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">模块</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<mod ref="mod" @moduleChange='moduleChange'></mod>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="sex" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">操作类型</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="ruleContent.operateType">
								<option value="0">未选择</option>
								<option value="1">增</option>
								<option value="2">删</option>
								<option value="3">改</option>
								<option value="4">查</option>
							</select>
						</div>
					</div>
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="addRule()">确认</button>
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="closeCurrentPage()">返回</button>
						</div>
					</div>

				</form>
			</div>

		</div>

	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import pos from '../../common/Position.vue'
	import emp from '../../common/Employee.vue'
	import store from '../../common/Store.vue'
	import acc from '../../common/Account.vue'
	import mod from '../../common/Model.vue'
	export default {
		components: {
			dPicker,
			pos,
			emp,
			store,
			acc,
			mod,
		},
		data() {
			return {
				ruleContent: {
					employeeType: '0',
					modelGrade:'',
					moduleId:'',
					accountId:'',
					operateType:'0',
				},
				title: '新增',
			};
		},
		methods: {
			// Initialization employee’s content
			initData(param, ruleContent) {
				this.title = '新增'
				
				this.ruleContent = {
					employeeType: '0',
					moduleGrade:'',
					moduleId:'',
					accountId:'',
					operateType:'0',
				}
				this.$refs.pos.setPosId(this.employee.posId)
				this.$refs.emp.setPosId(this.employee.posId)
			},
			
			//feedback department information
			moduleChange: function(param) {
				// console.log(JSON.stringify(param))
				if (this.isBlank(param)) {
					this.ruleContent.moduleId = ""
				} else {
					this.ruleContent.moduleId = param.moduleId
				}
			},
			//feedback employeeStype information
			accountChange: function(param) {
				// console.log(JSON.stringify(param))
				if (this.isBlank(param)) {
					this.ruleContent.accountId = ''
				} else {
					this.ruleContent.accountId = param.accountId
				}
			},
			
			//the event of addtional button
			addRule() {
				if (this.isBlank(this.ruleContent.accountId)) {
					alert("账户不能为空")
					return
				}
				if (this.isBlank(this.ruleContent.moduleGrade)) {
					alert("模块级别不能为空")
					return
				}
				if (this.isBlank(this.ruleContent.moduleId)) {
					alert("模块不能为空")
					return
				}
				var url = this.url + '/ruleAction/addRule';
				 
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.ruleContent,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('addRule')
					}
				}).catch((error) => {
					console.log('员工请求失败')
				});
			},
			closeCurrentPage() {
				$("#rm").modal("hide")
				console.log('关闭添加权限界面')
			},
			
		}

	}
</script>

<style>

</style>
