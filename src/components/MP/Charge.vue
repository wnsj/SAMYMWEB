<!-- 收费管理页 -->
<template>
	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">充值管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>会员号：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" value="" v-model="hospNum">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>姓&nbsp;&nbsp;&nbsp;名：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" value="" v-model="name">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>岗&nbsp;&nbsp;&nbsp;位：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<department ref='department' @departChange='departChange'></department>
				</div>
			</div>
			
			
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xs-offset-7 col-sm-offset-7 col-md-offset-7 col-lg-offset-7" style="padding-right:30px;padding-bottom:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10" @click="exportTableToExcel('datatable','患者费用统计表')">导出</button>
				<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
				 v-on:click="addPatientCharge()" v-if="has(2)">添加缴费</button>
				<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
				 v-on:click="conditionCheck()">查询</button>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<nobr class="widthmax">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover user-table" id="datatable">
						<!-- <div id="fHeader" v-show="fixedHeader">
							<div class="fth_1">
								<div class="text-center"><p>住院号</p></div>
								<div class="text-center"><p>入院时间</p></div>
								<div class="text-center"><p>姓名</p></div>
								<div class="text-center"><p>性别</p></div>
								<div class="text-center"><p>科室</p></div>
								<div class="text-center"><p>患者类型</p></div>
								<div class="text-center"><p>医保类型</p></div>
								<div class="text-center"><p>年龄</p></div>
								<div class="text-center"><p>缴费时间</p></div>
								<div class="text-center"><p>缴费合计</p></div>
								<div class="text-center" v-for="(item,index) in projectList" :key="index"><p>{{item.name}}</p></div>
								<div class="text-center"><p>编辑</p></div>
								<div class="text-center"><p>打印</p></div>
							</div>
							<div class="fth_2">
								<div class="text-center" v-for="index3 in projectList.length*4"><p>{{feedbackTableTitle(index3-1)}}</p></div>
							</div>
						</div> -->
						<thead class="datathead">
							<tr class="datatr_1">
								<th class="text-center" rowspan='2'>住院号</th>
								<th class="text-center" rowspan='2'>入院时间</th>
								<th class="text-center" rowspan='2'>姓名</th>
								<th class="text-center" rowspan='2'>性别</th>
								<th class="text-center" rowspan='2'>科室</th>
								<th class="text-center" rowspan='2'>患者类型</th>
								<th class="text-center" rowspan='2'>医保类型</th>
								<th class="text-center" rowspan='2'>年龄</th>
								<th class="text-center" rowspan='2'>缴费时间</th>
								<th class="text-center" rowspan='2'>缴费合计</th>
								<th class="text-center" rowspan='2'>操作员</th>
								<th class="text-center" colspan="4" v-for="(item,index) in projectList" :key="index">{{item.name}}</th>
								<th class="text-center" rowspan='2' v-if="has(2)">编辑</th>
								<th class="text-center" rowspan='2'>打印</th>
							</tr>
							<tr class="datatr_2">
								<th class="text-center" v-for="index3 in projectList.length*4">{{feedbackTableTitle(index3-1)}}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(patient,index1) in patientList" :key="index1">
								<td class="sign">{{patient.HOSP_NUM}}</td>
								<td class="sign">{{patient.HOSP_TIME | dateFormatFilter('YYYY-MM-DD')}}</td>
								<td>{{patient.NAME}}</td>
								<td>{{patient.SEX==1 ? '男' : '女'}}</td>
								<td>{{patient.DEPTNAME}}</td>
								<td>{{patient.PATITYPENAME}}</td>
								<td>{{patient.MITYPENAME}}</td>
								<td>{{patient.AGE}}</td>
								<td>{{patient.PAYMENTTIME  | dateFormatFilter('YYYY-MM-DD')}}</td>
								<td>{{patient.ACTUALPAYMENT}}</td>
								<td>{{patient.ACCOUNT_NAME}}</td>
								<td v-for="index3 in projectList.length*4">{{feedbackTableContent(patientList[index1],index3-1)}}</td>
								<td class="text-center" style="padding:0" v-if="has(2)"><button type="button" class="btn btn-warning" v-on:click="modifyPatientCharge(patient)">编辑</button></td>
								<td class="text-center" style="padding:0"><button class="btn btn-primary pull-right m_r_10" @click="printing(patient)">打印</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</nobr>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="addFee">
				<div class="modal-dialog">
					<adding ref='fee' @feedbackCharge="feedBack"></adding>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="receipt">
				<div class="modal-dialog">
					<receipt ref="receipt"></receipt>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import project from '../common/Project.vue'
	import department from '../common/Department.vue'
	import dp from 'vue2-datepicker'
	import adding from '../MP/Charge/Addingfees'
	import receipt from '../MP/Charge/Receipt'
	import PS from '../common/PatientStype.vue'
	import MIS from '../common/MedicalInsuranceStype.vue'
	export default {
		components: {
			project,
			department,
			dp,
			adding,
			receipt,
			PS,
			MIS,
		},
		data() {
			return {
				chargeLsit: [],
				patient: {},
				projectList: [],
				hospNum: '',
				name: '',
				deptId: '',
				patitypeid:'',
				mitypeid:'',
				patientList: [],
				inHosp: '0', //是否在院
				sex: '0', //性别
				hospTime:'',
				outHosp:'',
				fixedHeader: false,
				// endDate:this.endDate('2019-01-01',10),
			};
		},
		methods: {
			//go into the view of added patient charge
			addPatientCharge: function() {
				//this.$refs.fee.initData('add')
				$("#addFee").modal("show")
				console.log('进入添加患者界面')
			},
			//go into the view of modified patient charge
			modifyPatientCharge: function(param) {
				this.$refs.fee.initData('modify',param)
				$("#addFee").modal("show")
				console.log('进入添加患者界面')
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
			departChange(param) {
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


			//feedback from adding and modifying view
			feedBack() {
				this.conditionCheck()
				$("#addFee").modal("hide")
				$("#departmentContent").modal('hide')
			},

			feedbackTableTitle(index) {
				if (index % 4 == 0) {
					return "每月应收"
				} else if (index % 4 == 1) {
					return "交费金额"
				} else if (index % 4 == 2) {
					return "开始时间"
				} else if (index % 4 == 3) {
					return "结束时间"
				}
			},
			feedbackTableContent(object,index) {
				// console.log("object:"+JSON.stringify(object))
				var fix = "";
				var pId = "";
				var f = "";
				var mf = Math.floor(index / 4);
				pId = this.projectList[mf].payserviceId;
				if (index % 4 == 0) {
					fix = "RECEIVABLE_";
					f = fix.concat(pId);
				} else if (index % 4 == 1) {
					fix = "ACTUALPAYMENT_";
					f = fix.concat(pId);
				} else if (index % 4 == 2) {
					fix = "BEGTIME_";
					f = fix.concat(pId);
				} else if (index % 4 == 3) {
					fix = "ENDTIME_";
					f = fix.concat(pId);
				}
				if (index % 4 == 2) {
					if(this.isBlank(object[f])){
						return ''
					}else{
						return this.moment(object[f], 'YYYY-MM-DD HH:mm:ss.000');
					}
				}
				if (index % 4 == 3) {
					if(this.isBlank(object[f])){
						return ''
					}else{
						return this.moment(object[f], 'YYYY-MM-DD HH:mm:ss.000');
					}
				} else {
					if(!this.isBlank(object[f]) && object[f]>0){
						return object[f];
					}
				}

			},
			//the list , which is detail infomation of patient,was checked.
			conditionCheck: function() {
				console.log('querying based on multiple conditions')
				var url = this.url + '/paymentAction/queryPaymentList'
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
						sex: this.sex,
						begDate: this.hospTime,
						endDate: this.outHosp,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {

							this.patientList = res.retData.payment
							console.log("shuju :" + this.patientList)


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
						isuse: '1',
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
			dataChuLi(item, fix, pId) {
				var f = fix.concat(pId);
				return item[f];
			},
			discolour: function() {
				console.log('欠费变色')
				$(".arrears").each(function() {
					var arr = $(this).text();
					if (arr < 0) {
						$(this).css("background", "red")
						$(this).parents().children(".sign").css("background", "red")
					}

				});
			},
			// handleScroll(e){
      //     var self=this
      //     var etop = e.target.scrollTop
      //     var fHeaderwidth = $("#fHeader div.fth_1").width($(".datathead").width())
      //     var fHeaderheight = $("#fHeader div.fth_1").height($(".datathead").height())
      //     var theadheight = $(".datathead").height()
      //     var thlength = $(".datathead tr.datatr_1 th").length
      //     for (var i=0;i<thlength;i++)
      //     {
      //       $("#fHeader div.fth_1 div.text-center").eq(i).width(
      //         $(".datathead tr.datatr_1 th").eq(i).width()
      //       )
      //       $("#fHeader div.fth_1 div.text-center").eq(i).height(
      //         $(".datathead tr.datatr_1 th").eq(i).height()
      //       )
			// 		}
			// 		var thlength2 = $(".datathead tr.datatr_2 th").length
			// 		for (var j=0;j<thlength2;j++)
      //     {
      //       $("#fHeader div.fth_2 div.text-center").eq(j).width(
      //         $(".datathead tr.datatr_2 th").eq(j).width()
      //       )
      //       $("#fHeader div.fth_2 div.text-center").eq(j).height(
      //         $(".datathead tr.datatr_2 th").eq(j).height()
      //       )
      //     }
      //     if(etop > theadheight){
      //       self.fixedHeader=true
      //       $("#fHeader").css("top",etop)
      //     }else{
      //       self.fixedHeader=false
      //     }
      // }
    },
    // mounted () {
    //   window.addEventListener('scroll',this.handleScroll,true)
    // },
		created() {
			this.discolour()
			this.checkProjcet()
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
	#fHeader div.fth_2{ display: block; position: absolute; margin-top: -39px; right: 110px;}
  #fHeader div.text-center{
		float: left;
		display:table;
    padding:8px;
    border: 1px solid #ddd;
    font-weight: bold;
		vertical-align:bottom;
		position: relative;
  }
	#fHeader div.text-center p{
		width: 100%;
		position:absolute;
		left: 0;
		bottom: 0;
	}
  @media print {
    #fHeader{display:none}
  }
</style>
