<!-- 交费汇总 -->
<!--问题： 1、缴费汇总的项目不能固定，要让它变动，测试样式是否有问题，暂时使用三个项目就会变形 -->
<template>
	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">交费汇总</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>住院号：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" v-model="hospNum">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>姓　　名：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" value="" v-model="name">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>入院时间：</p>
				</div>
				<div class="col-md-8 col-lg-8" style="line-height: 34px;">
					<dp style="padding: 0; width:100%" v-model="hospTime" v-on:change="dateAction('0')"></dp>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="margin-left:-30px;">
				<div class="col-md-2 col-lg-2" style="padding: 0;line-height: 34px;">到</div>
				<div class="col-md-8 col-lg-8" style="line-height: 34px;">
					<dp style="padding: 0; width:100%" v-model="outHosp" v-on:change="dateAction('1')"></dp>
				</div>
			</div>
		</div>		
		<div class="row">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>科&nbsp;&nbsp;&nbsp;室：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<department ref='department' @departChange='departChange'></department>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>患者类型：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<PS ref="ps" @objChange='psChange'></PS>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>医保类型：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<MIS ref="mis" @objChange='misChange'></MIS>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>是否欠费：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<select class="form-control" v-model="qianKuan">
						<option value="">全部</option>
						<option value="1">是</option>
						<option value="0">否</option>
					</select>
				</div>
			</div>
			
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xs-offset-7 col-sm-offset-7 col-md-offset-7 col-lg-offset-7" style="padding-right:30px;padding-bottom:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10" @click="exportTableToExcel('datatable','患者费用统计表')">导出</button>
				<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
				 v-on:click="conditionCheck()">查询</button>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left"><p style="margin-left:1.5%; color:red ;">注：住院号显示红色为欠费项目</p></div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<nobr class="widthmax">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover user-table" id="datatable" style="table-layout:automatic;">
						<!-- <div id="fHeader" v-show="fixedHeader">
							<div class="fth_1">
								<div class="text-center"><p>住院号</p></div>
								<div class="text-center"><p>入院时间</p></div>
								<div class="text-center"><p>姓名</p></div>
								<div class="text-center"><p>性别</p></div>
								<div class="text-center"><p>年龄</p></div>
								<div class="text-center"><p>科室</p></div>
								<div class="text-center"><p>患者类型</p></div>
								<div class="text-center"><p>医保类型</p></div>
								<div class="text-center"><p>总交费</p></div>
								<div class="text-center" v-for="(item,index0) in projectList" :key="index0"><p>{{item.name}}</p></div>
							</div>
							<div class="fth_2">
								<div class="text-center" v-for="index3 in projectList.length*4" :key='index3'><p>{{feedbackTableTitle(index3-1)}}</p></div>
							</div>
						</div> -->
						<thead class="datathead">
							<tr class="datatr_1">
								<th class="text-center" rowspan='2'>住院号</th>
								<th class="text-center" rowspan='2'>入院时间</th>
								<th class="text-center" rowspan='2'>姓名</th>
								<th class="text-center" rowspan='2'>性别</th>
								<th class="text-center" rowspan='2'>年龄</th>
								<th class="text-center" rowspan='2'>科室</th>
								<th class="text-center" rowspan='2'>患者类型</th>
								<th class="text-center" rowspan='2'>医保类型</th>
								<th class="text-center" rowspan='2'>总交费</th>
								<th class="text-center" colspan="4" v-for="(item,index0) in projectList" :key="index0">{{item.name}}</th>
							</tr>
							<tr class="datatr_2">
								<th class="text-center" v-for="index3 in projectList.length*4" :key='index3'>{{feedbackTableTitle(index3-1)}}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(patient,index1) in patientList" :key="index1">
								<td :style="patient.QIANKUAN > 0 ? 'background-color: red;':''" >{{patient.HOSP_NUM}}</td>
								<td>{{patient.HOSP_TIME | dateFormatFilter('YYYY-MM-DD HH:mm:ss')}}</td>
								<td>{{patient.NAME}}</td>
								<td>{{patient.SEX == '1' ? '男' : patient.SEX == '2' ? '女' : '未知'}}</td>
								<td>{{patient.AGE}}</td>
								<td>{{patient.DEPTNAME}}</td>
								<td>{{patient.PATITYPENAME}}</td>
								<td>{{patient.MITYPENAME}}</td>
								<td>{{patient.ACTUALPAYMENT}}</td>
								<td v-for="index4 in projectList.length * 4" :key='index4'  :style="Number(dataChuLi(patient,index4-1)) > 0  && index4%4==0 ? 'background-color: red;':''">
									{{dataChuLi(patient,index4-1)}}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</nobr>
		</div>


	</div>
