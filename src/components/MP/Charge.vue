<!-- 充值管理页 -->
<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">购买产品管理</h1>
		</div>
        <el-collapse-transition>
		<div v-show="showSelect">
			<div class="row newRow">
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-if="accountType==true">
					<div class="col-md-5 col-lg-5 text-right jh-ad-1">
						<p class="end-aline col-md-11 col-lg-11 jh-pa-1">门店</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7">
						<store ref='store' @storeChange='storeChange'></store>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right jh-ad-1">
						<p class="end-aline col-md-11 col-lg-11 jh-pa-1">客户姓名</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7">
						<input class="form-control" type="text" value="" v-model="memName">
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right nopad">
						<p class="end-aline col-md-11 col-lg-11" >访问类型</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7">
						<select class="form-control" v-model="visitType" @change="visitTypeChange">
							<option value="">--未选择--</option>
							<option value="1">初访</option>
							<option value="2">复访</option>
						</select>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right nopad">
						<p class="end-aline col-md-11 col-lg-11" >客户判定</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7">
						<judgeState ref="judgeStateRef" @objectChange="judgeStateChange"></judgeState>
					</div>
				</div>
			</div>
			<div class="row newRow">
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right nopad">
						<p class="end-aline col-md-11 col-lg-11" >续流状态</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7">
						<continueState ref="continueStateRef" @objectChange="continueStateChange"></continueState>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 nopad" >
						<p class="end-aline col-md-11 col-lg-11" >咨询师</p><span class="sign-left">:</span>
					</div>
					<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
						<cou ref="couEmp" @employeeChange="couChange"></cou>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 nopad" >
						<p class="end-aline col-md-11 col-lg-11" >咨询顾问</p><span class="sign-left">:</span>
					</div>
					<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
						<con ref="conEmp" @employeeChange="conChange"></con>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right nopad">
						<p class="end-aline col-md-11 col-lg-11" >课程名称</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="proName"></div>
				</div>
			</div>
			<div class="row newRow">
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 nopad" >
						<p class="end-aline col-md-11 col-lg-11" >交费方式</p><span class="sign-left">:</span>
					</div>
					<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <PayStyle ref="payStyleRef" @payStyleChange="psStyle"></PayStyle>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right jh-ad-1">
						<p class="end-aline col-md-11 col-lg-11 jh-pa-1">是否欠费</p><span class="sign-left">:</span>
					</div>
					<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
						<select class="form-control" v-model="isArrears">
							<option value="">全部</option>
							<option value="1">全款</option>
							<option value="0">欠费</option>
						</select>
					</div>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<div class="col-md-3 col-lg-3 text-right jh-ad-1 wd205">
						<p class="end-aline col-md-11 col-lg-11 jh-pa-1">购买时间</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-4 col-lg-4 jh-tw-1">
						<dPicker class="wd100" v-model="begCreateDate"></dPicker>
					</div>
					<div class="jh-ad-1 jh-fl">
						~
					</div>
					<div class="col-md-4 col-lg-4 jh-tw-1">
						<dPicker class="wd100" v-model="endCreateDate"></dPicker>
					</div>
					<button type="button" class="btn btn-primary pull-right m_r_10 margin-right-15" data-toggle="modal" v-on:click="conditionCheck(1)">查询</button>
				</div>
			</div>
		</div>
		</el-collapse-transition>
        <div class="arrow-bottom jh-wd-100 jh-po-re" @click="showSelect = !showSelect" @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<nobr class="widthmax">
				<div class="table-responsive">
					<table class="table table-bordered table-hover user-table" id="datatable">
						<thead class="datathead">
							<tr class="datatr_1">
								<!-- <th class="text-center" rowspan='2'>会员卡号</th> -->
								<th class="text-center">姓名</th>
								<th class="text-center">产品名称</th>
								<th class="text-center">咨询师</th>
								<th class="text-center">咨询顾问</th>
								<th class="text-center">访问类型</th>
								<th class="text-center">咨客判定</th>
								<th class="text-center">续流状态</th>
								<th class="text-center">购买单价(¥/次)</th>
								<th class="text-center">购买课时(次)</th>
								<th class="text-center">购买折扣(%)</th>
								<th class="text-center">购买时间</th>
                                <th class="text-center" rowspan='2'>开始时间</th>
                                <th class="text-center" rowspan='2'>结束时间</th>
								<th class="text-center">实交金额</th>
								<th class="text-center">消耗金额</th>
								<th class="text-center">消耗课时</th>
								<th class="text-center">交费方式</th>
								<th class="text-center">操作人</th>
								<th class="text-center">是否全款</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index1) in chargeLsit" :key="index1" v-on:dblclick="changeEndDate(item)">
								<!-- <td>{{item.memNum}}</td> -->
								<td>{{item.memName}}</td>
								<td>{{item.proName}}</td>
								<td>{{item.counselorName}}</td>
								<td>{{item.empName}}</td>
								<td>{{item.visitType== '1' ? '初访' : item.visitType== '2' ? '复访':''}}</td>
								<td>{{item.judgeStateName}}</td>
								<td>{{item.continueStateName}}</td>
								<td>{{item.price}}</td>
								<td>{{item.actualCount}}</td>
								<td>{{item.discount}}</td>
								<td>{{item.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td>{{item.startDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td>{{item.endDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td>{{item.realCross}}</td>
								<td>{{item.realCrossCount}}</td>
								<td>{{item.consumCount}}</td>
								<td>{{item.psName}}</td>
								<td>{{item.operatorName}}</td>
								<td v-show="item.isArrears=='0'"><button type="button" class="btn btn-warning" v-on:click="arrearsAaction(item)">否</button></td>
								<td v-show="item.isArrears=='1'">是</td>
								<td v-show="item.isArrears==null"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--分页插件-->
				<div class="page">
					<!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
					<paging ref="paging" @change="pageChange"></paging>
				</div>
			</nobr>
		</div>
        <div class="modal fade" id="SubCharge">
            <div class="modal-dialog">
                <SubCharge ref='subChargeRef' @certainAction='feedBack1'></SubCharge>
            </div>
        </div>
	</div>

</template>

<script>
	import dPicker from 'vue2-datepicker'
	import emp from '../common/Employee.vue'
	import store from '../common/Store.vue'
	import Paging from '../common/paging'
	import cou from '../common/Employee.vue'	//咨询师
	import con from '../common/Employee.vue'	//咨询顾问
	import judgeState from '../common/VisitState.vue' //咨客判定
	import continueState from '../common/VisitState.vue' //续流状态

    import SubCharge from '../MP/SubCharge/SubCharge.vue'
    import PayStyle from '../common/PayStyle.vue'
	export default {
		components: {
			dPicker,
			emp,
			Paging,
			store,
            SubCharge,
			cou,
			con,
			judgeState,
			continueState,
            PayStyle
		},
		data() {
			return {
				chargeLsit: [],
				costType: '1', //费用类型（1.充值，  2.消费，3.退款）
				memNum: '',
				memName: '',
				empId: '',
                conId: '',
				begCreateDate: '',
				endCreateDate: '',
				storeId: this.storeId(),
				isArrears: '1',
				accountType:this.accountType(),

                empList:[],
				//分页需要的数据
				pages: '', //总页数
				current: 1, //当前页码
				size: 10, //一页显示的数量
				total: '', //数据的数量

				visitType:'',//访问类型
				payType:'1',//付款方式
				couId:'',//咨询师ID
				conId:'',//咨询师ID
				proName:'',//课程名称
				judgeState:'',//咨客判定
				continueState:'',//续流状态
				payType:'',//支付方式
				showSelect:true
			};
		},
		methods: {
			//子级传值到父级上来的动态拿去
			pageChange: function(page) {
				this.current = page
				this.conditionCheck(page);
			},
			empChange(param) {
				console.log('员工信息：' + JSON.stringify(param))
				if (this.isBlank(param)) {
					this.empId = ""
				} else {
					this.empId = param.empId
				}
			},
            psStyle(data) {
                this.payType = ''
                if (data != null) {
                    this.payType = data
                }
            },
			storeChange(param) {
				if (this.isBlank(param)) {
					this.storeId = ""
				} else {
					this.storeId = param.storeId
				}
			},
			dataOpen(){
                if(this.showSelect) return
                this.showSelect = true;
            },
            getEmp() {
                var url = this.url + '/employeeAction/getAllEmpByPosName'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        posName: "咨询顾问"
                    },
                    dataType: 'json',
                }).then(res => {
                    this.empList = res.data.retData
                }).catch(error => {
                    console.log(error);
                })
            },
			//feedback from adding and modifying view
			feedBack() {
				this.conditionCheck()
				$("#addFee").modal("hide")
			},
            feedBack1() {
                this.conditionCheck(1)
                $("#SubCharge").modal("hide")
            },
            changeEndDate(item) {
                this.$refs.subChargeRef.initData(item)
                $("#SubCharge").modal('show')
            },
			//the list , which is detail infomation of patient,was checked.
			conditionCheck: function(page) {
                this.showSelect = false
				console.log('querying based on multiple conditions')
				if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 23:59:59.000')
				}
				var url = this.url + '/purchasedItemsAction/queryPurchasedItems'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						storeId: this.storeId,
						memNum: this.memNum,
						memName: this.memName,
                        proName:this.proName,
                        counselor:this.couId,
                        empId:this.conId,
                        payType:this.payType,
                        visitType:this.visitType,
                        visitState:this.judgeState,
                        continState:this.continueState,
						begCreateDate: this.begCreateDate,
						endCreateDate: this.endCreateDate,
						storeId: this.storeId,
						isArrears: this.isArrears,

						page: page.toString(),
						pageSize: this.size
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.pages = res.retData.pages //总页数
						this.current = res.retData.current //当前页码
						this.size = res.retData.size //一页显示的数量  必须是奇数
						this.total = res.retData.total //数据的数量
						this.$refs.paging.setParam(this.pages, this.current, this.total)
						this.chargeLsit = res.retData.records
					}
				}).catch((error) => {
					console.log('充值查询请求失败')
				});
			},
			arrearsAaction(item) {
				if (!this.has("SAMY:MP:Charge:AddArrears")) {
					alert("暂无权限!")
					return
				}
				if (confirm("是否是补交缴费，确认已经补交缴费？？") == false) {
					return
				}
				var url = this.url + '/payArrears/addPayArrears'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						piId: item.piId,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.conditionCheck(1)
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('补交费用请求失败')
				});
			},
			//咨客判定
			judgeStateChange: function(param) {
				// console.log(JSON.stringify(param))
				if (this.isBlank(param)) {
					this.judgeState = ""
				} else {
					this.judgeState = param.vsId
				}
			},
			//续流状态
			continueStateChange: function(param) {
				if (this.isBlank(param)) {
					this.continueState = ""
				} else {
					this.continueState = param.vsId
				}
			},
			//咨询师
			couChange: function(param) {
				if (this.isBlank(param)) {
					this.couId = ""
				} else {
					this.couId = param.empId
				}
			},
			//咨询顾问
			conChange: function(param) {
				if (this.isBlank(param)) {
					this.conId = ""
				} else {
					this.conId = param.empId
				}
			},
			//通过初复访设置咨客判定和续流状态
			visitTypeChange() {
				this.$refs.judgeStateRef.setObj(0)
				this.$refs.judgeStateRef.getObj(this.visitType, 1)
				this.$refs.continueStateRef.setObj(0)
				this.$refs.continueStateRef.getObj(this.visitType, 2)
			},
		},
		mounted:function() {
			console.log('mounted')
			this.$refs.couEmp.setPosName("咨询师")
			this.$refs.conEmp.setPosName("咨询顾问")
			this.$refs.couEmp.setEmp("")
			this.$refs.conEmp.setEmp("")
		    this.$refs.judgeStateRef.getObj(1, 1)
		    this.$refs.continueStateRef.getObj(1, 2)
		},
		created:function() {
			//this.conditionCheck(1)
		}
	}
</script>

<style>
	/*分页需要的样式*/
	.page {
		width: 100%;
		min-width: 1068px;
		height: 36px;
		margin: 40px auto;
	}

	.widthmax {
		width: auto;
		overflow-x: scroll;
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

	#fHeader div.fth_1 {}

	#fHeader div.fth_2 {
		display: block;
		position: absolute;
		margin-top: -39px;
		right: 110px;
	}

	#fHeader div.text-center {
		float: left;
		display: table;
		padding: 8px;
		border: 1px solid #ddd;
		font-weight: bold;
		vertical-align: bottom;
		position: relative;
	}

	#fHeader div.text-center p {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	@media print {
		#fHeader {
			display: none
		}
	}
</style>
