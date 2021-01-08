<!-- the page of department management -->
<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">选择用户</h1>
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
							<p class="end-aline col-md-11 col-lg-11">姓名</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="visitorName">
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">渠道</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<cha ref="cha" @channelChange="chaChange"></cha>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="margin-bottom: 20px;">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">转会员</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<select class="form-control" v-model="isMem">
								<option value="">--未选择--</option>
								<option value="1">已转会员</option>
								<option value="2">未转会员</option>
							</select>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">访问类型</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<select class="form-control" v-model="visType">
								<option value="">--未选择--</option>
								<option value="1">初访</option>
								<option value="2">复访</option>
							</select>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">接待人</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<emp :disabled="empDisable" ref="emp" @employeeChange="employeeChange"></emp>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">客户判定</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<judgeState ref="judgeStateRef" @objectChange="judgeStateChange"></judgeState>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">续流状态</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<continueState ref="continueStateRef" @objectChange="continueStateChange"></continueState>
						</div>
					</div>
					<button type="button" style="margin-top: 20px;" class="btn btn-primary pull-right m_r_10 jh-mr-2" data-toggle="modal"
					 v-on:click="getAllAuditPage(1)">查询
					</button>
				</div>
			</div>
		</el-collapse-transition>
		<div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
			<div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
		</div>
		<div class="" id="datatable">
			<el-table :data="tableData" style="width: 100%" :row-key="getRowKeys" border ref="multipleTable" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" :reserve-selection="true" align="center" label="全选"></el-table-column>
				<el-table-column type="index" prop="visId" label="序号" width="60" align="center"></el-table-column>
				<el-table-column prop="visitorName" label="姓名" width="100" align="center"></el-table-column>
				<el-table-column prop="sex" label="性别" :formatter="sex" width="100" align="center"></el-table-column>
				<el-table-column prop="birthday" label="生日" :formatter="resetDate" width="100" align="center"></el-table-column>
				<el-table-column prop="storeName" label="店铺" width="100" align="center"></el-table-column>
				<el-table-column prop="channelName" label="渠道" width="100" align="center"></el-table-column>
				<el-table-column prop="dtName" label="咨询方向" width="100" align="center"></el-table-column>
				<el-table-column prop="empName" label="接待人" width="100" align="center"></el-table-column>
				<el-table-column prop="visType" label="访问类型" :formatter="resetVisit" width="100" align="center"></el-table-column>
				<el-table-column prop="vsIdJudgeName" label="客户判定" width="100" align="center"></el-table-column>
				<el-table-column prop="vsIdFlowName" label="续流状态" width="100" align="center"></el-table-column>
				<el-table-column prop="createTime" label="添加时间" :formatter="resetDate" width="100" align="center"></el-table-column>
				<el-table-column prop="isMem" label="是否转会员" :formatter="resetArrears" width="100" align="center"></el-table-column>
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
				<li v-for="item in userList" :key="item.visId">{{item.visId}}-{{item.visitorName}}</li>
			</ul>
		</div>
		<button type="button" class="btn btn-primary pull-center m_r_10 jh-mr-2 jh-mr-5" @click="go1()" v-has="'SAMY:MP:Coupon:Add'">确定</button>
		<button type="button" class="btn btn-primary pull-center m_r_10 jh-mr-2 jh-mr-6" @click="goOff()">返回</button>
	</div>
</template>


