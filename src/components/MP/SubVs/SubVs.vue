<!-- add and modify store -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}来访状态</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">访问类型</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="obj.vsType">
								<option value="1">初诊</option>
								<option value="2">复诊</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">状态类型</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="obj.stateType">
								<option value="1">咨客判定</option>
								<option value="2">续流状态</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">状态名称</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="obj.vsName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="erpzh" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">是否停用</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="obj.isUse">
								<option value="1">在用</option>
								<option value="0">停用</option>
							</select>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-45" data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
						<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-1" data-toggle="modal" v-on:click="certainAction()">确认</button>	
					</div>
				</form>
			</div>
	
		</div>
		
	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	export default {
		components:{
			dPicker,
		},
		data() {
			return {
				obj:{
					vsId:'',
					stateType:'1',
					vsType:'1',
					vsName:'',
					isUse:'1',
				},
				title:'',
			};
		},
		methods:{
			// Initialization store’s content
			initData(param,objContent) {
				if(param=='add'){
					console.log('Initialization store’s content, which adds store')
					
					this.title='新增'
					
					this.obj={
						vsId:'',
						stateType:'1',
						vsType:'1',
						vsName:'',
						isUse:'1',
					}
					
				}else if(param=='modify'){
					console.log('Initialization store’s content, which modifies store')
					
					this.title='修改'
					Object.assign(this.obj,objContent)
				}
			},
			closeCurrentPage(){
				$("#vsContent").modal("hide")
				console.log('关闭添加患者界面')
			},
			//the event of addtional button
			certainAction(){
			
				if(this.isBlank(this.obj.stateType)){
					alert("状态类型不能为空")
					return
				}
				if(this.isBlank(this.obj.vsType)){
					alert("访问类型不能为空")
					return
				}
				if(this.isBlank(this.obj.vsName)){
					alert("状态名不能为空")
					return
				}
				switch(this.title){
					case '新增':
						var url = this.url + '/visitState/addVisitState';
						break;
					case '修改':
						var url = this.url + '/visitState/updateVisitState'
						break;	
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.obj,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
					}else{
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('添加或者修改状态失败')
				});
			},
			
		}
		
	}
</script>

<style>
	

</style>

