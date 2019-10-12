<template>
	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss" style="margin-top: -80px;">数据上传</h1>
		</div>
		<div class="col-md-12 col-lg-12 pre-scrollable" style="max-height: 650px;overflow-x: hidden;">
			<div class="row" style="margin-top: 40px;">
				<h3 class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left">
					<span style="margin-left:15px;margin-right:15px;">数据上传说明</span>
					<div style="margin-top:15px;margin-left:15px;margin-right:15px; border:2px solid #283643"></div>
				</h3>
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left" style="padding-right:30px; padding-bottom:1.5%;">
					<div style="margin-left:15px;">
						<p style="padding:10px 15px; border:1px solid #666">
							先上传基本信息，之后上传缴费信息(表格信息出错会报“<span style="color: red;font-size: 16px;">系统异常</span>”)
						</p>
						<p style="padding:10px 0;">
							<strong>患者基本信息上传说明：</strong>
						</p>
						<p style="padding:10px 15px; border:1px solid #666; margin-bottom:0;">
							1、模板中带有“<span style="color: red;font-size: 16px;">★</span>”的为必填选项，其他选填选项
						</p>
						<p style="padding:10px 15px; border:1px solid #666; margin-bottom:0;">
							2、两条数据中间不能有空行，否则将影响数据的正常导入
						</p>
						<p style="padding:10px 15px; border:1px solid #666; border-top:0">
							3、后导入的数据
						</p>
						<p style="padding:10px 0;">
							<strong>缴费信息数据上传说明：</strong>
						</p>
						<p style="padding:10px 15px; border:1px solid #666; margin-bottom:0;">
							1、同一天大于等于两笔费用，每笔费用的缴费时间要添加时分秒；例如：2016/2/1 10:10:00.000；
						</p>
						<p style="padding:10px 15px; border:1px solid #666; margin-bottom:0;">
							2、住院号和缴费时间均重复，则只会导入第一条数据
						</p>
						<p style="padding:10px 15px; border:1px solid #666; margin-bottom:0;">
							3、应交费用和实交费用必须为正数
						</p>
						<p style=" padding:10px 15px; border:1px solid #666; border-top:0">
							4、上传缴费表格中的项目ID要与项目管理中的项目ID严格匹配
						</p>
					</div>
				</div>
			</div>
			<div class="row">
				<h3 class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left">
					<span style="margin-left:15px;margin-right:15px;">数据模板下载</span>
					<div style="margin-top:15px;margin-left:15px;margin-right:15px; border:2px solid #283643"></div>
				</h3>
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding-left:30px; padding-bottom:1.5%;">
					<button type="button" class="btn btn-primary  m_r_10" style="margin-right:1.5%; float:left;" data-toggle="modal"
					 v-on:click="downFile('患者基本信息导入模板.xlsx')" v-if="has(2)">患者信息导入模板下载</button>
					<button type="button" class="btn btn-warning  m_r_10" style="margin-right:1.5%; float:left;" data-toggle="modal"
					 v-on:click="downFile('缴费信息导入模板.xlsx')" v-if="has(2)">缴费信息导入模板下载</button>
				</div>
			</div>
			<div class="row">
				<h3 class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left">
					<span style="margin-left:15px;margin-right:15px;">数据上传</span>
					<div style="margin-top:15px;margin-left:15px;margin-right:15px; border:2px solid #283643"></div>
				</h3>
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding-left:30px; padding-bottom:1.5%;">
					<button type="button" class="btn btn-primary  m_r_10" style="margin-right:1.5%; float:left;" data-toggle="modal"
					 v-on:click="myFile('1')" v-if="has(2)">患者导入
						<input type="file" id="patientFile" class="inputfile" style="display:none;" @change="handlerUpload($event,'/uploadAction/uploadPatient')"></button>
					<button type="button" class="btn btn-warning  m_r_10" style="margin-right:1.5%; float:left;" data-toggle="modal"
					 v-on:click="myFile('2')" v-if="has(2)">缴费信息导入<input type="file" id="feeFile" class="inputfile" style="display:none;"
						 @change="handlerUpload($event,'/uploadAction/uploadPayFee')"></button>
				</div>
			</div>

			<div>
				<div class="col-md-12 col-lg-12" v-show="patientList.length>0">
					<nobr class="widthmax">
						<div class="table-responsive pre-scrollable" style=" max-height:464px">
							<table class="table table-bordered table-hover user-table" id="datatable">
								<thead class="datathead">
									<tr>
										<th class="text-center">住院号</th>
										<th class="text-center">说明</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item2,index2) in patientList" :key="index2">
										<td>{{item2.hospNum}}</td>
										<td>住院号患者不存在，请在患者管理进行添加或者在患者导入中进行导入</td>
									</tr>
								</tbody>
							</table>
						</div>
					</nobr>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import axios from 'axios'
	import dPicker from 'vue2-datepicker'
	import department from '../common/Department.vue'
	import project from '../common/Project.vue'
	import patient from '../MP/PatientInfo/PatientContent'
	import PS from '../common/PatientStype.vue'
	import MIS from '../common/MedicalInsuranceStype.vue'
	var vm = null;
	export default {
		name: 'employee',
		components: {
			dPicker,
			department,
			project,
			patient,
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
				patitypeid: '',
				mitypeid: '',
				patientList: [],
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
				this.$refs.patient.initData('modify', item)
				$("#addPatient").modal('show')
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
			handlerUpload: function(e, paramUrl) {
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
					//登录客户端账户ID
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

					var url = this.url + paramUrl;
					axios.post(url, param, config).then(function(response) {
						console.log(response);
						item.uploadStatus = 2;
						if (response.data.retCode == '0000') {
							if (response.data.retData.length >= 0) {
								vm.patientList = response.data.retData
							} else {
								alert("上传成功!")
							}
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
			myFile: function(param) {
				if (param == '1') {
					$("#patientFile").click();
				} else if (param == '2') {
					$("#feeFile").click();
				}

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
			},
			//下载模板
			downFile(fileName) {
				if (this.isBlank(fileName)) {
					alert("文件名不能为空!");
					return;
				}
				var url = this.url + '/downloadAction/downFile';
				url = url.concat("?fileName=").concat(fileName);
				//window.open(url);
				axios({
					url: url,
					method: 'GET',
					responseType: 'blob', // important
				}).then((response) => {
					const url = window.URL.createObjectURL(new Blob([response.data]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', fileName);
					document.body.appendChild(link);
					link.click();
				});
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true)
			vm = this;
		},
		created() {
			// this.conditionCheck()
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
