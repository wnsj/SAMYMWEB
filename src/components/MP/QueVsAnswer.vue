<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">咨客问卷调查结果</h1>
		</div>
		<el-collapse-transition>
			<div class="top" v-show="showSelect">
				<el-form label-position="right" :inline="true" size="small" :model="param">
					<el-row style="margin-top: 2%">
						<el-col :span="6">
							<el-form-item label="咨客:">
								<el-input @change="initPage" v-model="param.vsName" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="门店:">
								<el-select @change="storeChange" v-model="param.storeId" filterable clearable placeholder="请选择">
									<el-option v-for="item in storeList" :key="item.storeId" :label="item.storeName" :value="item.storeId">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="咨询师:">
								<el-select @change="initPage" v-model="param.couId" filterable clearable placeholder="请选择">
									<el-option v-for="item in couList" :key="item.empId" :label="item.empName" :value="item.empId">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="顾问:">
								<el-select @change="initPage" v-model="param.conId" filterable clearable placeholder="请选择">
									<el-option v-for="item in conList" :key="item.empId" :label="item.empName" :value="item.empId">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>

					<div style="position: absolute;">
						<el-form-item label="咨询师评分:">
							<el-col :span="4">
								<el-input @change="initPage" v-model="param.begScore" clearable></el-input>
							</el-col>
							<el-col :span="2">
								<span> - </span>
							</el-col>
							<el-col :span="4">
								<el-input @change="initPage" v-model="param.endScore" clearable></el-input>
							</el-col>
						</el-form-item>
					</div>
					<div style="position: absolute;margin-left: 25%">
						<el-form-item label="顾问评分:">
							<el-col :span="4">
								<el-input @change="initPage" v-model="param.begConScore" clearable></el-input>
							</el-col>
							<el-col :span="2">
								<span>
									-
								</span>
							</el-col>
							<el-col :span="4">
								<el-input @change="initPage" v-model="param.endConScore" clearable></el-input>
							</el-col>
						</el-form-item>
					</div>

					<div style="position: absolute;margin-left: 48.5%">
						<el-form-item label="店铺评分:">
							<el-col :span="4">
								<el-input @change="initPage" v-model="param.begStoreScore" clearable></el-input>
							</el-col>
							<el-col :span="2">
								<span>
									-
								</span>
							</el-col>
							<el-col :span="4">
								<el-input @change="initPage" v-model="param.endStoreScore" clearable></el-input>
							</el-col>
						</el-form-item>
					</div>

					<div style="position: absolute;margin-left: 74.6%">
						<el-form-item label="问卷:">
							<el-select @change="initPage" v-model="param.queId" filterable clearable placeholder="请选择" style="margin-left: -1px;">
								<el-option v-for="item in queList" :key="item.id" :label="item.queName" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</div>

					<el-row style="margin-top: 4%">
						<el-col :span="12" :push="11">
							<el-button type="primary" size="small" style="width: 85px" @click="getAnswerByCondition" class="jh-fr">查询
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</el-collapse-transition>
		<div class="arrow-bottom jh-wd-100 jh-po-re" @click="showSelect = !showSelect" @mouseenter="dataOpen">
			<div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
		</div>

		<div style="margin-top: 1%">
			<el-table :data="tableData" :cell-style="cellStyle" :max-height="tableHeight" @row-dblclick="toDetails"
			 :header-cell-style="headerStyle" style="width: 95%;margin: 20px auto 20px" :summary-method="getSummaries"
			 show-summary border>
				<el-table-column align="center" prop="vsName" label="咨客姓名" min-width="100">
				</el-table-column>
				<el-table-column align="center" prop="couName" label="咨询师" min-width="100">
				</el-table-column>
				<el-table-column align="center" prop="conName" label="咨询顾问" min-width="100">
				</el-table-column>
				<el-table-column align="center" prop="storeName" label="店铺" min-width="100">
				</el-table-column>
				<el-table-column align="center" prop="score" label="咨询师评分" min-width="100">
				</el-table-column>
				<el-table-column align="center" prop="empScore" label="咨询顾问评分" min-width="100">
				</el-table-column>
				<el-table-column align="center" prop="storeScore" label="店铺评分" min-width="100">
				</el-table-column>
				<el-table-column align="center" prop="phone" label="联系方式" min-width="100">
				</el-table-column>
				<el-table-column align="center" prop="visitTime" :formatter="dateFormat" label="来访时间" min-width="100">
				</el-table-column>
				<el-table-column align="center" prop="queName" label="问卷" min-width="100">
				</el-table-column>
			</el-table>
			<el-row class="second_interval">
				<el-col :span="24">
					<el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="param.pageNum"
					 :page-sizes="[10,20,30,50]" :page-size="param.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalAmount">
					</el-pagination>
				</el-col>
			</el-row>

			<p class="tips">* 双击单行，可查看当前数据</p>
		</div>

		<el-dialog :visible.sync="dialogVisible" width="40%">
			<div slot="title" class="wj-title">问卷调查</div>
			<!--				<el-card class="form-container" shadow="never">-->
			<el-form :model="select" label-position="right" label-width="110px" size="small">
				<el-row>
					<div class="ques-info ques-tit"><span>问卷调查名称：</span> {{select.queName}}</div>
					<!-- <el-col :span="12">
                        <el-form-item label="问卷调查名称：">
                            <el-input v-model="select.queName"></el-input>
                        </el-form-item>
                    </el-col> -->
				</el-row>
				<el-form-item v-for="(item,index) in select.problemBeanList" :key="item.proSort" label-width="0px">
					<el-card>
						<div class="ques-info"><span>{{item.proSort}}. </span> {{item.proLabel}}</div>

						<template>
							<div class="ques-info" v-if="item.proType==1 && item.selectedAnswer">
								<!-- <span v-if="item.selectedAnswer==1">选项答案：是</span>
								<span v-else>选项答案：否</span> -->
                                <span>答案：{{item.selectedAnswer==1?'是':'否'}}</span>
							</div>
							<div class="ques-info" v-else-if="item.proType==2 && item.selectedAnswer">
								<span>答案：{{item.selectedAnswer}}分</span>
							</div>
                            <div class="ques-info" v-else>
                            	<span>答案：暂无</span>
                            </div>
						</template>

						<div class="ques-info" v-if="item.describeAnswer"><span>描述答案： </span> {{item.describeAnswer}}</div>
					</el-card>
				</el-form-item>


				<!-- <el-form-item v-for="(item,index) in select.problemBeanList" :key="item.proSort">
                    <el-card>
                        <el-form-item label="问题序号：">
                            <el-input v-model="item.proSort"></el-input>
                        </el-form-item>
                        <el-form-item label="问题描述：">
                            <el-input v-model="item.proLabel"></el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span="12" v-if="item.selectedAnswer">
                                <el-form-item label="选项答案：">
                                    <el-input v-model="item.selectedAnswer"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" v-if="item.describeAnswer">
                                <el-form-item label="描述答案：">
                                    <el-input v-model="item.describeAnswer"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-form-item> -->
			</el-form>
		</el-dialog>

	</div>
