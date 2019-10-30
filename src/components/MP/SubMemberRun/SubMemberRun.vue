<!-- add and modify FWRoyalty -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}会员</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="FWRoyalty.memName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="FWRoyalty.phone" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="sex" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">性别</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="FWRoyalty.sex">
								<option value="1">男</option>
								<option value="2">女</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">生日</label><span class="sign-left">:</span>
						<dPicker class="col-md-8" style="width:65%;" v-model="FWRoyalty.birthday" v-on:change="dateAction('1')"></dPicker>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否启用</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="FWRoyalty.isuse">
								<option value="1">是</option>
								<option value="0">否</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">推荐人</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref='emp' @employeeChange='empChange'></emp>
						</div>
					</div>
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="certainAction()">确认</button>
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import emp from '../../common/Employee.vue'
	export default {
		components:{
			dPicker,
			emp,
		},
		data() {
			return {
				FWRoyalty:{
					posId:'0',
					flowBig:'0',
					turRoy:'0',
					flowSmall:'0',
					consumeType:'0',
				},
				title:'新增',
			};
		},
		methods:{
			// Initialization FWRoyalty’s content
			initData(param,FWRoyalty) {
				if(param=='add'){
					console.log('Initialization FWRoyalty’s content, which adds FWRoyalty')
					this.title='新增'
					this.FWRoyalty={
						posId:'0',
						flowBig:'0',
						turRoy:'0',
						flowSmall:'0',
						consumeType:'3',
						empId:'0',
					}
					this.$refs.emp.setEmp('0')
				}else if(param=='modify'){
					console.log('Initialization FWRoyalty’s content, which modifies FWRoyalty')
					
					this.title='修改'
					Object.assign(this.FWRoyalty,FWRoyalty)
					console.log(JSON.stringify(this.FWRoyalty))
					this.$refs.emp.setEmp(this.FWRoyalty.empId)
				}
			},
			
			
			
			//feedback employee information
			empChange:function(param){
				if(this.isBlank(param)){
					this.FWRoyalty.empId=""
					this.FWRoyalty.storeId=""
				}else{
					this.FWRoyalty.empId=param.empId
					this.FWRoyalty.storeId=param.storeId
				}
			},
			
			//the event of addtional button
			certainAction(){
				console.log('the event of addtional button')
				
				
				if(this.isBlank(this.FWRoyalty.memName)){
					alert("姓名不能为空")
					return
				}
				if(this.isBlank(this.FWRoyalty.phone)){
					alert("手机号不能为空")
					return
				} 
				
				if(!this.isBlank(this.FWRoyalty.birthday)){
					this.FWRoyalty.birthday=this.moment(this.FWRoyalty.birthday,'YYYY-MM-DD 00:00:00.000')
				}
				var url
				switch(this.title){
					case "新增":
						url = this.url + '/memberAction/addMember'
						break;
					case "修改":
						url = this.url + '/memberAction//updateMember'
						break;
				}
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.FWRoyalty,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
					}
				}).catch((error) => {
					console.log('会员相关操作失败')
				});
			},
			closeCurrentPage(){
				$("#memberContent").modal("hide")
				console.log('close the flowWater rule')
			},
		}
		
	}
</script>

<style>
	.pos-tr{ 
		top:0;
		right:20px; 
		line-height:34px;
		-webkit-user-select:none;
    	-moz-user-select:none;
    	-ms-user-select:none;
    	user-select:none;
	}
</style>