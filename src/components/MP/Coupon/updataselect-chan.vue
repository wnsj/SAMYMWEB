<!-- the page of department management -->
<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">选择产品</h1>
		</div>
		<el-collapse-transition>
			<div v-show="showSelect">
				<div class="row newRow">
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-has="'SAMY:MP:STORE'" style="margin-bottom: 20px;">
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
							<p class="end-aline col-md-11 col-lg-11 jh-pa-1">门店</p><span class="sign-left">:</span>
						</div>
						<div class="col-xs-7 col-sm-7 col-md-7 col-lg-8=7">
							<store ref="store" @storeChange='storeChange'></store>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="margin-bottom: 20px;">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">产品名称</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="proName">
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="margin-bottom: 20px;">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">咨询师</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<cou ref="couEmp" @employeeChange="empChange"></cou>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="margin-bottom: 20px;">
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
							<p class="end-aline col-md-11 col-lg-11 jh-pa-1">是否在用</p><span class="sign-left">:</span>
						</div>
						<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
							<select class="form-control" v-model="isuse">
								<option value="">--未选择-</option>
								<option value="1">在用</option>
								<option value="0">停用</option>
							</select>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 nopad">
							<p class="end-aline col-md-11 col-lg-11">咨询师等级</p>
							<span class="sign-left">:</span>
						</div>
						<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
							<select class="form-control" v-model="empLevel">
								<option value="">--未选择--</option>
								<option value="1">资深级</option>
								<option value="2">专家级</option>
								<option value="3">高级</option>
							</select>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 nopad">
							<p class="end-aline col-md-11 col-lg-11">是否可退款</p>
							<span class="sign-left">:</span>
						</div>
						<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
							<select class="form-control" v-model="isRefund">
								<option value="">--未选择--</option>
								<option value="0">否</option>
								<option value="1">是</option>
							</select>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">产品类型</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<select class="form-control" v-model="proType">
								<option value="">--请选择--</option>
								<option value="0">普通</option>
								<option value="1">月卡</option>
								<option value="2">季卡</option>
								<option value="3">半年卡</option>
								<option value="4">年卡</option>
								<option value="5">测评</option>
							</select>
						</div>
					</div>
					<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-2" data-toggle="modal" v-on:click="getAllAuditPage(1)">查询
					</button>
				</div>
			</div>
		</el-collapse-transition>
		<div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
			<div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
		</div>
		<div class="" id="datatable">
			<el-table :data="tableData" style="width: 100%" :row-key="getRowKeys" border ref="multipleTable" @selection-change="handleSelectionChange">
				<el-table-column type="selection" :reserve-selection="true" width="55" align="center" :selectable='checkboxSelect'></el-table-column>
				<el-table-column prop="storeName" label="店铺" width="100" align="center"></el-table-column>
				<el-table-column prop="empName" label="咨询师" width="100" align="center"></el-table-column>
				<el-table-column prop="empLevelName" label="咨询师等级" width="100" align="center"></el-table-column>
				<el-table-column prop="proName" label="产品名称" width="100" align="center"></el-table-column>
				<el-table-column prop="proType" label="产品类型" :formatter="resetAuditState" width="100" align="center"></el-table-column>
				<el-table-column prop="proStyle" label="产品风格" :formatter="chanstyle" width="100" align="center"></el-table-column>
				<el-table-column prop="totalPrice" label="总价(￥)" width="100" align="center"></el-table-column>
				<el-table-column prop="discouAmount" label="优惠后总价(￥)" width="100" align="center"></el-table-column>
				<el-table-column prop="price" label="单价(￥)" width="100" align="center"></el-table-column>
				<el-table-column prop="frequency" label="课时(小时)" width="100" align="center"></el-table-column>
				<el-table-column prop="discount" label="优惠比例(%)" width="100" align="center"></el-table-column>
				<el-table-column prop="isRefund" label="是否可退款" :formatter="tui" width="100" align="center"></el-table-column>
				<el-table-column prop="endDay" label="到期日期(天)" width="100" align="center"></el-table-column>
			</el-table>
			<el-button class="jh-mr-1 jh-mr-3" style="cursor: pointer;" @click="checkAll" size="mini">全选</el-button>
			<el-button class="jh-mr-1 jh-mr-4" style="cursor: pointer;" @click="toggerCheck" size="mini">反选</el-button>
			<el-row style="margin-top: 20px;">
				<el-col :span="24">
					<el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
					 :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</el-col>
			</el-row>
		</div>
		<div class="xuanzhong_kuang">
			<h2>已选中：</h2>
			<ul>
				<li v-for="item in projectList" :key="item.proId">{{item.storeName}}-{{item.proName}}</li>
			</ul>
		</div>
		<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-2 jh-mr-6" @click="goOff()">返回</button>
		<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-2 jh-mr-5" @click="go1()" v-has="'SAMY:MP:Coupon:Update'">确定</button>

	</div>
