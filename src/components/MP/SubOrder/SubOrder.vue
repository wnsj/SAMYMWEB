<!-- add and modify order -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}预约</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">会员号</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="order.memNum" v-on:change="checkMemNum(order.memNum)">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="order.appName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="order.phone" placeholder="">
						</div>
					</div>
					<!-- <div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">访问类型</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="order.visitType">
								<option value="0">初访</option>
								<option value="1">再访</option>
							</select>
						</div>
					</div> -->
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">预约时间</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<dPicker v-model="order.appDate" v-on:change="dateAction('1')" style="width:100%;"></dPicker>
						</div>	
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">文员</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref="clerkEmp" @employeeChange="clerkEmpChange"></emp>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref="counlorEmp" @employeeChange="counlorEmpChange"></emp>
						</div>
					</div>
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="addOrder(title)">确认</button>
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
				order:{
					memNum:'',
					appName:'',
					phone:'',
					visitType:'0',
					appDate:'',
					empId:'1',//操作人
					createDate:'',
					clerkEmpId:'',
					counlorEmpId:'',
				},
				title:'新增',
				
			};
		},
		methods:{
			// Initialization order’s content
			initData(param,order) {
				if(param=='add'){
					console.log('Initialization order’s content, which adds order')
					this.title='新增'
					this.order={
						memNum:'',
						appName:'',
						phone:'',
						visitType:'0',
						appDate:this.moment('','YYYY-MM-DD HH:mm:ss.000'),
						empId:'1',//操作人
						clerkEmpId:'',//文员
						counlorEmpId:'',//咨询师
					}
					this.$refs.clerkEmp.setPosName('文员')
					this.$refs.counlorEmp.setPosName('咨询师')
				}else if(param=='modify'){
					console.log('Initialization order’s content, which modifies order')
					this.title='修改'
					Object.assign(this.order,order)
					this.$refs.clerkEmp.setPosName('文员')
					this.$refs.counlorEmp.setPosName('咨询师')
					this.$refs.clerkEmp.setPosId(this.order.clerkEmpId)
					this.$refs.counlorEmp.setPosId(this.order.counlorEmpId)
				}
			},
			//date formatting 
			dateAction(param){
				if(param=='1'){
					if(!this.isBlank(this.order.appDate)){
						this.order.appDate=this.moment(this.order.appDate,'YYYY-MM-DD HH:mm:ss.000')
					}else{
						this.order.appDate=''
					}
				}else if(param=='2'){
					if(!this.isBlank(this.order.outHosp)){
						this.order.outHosp=this.moment(this.order.outHosp,'YYYY-MM-DD HH:mm:ss.000')
					}else{
						this.order.outHosp=''
					}
				}
			},
			//feedback employee information
			clerkEmpChange: function(param) {
				// console.log('科室：'+JSON.stringify(param))
				if (this.isBlank(param)) {
					this.consume.empId = ""
				} else {
					this.consume.empId = param.empId
				}
				console.log('费用类型：' + this.consume.costType)
				console.log('员工：' + this.consume.empId)
			},
			//feedback employee information
			counlorEmpChange: function(param) {
				// console.log('科室：'+JSON.stringify(param))
				if (this.isBlank(param)) {
					this.consume.clerkId = ""
				} else {
					this.consume.clerkId = param.empId
				}
				console.log('费用类型：' + this.consume.costType)
				console.log('员工：' + this.consume.clerkId)
			},
			
			//the event of addtional button
			addOrder(param){
				if(this.isBlank(this.order.appName)){
					alert("姓名不能为空")
					return
				}
				if(this.isBlank(this.order.phone)){
					alert("手机号不能为空")
					return
				}
				if(!this.isBlank(this.order.clerkEmpId) || !this.isBlank(this.order.counlorEmpId)){
					alert('文员和咨询师至少选择一个')
					return
				}
				if(!this.isBlank(this.order.appDate)){
					this.order.appDate=this.moment(this.order.appDate,'YYYY-MM-DD HH:mm:ss.000')
				}else{
					alert("预约时间不能为空")
					return
				}
				switch(param){
					case '新增':
						var url = this.url + '/appointmentAction/addAppointment';
						break;
					case '修改':
						var url = this.url + '/appointmentAction/updateAppointment'
						break;	
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.order,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('addOrder')
						$("#orderContent").modal("hide");
					}
				}).catch((error) => {
					console.log('预约提交请求失败')
				});
			},
			closeCurrentPage(){
				$("#orderContent").modal("hide")
				console.log('关闭添加患者界面')
			},
			//Query member's information based on the memNum
			checkMemNum(param) {
				console.log('checkMemNum')
				if (this.isBlank(param)) {
					return
				}
				var url = this.url + '/memberAction/queryMember'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum: param,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						console.log('查到了'+JSON.stringify(res))
						
						this.order.memNum=res.retData[0].memNum
						this.order.appName=res.retData[0].memName
						this.order.phone=res.retData[0].phone
					} else {
						console.log('没有查到会员信息，请添加会员后充值')
						this.consume.appName=''
						this.consume.phone=''
					}
							
				}).catch((error) => {
					console.log('会员查询请求失败')
				});
			},
			
		}
		
	}
</script>

<style>

</style>

