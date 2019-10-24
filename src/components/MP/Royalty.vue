<!-- the page of department management -->
<template>
	<div class="clearfix" style="height:100%">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">提成规则管理</h1>
		</div>
		<div class="col-md-6 col-lg-6">
			<div class="col-md-12 col-lg-12 main-title">
				<div class="col-md-6 col-lg-6 text-left">
					<h3>流水提成规则</h3>
				</div>
				<div class="col-md-6 col-lg-6 pull-right">
					<button type="button" class="btn btn-warning pos1" v-on:click="addRoyalty('add')">添加</button>
				</div>
			</div>
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable">

						<thead class="datathead">
							<tr>
								<th class="text-center col-md-2">岗位</th>
								<th class="text-center col-md-4">额度级别</th>
								<th class="text-center col-md-3">提点</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in royaltyList" :key="index" v-if="item.consumeType=='0'" v-on:dblclick="addSubVipRefund(item)">
								<td class="text-center">{{index}}</td>
								<td class="text-center">{{item.flowSmall}}~{{item.flowBig}} 万</td>
								<td class="text-center">{{item.turRoy}}%</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="col-md-6 col-lg-6">
			<div class="col-md-12 col-lg-12 main-title">
				<div class="col-md-6 col-lg-6 text-left">
					<h3>会员卡提成规则</h3>
				</div>
				<div class="col-md-6 col-lg-6 pull-right">
					<button type="button" class="btn btn-warning pos2" v-on:click="addSubVip()">添加</button>
				</div>
			</div>
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable">
		
						<thead class="datathead">
							<tr>
								<th class="text-center  col-md-1">岗位</th>
								<th class="text-center  col-md-3">充值类型</th>
								<th class="text-center  col-md-1">提点</th>
								<th class="text-center  col-md-3">消费额度</th>
								<th class="text-center  col-md-2">提成比例</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in royaltyList" :key="index" v-if="item.consumeType=='1'" v-on:dblclick="addSubVip(item)">
								<td class="text-center">{{item.posId}}</td>
								<td class="text-center">{{item.consumeType}}</td>
								<td class="text-center">{{item.turRoy}}</td>
								<td class="text-center">{{item.royProcess}}</td>
								<td class="text-center">{{item.memProportion}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="col-md-6 col-lg-6">
			<div class="col-md-12 col-lg-12 main-title">
				
				<div class="col-md-6 col-lg-6 text-left">
					<h3>会员卡退费扣提成规则</h3>
				</div>
				<div class="col-md-6 col-lg-6 pull-right">
					<button type="button" class="btn btn-warning pos1" v-on:click="addSubVipRefund()">添加</button>
				</div>
			</div>
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable">
		
						<thead class="datathead">
							<tr>
								<th class="text-center col-md-2">岗位</th>
								<th class="text-center col-md-4">额度级别</th>
								<th class="text-center col-md-3">扣款比例</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in royaltyList" :key="index" v-on:dblclick="addSubVipRefund(item)">
								<td class="text-center">{{index}}</td>
								<td class="text-center">{{item.flowSmall}}~{{item.flowBig}} 万</td>
								<td class="text-center">{{item.turRoy}}%</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="col-md-6 col-lg-6">
			<div class="col-md-12 col-lg-12 main-title">
				
				<div class="col-md-6 col-lg-6 text-left">
					<h3>预约人数提成规则</h3>
				</div>
				<div class="col-md-6 col-lg-6 pull-right">
					<button type="button" class="btn btn-warning pos2" v-on:click="addSubVipOrder()">添加</button>
				</div>
			</div>
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable">
		
						<thead class="datathead">
							<tr>
								<th class="text-center col-md-2">岗位</th>
								<th class="text-center col-md-4">预约人数</th>
								<th class="text-center col-md-4">提成金额</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in royaltyList" :key="index" v-on:dblclick="addSubVipOrder(item)">
								<td class="text-center">{{index}}</td>
								<td class="text-center">{{item.name}}</td>
								<td class="text-center">{{item.isuse==1 ? "在用" : "停用"}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="col-md-6 col-lg-6">
			<div class="col-md-12 col-lg-12 main-title">
				<div class="col-md-6 col-lg-6 text-left">
					<h3>退号扣提成规则</h3>
				</div>
				<div class="col-md-6 col-lg-6 pull-right">
					<button type="button" class="btn btn-warning pos1" v-on:click="addSubCharg()">添加</button>
				</div>
			</div>
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable">
		
						<thead class="datathead">
							<tr>
								<th class="text-center col-md-2">岗位</th>
								<th class="text-center col-md-4">预约人数</th>
								<th class="text-center col-md-3">扣款金额</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in royaltyList" :key="index" v-on:dblclick="addSubCharg(item)">
								<td class="text-center">{{index}}</td>
								<td class="text-center">{{item.name}}</td>
								<td class="text-center">{{item.isuse==1 ? "在用" : "停用"}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		
		<div class="row row_edit">
			<div class="modal fade" id="SubFlowWater">
				<div class="modal-dialog">
					<SubFlowWater ref='flowWater' @certainAction='feedBack'></SubFlowWater>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="SubVip">
				<div class="modal-dialog">
					<SubVip ref='vip' @certainAction='feedBack'></SubVip>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="SubVipRefund">
				<div class="modal-dialog">
					<SubVipRefund ref='refund' @certainAction='feedBack'></SubVipRefund>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="SubVipOrder">
				<div class="modal-dialog">
					<SubVipOrder ref='order' @certainAction='feedBack'></SubVipOrder>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="SubCharg">
				<div class="modal-dialog">
					<SubCharg ref='charg' @certainAction='feedBack'></SubCharg>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
// --------------------------------------
	import SubFlowWater from '../MP/SubRule/SubFlowWater.vue'
	import SubVip from '../MP/SubRule/SubVip.vue'
	import SubVipRefund from '../MP/SubRule/SubVipRefund.vue'
	import SubVipOrder from '../MP/SubRule/SubVipOrder.vue'
	import SubCharg from '../MP/SubRule/SubCharg.vue'
	export default {
		components: {
			SubFlowWater,
			SubVip,
			SubVipRefund,
			SubVipOrder,
			SubCharg,
		},
		data() {
			return {
				royaltyList:[],
				isuse: '1',
				name: '',
				fixedHeader: false,
			};
		},
		methods: {
			//modify the cotent of Royalty
			addRoyalty() {
				console.log('modify the cotent of Royalty')
				this.$refs.flowWater.initData('add')
				$("#SubFlowWater").modal('show')
			},
			//modify the cotent of department
			modifyDepartment(item) {
				//if (!this.has(2)) {
				//	alert("暂无权限修改!");
				//	return;
				//}
				console.log('modify the cotent of department')
				//this.$refs.dc.initData('modify', item)
				$("#SubFlowWater").modal('show')
			},
			addSubVip() {
				$("#SubVip").modal('show')
			},
			addSubVipRefund() {
				$("#SubVipRefund").modal('show')
			},
			addSubVipOrder() {
				$("#SubVipOrder").modal('show')
			},
			addSubCharg() {
				$("#SubCharg").modal('show')
			},
			//feedback from adding and modifying view
			feedBack() {
				this.checkRoyaltyList()
				$("#SubFlowWater").modal('hide')
				$("#SubVip").modal('hide')
			},
			//check the list of department
			checkRoyaltyList() {
				console.log('checkRoyaltyList')
				var url = this.url + '/royaltyAction/queryRoyalty'
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
					console.log(res)
					if (res.retCode == '0000') {
						this.royaltyList = res.retData
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('提成规则数据请求失败')
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
			window.addEventListener('scroll', this.handleScroll, true)
		},
		created() {
			this.checkRoyaltyList()
		}
	}
</script>

<style>
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
	.pos1{
		margin-top:15px;
		margin-left:114px;
	}
	.pos2{
		margin-top:15px;
		margin-left:160px;
	}
	.clearfix:after{
		content:"";
		display:block;
		width:100%;
		height:0;
		clear:both;
	}
</style>