</template>

<script>
	import project from '../common/Project.vue'
	import department from '../common/Department.vue'
	import dp from 'vue2-datepicker'
	import PS from '../common/PatientStype.vue'
	import MIS from '../common/MedicalInsuranceStype.vue'
	export default {
		components: {
			project,
			department,
			dp,
			PS,
			MIS,
		},
		data() {
			return {
				patient: {},
				projectList: [],
				hospNum: '',
				name: '',
				deptId: '',
				patitypeid:'',
				mitypeid:'',
				patientList: [],
				qianKuan: '', //是否欠款
				sex: '0', //性别
				hospTime: '',
				outHosp: '',
				fixedHeader: false,
			};
		},
		methods: {
			//go into the view of added patient
			addPatient: function() {
				$("#addPatient").modal("show")
				console.log('进入添加患者界面')
			},
			//feedback department information
			departChange: function(param) {
				if(this.isBlank(param)){
					this.deptId=""
				}else{
					this.deptId=param.deptId
				}
			},
			//feedback PatientStype information
			psChange:function(param){
				if(this.isBlank(param)){
					this.patitypeid=""
				}else{
					this.patitypeid=param.patitypeid
				}
				console.log('PatientStype'+this.patitypeid)
			},
			//feedback MedicalInsuranceStype information
			misChange:function(param){
				if(this.isBlank(param)){
					this.mitypeid=""
				}else{
					this.mitypeid=param.mitypeid
				}
				console.log('MedicalInsuranceStype'+this.mitypeid)
			},
			printing: function(param,length) {
				this.$refs.receipt.initData(param,length)
				$("#receipt").modal("show")
				console.log('进入打印界面')
			},
			//date formatting
			dateAction(param) {
				if (param == '0') {
					if(!this.isBlank(this.hospTime)){
						this.hospTime = this.moment(this.hospTime, 'YYYY-MM-DD HH:mm:ss.000')
					}
				} else if (param == '1') {
					if(!this.isBlank(this.outHosp)){
						this.outHosp = this.moment(this.outHosp, 'YYYY-MM-DD HH:mm:ss.000')
					}
				}
			},
			printing: function() {
				$("#receipt").modal("show")
				console.log('进入打印界面')
			},

			feedbackTableTitle(index) {
				if (index % 4 == 0) {
					return "每月应收"
				} else if (index % 4 == 1) {
					return "实交合计"
				} else if (index % 4 == 2) {
					return "结束日期"
				} else if (index % 4 == 3) {
					return "预估欠费"
				}
			},
			//the list , which is detail infomation of patient,was checked.
			conditionCheck: function() {
				console.log('querying based on multiple conditions')
				var url = this.url + '/paymentAction/queryGatherPayment'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						hospNum: this.hospNum,
						name: this.name,
						deptId: this.deptId,
						mitypeid:this.mitypeid,
						patitypeid:this.patitypeid,
						qianKuan: this.qianKuan,
						sex: this.sex,
						begDate: this.hospTime,
						endDate: this.outHosp,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {
						this.projectList = res.retData.payService;
						this.patientList = res.retData.payment;
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			//check the list of projcet
			checkProjcet() {
				console.log('checkProjcet')
				var url = this.url + '/payserviceAction/queryPayservice'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						name: this.name,
						isuse: this.isuse,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {
						if (res.retData.length > 0) {
							this.projectList = res.retData
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			dataChuLi(patient, index) {
				
				var fix = "";
				var pId = "";
				var f = "";
				var mf = Math.floor(index / 4);
				pId = this.projectList[mf].payserviceId;
				if (index % 4 == 1) {
					fix = "SHIJIAO_";
					f = fix.concat(pId);
				} else if (index % 4 == 2) {
					fix = "ENDTIME_";
					f = fix.concat(pId) ;
				} else if (index % 4 == 3) {
					fix = "QIANKUAN_";
					f = fix.concat(pId);
				} else if (index % 4 == 0) {
					fix = "RECEIVABLE_";
					f = fix.concat(pId);
				}
				
				if (index % 4 == 2) {
					if(this.isBlank(patient[f])){
						return ''
					}else{
						return this.moment(patient[f], 'YYYY-MM-DD HH:mm:ss.000');
					}
				}else{
					if(!this.isBlank(patient[f]) && patient[f]>0){
						return patient[f];
						
					}
				}
			},
			// handleScroll(e){
			// 	var self=this
			// 	var etop = e.target.scrollTop
			// 	var fHeaderwidth = $("#fHeader div.fth_1").width($(".datathead").width())
			// 	var fHeaderheight = $("#fHeader div.fth_1").height($(".datathead").height())
			// 	var theadheight = $(".datathead").height()
			// 	var thlength = $(".datathead tr.datatr_1 th").length
			// 	for (var i=0;i<thlength;i++)
			// 	{ 
			// 		$("#fHeader div.fth_1 div.text-center").eq(i).width(
			// 		$(".datathead tr.datatr_1 th").eq(i).width()
			// 		)
			// 		$("#fHeader div.fth_1 div.text-center").eq(i).height(
			// 		$(".datathead tr.datatr_1 th").eq(i).height()
			// 		)
			// 				}
			// 				var thlength2 = $(".datathead tr.datatr_2 th").length
			// 				for (var j=0;j<thlength2;j++)
			// 	{ 
			// 		$("#fHeader div.fth_2 div.text-center").eq(j).width(
			// 		$(".datathead tr.datatr_2 th").eq(j).width()
			// 		)
			// 		$("#fHeader div.fth_2 div.text-center").eq(j).height(
			// 		$(".datathead tr.datatr_2 th").eq(j).height()
			// 		)
			// 	}
			// 	if(etop > theadheight){
			// 		self.fixedHeader=true
			// 		$("#fHeader").css("top",etop)
			// 	}else{
			// 		self.fixedHeader=false
			// 	}
			// }
		},
		// mounted () {
		// 	window.addEventListener('scroll',this.handleScroll,true)
		// },
		created() {
			this.conditionCheck()
		}
	}
</script>

<style>
	.widthmax {
		width: auto;
		overflow-x: scroll;
	}
  #datatable{position:relative;}
  #fHeader {
    position: absolute;
    top: 0;
    left: 0;
    background: #eeeeee;
    overflow: hidden;
  }
	#fHeader div.fth_1{ }
	#fHeader div.fth_2{ display: block; position: absolute; margin-top: -39px; right: 0px;}
	#fHeader div.text-center{
			float: left;
			display:table;
		padding:8px;
		border: 1px solid #ddd;
		font-weight: bold;
			vertical-align:bottom;
			position: relative;
	}
		#fHeader div.text-center{
		  float: left; 
		  display: inline-block;
		  padding:8px;
		  border: 1px solid #ddd;
		  font-weight: bold;
		}
	@media print {
		#fHeader{display:none}
	}
</style>
