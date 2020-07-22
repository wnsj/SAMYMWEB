<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">消费管理</h1>
		</div>
		<div class="row newRow">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-if="accountType==true">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11" >门店</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<store ref='store' @storeChange='storeChange'></store>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11" >姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="memName"></div>
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
				<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="posName"></div>
			</div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 nopad" >
                    <p class="end-aline col-md-11 col-lg-11" >交费方式</p><span class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <select class="form-control" v-model="payType">
                        <option value="1">现金</option>
                        <option value="2">微信</option>
                        <option value="3">支付宝</option>
                        <option value="4">信用卡/银行卡</option>
                        <option value="5">小程序</option>
                        <option value="6">免费</option>
                        <option value="7">其它</option>
                    </select>
                </div>
            </div>
		</div>
		<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
			<div class="col-md-3 col-lg-3 text-right nopad SSwid20">
				<p class="end-aline col-md-11 col-lg-11" >消费时间</p><span class="sign-left">:</span>
			</div>
			<div class="col-md-4 col-lg-4 SSwid27">
				<dPicker class="wd100" v-model="begCreateDate"></dPicker>
			</div>
			<div class="pull-left end-aline nopad">
				~
			</div>
			<div class="col-md-4 col-lg-4 SSwid27">
				<dPicker class="wd100" v-model="endCreateDate"></dPicker>
			</div>
		</div>
		<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
			<button type="button" class="btn btn-primary pull-right m_r_10 margin-right-15" data-toggle="modal"
			 v-on:click="conditionCheck(1)">查询</button>
		</div>

		<div>
			<div class="col-md-12 col-lg-12">
				<nobr class="widthmax">
					<div class="table-responsive pre-scrollable">
						<table class="table table-bordered table-hover user-table" id="datatable">
							<thead class="datathead">
								<tr>
									<th class="text-center">姓名</th>
									<th class="text-center">产品名称</th>
									<th class="text-center">单价</th>
									<th class="text-center">课时(小时)</th>
									<th class="text-center">折扣(%)</th>
									<th class="text-center">消费金额</th>
									<th class="text-center">交费方式</th>
									<th class="text-center">咨询师</th>
									<th class="text-center">咨询助理</th>
									<th class="text-center">访问类型</th>
									<th class="text-center">咨客判定</th>
									<th class="text-center">续流状态</th>
									<th class="text-center">消费时间</th>
									<th class="text-center">购买时间</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item2,index2) in consumeList" :key="index2">
									<td>{{item2.memName}}</td>
									<td>{{item2.proName}}</td>
									<td>{{item2.price}}</td>
									<td>{{item2.consumCount}}</td>
									<td>{{item2.discount}}</td>
									<td>{{item2.realCross}}</td>
									<td>{{item2.payType}}</td>
									<td>{{item2.counselorName}}</td>
									<td>{{item2.empName}}</td>
									<td>{{item2.visitType== '1' ? '初访' : '复访'}}</td>
									<td>{{item2.judgeStateName}}</td>
									<td>{{item2.continueStateName}}</td>
									<td>{{item2.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
									<td>{{item2.purTime}}</td>
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
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="addConsume">
				<div class="modal-dialog">
					<SubConsume ref="consume"></SubConsume>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import dPicker from 'vue2-datepicker'
	import SubConsume from '../MP/SubConsume/SubConsumeList.vue'
	import store from '../common/Store.vue'
	import Paging from '../common/paging'
    import cou from '../common/Employee.vue'	//咨询师
    import con from '../common/Employee.vue'	//咨询顾问
	import judgeState from '../common/VisitState.vue' //咨客判定
	import continueState from '../common/VisitState.vue' //续流状态
	import {
		init
	} from '@/../static/js/common.js'
	export default {
		name: 'employee',
		components: {
			dPicker,
			SubConsume,
			Paging,
			store,
            cou,
            con,
			judgeState,
			continueState,
		},
		data() {
			return {
                empId:'',
                conId: '',
				storeId: this.storeId(),
				memNum: '',
				memName: '',
				phone: '',
				visitType:'',
				consumeList: [],
				hospTime: '',
				outHosp: '',
				singleData: {},
				begCreateDate: '',
				endCreateDate: '',
                payType:'1',
				accountType:this.accountType(),
				//分页需要的数据
				pages: '', //总页数
				current: 1, //当前页码
                pageSize: 10, //一页显示的数量
				total: '', //数据的数量
                empList:[],
                sumTotal:'0',//消费的总金额
                consumCountTotal:'0',//消费的总课时

                showHours:false,//控制显示咨询师已消费课时，未消费课时
                consumptionHours:'',//已消费课时
                unusedHours:'',//未消费课时
				
				couId:'',//咨询师ID
				conId:'',//咨询师ID
				posName:'',//课程名称
				judgeState:'',//咨客判定
				continueState:'',//续流状态
			}
		},

		methods: {
			//子级传值到父级上来的动态拿去
			pageChange: function(page) {
				this.current = page
				this.conditionCheck(page);
			},
           
			storeChange(param) {
				if (this.isBlank(param)) {
					this.storeId = ""
				} else {
					this.storeId = param.storeId
				}
			},
			conditionCheck: function(page) {

				if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 23:59:00.000')
				}
				if (this.isBlank(page)) {
					page = 1
				}
				var url = this.url + '/consumAction/queryConsum'
				//console.log("page=" + page)
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						storeId: this.storeId,
						memName: this.memName,
						proName:this.posName,
						counselor:this.couId,
                        empId:this.conId,
                        payType:this.payType,
						visitType:this.visitType,
						visitState:this.judgeState,
						continState:this.continueState,
						actualBegDate: this.begCreateDate,
						actualEndDate: this.endCreateDate,
						

						page: page.toString(),
						pageSize: this.pageSize,

					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {

						this.pages = res.retData.pages //总页数
						this.current = res.retData.current //当前页码
						this.pageSize = res.retData.size //一页显示的数量  必须是奇数
						this.total = res.retData.total //数据的数量
						this.$refs.paging.setParam(this.pages, this.current, this.total)
						this.consumeList = res.retData.records

					}else{
						console.log('sdfas')
					}
				}).catch((error) => {
					//console.log('请求失败处理')
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
				this.$refs.judgeStateRef.getObj(this.consume.visitType, 1)
				this.$refs.continueStateRef.setObj(0)
				this.$refs.continueStateRef.getObj(this.consume.visitType, 2)
			},

		},
		mounted() {
            this.$refs.couEmp.setPosName("咨询师")
            this.$refs.couEmp.setEmp("")
			this.$refs.conEmp.setPosName("咨询顾问")
			this.$refs.conEmp.setEmp("")
			this.$refs.judgeStateRef.getObj(1, 1)
			this.$refs.continueStateRef.getObj(1, 2)
		},
		created() {
			this.conditionCheck(1)
		},

	}
</script>


<style scoped="scoped">
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

	#fHeader div.text-center {
		float: left;
		display: inline-block;
		padding: 8px;
		border: 1px solid #ddd;
		font-weight: bold;
	}

	.pa-right {
		padding-right: 0;
	}

	.pa-left {
		padding-left: 0;
	}

	@media print {
		#fHeader {
			display: none
		}
	}
    .tips-font-20{font-size: 20px;}
    .SSwid20{width: 20.5%;}
    .SSwid27{width: 27.3%;}
</style>