</template>

<script>
	import dateUtil from "../common/utils/dateUtil";

	export default {
		components: {},
		data() {
			return {
				tableHeight: $(window).height() - 380,
				param: {
					pageNum: 1,
					pageSize: 10,
					vsId: '',
					vsName: '',
					couId: '',
					conId: '',
					queId: '',
					begScore: '',
					endScore: '',
					begStoreScore: '',
					endStoreScore: '',
					begConScore: '',
					endConScore: '',
					storeId: this.storeId()
				},
				select: {
					queName: '',
					queState: '',
					problemBeanList: []
				},
				queVisitorList: [],
				storeList: [],
				couList: [],
				conList: [],
				queList: [],
				tableData: [],
				totalAmount: 0,
				dialogVisible: false,
				accountType: this.accountType(),
				showSelect: true
			};
		},
		methods: {
			dataOpen() {
				if (this.showSelect) return
				this.showSelect = true;
			},
			// 表格表头样式
			headerStyle() {
				return 'text-align: center;color: black;'
			},
			// 表格行样式
			cellStyle() {
				return 'text-align: center;'
			},
			// 获取咨客
			getQueVisitor() {
				var url = this.url + '/queVisitor/getAllQueVs'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.retData.length > 0) {
							this.queVisitorList = res.retData
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					//console.log('岗位数据请求失败处理')
				});
			},
			initPage() {
				this.param.pageNum = 1
			},
			storeChange() {
				this.param.pageNum = 1
				this.getCou()
				this.getCon()
			},
			// 获取门店
			getStore() {
				var url = this.url + '/storeAction/queryStore'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						isuse: '1'
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.storeList = res.retData
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					//console.log('岗位数据请求失败处理')
				});
			},

			getCou() {
				var url = this.url + '/employeeAction/getAllEmpByPosName'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						storeId: this.param.storeId,
						posName: "咨询师"
					},
					dataType: 'json',
				}).then(res => {
					this.couList = res.data.retData
				}).catch(error => {
					console.log(error);
				})
			},
			getCon() {
				var url = this.url + '/employeeAction/getAllEmpByPosName'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						storeId: this.param.storeId,
						posName: "咨询顾问"
					},
					dataType: 'json',
				}).then(res => {
					this.conList = res.data.retData
				}).catch(error => {
					console.log(error);
				})
			},
			getQue() {
				var url = this.url + '/questionnaireBean/getAllQue'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {},
					dataType: 'json',
				}).then(res => {
					this.queList = res.data.retData
				}).catch(error => {
					console.log(error);
				})
			},
			toDetails(row, column, event) {
				this.dialogVisible = true
				this.select.queName = row.queName
				var url = this.url + '/answerBean/getAnswerByQueId'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						vsId: row.vsId,
						queId: row.queId
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.retData) {
							this.select.problemBeanList = res.retData
						}

					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					//console.log('岗位数据请求失败处理')
				});
			},
			// 格式化时间
			dateFormat: function(row, column, cellValue, index) {
				return dateUtil.getFormateDateYMD(cellValue)
			},
			// 获取初访咨询方向汇总数据
			async getAnswerByCondition() {
				this.showSelect = false;

				if (parseInt(this.param.begScore) < 0 || parseInt(this.param.endScore) < 0 || parseInt(this.param.begScore) >
					parseInt(this.param.endScore)) {
					alert('咨询师分数区间填写有误，重新填写')
					return
				}
				if (parseInt(this.param.begStoreScore) < 0 || parseInt(this.param.endStoreScore) < 0 || parseInt(this.param.begStoreScore) >
					parseInt(this.param.endStoreScore)) {
					alert('店铺分数区间填写有误，重新填写')
					return
				}
				if (parseInt(this.param.begConScore) < 0 || parseInt(this.param.endConScore) < 0 || parseInt(this.param.begConScore) >
					parseInt(this.param.endConScore)) {
					alert('顾问分数区间填写有误，重新填写')
					return
				}
				var url = this.url + '/answerBean/getAnswerByCondition'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.param,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.tableData = res.retData.records
						this.totalAmount = res.retData.total
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					//console.log('岗位数据请求失败处理')
				});
			},
			getSummaries(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '总分/平均分';
						return;
					}
					const values = data.map(item => Number(item[column.property]));
					if (!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if (!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0);
						if (index === 4) {
							sums[index] = sums[index] + ' 分' + ' / ' + (sums[index] / this.tableData.length).toFixed(1) + ' 分';
						} else if (index === 5) {
							sums[index] = sums[index] + ' 分' + ' / ' + (sums[index] / this.tableData.length).toFixed(1) + ' 分';
						} else if (index === 6) {
							sums[index] = sums[index] + ' 分' + ' / ' + (sums[index] / this.tableData.length).toFixed(1) + ' 分';
						} else {
							sums[index] = '';
						}
					} else {
						sums[index] = '';
					}
				});

				return sums;
			},
			// 翻页
			handleCurrentChange(pageNum) {
				this.param.pageNum = pageNum
				this.getAnswerByCondition()
			},
			// 每页条数变化时触发
			handleSizeChange(pageSize) {
				this.param.pageNum = 1
				this.param.pageSize = pageSize
				this.getAnswerByCondition()
			},
		},
		created() {
			this.getQueVisitor()
			this.getStore()
			this.getCou()
			this.getCon()
			this.getQue()
			// this.getAnswerByCondition()
		}

	}
</script>

<style scoped>
	.wj-title {
		font-weight: bold;
		font-size: 20px;
	}

	.ques-info {
		text-align: left;
	}

	.ques-tit {
		margin-bottom: 20px;
		font-size: 16px;
	}

	.el-form-item label:after {
		content: "";
		display: inline-block;
		width: 100%;
	}

	.el-form-item__label {
		color: #2c3e50;
		text-align: justify;
		height: 30px;
	}

	.el-form-item.is-required .el-form-item__label:before {
		content: none !important;
	}

	.el-form-item__content {
		width: 50%;
	}

	.el-form--inline .el-form-item__content {
		width: 100px;
	}

	.jh-pr-28 .el-input--small .el-input__inner {
		width: 20px;
	}
</style>
