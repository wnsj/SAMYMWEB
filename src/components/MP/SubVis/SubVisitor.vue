<!-- add and modify visitor -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}客户</h4>
		</div>
		<div class="modal-body  pos_r jh-mh-sc">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">姓名</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.visitorName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">手机号</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.phone" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">门店</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<Store ref='store' @storeChange='storeChange'></Store>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">生日</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<dPicker class="wd100" v-model="visitor.birthday" value-type="format" format="YYYY-MM-DD"></dPicker>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">性别</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="visitor.sex">
								<option value="1">男</option>
								<option value="2">女</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">渠道</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<cha ref="cha" @channelChange="chaChange"></cha>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1" >咨询方向</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<DiseaseType ref="DiseaseType" @objectChange="dtChange"></DiseaseType>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">接待人</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref="emp" @employeeChange="empChange"></emp>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">客户判定</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<visStateJudge ref="visStateJudge" @objectChange="judgeChange"></visStateJudge>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">续流状态</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<visStateFlow ref="visStateFlow" @objectChange="flowChange"></visStateFlow>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<b>*</b>
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">行业</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<ind ref="ind" @industryChange="indChange"></ind>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">紧急联系人</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.urgentName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">

						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1" >联系电话</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.urgentPhone" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">微信号</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.vnum" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1" >邮箱地址</label><span class="sign-left">:</span>

						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.email" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">学历</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<Education ref="education" @objectChange="educationChange"></Education>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">职业</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<Occupation ref="occupation" @objectChange="occupationChange"></Occupation>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">区域</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<Region ref="region" @objectChange="regionChange"></Region>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<label for="cyname" class="col-md-2 control-label text-right nopad end-aline jh-ad-1">联系地址</label><span class="sign-left">:</span>
						<div class="col-md-10 wd84">
							<input type="text" class="form-control" v-model="visitor.address" placeholder="">
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<label for="cyname" class="col-md-2 control-label text-right nopad end-aline jh-ad-1">备注</label><span class="sign-left">:</span>
						<div class="col-md-10 wd84">

							<input type="text" class="form-control" v-model="visitor.marker" placeholder="">
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-1" data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
						<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-1" data-toggle="modal" v-on:click="certainAction()">确认</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import ind from '../../common/Industry.vue'
	import cha from '../../common/Channel.vue'
	import emp from '../../common/Employee.vue'
	import Education from '../../common/Education.vue'
	import Occupation from '../../common/Occupation.vue'
	import Region from '../../common/Region.vue'
	import visStateJudge from '../../common/VisitState.vue'
	import visStateFlow from '../../common/VisitState.vue'
	import DiseaseType from '../../common/DiseaseType.vue'
	import Store from '../../common/Store.vue'

	import dPicker from 'vue2-datepicker'
	export default {
		components: {
			dPicker,
			ind,
			cha,
			emp,
			DiseaseType,
			visStateJudge,
			visStateFlow,
			Store,
			Education,
			Occupation,
			Region,
		},
		data() {
			return {
				visitor: {
					visitorName: '',
					sex: '1',
					phone: '',
					chaId: '',
					vsIdJudge: '',
					vsIdFlow: '',
					consDirection: '',
					empId: '',
					// visType:'1',
					indId: '',
					storeId: this.storeId(),
					urgentName: '',
					urgentPhone: '',
					vnum: '',
					email: '',
					address: '',
					marker: '',
					birthday: '',
				},
				title: '',
			};
		},
		methods: {
			// Initialization visitor’s content
			initData(param, visitorContent) {
				this.$refs.visStateJudge.getObj('1', '1')
				this.$refs.visStateFlow.getObj('1', '2')
				this.visitor = {
					visitorName: '',
					sex: '1',
					phone: '',
					chaId: '',
					vsIdJudge: '',
					vsIdFlow: '',
					consDirection: '',
					dtId: '',
					empId: '',
					visType: '1',
					indId: '0',
					storeId: this.storeId(),
					urgentName: '',
					urgentPhone: '',
					vNum: '',
					email: '',
					address: '',
					marker: '',
					birthday: '',
					eduId: '',
					reId: '',
					occId: '',
					dtId:'',
				}
				if (param == 'add') {

					this.title = '新增'
					this.$refs.cha.setChaId('0')
					this.$refs.DiseaseType.setObj('0')
					this.$refs.emp.setEmp("")
					this.$refs.visStateJudge.setObj('0')
					this.$refs.visStateFlow.setObj('0')
					this.$refs.ind.setInd('0')
					this.$refs.store.setStore('0')
					this.$refs.education.setObj('0')
					this.$refs.region.setObj('0')
					this.$refs.occupation.setObj('0')

				} else if (param == 'modify') {
					this.title = '修改'
					Object.assign(this.visitor, visitorContent)
					this.$refs.cha.setChaId(this.visitor.chaId)
					this.$refs.DiseaseType.setObj(this.visitor.dtId)
					this.$refs.emp.setEmp(this.visitor.empId)
					this.$refs.visStateJudge.setObj(this.visitor.vsIdJudge)
					this.$refs.visStateFlow.setObj(this.visitor.vsIdFlow)
					this.$refs.ind.setInd(this.visitor.indId)
					this.$refs.store.setStore(this.visitor.storeId)
					if (!this.isBlank(this.visitor.eduId)) {
						this.$refs.education.setObj(this.visitor.eduId)
					}
					if (!this.isBlank(this.visitor.occId)) {
						this.$refs.occupation.setObj(this.visitor.occId)
					}
					if (!this.isBlank(this.visitor.reId)) {
						this.$refs.region.setObj(this.visitor.reId)
					}
				}
			},
			judgeChange: function(param) {
				// //console.log(JSON.stringify(param))
				if (this.isBlank(param)) {
					this.visitor.vsIdJudge = ""
				} else {
					this.visitor.vsIdJudge = param.vsId
				}
			},
			flowChange: function(param) {
				if (this.isBlank(param)) {
					this.visitor.vsIdFlow = ""
				} else {
					this.visitor.vsIdFlow = param.vsId
				}
			},
			dtChange: function(param) {
				if (this.isBlank(param)) {
					this.visitor.dtId = ""
				} else {
					this.visitor.dtId = param.dtId
				}
			},
			storeChange: function(param) {
				if (this.isBlank(param)) {
					this.visitor.storeId = ""
				} else {
					this.visitor.storeId = param.storeId
				}
			},
			indChange: function(param) {
				if (this.isBlank(param)) {
					this.visitor.indId = ""
				} else {
					this.visitor.indId = param.indId
				}
			},
			chaChange: function(param) {
				if (this.isBlank(param)) {
					this.visitor.chaId = ""
				} else {
					this.visitor.chaId = param.chaId
				}
			},
			empChange: function(param) {
				if (this.isBlank(param)) {
					this.visitor.empId = ""
				} else {
					this.visitor.empId = param.empId
				}
			},
			educationChange: function(param) {
				if (this.isBlank(param)) {
					this.visitor.eduId = ""
				} else {
					this.visitor.eduId = param.eduId
				}
			},
			occupationChange: function(param) {
				if (this.isBlank(param)) {
					this.visitor.occId = ""
				} else {
					this.visitor.occId = param.occId
				}
			},
			regionChange: function(param) {
				if (this.isBlank(param)) {
					this.visitor.reId = ""
				} else {
					this.visitor.reId = param.reId
				}
			},
			closeCurrentPage() {
				$("#visContent").modal("hide")
				//console.log('关闭添加患者界面')
			},
			//the event of addtional button
			certainAction() {
				//console.log('the event of addtional button')
				var reg =
					/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;


				if (this.isBlank(this.visitor.visitorName)) {
					alert("客户姓名不能为空")
					return
				}
				if(this.isBlank(this.visitor.birthday)){
					this.visitor.birthday=null
				}
				if(this.isBlank(this.visitor.eduId)){
					this.visitor.eduId=null
				}
				if(this.isBlank(this.visitor.occId)){
					this.visitor.occId=null
				}
				if(this.isBlank(this.visitor.reId)){
					this.visitor.reId=null
				}
				if (this.isBlank(this.visitor.dtId)) {
					alert("客户的咨询方向不能为空")
					return
				}
				if (this.isBlank(this.visitor.chaId)) {
					alert("客户的来源渠道不能为空")
					return
				}
				if (this.isBlank(this.visitor.vsIdJudge) || this.visitor.vsIdJudge == '0') {
					alert("客户判定不能为空")
					return
				}
				if (this.isBlank(this.visitor.vsIdFlow) || this.visitor.vsIdFlow == '0') {
					alert("续流状态不能为空")
					return
				}
				if (this.isBlank(this.visitor.empId) || this.visitor.empId == 0) {
					alert("接待人不能为空")
					return
				}
				if (this.isBlank(this.visitor.phone)) {
					alert("联系人电话不能为空")
					return
				} else if (reg.test(this.visitor.phone) == false) {
					if (this.title == '新增') {
						alert("不是完整的11位手机号或者正确的座机号！");
						return
					} else {
						this.visitor.phone = null
					}
				}
				if (this.visitor.address.length > 100) {
					alert('地址的长度不能超过100个字')
					return
				}

				switch (this.title) {
					case '新增':
						var url = this.url + '/visitorAction/addVisitor';
						break;
					case '修改':
						var url = this.url + '/visitorAction/updateVisitor'
						break;
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.visitor,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					//console.log('添加或者修改客户信息失败')
				});
			},

		},
	}
</script>

<style>

</style>
