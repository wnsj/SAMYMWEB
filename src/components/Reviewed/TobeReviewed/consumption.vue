<!-- the page of department management -->
<template>

	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">消费审核</h1>
		</div>
		<el-collapse-transition>
			<div v-show="showSelect">
				<div class="row newRow">

					<div class="col-xs-3 col-sm- col-md-3 col-lg-3">
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
							<p class="end-aline col-md-11 col-lg-11 jh-pa-1">姓名</p><span class="sign-left">:</span>
						</div>
						<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
							<input class="form-control" type="text" v-model="memName">
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-has="'SAMY:MP:STORE'">
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
							<p class="end-aline col-md-11 col-lg-11 jh-pa-1">门店</p><span class="sign-left">:</span>
						</div>
						<div class="col-xs-7 col-sm-7 col-md-7 col-lg-8=7">
							<store ref="store" @storeChange='storeChange'></store>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11" >优惠券类型</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<select class="form-control" v-model="couponType">
								<option value="">--未选择--</option>
								<option value="2">满减</option>
								<option value="1">满折</option>
							</select>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-7 col-lg-7 text-right nopad" style="margin-right: -50px;">
							<p class="end-aline col-md-11 col-lg-11" style="margin-left: -40px;" >是否使用优惠券</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<select class="form-control" v-model="isUseCoupon">
								<option value="">--未选择--</option>
								<option value="1">是</option>
								<option value="2">否</option>
							</select>
						</div>
					</div>

					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="margin-top: 20px;">
						<div class="col-md-3 col-lg-3 text-right nopad SSwid20" style="width: 20%;">
							<p class="end-aline col-md-11 col-lg-11">消费日期</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-4 col-lg-4 SSwid27" style="width: 28%;">
							<dPicker class="wd100" v-model="begCreateDate"></dPicker>
						</div>
						<div class="pull-left end-aline nopad">
							~
						</div>
						<div class="col-md-4 col-lg-4 SSwid27" style="width: 28%;">
							<dPicker class="wd100" v-model="endCreateDate"></dPicker>
						</div>
					</div>
				</div>


			</div>
		</el-collapse-transition>

		<div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
			<div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
		</div>

		<div class="row newRow">
			<button type="button" class="btn btn-success pull-left m_r_10 jh-mr-2" data-toggle="modal" style="margin-left:2.5%"
			 v-on:click="btnAction('1')">通过
			</button>
			<button type="button" class="btn btn-danger pull-left m_r_10" data-toggle="modal" v-on:click="btnAction('2')"> 驳回
			</button>
			<button type="button" class="btn btn-danger1 pull-left m_r_10" data-toggle="modal" style="margin-left:2.5%"
			 v-on:click="btnAction('3')"> 舍弃
			</button>
			<button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-2" data-toggle="modal" v-on:click="exportTable()">导出
			</button>
			<button type="button" class="btn btn-info pull-right m_r_10 jh-mr-2" data-toggle="modal" v-on:click="reset()">重置
			</button>
			<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-2" data-toggle="modal" v-on:click="getApproveFind(1)">查询
			</button>
		</div>

		<div class="tableBox">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive">
					<table class="table table-bordered table-hover jh-po-re" id="datatable">
						<thead>
							<tr>
								<th class="text-center">编辑</th>
								<th class="text-center">姓名</th>
								<th class="text-center">客户序号</th>
								<th class="text-center">产品名称</th>
								<th class="text-center">单价</th>
								<th class="text-center">课时（小时）</th>
								<th class="text-center">折扣（%）</th>
								<th class="text-center">消费金额</th>
								<th class="text-center">定金</th>
								<th class="text-center">咨询师</th>
								<th class="text-center">咨询顾问</th>
								<th class="text-center">访问类型</th>
								<th class="text-center">咨客判定</th>
								<th class="text-center">续流状态</th>
								<th class="text-center">付款方式</th>
								<th class="text-center">消费时间</th>
								<th class="text-center">购买时间</th>
								<th class="text-center">优惠券类型</th>
								<th class="text-center">优惠券名字</th>
								<th class="text-center">优惠金额(元)</th>
								<th class="text-center;">备注</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in approveFindList" :key="index" @dblclick="showDetails(item)">
								<td class="text-center editradio-box">
									<input :id="'edit'+(index+1)" class="editradio" type="radio" name="复选框" :value="index" v-model="checkedValue" @change="xiao(item)" />
									<label :for="'edit'+(index+1)" class="editlabel"></label>
								</td>
								<td class="text-center">{{item.memName}}</td>
								<td class="text-center">{{item.memNum}}</td>
								<td class="text-center">{{item.proName}}</td>
								<td class="text-center">{{item.price}}</td>
								<td class="text-center">{{item.consumCount}}</td>
								<td class="text-center">{{item.discount}}</td>
								<td class="text-center">{{item.realCross}}</td>
								<td class="text-center">{{item.cashMoney}}</td>
								<td class="text-center">{{item.visitorName}}</td>
								<td class="text-center">{{item.empName}}</td>
								<td class="text-center">{{item.visitType | formatVisit}}</td>
								<td class="text-center">{{item.vsName}}</td>
								<td class="text-center">{{item.continName}}</td>
								<td class="text-center">{{item.psName}}</td>
								<td class="text-center">{{item.sourceDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td class="text-center">{{item.buyTime | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td class="text-center">{{transforProType(item.couponType)}}</td>
								<td class="text-center">{{item.couponName}}</td>
								<td class="text-center">{{item.couponAmount}}</td>
								<td class="text-center">{{item.remark}}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--分页插件-->
				<div class="page">
					<!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
					<paging ref="paging" @change="pageChange"></paging>
				</div>
			</div>
		</div>

		<!-- 驳回弹窗 -->
		<div class="row row_edit">
			<div class="modal fade" id="rejectionContent">
				<div class="modal-dialog wd600">
					<rejection ref='rejection' @func='feedBack()'></rejection>
				</div>
			</div>
		</div>
		<!-- 舍弃弹窗 -->
		<div class="row row_edit">
			<div class="modal fade" id="rejectionContent1">
				<div class="modal-dialog wd600">
					<rejections ref='rejections' @func='feedBack()'></rejections>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="consumptionModal">
				<div class="modal-dialog wd1000">
					<infoDetail ref='infoDetail'></infoDetail>
				</div>
			</div>
		</div>


	</div>

</template>


<script>
	import {
		init
	} from '@/../static/js/common.js'
	import store from '../../common/Store.vue'
	import dPicker from 'vue2-datepicker'
	import Paging from '../../common/paging'
	import rejection from '../../MP/SubRecharge/rejection.vue'
	import rejections from '../../MP/SubRecharge/rejection.vue'
	import infoDetail from '../../MP/SubRecharge/auditInfoDetail.vue'
	export default {
		components: {
			store,
			dPicker,
			Paging,
			rejection,
			rejections,
			infoDetail
		},
		data() {
			return {
				isUseCoupon:'',
				couponType:'',
				approveFindList: [],
				visitorList: [],
				isuse: '1',
				memName: '',
				fixedHeader: false,
				storeId: this.storeId(),
				accountType: this.accountType(),
				name: '',
				cId: '',
				tableData: [],
				checkedValue: -1,
				objectContent: {},
				//分页需要的数据
				pages: '', //总页数
				page: '1', //当前页码
				pageSize: '10', //一页显示的数量
				total: '', //数据的数量
				showSelect: true,
				begCreateDate: '',
				endCreateDate: '',
				operatorId: this.accountId(),
				addClass: false,
				cid:''
			};
		},
		filters: {
			formatVisit(val) {
				return val == 1 ? "初访" : "复访"
			}
		},

		methods: {
			transforProType(couponType) {
				if (couponType == 1) return '满折券'
				else if (couponType == 2) return '满减券'
			},
			showDetails(row) {
				// console.log(row);
				this.selectItem = row;
				this.$refs.infoDetail.initData('consumption', this.selectItem)
				$('#consumptionModal').modal('show')
			},
			//子级传值到父级上来的动态拿去
			pageChange: function(page) {
				this.page = page
				this.getApproveFind(page);
			},
			//门店ID
			storeChange: function(param) {
				if (this.isBlank(param)) {
					this.storeId = ""
				} else {
					this.storeId = param.storeId
				}
			},
			//modify the cotent of department
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

			addEmp() {
				console.log('modify the cotent of department')
				this.$refs.emp.initData('add')
				$("#emp").modal('show')
			},
			xiao:function(item){
				this.cid = item.cid
			},
			//modify the cotent of department
			modifyEmp(item) {
				console.log('modify the cotent of department')
				this.$refs.emp.initData('modify', item)
				$("#emp").modal('show')
			},


			//导出
			exportTable() {
				this.exportTableToExcel('datatable', '消费审核表')
			},
			//feedback department information
			positionChange: function(param) {
				if (this.isBlank(param)) {
					this.posId = ""
				} else {
					this.posId = param.posId
				}
			},
			//feedback from adding and modifying view
			feedBack(val) {
				// console.log(val)
				// if (val == 'succ'){
				this.getApproveFind(1)
				this.objectContent = {}
				// }

				$("#rejectionContent").modal('hide')
				$("#rejectionContent1").modal('hide')
			},

			tabChange(item) {
				this.getConsultStore()

			},
			//重置
			reset() {
				this.memName = "";
				this.begCreateDate = "";
				this.endCreateDate = "";

			},
			editorAction(item) {
				this.objectContent = item
			},
			initDatas(param) {
				this.cId = param;
				this.xiaofei();
			},
			btnAction(index) {
				if (this.checkedValue > -1) {
					this.objectContent = this.approveFindList[this.checkedValue]
				} else {
					// alert("请选择咨客后再操作!");
					this.$alert('请选择咨客后再操作', '提示', {
						confirmButtonText: '确定',
						type: 'warning',
						callback: action => {}
					});
					return
				}
				switch (index) {
					//通过
					case '1':
						this.productConsumption();
						break;
						//驳回
					case '2':
						this.$refs.rejection.initData('consumption', this.objectContent)
						$("#rejectionContent").modal('show')
						break;
						//驳回
					case '3':
					    this.initDatas(this.cid);
						// this.$refs.rejections.initData('consumption', this.objectContent)
						// $("#rejectionContent1").modal('show')
						break;
				}
			},

			productConsumption() {
				var url = this.url + '/consumAuditBean/consumApprove'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						operatorId: this.operatorId,
						piId: this.objectContent.piId,
						cId: this.objectContent.cid,
						createDate: this.objectContent.createDate
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {

						this.$alert(res.retMsg, '提示', {
							confirmButtonText: '确定',
							type: 'success',
							callback: action => {
								this.$store.commit('addCount', 1)
								this.objectContent = {}
								this.getApproveFind(1)
							}
						})

					} else {

						//alert(res.retMsg)
						this.$alert(res.retMsg, '提示', {
							confirmButtonText: '确定',
							type: 'error',
							callback: action => {}
						})

					}

				}).catch((error) => {
					console.log('请求失败处理')
				});

			},


			xiaofei() {
				var url = this.url + '/consumAuditBean/consumDiscard'
				// var url = 'http://172.16.16.255:8080/consumAuditBean/consumRecord'
				// var formData = new FormData();
				// formData.append('params', this.params)
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						operatorId: this.operatorId,
						piId: this.objectContent.piId,
						createDate: this.objectContent.createDate,
						cId:this.cId,
						rejectReason:"没有理由"
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.$alert(res.retMsg, '提示', {
							confirmButtonText: '确定',
							type: 'success',
							callback: action => {
								this.$store.commit('addCount', 1)
								this.objectContent = {}
								this.getApproveFind(1)
							}
						})
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					//console.log('请求失败处理')
				});
			},
			//查询待审批的消费
			getApproveFind(page) {
				this.showSelect = false
				console.log('getApproveFind')
				if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 23:59:00.000')
				}
				var url = this.url + '/consumAuditBean/consumApproveFind'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						page: page.toString(),
						pageSize: this.pageSize,
						operatorId: this.operatorId,
						memName: this.memName,
						couponType:this.couponType,
						isUseCoupon:this.isUseCoupon,
						storeId: this.storeId,
						startTime: this.begCreateDate,
						endTime: this.endCreateDate
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						this.pages = res.retData.pages //总页数
						this.page = res.retData.pageNum //当前页码
						this.pageSize = res.retData.pageSize //一页显示的数量  必须是奇数
						this.total = res.retData.total //数据的数量
						this.$refs.paging.setParam(this.pages, this.page, this.total)
						this.approveFindList = res.retData.list
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
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
			this.getApproveFind(1)
		}
	}
</script>

<style scoped="scoped">
	.btn-danger1 {
		background-color: purple;
		border-color: purple;
		color: #fff;
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
