<!-- the page of department management -->
<template>

	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">优惠券管理</h1>
		</div>
		<el-collapse-transition>
			<div v-show="showSelect">
				<div class="row newRow">

					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">优惠券名称</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="couponName">
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right jh-ad-1">
							<p class="end-aline col-md-11 col-lg-11 jh-pa-1">开始时间</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<dPicker class="wd100" v-model="startTime"></dPicker>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right jh-ad-1">
							<p class="end-aline col-md-11 col-lg-11 jh-pa-1">结束时间</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<dPicker class="wd100" v-model="endTime"></dPicker>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right jh-ad-1">
							<p class="end-aline col-md-11 col-lg-11 jh-pa-1">创建时间</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<dPicker class="wd100" v-model="createTime"></dPicker>
						</div>
					</div>
				</div>
				<div class="row newRow">
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">优惠券类型</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<select class="form-control" v-model="couponType">
								<option value="">--请选择--</option>
								<option value="2">满减券</option>
								<option value="1">满折券</option>
							</select>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">产品类型</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7">
							<channelType @sendChannelId="getChannelId"></channelType>
						</div>
					</div>
					<button type="button" class="btn btn-info pull-right m_r_10 jh-mr-2" data-toggle="modal" v-on:click="adSort" v-has="'SAMY:MP:Coupon:Add'">添加
					</button>
					<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-2" data-toggle="modal" v-on:click="getRefundAllFind(1)">查询
					</button>

				</div>

			</div>
		</el-collapse-transition>
		<div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
			<div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
		</div>

		<div class="" id="datatable">
			<el-table :data="tableData" style="width: 100%" border>
				<el-table-column prop="couId" label="优惠券ID" width="80" align="center"></el-table-column>
				<el-table-column prop="couponName" label="优惠券名称" width="150" align="center"></el-table-column>
				<el-table-column prop="couponTypeName" label="优惠券类型" width="100" align="center"></el-table-column>
				<el-table-column label="金额(￥)" width="80" align="center">
					<template slot-scope="scope">{{scope.row.couponType==1?"/":scope.row.recude}}</template>
				</el-table-column>
				<el-table-column label="折扣(%)" width="80" align="center">
					<template slot-scope="scope">{{scope.row.couponType==1?scope.row.recude:"/"}}</template>
				</el-table-column>
				<el-table-column prop="startTime" label="开始时间" :formatter="resetDate" width="100" align="center"></el-table-column>
				<el-table-column prop="endTime" label="结束时间" :formatter="resetDate" width="100" align="center"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" :formatter="resetDate" width="100" align="center"></el-table-column>
				<el-table-column prop="operatorName" label="创建人" width="100" align="center"></el-table-column>
				<el-table-column prop="productName" label="适用产品" :formatter="chanpina" width="100" align="center">
					<template slot-scope="scope">
						<el-popover trigger="hover" placement="top" v-if="scope.row.categoryType==3">
							<p>{{scope.row.product}}</p>
							<div slot="reference">
								<el-tag size="medium" :formatter="chanpina">{{ scope.row.productName[0] }}</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column prop="productTypeName" label="产品类型" :formatter="chanpin" width="100" align="center">
					<template slot-scope="scope">
						<el-popover trigger="hover" placement="top" v-if="scope.row.categoryType==2">
							<p>{{scope.row.product1}}</p>
							<div slot="reference">
								<el-tag size="medium" :formatter="chanpin">{{scope.row.productTypeName[0]}}</el-tag>
							</div>
						</el-popover>
						<el-popover  placement="top" v-if="scope.row.categoryType==1">
							<p>{{scope.row.product1}}</p>
							<div slot="reference">
								<el-tag size="medium" :formatter="chanpin">{{scope.row.productTypeName[0]}}</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column prop="allCount" label="总发行量" width="100" align="center"></el-table-column>
				<el-table-column prop="stateName" label="使用状态" width="80" align="center"></el-table-column>
				<el-table-column align="center" label="操作" min-width="165">
					<template slot-scope="scope">
						<el-button type="button" class="chakan" @click="toAdds(scope.row.couId)" v-has="'SAMY:MP:Coupon:call'">查看</el-button>
						<el-button type="button" class="chakan1" v-on:click="mems(scope.row.couId)" v-has="'SAMY:MP:Coupon:Update'">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="margin-top: 20px;">
				<el-col :span="24">
					<el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page.sync="pageNum"
					 :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</el-col>
			</el-row>
		</div>


	</div>

</template>