<script>
	import {
		init
	} from '@/../static/js/common.js'
	import store from '../../common/Store.vue'
	import dPicker from 'vue2-datepicker'
	import cha from '../../common/Channel.vue'
	import emp from '../../common/Employee.vue'
	import judgeState from '../../common/VisitState.vue' //咨客判定
	import continueState from '../../common/VisitState.vue' //续流状态
	export default {
		components: {
			store,
			dPicker,
			cha,
			emp,
			judgeState,
			continueState
		},
		data() {
			return {
				userList: [],
				newuserList: [],
				showSelect: true,
				multipleSelection: [],
				fixedHeader: false,
				storeId: this.storeId(),
				accountType: this.accountType(),
				tableData: [],
				//分页需要的数据
				total: 0, //数据的数量
				pages: '', //总页数
				page: 1, //当前页码
				pageSize: 10, //一页显示的数量
				chaId: '',
				auditName: '',
				empId: '',
				visitorName: '',
				judgeState: '', //咨客判定
				continueState: '', //续流状态
				memName: '',
				isMem: '',
				visType: '',
				auditState: '',
				// 列表全选与否
				allSelect: false,
				begCreateDate: '',
				endCreateDate: '',
				addClass: false,
				empDisable: false,
				cheackAllChecked: false,
				checkArr: [],
				checkCompleteArr: [],
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

			//咨客判定
			judgeStateChange: function(param) {
				// console.log(JSON.stringify(param))
				if (this.isBlank(param)) {
					this.judgeState = ""
				} else {
					this.judgeState = param.vsId
				}
			},
			//续流状态
			continueStateChange: function(param) {
				if (this.isBlank(param)) {
					this.continueState = ""
				} else {
					this.continueState = param.vsId
				}
			},
			getRowKeys(row) {
				return row.visId;
				this.userList.clearSelection();
				this.userList = this.arrayDistint(this.userList);
			},
			arrayDistint(arr) {
				var i, j,
					len = arr.length;
				for (i = 0; i < len; i++) {
					for (j = i + 1; j < len; j++) {
						if (arr[i] == arr[j]) {
							arr.splice(j, 1);
							len--;
							j--;
						}
					}
				}
				return arr;
			},
			checkAll() {
				this.$refs.multipleTable.toggleAllSelection();
			},
			toggerCheck() {
				this.tableData.forEach((item) => {
					this.$refs.multipleTable.toggleRowSelection(item);
				});
			},
			handleSelectionChange(val) {
				console.log(1)
				// this.userList = val;
				this.userList = [];
				var obj = {};
				for (var i = 0; i < val.length; i++) {
					if (!obj[val[i].visId]) {
						this.userList.push(val[i]);
						obj[val[i].visId] = true;
					}
				}
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
			//点击确定按钮跳转
			go1() {
				var win = window.localStorage;
				var bb = '';
				for (var i = 0; i < this.userList.length; i++) {
					this.newuserList.push(this.userList[i].visId);
					if (!win) {
						alert("浏览器不支持localstorage");
						return false;
					} else {
						//主逻辑业务
						var storage = window.localStorage;
						for (var i = 0; i < this.userList.length; i++) {
							bb += this.userList[i].visId + ",";
						}
						if (bb.length > 0) {
							bb = bb.substr(0, bb.length - 1);
						}
						storage.setItem('userList', bb)
					}
				}
				// console.log(this.newprojectList)
				this.$router.push({
					path: '../../MP/Coupon/CouponAdd',
				})
			},
			employeeChange(param) {
				if (this.isBlank(param)) {
					this.empId = ""
				} else {
					this.empId = param.empId
				}
			},
			resetDate(row, column, cellValue, index) {
				if (cellValue !== '' && cellValue !== null) {
					return cellValue.substring(0, 10)
				}
			},
			resetVisit(row, column, cellValue, index) {
				return cellValue == 1 ? "初访" : "复访"
			},
			resetArrears(row, column, cellValue, index) {
				return cellValue == 1 ? "已转会员" : "未转会员"
			},
			sex(row, column, cellValue, index) {
				return cellValue == 1 ? "男" : "女"
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
				var projectList = localStorage.getItem('userList');
				var stringResult1 = projectList.split(',');
				var url = this.url + '/visitorAction/queryVisitor'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						storeId: this.storeId,
						visitorName: this.visitorName,
						chaId: this.chaId,
						isMem: this.isMem,
						visType: this.visType,
						empId: this.empId,
						vsIdJudge: this.judgeState,
						vsIdFlow: this.continueState,
						page: this.page,
						pageSize: this.pageSize
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
							if (stringResult1.includes(this.tableData[i].visId + '')) {
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
			this.$refs.judgeStateRef.getObj(1, 1)
			this.$refs.continueStateRef.getObj(1, 2)
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
		height: 40px;
		float: left;
		margin-bottom: 10px;
		line-height: 40px;
		text-align: center;
		border: 1px solid #DDDDDD;
		margin-right: 10px;
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
