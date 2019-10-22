<!-- add and modify patient -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">流水提成规则</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">岗位</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="patient.workname" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">额度级别</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="patient.level" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">提点</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="patient.remind" placeholder="">
						</div>
					</div>
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="addPatient()">确认</button>
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
	export default {
		components:{
			dPicker,
		},
		data() {
			return {
				patient:{
					hospTime:'',
					name:'',
					outHosp:'',
					sex:'1',
					age:'',
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
					this.patient={}
					this.$refs.dept.setDpart('0')
					this.$refs.ps.setObjId('0')
					this.$refs.mis.setObjId('0')
					this.hospNum=''
					this.patient.sex='1'
					this.patient.inHosp='1'
					// this.patient.hospTime=this.moment('','YYYY-MM-DD HH:mm:ss.000')
				}else if(param=='modify'){
					console.log('Initialization patient’s content, which modifies patient')
					this.type='modify'
					this.isExist='1'
					this.isModify=true
					this.title='修改'
					// console.log("patient"+JSON.stringify(patient))
					Object.assign(this.patient,patient)
					this.hospNum=this.patient.hospNum
					this.$refs.dept.setDpart(this.patient.deptId)
					this.$refs.ps.setObjId(this.patient.patitypeid)
					this.$refs.mis.setObjId(this.patient.mitypeid)
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
			addPatient(){
				console.log('the event of addtional button')
				if(this.isExist=='1'){
					if(!confirm("是否确定提交，提交将覆盖原有患者数据！！！")){
						return
					}
				}
				this.patient.hospNum=this.hospNum
				if(this.isBlank(this.patient.hospNum)){
					alert("住院号不能为空")
					return
				}
				if(this.isBlank(this.patient.patitypeid)){
					alert("患者类型不能为空")
					return
				}
				if(this.isBlank(this.patient.mitypeid)){
					alert("医保类型不能为空")
					return
				}
				if(this.isBlank(this.patient.name) ){
					alert("姓名不能为空")
					return
				}
				if(this.isBlank(this.patient.deptId)){
					alert("科室不能为空")
					return
				}
				if(this.patient.inHosp != '1' && this.patient.inHosp != '0'){
					alert("是否在院不能为空")
					return
				}
				if(!this.isBlank(this.patient.outHosp)){
					this.patient.outHosp=this.moment(this.patient.outHosp,'YYYY-MM-DD HH:mm:ss.000')
				}
				if(!this.isBlank(this.patient.hospTime)){
					this.patient.hospTime=this.moment(this.patient.hospTime,'YYYY-MM-DD HH:mm:ss.000')
				}else{
					alert("入院时间不能为空")
					return
				}
				this.patient.paymentList=this.projectList
				this.patient.accountId=this.accountId
				// console.log('the event of addtional button'+JSON.stringify(this.patient))
				var url = this.url + '/patientAction/addPatient'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.patient,
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
				$("#SubFlowWater").modal("hide")
				console.log('关闭添加患者界面')
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