</template>


<script>
	import {
		init
	} from '@/../static/js/common.js'
	import store from '../../common/Store.vue'
	import dPicker from 'vue2-datepicker'
	import cou from '../../common/Employee.vue'
	export default {
		components: {
			store,
			dPicker,
			cou
		},
		data() {
			return {
				projectList: [],
				newprojectList: [],
				showSelect: true,
				fixedHeader: false,
				storeId: this.storeId(),
				accountType: this.accountType(),
				tableData: [], // 表格数据 
				//分页需要的数据
				total: 0, //数据的数量
				pages: '', //总页数
				page: 1, //当前页码
				pageSize: 10, //一页显示的数量
				proName: '',
				empId: '',
				empLevel: '',
				isRefund: '',
				isMem: '',
				isuse: '',
				proType: '',
				visType: '',
				auditState: '',
				begCreateDate: '',
				endCreateDate: '',
				addClass: false,
				empDisable: false,
				selectDataFlag: false
			};
		},
		watch: {
			auditName: 'changeData',
			auditState: 'changeData',
			storeId: 'changeData',
			begCreateDate: 'changeData',
			endCreateDate: 'changeData'
		},

		methods: {
			checkboxSelect(row, rowIndex) {
				if (rowIndex == 0) {
					return true // 禁用
				} else {
					return true // 不禁用
				}
			},
			getRowKeys(row) {
				return row.proId;
				this.$refs.projectList.clearSelection();
			},
			handleSelectionChange(val) {
				this.projectList = val;
			},
			checkAll() {
				this.$refs.multipleTable.toggleAllSelection();
			},
			toggerCheck() {
				this.tableData.forEach((item) => {
					this.$refs.multipleTable.toggleRowSelection(item);
				});
			},
			resetDate(row, column, cellValue, index) {
				if (cellValue !== '' && cellValue !== null) {
					return cellValue.substring(0, 10)
				}
			},
			changeData(newVal, oldVal) {
				this.selectDataFlag = true
			},
			chaChange(param) {
				if (this.isBlank(param)) {
					this.chaId = ""
				} else {
					this.chaId = param.chaId
				}
			},
			empChange(param) {
				if (this.isBlank(param)) {
					this.empId = ""
				} else {
					this.empId = param.empId
				}
			},
			//点击确定按钮跳转
			go1() {
				var win = window.localStorage;
				var bb = '';
				for (var i = 0; i < this.projectList.length; i++) {
					this.newprojectList.push(this.projectList[i].proId);
					if (!win) {
						alert("浏览器不支持localstorage");
						return false;
					} else {
						//主逻辑业务
						var storage = window.localStorage;
						for (var i = 0; i < this.projectList.length; i++) {
							bb += this.projectList[i].proId + ",";
						}
						if (bb.length > 0) {
							bb = bb.substr(0, bb.length - 1);
						}
						storage.setItem('projectList',bb)
					}
				}
				// console.log(this.newprojectList)
				this.$router.push({
					path: '../../MP/Coupon/Couponupdate',
				})
			},
			employeeChange(param) {
				if (this.isBlank(param)) {
					this.empId = ""
				} else {
					this.empId = param.empId
				}
			},
			resetAuditState(row, column, cellValue, index) {

				switch (cellValue) {
					case '0':
						return '普通'
						break;
					case '1':
						return '月卡'
						break;
					case '2':
						return '季卡'
						break;
					case '3':
						return '半年卡'
						break;
					case '4':
						return '年卡'
						break;
					case '5':
						return '测评'
						break;
				}
			},
			chanstyle(row, column, cellValue, index) {
				return cellValue == 1 ? "新产品" : "老产品"
			},
			tui(row, column, cellValue, index) {
				return cellValue == 1 ? "是" : "否"
			},

			storeChange: function(param) {
				if (this.isBlank(param)) {
					this.storeId = ""
				} else {
					this.storeId = param.storeId
				}
			},

			dataOpen() {
				if (this.showSelect) return
				this.showSelect = true;
			},
			dataClose() {
				this.showSelect = !this.showSelect
				this.addClass = true;

				setTimeout(() => {
					this.addClass = false;
				}, 400)
			},
			//feedback department information
			positionChange: function(param) {
				if (this.isBlank(param)) {
					this.posId = ""
				} else {
					this.posId = param.posId
				}
			},

			tabChange(item) {
				this.getConsultStore()

			},
			editorAction(item) {
				this.objectContent = item
			},

			//check the list of department
			getAllAuditPage(num) {
				if (num == 1) {
					this.page = 1
				}

				this.showSelect = false
				var userList = localStorage.getItem('projectList');
				var stringResult2 = userList.split(',');
				if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 23:59:00.000')
				}
				var url = this.url + '/projects/queryAllByParams'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						page: this.page,
						pageSize: this.pageSize,
						storeId: this.storeId,
						proName: this.proName,
						empId: this.empId,
						state: this.isuse,
						empLevel: this.empLevel,
						isRefund: this.isRefund,
						proType: this.proType
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						this.pages = res.retData.pages //总页数
						this.page = res.retData.current //当前页码
						this.pageSize = res.retData.size //一页显示的数量  必须是奇数
						this.total = res.retData.total //数据的数量
						this.tableData = res.retData.records
						for (let i = 0; i < this.tableData.length; i++) {
							if (stringResult2.includes(this.tableData[i].proId + '')) {
								this.$refs.multipleTable.toggleRowSelection(this.tableData[i])
							}
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});

				this.selectDataFlag = false;

			},
			//点击返回按钮跳转
			goOff() {
				this.$router.go(-1);
			},
			// 翻页
			handleCurrentChange(pageNum) {
				this.page = pageNum
				this.getAllAuditPage()
			},
			// 每页条数变化时触发
			handleSizeChange(pageSize) {
				this.page = 1
				this.pageSize = pageSize
				this.getAllAuditPage(1)
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
			window.addEventListener('scroll', this.handleScroll, true);
			init();
		},
		created() {
			this.getAllAuditPage()
		}
	}
