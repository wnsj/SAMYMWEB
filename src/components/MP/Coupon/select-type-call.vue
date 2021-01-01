<!-- the page of department management -->
<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">查看分类</h1>
		</div>
		<h2>被选中的分类：</h2>
		<div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
			<div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
		</div>
		<div>{{info}}</div>
		<div class="" id="datatable">
			<el-table :data="selectlist" style="width: 100%" border :row-key="getRowKeys" ref="multipleTable" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="100" align="center" :reserve-selection="true" :selectable='checkboxSelect' :class="showSelect?'false':'true'"></el-table-column>
				<el-table-column prop="typeName" label="类型名称" width="230" align="center"></el-table-column>
				<el-table-column prop="state" :formatter="resetAuditState" label="使用状态" width="230" align="center"></el-table-column>
			</el-table>
		</div>
		<button type="button" class="btn btn-primary pull-center m_r_10 jh-mr-2 jh-mr-6" @click="goOff()">返回</button>
	</div>
</template>
<script>
	import {
		init
	} from '@/../static/js/common.js'
	import dPicker from 'vue2-datepicker'
	export default {
		components: {
			dPicker
		},
		data() {
			return {
				showSelect: true,
				tableData: [],
				addClass: false,
				selectlist:[]
			};
		},
		methods: {
			checkboxSelect(row, rowIndex) {
				if (rowIndex == 0) {
					return false // 禁用
				} else {
					return false // 不禁用
				}
			},
			handleSelectionChange(val) {
				this.categoryList = val;
				console.log(val)
			},
			getRowKeys(row) {
				return row.prtId;
			},
			resetAuditState(row, column, cellValue, index) {
				switch (cellValue) {
					case '1':
						return '在用'
						break;
					case '2':
						return '停用'
						break;
				}
			},
			changeData(newVal, oldVal) {
				this.selectDataFlag = true
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
			getAllAuditPage() {
				this.showSelect = false
				var categoryList = localStorage.getItem('categoryList');
				var stringResult = categoryList.split(',');
				console.log(stringResult)
				if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 23:59:00.000')
				}
				var url = this.url + '/couponController/selectProductType'
				this.$ajax({
					method: 'GET',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						this.tableData = res.retData
						for (let i = 0; i < this.tableData.length; i++) {
							if (stringResult.includes(this.tableData[i].prtId + '')) {
								 this.$refs.multipleTable.toggleRowSelection(this.tableData[i])
								 this.selectlist.push(this.tableData[i])
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
		margin-left: auto;
		margin-right: auto;
		width: -moz-fit-content;
		width: -webkit-fit-content;
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
