<!-- the page of department management -->
<template>

	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">提成规则管理</h1>
		</div>


		<div class="col-md-6 col-lg-6">
			<div class="col-md-12 col-lg-12 main-title">
				<div class="col-md-6 col-lg-6 text-left">
					<h3>流水提成规则</h3>
				</div>
				<div class="col-md-6 col-lg-6 pull-right">
					<button type="button" class="btn button-outline pull-right" v-on:click="modifyDepartment(item,index)">添加</button>
				</div>
			</div>
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable">

						<thead class="datathead">
							<tr>
								<th class="text-center">岗位</th>
								<th class="text-center">额度级别</th>
								<th class="text-center">提点</th>
								<th class="text-center" v-if="has(2)">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in departmentList" :key="index" v-on:dblclick="modifyDepartment(item)">
								<td class="text-center">{{index}}</td>
								<td class="text-center">{{item.name}}</td>
								<td class="text-center">{{item.isuse==1 ? "在用" : "停用"}}</td>
								<td class="text-center" v-if="has(2)"><button type="button" class="btn btn-warning" v-on:click="modifyDepartment(item,index)">修改</button></td>
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
					<button type="button" class="btn button-outline pull-right" v-on:click="modifyDepartment(item,index)">添加</button>
				</div>
			</div>
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable">
		
						<thead class="datathead">
							<tr>
								<th class="text-center">岗位</th>
								<th class="text-center">充值类型</th>
								<th class="text-center">提点</th>
								<th class="text-center">消费额度</th>
								<th class="text-center">提成比例</th>
								<th class="text-center" v-if="has(2)">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in departmentList" :key="index" v-on:dblclick="modifyDepartment(item)">
								<td class="text-center">{{index}}</td>
								<td class="text-center">{{item.name}}</td>
								<td class="text-center">{{index}}</td>
								<td class="text-center">{{item.name}}</td>
								<td class="text-center">{{item.isuse==1 ? "在用" : "停用"}}</td>
								<td class="text-center" v-if="has(2)"><button type="button" class="btn btn-warning" v-on:click="modifyDepartment(item,index)">修改</button></td>
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
					<button type="button" class="btn button-outline pull-right" v-on:click="modifyDepartment(item,index)">添加</button>
				</div>
			</div>
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable">
		
						<thead class="datathead">
							<tr>
								<th class="text-center">岗位</th>
								<th class="text-center">额度级别</th>
								<th class="text-center">扣款比例</th>
								<th class="text-center" v-if="has(2)">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in departmentList" :key="index" v-on:dblclick="modifyDepartment(item)">
								<td class="text-center">{{index}}</td>
								<td class="text-center">{{item.name}}</td>
								<td class="text-center">{{item.isuse==1 ? "在用" : "停用"}}</td>
								<td class="text-center" v-if="has(2)"><button type="button" class="btn btn-warning" v-on:click="modifyDepartment(item,index)">修改</button></td>
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
					<button type="button" class="btn button-outline pull-right" v-on:click="modifyDepartment(item,index)">添加</button>
				</div>
			</div>
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable">
		
						<thead class="datathead">
							<tr>
								<th class="text-center">岗位</th>
								<th class="text-center">预约人数</th>
								<th class="text-center">提成金额</th>
								<th class="text-center" v-if="has(2)">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in departmentList" :key="index" v-on:dblclick="modifyDepartment(item)">
								<td class="text-center">{{index}}</td>
								<td class="text-center">{{item.name}}</td>
								<td class="text-center">{{item.isuse==1 ? "在用" : "停用"}}</td>
								<td class="text-center" v-if="has(2)"><button type="button" class="btn btn-warning" v-on:click="modifyDepartment(item,index)">修改</button></td>
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
					<button type="button" class="btn button-outline pull-right" v-on:click="modifyDepartment(item,index)">添加</button>
				</div>
			</div>
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable">
		
						<thead class="datathead">
							<tr>
								<th class="text-center">岗位</th>
								<th class="text-center">预约人数</th>
								<th class="text-center">扣款金额</th>
								<th class="text-center" v-if="has(2)">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in departmentList" :key="index" v-on:dblclick="modifyDepartment(item)">
								<td class="text-center">{{index}}</td>
								<td class="text-center">{{item.name}}</td>
								<td class="text-center">{{item.isuse==1 ? "在用" : "停用"}}</td>
								<td class="text-center" v-if="has(2)"><button type="button" class="btn btn-warning" v-on:click="modifyDepartment(item,index)">修改</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		

		<div class="row row_edit">
			<div class="modal fade" id="departmentContent">
				<div class="modal-dialog">
					<departmentContent ref='dc' @addDepartment='feedBack'></departmentContent>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
	import departmentContent from '../MP/Depart/DepartmentContent.vue'
	export default {
		components: {
			departmentContent,
		},
		data() {
			return {
				departmentList: [],
				isuse: '1',
				name: '',
				fixedHeader: false,
			};
		},
		methods: {
			//modify the cotent of department
			addDepartment() {
				console.log('modify the cotent of department')
				this.$refs.dc.initData('add')
				$("#departmentContent").modal('show')
			},
			//modify the cotent of department
			modifyDepartment(item) {
				if (!this.has(2)) {
					alert("暂无权限修改!");
					return;
				}
				console.log('modify the cotent of department')
				this.$refs.dc.initData('modify', item)
				$("#departmentContent").modal('show')
			},
			//feedback from adding and modifying view
			feedBack() {
				this.checkDepartment()
				$("#departmentContent").modal('hide')
			},
			//check the list of department
			checkDepartment() {
				console.log('checkDepartment')
				var url = this.url + '/departmentAction/queryDepartment'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						name: this.name,
						isuse: this.isuse,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						this.departmentList = res.retData
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
			window.addEventListener('scroll', this.handleScroll, true)
		},
		created() {
			this.checkDepartment()
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
</style>