</script>

<style scoped="scoped">
	.xuanzhong_kuang {
		margin-top: 20px;
		border: 1px solid #DDDDDD;
		width: 100%;
		overflow: auto;
		margin-bottom: 20px;
		;
	}

	.xuanzhong_kuang h2 {
		text-align: left;
		margin-top: 10px;
		font-weight: bold;
		margin-left: 20px;
		font-size: 16px;
		margin-bottom: 10px;
	}

	.xuanzhong_kuang ul {
		margin-left: 20px;
		overflow: auto;
	}

	.xuanzhong_kuang ul li {
		width: 150px;
		height: 30px;
		float: left;
		margin-bottom: 10px;
		line-height: 30px;
		text-align: center;
		border: 1px solid #DDDDDD;
		margin-right: 10px;
	}

	.xuanzhong_kuang ul li:nth-child(10n) {
		margin-bottom: 0;
	}

	.xuanzhong_kuang ul li:last-child {
		margin-right: 0;
	}

	.jh-mr-1 {
		border: none;
		margin-top: 20px;
	}

	#datatable .jh-mr-3 {
		color: #fff;
		float: left;
		background-color: rgb(72, 196, 65);
	}

	#datatable .jh-mr-4 {
		color: #fff;
		margin-right: 88%;
		background-color: rgb(186, 107, 234);
	}

	.jh-mr-5 {
		border: none;
		margin-bottom: 20px;
		background-color: rgb(22, 155, 213);
	}

	.jh-mr-6 {
		outline: none;
		border: none;
		margin-bottom: 20px;
		background-color: rgb(213, 170, 22);
	}
	.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
		background-color: #409eff!important;
		border-color: #409eff!important;
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

	input.editradio[type='radio'] {
		width: 20px;
		height: 20px;
		opacity: 0;
	}

	label.editlabel {
		position: absolute;
		left: 13px;
		bottom: 11px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 1px solid #999;
		z-index: 99;
	}

	@media print {
		#fHeader {
			display: none
		}
	}
</style>
