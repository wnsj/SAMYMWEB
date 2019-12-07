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
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">预约时间</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<dPicker v-model="order.appDate" v-on:change="dateAction('1')" style="width:100%;"></dPicker>
						</div>	
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref="counlorEmp" @employeeChange="counlorEmpChange"></emp>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课程</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref="counlorEmp" @employeeChange="counlorEmpChange"></emp>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<h4 id="myModalLabel" class="modal-title pull-left">预约时间</h4>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">时间</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<dPicker></dPicker>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[5]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="order.time1"  class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[0]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="order.time2" class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[1]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time3" class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[2]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time4" class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[3]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time5"  class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[4]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time6"  class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[6]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time7"  class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[7]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time8"  class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[8]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time9"  class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[9]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time10"  class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[10]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time11"  class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[11]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time12"  class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[12]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time13"  disabled="time13" class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[13]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time14"  class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[14]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time15"  class="form-control">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix" style="padding-left:0;padding-right:0">
							<label class="col-md-8 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">{{timeArray[15]}}</label>
							<div class="col-md-4" style='line-height:34px;'>
								<input type="checkbox" style="margin:0;" v-model="time16"  class="form-control">
							</div>
						</div>
					</div>
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="addOrder(title)">确认</button>
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
				timeArray:[
					'8:30 - 9:00',
					'9:00 - 9:30',
					'9:30 - 10:00',
					'10:00 - 10:30',
					'10:30 - 11:00',
					'11:00 - 11:30',
					'11:30 - 12:00',
					'13:00 - 13:30',
					'13:30 - 14:00',
					'14:00 - 14:30',
					'14:30 - 15:00',
					'15:00 - 15:30',
					'15:30 - 16:00',
					'16:00 - 16:30',
					'16:30 - 17:00',
					'17:00 - 17:30',
				],
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
					operatorId:'',
					time1:false,
					time2:false,
					time3:false,
					time4:false,
					time5:false,
					time6:false,
					time7:false,
					time8:false,
					time9:false,
					time10:false,
					time11:false,
					time12:false,
					time13:false,
					time14:false,
					time15:false,
					time16:false,
				},
				title:'新增',
				testParam:true,
				orderCounselorOld:{},
				orderClick:{},
			};
		},
		methods:{
			// Initialization order’s content
			initData(param,order) {
				Object.assign(this.orderCounselorOld,this.order)
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
						operatorId:this.accountId(),//操作人
					}
					// this.$refs.clerkEmp.setPosName('文员')
					this.$refs.counlorEmp.setPosName('咨询顾问')
					// this.$refs.clerkEmp.setEmp(this.order.clerkEmpId)
					this.$refs.counlorEmp.setEmp(this.order.counlorEmpId)
				}else if(param=='modify'){
					console.log('Initialization order’s content, which modifies order')
					this.title='修改'
					Object.assign(this.order,order)
					this.operatorId = this.accountId()
					// this.$refs.clerkEmp.setPosName('文员')
					this.$refs.counlorEmp.setPosName('咨询顾问')
					// this.$refs.clerkEmp.setEmp(this.order.clerkEmpId)
					this.$refs.counlorEmp.setEmp(this.order.counlorEmpId)
				}
			},
			itemAction(item,index){
				console.log("item:"+JSON.stringify(item)+index)
			},
			setOrder(inex,value){
				
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
					this.order.clerkEmpId = ""
				} else {
					this.order.clerkEmpId = param.empId
				}
				console.log('员工：' + this.order.empId)
			},
			//feedback employee information
			counlorEmpChange: function(param) {
				// console.log('科室：'+JSON.stringify(param))
				if (this.isBlank(param)) {
					this.order.counlorEmpId = ""
				} else {
					this.order.counlorEmpId = param.empId
				}
				console.log('员工：' + this.order.counlorEmpId)
			},
			
			//the event of addtional button
			addOrder(param){
				var reg = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;
				if(this.isBlank(this.order.appName)){
					alert("姓名不能为空")
					return
				}
				if(this.isBlank(this.order.phone)){
					alert("手机号不能为空")
					return
				}else if(reg.test(this.order.phone)==false){
					alert("不是完整的11位手机号或者正确的座机号！");
					return
				}
				
				if(this.isBlank(this.order.counlorEmpId)){
					alert('咨询顾问不能为空')
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

