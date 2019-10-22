<!-- add and modify patient -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}员工</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad" style="padding:0;line-height:34px;">姓名：</label>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="employee.empName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad" style="padding:0;line-height:34px;">手机号：</label>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="employee.name" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad" style="padding:0;line-height:34px;">年龄：</label>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="employee.age" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="sex" class="col-md-4 control-label text-right nopad" style="padding:0;line-height:34px;">性　别：</label>
						<div class="col-md-8">
							<select class="form-control" v-model="employee.sex">
								<option value="1">男</option>
								<option value="2">女</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="gh" class="col-md-4 control-label text-right nopad" style="padding:0;line-height:34px;">岗位：</label>
						<div class="col-md-8">
							<pos ref="pos" @departChange='departChange'></pos>
						</div>
					</div>
					
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad" style="padding:0;line-height:34px;">生　日：</label>
						<dPicker class="col-md-8" style="width:65%;" v-model="employee.hospTime" v-on:change="dateAction('1')"></dPicker>
					</div>
					
					
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="addEmp()">确认</button>
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
	import pos from '../../common/Position.vue'
	export default {
		components:{
			dPicker,
			pos,
		},
		data() {
			return {
				employee:{
					empId:'-1',
					empName:'name',
					posId:'1',
					sex:'1',
					isuse:'1',
				},
				type:'',
				title:'新增',
				isModify:false,
				projectList:[],
				hospNum:'',
				isExist:'0',
				accountId:this.accountId(),
			};
		},
		methods:{
			// Initialization patient’s content
			initData(param,patient) {
				if(param=='add'){
					console.log('Initialization patient’s content, which adds patient')
					this.type='add'
					this.title='新增'
					this.isExist='0'
					this.isModify=false
					
					
				}else if(param=='modify'){
					console.log('Initialization patient’s content, which modifies patient')
					this.type='modify'
// 					this.isExist='1'
// 					this.isModify=true
// 					this.title='修改'
					// console.log("patient"+JSON.stringify(patient))
// 					Object.assign(this.patient,patient)
// 					this.hospNum=this.patient.hospNum
// 					this.$refs.dept.setDpart(this.patient.deptId)
// 					this.$refs.ps.setObjId(this.patient.patitypeid)
// 					this.$refs.mis.setObjId(this.patient.mitypeid)
				}
			},
			//date formatting 
			dateAction(param){
				if(param=='1'){
					if(!this.isBlank(this.patient.hospTime)){
						this.patient.hospTime=this.moment(this.patient.hospTime,'YYYY-MM-DD HH:mm:ss.000')
					}else{
						this.patient.hospTime=''
					}
				}else if(param=='2'){
					if(!this.isBlank(this.patient.outHosp)){
						this.patient.outHosp=this.moment(this.patient.outHosp,'YYYY-MM-DD HH:mm:ss.000')
					}else{
						this.patient.outHosp=''
					}
				}
			},
			//feedback department information
			departChange:function(param){
				// console.log('科室：'+JSON.stringify(param))
				if(this.isBlank(param)){
					this.patient.deptId=""
				}else{
					this.patient.deptId=param.deptId
				}
				console.log('科室：'+this.patient.deptId)
			},
			//feedback PatientStype information
			psChange:function(param){
				if(this.isBlank(param)){
					this.patient.patitypeid=''
				}else{
					this.patient.patitypeid=param.patitypeid
				}
			},
			//feedback MedicalInsuranceStype information
			misChange:function(param){
				if(this.isBlank(param)){
					this.patient.mitypeid=''
				}else{
					this.patient.mitypeid=param.mitypeid
				}
			},
			//the event of addtional button
			addEmp(){
				if(this.isBlank(this.employee.empName)){
					alert("员工的姓名不能为空")
					return
				}
				if(this.isBlank(this.employee.posId) && this.employee.posId == '0'){
					alert("岗位类型不能为空")
					return
				}
				var url = this.url + '/employeeAction/addUpdateEmp'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:[this.employee],
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('addPatient')
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			closeCurrentPage(){
				$("#emp").modal("hide")
				console.log('关闭添加员工界面')
			},
			//Query patient's information based on the hosNum
			conditionCheck(param){
				console.log('checkhosNum')
				if(this.isBlank(param)){
					return
				}
				var url = this.url + '/patientAction/queryPatientByHospNum'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						hospNum:param
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						if (res.retData != null) {
							this.patient = res.retData
							this.isExist = '1'
							
							this.$refs.dept.setDpart(this.patient.deptId)
							this.$refs.ps.setObjId(this.patient.patitypeid)
							this.$refs.mis.setObjId(this.patient.mitypeid)
						}else{
							this.patient={}
							this.patient.sex='1'
							this.patient.inHosp='1'
							this.isExist = '0'
							this.$refs.dept.setDpart('0')
							this.$refs.ps.setObjId('0')
							this.$refs.mis.setObjId('0')
							alert("没有查到此住院号,可以进行添加")
						}
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			
		}
		
	}
</script>

<style>

</style>
