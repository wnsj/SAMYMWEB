<!-- add and modify project -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4>{{title}}项目</h4>
		</div>
		<div class="modal-body clearfix">
			<div class="col-md-10 col-md-offset-1">
				<div class="form-group">
					<div class="col-md-3 texr" style="line-height: 34px;">
						<label for="">项目名称：</label>
					</div>
					<div class="col-md-9">
						<input class="form-control" type="text" name="" placeholder="项目名称" v-model="projectName" />
					</div>
				</div>
			</div>
			<div class="col-md-10 col-md-offset-1">	
				<div class="form-group">
					<div class="col-md-3 texr" style="line-height: 34px;">
						<label>是否启用：</label>
					</div>
					<div class="col-md-3" style="line-height: 34px;">
						<input type="checkbox" style="margin-right:5px;" v-model="isUse" v-on:change="isSelectedAction(isUse)"/>是
					</div>
					<div class="col-md-3" style="line-height: 34px;">
						<input type="checkbox" style="margin-right:5px;" v-model="notUse" v-on:change="notSelectedAction(notUse)"/>否
					</div>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<button class="btn btn-primary" @click="addProject()">确认</button>
		</div>
	</div>


</template>

<script>
	export default {
		data() {
			return {
				projectName:'',
				procjectRemark:'',
				payserviceId:'',
				type:'',
				isUse:true,
				notUse:true,
				title:'新增',
			};
		},
		methods: {
			// Initialization procject’s content
			initData(param,procject) {
				if(param=='add'){
					console.log('Initialization procject’s content, which adds projcet')
					this.projectName=''
					this.type='add'
					this.title='新增'
					this.isUse=true
					this.notUse=false
				}else if(param=='modify'){
					console.log('Initialization procject’s content, which modifies projcet')
					this.type='modify'
					this.title='修改'
					this.projectName=procject.name
					this.payserviceId=procject.payserviceId
					if(procject.isuse=='1'){
						this.isUse=true
						this.notUse=false
					}else{
						this.notUse=true
						this.isUse=false
					}
				}
			},
			//it is enable btn that expressing implication is selecked
			isSelectedAction(param){
				if(this.isUse==true){
					this.notUse=false
				}else if(this.isUse==false){
					this.notUse=true
				}
			},
			//it is enable btn that expressing implication isn't selecked
			notSelectedAction(param){
				if(this.notUse==true){
					this.isUse=false
				}else if(this.notUse==false){
					this.isUse=true
				}
			},
			//the event of addtional button
			addProject(){
				console.log('the event of addtional button')
				if(this.isBlank(this.projectName)){
					alert('添加的项目的名字不能为空')
					return
				}
				if(this.type=='add'){
					var url = this.url + '/payserviceAction/addPayservice'
				}else if(this.type=='modify'){
					var url = this.url + '/payserviceAction/updatePayservice'
				}
				var is
				if(this.isUse==true){
					is='1'
				}else{
					is='0'
				}
				console.log(this.payserviceId)
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						payserviceId:this.payserviceId,
						name:this.projectName,
						isuse:is,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('addProject')
					}else if(res.retCode == '9999'){
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('科室请求处理失败')
				});
			}
		},
	}
</script>

<style>

</style>