<script>
	import {
		init
	} from '@/../static/js/common.js'
	import dPicker from 'vue2-datepicker'
	import channelType from '../common/project-type.vue'
	export default {
		components: {
			channelType,
			dPicker
		},
		data() {
			return {
				couponName: '',
				tableData: [],
				//分页需要的数据
				pages: '', //总页数
				pageNum: 1, //当前页码
				pageSize: 10, //一页显示的数量
				total: 0, //数据的数量
				startTime: '',
				endTime: '',
				productName: [],
				id: '',
				createTime: '',
				couponType: '',
				operatorId: '',
				productType: '',
				showSelect: true,
				addClass: false,
				selectDataFlag: false
			};
		},
		methods: {
			// //子级传值到父级上来的动态拿去
			pageChange: function(page) {
				this.pageNum = page
				this.getRefundAllFind(page);
			},
			//产品分类
			getChannelId(val) {
				this.productType = val
			},
			transforProType(productName) {
				this.productName.join(',');
				console.log(this.productName)
			},

			//查看优惠券
			toAdds(couId) {
				this.$router.push({
					path: '../MP/Coupon/Couponcall',
					query: {
						couId: couId,
					}
				})

			},
			//修改优惠券
			mems(couId) {
				this.$router.push({
					path: '../MP/Coupon/Couponupdate',
					query: {
						couId: couId,
					}
				})
			},
			//添加优惠券
			adSort() {
				this.$router.push({
					path: '../MP/Coupon/CouponAdd'
				})
			},
			resetDate(row, column, cellValue, index) {
				if (cellValue !== '' && cellValue !== null && cellValue !== undefined) {
					return cellValue.substring(0, 10)
				}
			},
			chanpina(row, column, cellValue, index) {
				if (cellValue !== '' && cellValue !== null && cellValue !== undefined) {
					return cellValue.slice(1)
				}
			},
			chanpin(row, column, cellValue, index) {
				if (cellValue !== '' && cellValue !== null && cellValue !== undefined) {
					return cellValue.slice(1)
				}
			},
			// stre(row, column, cellValue, index){
			// 	if (cellValue !== '' && cellValue !== null && cellValue !== undefined) {
			// 		return cellValue.substring(0, 10)
			// 	}
			// },
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
			getRefundAllFind(num) {
				if (num == 1) {
					this.pageNum = 1
				}
				this.showSelect = false
				if (!this.isBlank(this.startTime)) {
					this.startTime = this.moment(this.startTime, "YYYY-MM-DD 00:00:00")
				}
				if (!this.isBlank(this.endTime)) {
					this.endTime = this.moment(this.endTime, "YYYY-MM-DD 23:59:59")
				}
				if (!this.isBlank(this.createTime)) {
					this.createTime = this.moment(this.createTime, "YYYY-MM-DD 23:59:59")
				}
				var url = this.url + '/couponController/selectAllCoupon'
				var formData = new FormData();
				formData.append('pageNum', this.pageNum);
				formData.append('pageSize', this.pageSize);
				formData.append('couponName', this.couponName);
				formData.append('operatorId', this.operatorId);
				formData.append('startTime', this.startTime);
				formData.append('endTime', this.endTime);
				formData.append('createTime', this.createTime);
				formData.append('couponType', this.couponType);
				formData.append('productType', this.productType);
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': 'x-www-form-urlencoded',
						'Access-Token': this.accessToken
					},
					data: formData,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.pages = res.retData.pages //总页数
						this.pageNum = res.retData.pageNum //当前页码
						this.pageSize = res.retData.pageSize //一页显示的数量  必须是奇数
						this.total = res.retData.total //数据的数量
						this.tableData = res.retData.list
						for (var i = 0; i < this.tableData.length; i++) {
							this.tableData[i].product ='';
							this.tableData[i].product1 ='';
							for (var j = 0; j < this.tableData[i].productName.length; j++) {
								if(j == this.tableData[i].productName.length-1){
									this.tableData[i].product += this.tableData[i].productName[j] 
								}else{
									this.tableData[i].product += this.tableData[i].productName[j] + ',';
								}
							}
							for (var k = 0; k < this.tableData[i].productTypeName.length; k++) {
								if(k == this.tableData[i].productTypeName.length-1){
									this.tableData[i].product1 += this.tableData[i].productTypeName[k] 
								}else{
									this.tableData[i].product1 += this.tableData[i].productTypeName[k] + ',';
								}
								
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
			// 翻页
			handleCurrentChange(pageNum) {
				this.pageNum = pageNum
				this.getRefundAllFind()
			},
			// 每页条数变化时触发
			handleSizeChange(pageSize) {
				this.pageNum = 1
				this.pageSize = pageSize
				this.getRefundAllFind(1)
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
			this.getRefundAllFind();
		}
		// created() {
		// 	this.getRefundAllFind()
		// }
	}
</script>

<style scoped="scoped">
	@import url("../../assets/css/coupon.css");
</style>
