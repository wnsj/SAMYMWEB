<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">消费管理</h1>
		</div>
		<el-collapse-transition>
        <div v-show="showSelect">
			<div class="row newRow">
				<div v-has="'SAMY:MP:STORE'" class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right nopad">
						<p class="end-aline col-md-11 col-lg-11" >门店</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7" style="padding-right: 0;">
						<store ref='store' @storeChange='storeChange'></store>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right nopad">
						<p class="end-aline col-md-11 col-lg-11" >姓名</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7" style="padding-right: 0;"><input class="form-control" type="text" value="" v-model="memName"></div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right nopad">
						<p class="end-aline col-md-11 col-lg-11" style="padding-left: 0;padding-right: 0;">访问类型</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7" style="padding-right: 0;">
						<select class="form-control" v-model="visitType" @change="visitTypeChange">
							<option value="">--未选择--</option>
							<option value="1">初访</option>
							<option value="2">复访</option>
						</select>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right nopad">
						<p class="end-aline col-md-11 col-lg-11"  style="padding-left: 0;padding-right: 0;">客户判定</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7" style="padding-right: 0;">
						<judgeState ref="judgeStateRef" @objectChange="judgeStateChange"></judgeState>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right nopad">
						<p class="end-aline col-md-11 col-lg-11" style="padding-left: 0;padding-right: 0;">优惠券类型</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7" style="padding-right: 0;">
						<select class="form-control" v-model="couponType">
							<option value="">--未选择--</option>
							<option value="2">满减</option>
							<option value="1">满折</option>
						</select>
					</div>
				</div>
			</div>

			<div class="row newRow">
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right nopad">
						<p class="end-aline col-md-11 col-lg-11"  style="padding-left: 0;padding-right: 0;">续流状态</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7" style="padding-right: 0;">
						<continueState ref="continueStateRef" @objectChange="continueStateChange"></continueState>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 nopad" >
						<p class="end-aline col-md-11 col-lg-11" >咨询师</p><span class="sign-left">:</span>
					</div>
					<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7" style="padding-right: 0;">
						<cou ref="couEmp" @employeeChange="couChange"></cou>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 nopad" >
						<p class="end-aline col-md-11 col-lg-11"  style="padding-left: 0;padding-right: 0;">咨询顾问</p><span class="sign-left">:</span>
					</div>
					<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7" style="padding-right: 0;">
						<con ref="conEmp" @employeeChange="conChange"></con>
					</div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right nopad">
						<p class="end-aline col-md-11 col-lg-11"  style="padding-left: 0;padding-right: 0;">课程名称</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7" style="padding-right: 0;"><input class="form-control" type="text" value="" v-model="proName"></div>
				</div>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-md-5 col-lg-5 text-right nopad">
						<p class="end-aline col-md-11 col-lg-11" style="padding-left: 0;padding-right: 0;">使用优惠券</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-7 col-lg-7" style="padding-right: 0;">
						<select class="form-control" v-model="isUseCoupon">
							<option value="">--未选择--</option>
							<option value="1">是</option>
							<option value="2">否</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row newRow">
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 nopad" >
						<p class="end-aline col-md-11 col-lg-11"  style="padding-left: 0;padding-right: 0;">交费方式</p><span class="sign-left">:</span>
					</div>
					<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7" style="padding-right: 0;">
                        <PayStyle ref="payStyleRef" @payStyleChange="psStyle"></PayStyle>
					</div>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<div class="col-md-3 col-lg-3 text-right nopad SSwid20">
						<p class="end-aline col-md-11 col-lg-11" style="margin-left: -25px;">消费时间</p><span class="sign-left">:</span>
					</div>
					<div class="col-md-4 col-lg-4 SSwid27" style="margin-left: -30px;">
						<dPicker class="wd100" v-model="begCreateDate"></dPicker>
					</div>
					<div class="pull-left end-aline nopad">
						~
					</div>
					<div class="col-md-4 col-lg-4 SSwid27">
						<dPicker class="wd100" v-model="endCreateDate"></dPicker>
					</div>
				</div>
				<button type="button" class="btn btn-primary pull-right m_r_10 margin-right-15" data-toggle="modal"
					v-on:click="conditionCheck(1)">查询</button>
				<!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<button type="button" class="btn btn-primary pull-right m_r_10 margin-right-15" data-toggle="modal"
					v-on:click="conditionCheck(1)">查询</button>
				</div> -->
			</div>
		</div>
		</el-collapse-transition>
        <div class="arrow-bottom jh-wd-100 jh-po-re" :class="addClass?'noEvents':''" @click="dataClose" @mouseenter="dataOpen">
            <div class="jh-po-ab jh-arrow-pos" :class="showSelect?'el-icon-arrow-down':'el-icon-arrow-up'"></div>
        </div>
		<div>
			<div class="col-md-12 col-lg-12">
				<nobr class="widthmax">
					<div class="table-responsive">
						<table class="table table-bordered table-hover user-table" id="datatable">
							<thead class="datathead">
								<tr>
									<th class="text-center">姓名</th>
									<th class="text-center">产品名称</th>
									<th class="text-center">单价</th>
									<th class="text-center">课时(小时)</th>
									<th class="text-center">折扣(%)</th>
									<th class="text-center">消费金额</th>
									<th class="text-center">优惠券类型</th>
									<th class="text-center">优惠券名字</th>
									<th class="text-center">优惠金额(元)</th>
									<th class="text-center">咨询师</th>
									<th class="text-center">咨询顾问</th>
									<th class="text-center">访问类型</th>
									<th class="text-center">咨客判定</th>
									<th class="text-center">续流状态</th>
									<th class="text-center">付款方式</th>
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
									<td>{{transforProType(item2.couponType)}}</td>
									<td>{{item2.couponName}}</td>
									<td>{{item2.couponAmount}}</td>
									<td>{{item2.counselorName}}</td>
									<td>{{item2.empName}}</td>
									<td>{{item2.visitType== '1' ? '初访' : item2.visitType== '2' ? '复访':''}}</td>
									<!-- <td>{{item2.visitType== '1' ? '初访' : '复访'}}</td> -->
									<td>{{item2.judgeStateName}}</td>
									<td>{{item2.continueStateName}}</td>
									<td>{{item2.psName}}</td>
									<td>{{item2.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
									<td>{{item2.purTime}}</td>
								</tr>
							</tbody>
						</table>
					</div>
                    <p class="tips" v-if="tipsFlag">* 有数据未完成审核流程，请尽快完成审核。避免影响汇总数据</p>
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
    import PayStyle from '../common/PayStyle.vue'
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
            PayStyle
		},
		data() {
			return {
				
				couponType:'',
				isUseCoupon:'',
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
                payType:'',
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
				proName:'',//课程名称
				judgeState:'',//咨客判定
				continueState:'',//续流状态
				showSelect:true,
                addClass: false,
                tipsFlag: false
			}
		},
        watch:{
             '$store.getters.getAuditStatus'(val, oldVal){  //监听store
                 if (val == '1') {
                     this.tipsFlag = false
                 } else {
                     this.tipsFlag = true
                 }
             }
         },
		methods: {
			//产品类型转换
			transforProType(couponType) {
				if (couponType == 1) return '满折券'
				else if (couponType == 2) return '满减券'
			},
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
			dataOpen(){
			    if(this.showSelect) return
			    this.showSelect = true;
			},
			dataClose(){
			    this.showSelect = !this.showSelect
			    this.addClass = true;

			    setTimeout(()=>{
			        this.addClass = false;
			    },400)
			},
			conditionCheck: function(page) {
                this.showSelect = false
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
						proName:this.proName,
						counselor:this.couId,
                        empId:this.conId,
                        payType:this.payType,
						visitType:this.visitType,
						visitState:this.judgeState,
						continState:this.continueState,
						actualBegDate: this.begCreateDate,
						actualEndDate: this.endCreateDate,
						isUseCoupon:this.isUseCoupon,
						couponType:this.couponType,
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
            psStyle(data) {
                this.payType = ''
                if (data != null) {
                    this.payType = data
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
		mounted() {
            this.$refs.couEmp.setPosName("咨询师")
			this.$refs.conEmp.setPosName("咨询顾问")
			this.$refs.couEmp.setEmp("")
			this.$refs.conEmp.setEmp("")
			this.$refs.judgeStateRef.getObj(1, 1)
			this.$refs.continueStateRef.getObj(1, 2)
		},
		created() {
            if (this.$store.state.allAuditStatus == '1') {
                this.tipsFlag = false
            } else {
                this.tipsFlag = true
            }

			this.conditionCheck(1)
		},

	}
</script>


<style scoped="scoped">
	.newRow .col-xs-3,.newRow .col-sm-3,.newRow .col-md-3,.newRow .col-lg-3{
		width: 20%!important;
	}
	/*分页需要的样式*/
	.page {
		width: 100%;
		min-width: 1068px;
		height: 36px;
		/* margin: 20px auto; */
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
