<template>
	<div>
		<div class="col-md-12 col-lg-12 main-title">
				<h1 class="titleCss">消费管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>会员卡号：</p>
				</div>
				<div class="col-md-8 col-lg-8"><input class="form-control" type="text" value="" v-model="hospNum"></div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>姓　　名：</p>
				</div>
				<div class="col-md-8 col-lg-8"><input class="form-control" type="text" value="" v-model="name"></div>
			</div>

			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>手机号：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<department ref='department' @departChange='departChange'></department>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>开始时间：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<dPicker style="width:100%" v-model="hospTime" v-on:change="dateAction('0')"></dPicker>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p>结束时间：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<dPicker style="width:100%" v-model="outHosp" v-on:change="dateAction('1')"></dPicker>
				</div>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-right:30px; padding-bottom:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
				 v-on:click="conditionCheck()">查询</button>
			</div>
		</div>

		<div>
			<div class="col-md-12 col-lg-12">
				<nobr class="widthmax">
					<div class="table-responsive pre-scrollable" style=" max-height:464px">
						<table class="table table-bordered table-hover user-table" id="datatable">
							<div id="fHeader" v-show="fixedHeader">
								<div class="text-center">会员卡号</div>
								<div class="text-center">姓名</div>
								<div class="text-center">年龄</div>
								<div class="text-center">手机号</div>
								
								<div class="text-center">交费总额</div>
								<div class="text-center">消费总额</div>
								<div class="text-center">剩余总额</div>
								
							</div>
							<thead class="datathead">
								<tr>
									<th class="text-center">会员卡号</th>
									<th class="text-center">姓名</th>
									<th class="text-center">年龄</th>
									<th class="text-center">手机号</th>
									
									<th class="text-center">交费总额</th>
									<th class="text-center">消费总额</th>
									<th class="text-center">退费总额</th>
									<th class="text-center">剩余总额</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item2,index2) in patientList" :key="index2" v-on:dblclick="modifyPatient(item2)">
									<td>{{item2.hospNum}}</td>
									<td>{{item2.name}}</td>
									<td>{{item2.age}}</td>
									<td>{{item2.DEPTNAME}}</td>
									<td>{{item2.patitypename}}</td>
									<td>{{item2.patitypename}}</td>
									<td>{{item2.inHosp==1 ? '在' : '否'}}</td>
									<td class="text-center" v-if="has(2)"><button type="button" class="btn btn-warning" v-on:click="modifyPatient(item2)">修改</button></td>
								</tr>
							</tbody>
						</table>
					</div>
				</nobr>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="addPatient">
				<div class="modal-dialog">
					<SubConsume ref="patient" @addPatient='feedback'></SubConsume>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import axios from 'axios'
	import dPicker from 'vue2-datepicker'
	import SubConsume from '../MP/SubConsume/SubConsumeList.vue'
	export default {
		name: 'employee',
		components: {
			dPicker,
			SubConsume,
		},
		data() {
			return {
				patient: {},
				projectList: [],
				hospNum: '',
				name: '',
				deptId: '',
				patitypeid: '',
				mitypeid: '',
				patientList: ["",],
				inHosp: '', //是否在院
				sex: '0', //性别
				hospTime: '',
				outHosp: '',
				totleCost: 0,
				files: [],
				uploadSuccess: 0,
				fixedHeader: false,
				
			}
		},

		methods: {
			//feedback project information
			projectChange: function(param) {
				console.log('返回项目的全部信息')
			},
			//feedback department information
			departChange: function(param) {
				if (this.isBlank(param)) {
					this.deptId = ""
				} else {
					this.deptId = param.deptId
				}
			},
			//feedback PatientStype information
			psChange: function(param) {
				if (this.isBlank(param)) {
					this.patitypeid = ""
				} else {
					this.patitypeid = param.patitypeid
				}
				console.log('PatientStype' + this.patitypeid)
			},
			//feedback MedicalInsuranceStype information
			misChange: function(param) {
				if (this.isBlank(param)) {
					this.mitypeid = ""
				} else {
					this.mitypeid = param.mitypeid
				}
				console.log('MedicalInsuranceStype' + this.mitypeid)
			},
			//date formatting
			dateAction(param) {
				if (param == '0') {
					if (!this.isBlank(this.hospTime)) {
						this.hospTime = this.moment(this.hospTime, 'YYYY-MM-DD HH:mm:ss.000')
					}
				} else if (param == '1') {
					if (!this.isBlank(this.outHosp)) {
						this.outHosp = this.moment(this.outHosp, 'YYYY-MM-DD HH:mm:ss.000')
					}
				}
			},
			feedback() {
				this.conditionCheck()
				$("#addPatient").modal('hide')
			},
			//date filter
			dateFilter(param) {
				if (!this.isBlank(param)) {
					return this.moment(param, 'YYYY-MM-DD')
				}
			},
			//go into the view of added patient
			addPatient: function() {
				this.$refs.patient.initData('add')
				$("#addPatient").modal("show")
				console.log('进入添加患者界面')
			},
			//modify the cotent of patient
			modifyPatient(item) {
				console.log('modify the cotent of patient')
				//this.$refs.patient.initData('modify', item)
				$("#addPatient").modal('show')
			},
			//the list , which is detail infomation of patient,was checked.
			conditionCheck: function() {
				console.log('querying based on multiple conditions')
				var url = this.url + '/paymentAction/queryPatient'
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
						mitypeid: this.mitypeid,
						patitypeid: this.patitypeid,
						inHosp: this.inHosp,
						sex: this.sex,
						hospTime: this.hospTime,
						outHosp: this.outHosp,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {
						console.log("cd:" + res.retData.payment.length)
						this.projectList = res.retData.payService;
						this.patientList = res.retData.payment;
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			dataChuLi(patient, index) {
				// console.log("患者：" + index)
				var fix = "";
				var pId = "";
				var f = "";
				pId = this.projectList[index].payserviceId;

				fix = "RECEIVABLE_";
				f = fix.concat(pId);
				if (!this.isBlank(patient[f]) && patient[f] > 0) {
					return patient[f];
				}
			},
			handlerUpload: function(e) {
				//获取选定的文件
				let tFiles = e.target.files;
				let len = tFiles.length;
				for (var i = 0; i < len; i++) {
					//开始上传每一个文件
					var item = {
						name: tFiles[i].name,
						uploadPercentage: 1,
						size: this.formatFileSize(tFiles[i].size, 0),
						uploadStatus: 0
					}
					console.log(item)
					this.files.push(item);
					//开始上传文件 新建一个formData
					let param = new FormData();
					param.append("name", tFiles[i].name);
					param.append("accountId", this.accountId());
					//通过append向form对象添加数据
					param.append("file", tFiles[i]);
					//FormData私有类对象，访问不到，可以通过get判断值是否传进去
					console.log(param.get("file"));
					//判断大小
					if (!this.checkFileSize(tFiles[i].size)) {
						item.uploadStatus = -3;
						alert("文件大于2M!");
						return false;
					}
					if (!this.checkFileType(tFiles[i].name.split('.')[1])) {
						item.uploadStatus = -2;
						alert("文件类型错误!")
						return false;
					}
					//通过axios上传文件
					//配置
					let config = {
						//添加请求头
						headers: {
							"Content-Type": "multipart/form-data"
						},
						//添加上传进度监听事件
						onUploadProgress: e => {
							var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
							//console.log(this.files)
							item.uploadPercentage = completeProgress;
						}
					};
					var url = this.url + '/uploadAction/uploadPatient';
					axios.post(url, param, config).then(function(response) {
						console.log(response);
						item.uploadStatus = 2;
						if (response.data.retCode == '0000') {
							alert("上传成功!")
						} else {
							alert(response.data.retMsg)
						}
					}).catch(function(error) {
						console.log(error);
						item.uploadStatus = -1;
					});
				}
			},
			formatFileSize: function(fileSize, idx) {
				var units = ["B", "KB", "MB", "GB"];
				idx = idx || 0;
				if (fileSize < 1024 || idx === units.length - 1) {
					return fileSize.toFixed(1) + units[idx];
				}
				return this.formatFileSize(fileSize / 1024, ++idx);
			},
			checkFileType: function(fileType) {
				const acceptTypes = ['xlsx', 'xls'];
				for (var i = 0; i < acceptTypes.length; i++) {
					if (fileType === acceptTypes[i]) {
						return true;
					}
				}
				return false;
			},
			checkFileSize: function(fileSize) {
				//2M
				const MAX_SIZE = 2 * 1024 * 1024;
				if (fileSize > MAX_SIZE) {
					return false;
				}
				return true;
			},
			myFile: function() {
				$("#myFile").click();
			},
			handleScroll(e) {
				var self = this
				var etop = e.target.scrollTop
				var fHeaderwidth = $("#fHeader").width($(".datathead").width())
				var fHeaderheight = $("#fHeader").height($(".datathead").height())
				var theadheight = $(".datathead").height()
				var thlength = $(".datathead tr th").length
				for (var i = 0; i < thlength; i++) {
					$("#fHeader div").eq(i).width(
						$(".datathead tr th").eq(i).width()
					)
					$("#fHeader div").eq(i).height(
						$(".datathead tr th").eq(i).height()
					)
				}
				if (etop > 0) {
					self.fixedHeader = true
					$("#fHeader").css("top", etop)
				} else {
					self.fixedHeader = false
				}
			}

		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true)
			if (window.performance.navigation.type == 1) {
        console.log("页面被刷新")
      }else{
        console.log("首次被加载")
			}
		},
		created() {
			this.conditionCheck()
		},

	}
</script>


<style scoped="scoped">
	.widthmax {
		width: auto;
		overflow-x: scroll;
	}

	#datatable {
		position: relative;
	}

	#fHeader {
		position: absolute;
		top: 0;
		left: 0;
		background: #eeeeee;
		overflow: hidden;
	}

	#fHeader div.text-center {
		float: left;
		display: inline-block;
		padding: 8px;
		border: 1px solid #ddd;
		font-weight: bold;
	}

	@media print {
		#fHeader {
			display: none
		}
	}
</style>
