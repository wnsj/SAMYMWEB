<!-- the page of department management -->
<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">查看产品</h1>
		</div>
		<h2>被选中的产品：</h2>
		<div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
			<div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
		</div>
		<div class="" id="datatable">
			<el-table :data="selectchan" style="width: 100%" :row-key="getRowKeys" border ref="multipleTable">
				<el-table-column type="selection" width="55" align="center" label="全选" :reserve-selection="true" :selectable='checkboxSelect'></el-table-column>
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
			<!-- <el-row style="margin-top: 20px;">
				<el-col :span="24">
					<el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
					 :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</el-col>
			</el-row> -->
		</div>
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
	export default {
		components: {
			store,
			dPicker,
			cha,
			emp
		},
		data() {
			return {
				showSelect: true,
				fixedHeader: false,
				storeId: this.storeId(),
				accountType: this.accountType(),
				tableData: [],
				//分页需要的数据
				total: 0, //数据的数量
				pages: '', //总页数
				current: 1, //当前页码
				pageSize: 99999, //一页显示的数量
				auditName: '',
				memName: '',
				isMem: '',
				visType: '',
				auditState: '',
				addClass: false,
				empDisable: false,
				selectDataFlag: false,
				selectchan:[]
			};
		},

		methods: {
			//子级传值到父级上来的动态拿去
			pageChange: function (page) {
			    this.current = page
			    this.getAllAuditPage(page);
			},
			checkboxSelect(row, rowIndex) {
				if (rowIndex == 0) {
					return false // 禁用
				} else {
					return false // 不禁用
				}
			},
			getRowKeys(row) {
				return row.proId;
			},
			resetAuditState(row, column, cellValue, index) {
				console.log(typeof(cellValue))
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
			//查询
			getAllAuditPage() {
				if (this.selectDataFlag) {
					this.current = 1
				}
				var userList = localStorage.getItem('projectList');
				var stringResult2 = userList.split(',');
				console.log(stringResult2)
				this.showSelect = false
				var url = this.url + '/projects/queryAllByParams'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						current: this.current,
						pageSize: this.pageSize
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						this.pages = res.retData.pages //总页数
						this.current = res.retData.current //当前页码
						this.pageSize = res.retData.size //一页显示的数量  必须是奇数
						this.total = res.retData.total //数据的数量
						this.tableData = res.retData.records
						for (let i = 0; i < this.tableData.length; i++) {
							console.log(this.tableData[i].proId + '')
							if (stringResult2.includes(this.tableData[i].proId + '')) {
								console.log(this.tableData[i].proId + '')
								this.$refs.multipleTable.toggleRowSelection(this.tableData[i])
								this.selectchan.push(this.tableData[i])
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
			goOff() {
				this.$router.go(-1);
			},
			// // 翻页
			// handleCurrentChange(pageNum) {
			// 	this.current = pageNum
			// 	this.getAllAuditPage()
			// },
			// // 每页条数变化时触发
			// handleSizeChange(pageSize) {
			// 	this.current = 1
			// 	this.pageSize = pageSize
			// 	this.getAllAuditPage()
			// },
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
	.wraper h2 {
		font-size: 18px;
		text-align: left;
		margin-left: 20px;
		font-weight: bold;
		margin-bottom: 20px;
	}

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
		width: 85px;
		height: 30px;
		margin-bottom: 10px;
		line-height: 30px;
		text-align: center;
		border: 1px solid #DDDDDD;
		margin-right: 10px;
	}

	.xuanzhong_kuang ul li:nth-child(10n) {
		margin-right: 0;
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
		background-color: rgb(72, 196, 65);
	}

	#datatable .jh-mr-4 {
		background-color: rgb(186, 107, 234);
	}

	.jh-mr-5 {
		border: none;
		margin-bottom: 20px;
		background-color: rgb(22, 155, 213);
	}

	.jh-mr-6 {
		margin-top: 20px;
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
