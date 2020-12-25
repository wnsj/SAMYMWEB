<!-- the page of department management -->
<template>

	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">退费统计</h1>
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
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="margin-bottom: 20px;">
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
							<select class="form-control" v-model="productType">
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
					<!-- <div class="col-xs-3 col-sm- col-md-3 col-lg-3">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
                        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">审核状态</p><span
                        class="sign-left">:</span>
                    </div>
                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <select name="" id="" class="form-control">
                            <option value="0">未选择</option>
                            <option value="1">通过</option>
                            <option value="2">未通过</option>
                        </select>
                    </div>
                </div> -->

					<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-2" data-toggle="modal" v-on:click="getRefundAllFind()">查询
					</button>
					<button type="button" class="btn btn-info pull-right m_r_10 jh-mr-2" data-toggle="modal" v-on:click="adSort" v-has="'SAMY:MP:Coupon:Add'">添加
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
				<el-table-column prop="couponName" label="优惠券名称" width="100" align="center"></el-table-column>
				<el-table-column prop="couponTypeName" label="优惠券类型" :formatter="couponType" width="100" align="center"></el-table-column>
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
				<el-table-column prop="productTypeName" label="适用产品" width="100" align="center"></el-table-column>
				<el-table-column prop="productType" label="产品类型" width="100" align="center"></el-table-column>
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
					<el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="current"
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
	export default {
		components: {
			dPicker
		},
		data() {
			return {
				couponName: '',
				accountType: this.accountType(),
				name: '',
				tableData: [],
				checkedValue: -1,
				objectContent: {},
				//分页需要的数据
				pages: '', //总页数
				current: 1, //当前页码
				pageSize: 10, //一页显示的数量
				total: 0, //数据的数量
				startTime: '',
				endTime: '',
				id: '',
				createTime: '',
				couponType: '',
				operatorId: '',
				isMem: '',
				productType: '',
				showSelect: true,
				begCreateDate: '',
				endCreateDate: '',
				addClass: false,
				selectDataFlag: false
			};
		},
		watch: {
			startTime: 'changeData',
			endTime: 'changeData',
			createTime: 'changeData'

		},
		methods: {
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
			adSort() {
				this.$router.push({
					path: '../MP/Coupon/CouponAdd'
				})
			},
			changeData(newVal, oldVal) {
				this.selectDataFlag = true
			},

			// couponType(){
			// 	if(this.couponType == 1){

			// 	}
			// },
			resetDate(row, column, cellValue, index) {
				if (cellValue !== '' && cellValue !== null && cellValue !== undefined) {
					return cellValue.substring(0, 10)
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

			//check the list of department
			getRefundAllFind() {
				if (this.selectDataFlag) {
					this.current = 1
				}

				this.showSelect = false
				console.log('getRefundAllFind')
				if (!this.isBlank(this.startTime)) {
					this.startTime = this.moment(this.startTime, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endTime)) {
					this.endTime = this.moment(this.endTime, 'YYYY-MM-DD 23:59:00.000')
				}
				if (!this.isBlank(this.createTime)) {
					this.createTime = this.moment(this.createTime, 'YYYY-MM-DD 23:59:00.000')
				}
				var url = this.url + '/couponController/selectAllCoupon'
				var formData = new FormData();
				formData.append('pageNum', this.current);
				formData.append('pageSize', this.pageSize);
				formData.append('couponName', this.couponName);
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
					console.log(res)
					if (res.retCode == '0000') {
						this.pages = res.retData.pages //总页数
						this.current = res.retData.pageNum //当前页码
						this.pageSize = res.retData.pageSize //一页显示的数量  必须是奇数
						this.total = res.retData.total //数据的数量
						this.tableData = res.retData.list

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
				this.current = pageNum
				this.getRefundAllFind()
			},
			// 每页条数变化时触发
			handleSizeChange(pageSize) {
				this.current = 1
				this.pageSize = pageSize
				this.getRefundAllFind()
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
			this.getRefundAllFind()
		}
	}
</script>

<style scoped="scoped">
	.el-button.chakan {
		width: 63px;
		height: 30px;
		line-height: 5px;
		color: #fff;
		background-color: rgba(22, 155, 213, 1);
	}

	.el-button.chakan1 {
		color: #fff;
		width: 63px;
		line-height: 5px;
		height: 30px;
		background-color: rgba(72, 196, 65, 1);
	}

	.el-button {
		display: block;
		float: left;
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
