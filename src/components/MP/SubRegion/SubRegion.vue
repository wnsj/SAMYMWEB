<!-- add and modify store -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}区域</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">区域名称</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="obj.reName" placeholder="">
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
						<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="certainAction()">确认</button>	
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
					reId:'',
					reLevel:'3', //级别 1国家2省份3区域
					paId:'2',	//父级ID 2天津
					reName:'',
				},
				title:'',
			};
		},
		methods:{
			// Initialization store’s content
			initData(param,objContent) {
				if(param=='add'){
					//console.log('Initialization store’s content, which adds store')
					
					this.title='新增'
					
					this.obj={
						reId:'',
						reLevel:'3', //级别 1国家2省份3区域
						paId:'2',	//父级ID 2天津
						reName:'',
					}
					
				}else if(param=='modify'){
					//console.log('Initialization store’s content, which modifies store')
					
					this.title='修改'
					Object.assign(this.obj,objContent)
				}
			},
			closeCurrentPage(){
				$("#subRegionContent").modal("hide")
				//console.log('关闭添加患者界面')
			},
			//the event of addtional button
			certainAction(){
				if(this.isBlank(this.obj.reName)){
					alert("区域名不能为空")
					return
				}
				switch(this.title){
					case '新增':
						var url = this.url + '/regionBean/addRegion';
						break;
					case '修改':
						var url = this.url + '/regionBean/updateRegion'
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
					//console.log('添加或者修改状态失败')
				});
			},
			
		}
		
	}
</script>

<style>
	

</style>

