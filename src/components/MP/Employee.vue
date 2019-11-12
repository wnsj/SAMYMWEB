<!-- the page of department management -->
<template>

	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">员工管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">店铺</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<store ref="store" @storeChange='storeChange'></store>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<input class="form-control" type="text" v-model="empName">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">手机号</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<input class="form-control" type="text" v-model="iphone">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">岗位</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<pos ref="pos" @positionChange='positionChange'></pos>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">是否在用</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control" v-model="isuse">
						<option value="">全部</option>
						<option value="1">在用</option>
						<option value="0">停用</option>
					</select>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding-bottom:1.5%;">
			<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="selectRule('1')">添加员工</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="checkEmp()">查询</button>
		</div>
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable">
						<thead class="datathead">
							<tr>
								<th class="text-center">店铺</th>
								<th class="text-center">岗位</th>
								<!-- <th class="text-center">员工工号</th> -->
								<th class="text-center">姓名</th>
								<th class="text-center">手机号</th>
								<th class="text-center">性别</th>
								<th class="text-center">入职时间</th>
								<th class="text-center">是否停用</th>
								<th class="text-center" v-if="has(2)">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in employeeList" :key="index" v-on:dblclick="selectRule('3',item)">
								<td class="text-center">{{item.storeName}}</td>
								<td class="text-center">{{item.posName}}</td>
								<!-- <td class="text-center">{{item.empId}}</td> -->
								<td class="text-center">{{item.empName}}</td>
								<td class="text-center">{{item.name}}</td>
								<td class="text-center">{{item.sex=='1' ? '男':'女'}}</td>
								<td class="text-center">{{item.name}}</td>
								<td class="text-center">{{item.isuse==true ? "在用" : "停用"}}</td>
								<td class="text-center" v-if="has(2)"><button type="button" class="btn btn-warning" v-on:click="selectRule('3',item)">修改</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="emp">
				<div class="modal-dialog">
					<emp ref='emp' @addEmp='feedBack'></emp>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
	import emp from '../MP/SubEmp/SubEmp.vue'
	import store from '../common/Store.vue'
	import pos from '../common/Position.vue'
	export default {
		components: {
			emp,
			pos,
			store,
		},
		data() {
			return {
				employeeList: [],
				isuse: '1',
				empName: '',
				iphone:'',
				fixedHeader: false,
				posId:'',
				storeId:'',
			};
		},
		methods: {
			//modify the cotent of department
			
			addEmp() {
				console.log('modify the cotent of department')
				this.$refs.emp.initData('add')
				$("#emp").modal('show')
			},
			//modify the cotent of department
			modifyEmp(item) {
				if (!this.has(2)) {
					alert("暂无权限修改!");
					return;
				}
				console.log('modify the cotent of department')
				this.$refs.emp.initData('modify', item)
				$("#emp").modal('show')
			},
			
			storeChange:function(param){
				if (this.isBlank(param)) {
					this.storeId = ""
				} else {
					this.storeId = param.storeId
				}
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
			feedBack() {
				this.checkEmp()
				$("#emp").modal('hide')
			},
			// check the adding and modifying rule of account
			selectRule(param,item){
				var url = this.url + '/ruleAction/queryRule'
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						accountId: this.accountId(),
						moduleGrade:'2',
						urlName:'Employee',
						operateType:param,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if(res.retData=='0010'){
							if(param=="1"){
								this.$refs.emp.initData('add')
								$("#emp").modal('show')
							}else if(param=="3"){
								this.$refs.emp.initData('modify', item)
								$("#emp").modal('show')
							}
						}else{
							alert('您没有此权限，请联系管理员！！')
						}
					} else {
						alert(res.retMsg)
					}
				
				}).catch((error) => {
					console.log('商铺查询请求失败')
				});
			},
			//check the list of department
			checkEmp() {
				console.log('checkEmp')
				var url = this.url + '/employeeAction/queryEmp'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						posId: this.posId,
						storeId: this.storeId,
						empName: this.empName,
						isuse: this.isuse,
						
						accountId: this.accountId(),
						moduleGrade:'2',
						urlName:'Employee',
						operateType:'4',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						this.employeeList = res.retData
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
			this.checkEmp()
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
