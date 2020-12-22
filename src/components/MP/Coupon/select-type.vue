<!-- the page of department management -->
<template>
	<div class="wraper">
		<el-collapse-transition>
			<div v-show="showSelect">
				<div class="row newRow">
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="margin-bottom: 20px;">
						<div class="col-md-5 col-lg-5 text-right nopad">
							<p class="end-aline col-md-11 col-lg-11">类型名称</p><span class="sign-left">:</span>
						</div>
						<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="name">
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 jh-ad-1">
					        <p class="end-aline col-md-11 col-lg-11 jh-pa-1">状态</p><span
					        class="sign-left">:</span>
					    </div>
					    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
					        <select class="form-control" v-model="state">
					            <option value="0">全部</option>
					            <option value="1">在用</option>
					            <option value="2">停用</option>
					        </select>
					    </div>
					</div>
					<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-2" data-toggle="modal" v-on:click="getAllAuditPage()">查询
					</button>
				</div>
	</div>
	</el-collapse-transition>
	<div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
		<div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
	</div>
	<div class="" id="datatable">
		<el-table :data="tableData" style="width: 100%" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="100" align="center" label="全选"></el-table-column>
			<el-table-column prop="typeName" label="类型名称" width="230" align="center"></el-table-column>
			<el-table-column prop="state" :formatter="resetAuditState" label="使用状态" width="230" align="center"></el-table-column>
		</el-table>
		<el-button class="jh-mr-1 jh-mr-3" style="cursor: pointer;" @click="checkAll" size="mini">全选</el-button>
		<el-button class="jh-mr-1 jh-mr-4" style="cursor: pointer;" @click="toggerCheck" size="mini">反选</el-button>
		<el-row style="margin-top: 20px;">
			<el-col :span="24">
				<el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="current"
				 :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</el-col>
		</el-row>
	</div>
	<div class="xuanzhong_kuang">
		<h2>已选中：</h2>
		<ul>
			<li>1-225</li>
		</ul>
	</div>
	<button type="button" class="btn btn-primary pull-center m_r_10 jh-mr-2 jh-mr-5" data-toggle="modal" @click="gooff1" v-has="'SAMY:MP:Coupon:Add'">确定</button>
	<button type="button" class="btn btn-primary pull-center m_r_10 jh-mr-2 jh-mr-6" @click="goOff()">返回</button>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				showSelect: true,
				fixedHeader: false,
				storeId: this.storeId(),
				accountType: this.accountType(),
				tableData: [],
				name:'',
				isMem: '',
				state: '0',
				name: '',
				prtId:'',
				addClass: false,
				empDisable: false,
				selectDataFlag: false
			};
		},

		methods: {
			resetAuditState(row, column, state, index){
			    switch (state) {
			         case 1:
			            return '在用'
			            break;
			        case 2:
			           return '停用'
			           break;
			    }
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
				this.multipleSelection = val;
			},
			chaChange(param) {
				if (this.isBlank(param)) {
					this.chaId = ""
				} else {
					this.chaId = param.chaId
				}
			},
			//点击确定按钮跳转
			gooff1(){
				this.$router.push({
					path: '../MP/Coupon/CouponAdd'
				})
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
			getAllAuditPage() {
			    this.showSelect = false
			    var url = this.url + '/couponController/selectProductType'
				var formData = new FormData();
				formData.append('name', this.name);
				formData.append('state', this.state);
			    this.$ajax({
			        method: 'GET',
			        url: url,
			        headers: {
			            'Content-Type': this.contentType,
			            'Access-Token': this.accessToken
			        },
			        param: formData,
			        dataType: 'json',
			    }).then((response) => {
			        var res = response.data
			        console.log(res)
			        if (res.retCode == '0000') {
			            this.tableData = res.retData
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
		},
		created() {
			this.getAllAuditPage()
		}
	}
</script>

<style scoped="scoped">
	.xuanzhong_kuang{
		margin-top: 20px;
		border: 1px solid #DDDDDD;
		width: 100%;
		overflow: auto;
		margin-bottom: 20px;;
	}
	.xuanzhong_kuang h2{
		text-align: left;
		margin-top: 10px;
		font-weight: bold;
		margin-left: 20px;
		font-size: 16px;
		margin-bottom: 10px;
	}
	.xuanzhong_kuang ul{
		margin-left: 20px;
		overflow: auto;
	}
	.xuanzhong_kuang ul li{
		width: 85px;
		height: 30px;
		margin-bottom: 10px;
		line-height: 30px;
		text-align: center;
		border:1px solid #DDDDDD;
		margin-right: 10px;
	}
	.xuanzhong_kuang ul li:nth-child(10n){
		margin-right: 0;
		margin-bottom: 0;
	}
	.xuanzhong_kuang ul li:last-child{
		margin-right: 0;
	}
	.jh-mr-1{
		border: none;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	#datatable .jh-mr-3 {
		color: #fff;
		float: left;
		background-color: rgb(72, 196, 65);
	}
	
	#datatable .jh-mr-4 {
		color: #fff;
		margin-right: 75%;
		background-color: rgb(186, 107, 234);
	}
	.jh-mr-5{
		border:none;
		margin-bottom: 20px;
		background-color: rgb(22, 155, 213);
	}
	.jh-mr-6{
		outline: none;
		border:none;
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
