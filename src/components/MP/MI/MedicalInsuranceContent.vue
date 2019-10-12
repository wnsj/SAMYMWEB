<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4>{{title}}类型</h4>
		</div>
		<div class="modal-body clearfix">
			<div class="col-md-10 col-md-offset-1">
				<div class="form-group">
					<div class="col-md-3 texr" style="line-height: 34px;">
						<label>类型名称：</label>
					</div>
					<div class="col-md-9" style="line-height: 34px;">
						<input class="form-control" type="text" name="" placeholder="类型名称" v-model="objName" />
					</div>
				</div>
			</div>
			<div class="col-md-10 col-md-offset-1">
				<div class="form-group">
					<div class="col-md-3 texr" style="line-height: 34px;">
						<label>是否启用：</label>
					</div>
					<div class="col-md-3" style="padding: 0; line-height: 34px;">
						<input type="checkbox" v-model="isUse" v-on:change="isSelectedAction(isUse)"/>是
					</div>
					<div class="col-md-3" style="padding: 0; line-height: 34px;">
						<input type="checkbox" v-model="notUse" v-on:change="notSelectedAction(notUse)"/>否
					</div>
				</div>	
			</div>
		</div>
		<div class="modal-footer">
			<button class="btn btn-primary" v-on:click="addObj()">确认</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				objName:'',
				objRemark:'',
				objId:'',
				type:'',
				isUse:false,
				notUse:false,
				title:'新增',
			};
		},
		methods: {
			// Initialization obj’s content
			initData(param,obj) {
				if(param=='add'){
					console.log('Initialization obj’s content, which adds obj')
					this.objName=''
					this.type='add'
					this.title='新增'
					this.isUse=true
					this.notUse=false
				}else if(param=='modify'){
					console.log('Initialization obj’s content, which modifies obj')
					this.type='modify'
					this.title='修改'
					this.objName=obj.mitypename
					this.objId=obj.mitypeid
					if(obj.isuse=='1'){
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
			addObj(){
				console.log('the event of addtional button')
				if(this.isBlank(this.objName)){
					alert('添加的科室的名字不能为空')
					return
				}
				if(this.type=='add'){
					var url = this.url + '/medicinsurtypeAction/addMedicinsurtype'
				}else if(this.type=='modify'){
					var url = this.url + '/medicinsurtypeAction/updateMedicinsurtype'
				}
				var is
				if(this.isUse==true){
					is='1'
				}else{
					is='0'
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						mitypeid:this.objId,
						mitypename:this.objName,
						isuse:is,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('addObj')
					}else if(res.retCode == '9999'){
						alert(res.retMsg)
					}
				
				}).catch((error) => {
					console.log('社保类型请求处理失败')
				});
			}
		},
	}
</script>

<style>

</style>
