<!-- the page of department management -->
<template>

	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">客户管理</h1>
		</div>
		<div class="row newRow">
			<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 visbtn-box">
				<button type="button" class="btn btn-default pull-left" v-on:click="btnAction('5')"
				 v-has="'SAMY:MP:Visitor:AddRefund'">退费</button>
				<button type="button" class="btn btn-success pull-left" v-on:click="btnAction('4')"
				 v-has="'SAMY:MP:Visitor:AddOrder'">预约</button>
				<button type="button" class="btn btn-success pull-left" v-on:click="btnAction('3')"
				 v-has="'SAMY:MP:Visitor:AddDush'">定金</button>
				<button type="button" class="btn btn-success pull-left" v-on:click="btnAction('2')"
				 v-has="'SAMY:MP:Visitor:AddConsum'">消费</button>
				<button type="button" class="btn btn-success pull-left" v-on:click="btnAction('1')"
				 v-has="'SAMY:MP:Visitor:AddRecharge'">购 买 产 品 </button>
			</div>
		</div>

		<div class="row newRow">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11" >门店</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<Store ref='store' @storeChange='storeChange'></Store>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11" >姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="visitorName">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11" >手机号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<input class="form-control" type="text" value="" v-model="phone">
				</div>
			</div>
		</div>
		<div class="row newRow">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11" >访问类型</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<select class="form-control" v-model="visType">
						<option value="">--未选择--</option>
						<option value="1">初访</option>
						<option value="2">复访</option>
					</select>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11" >接待人</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<emp ref="emp" @employeeChange="employeeChange"></emp>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11" >渠道</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<cha ref="cha" @channelChange="chaChange"></cha>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11" >转会员</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<select class="form-control" v-model="isMem">
						<option value="">--未选择--</option>
						<option value="1">已转会员</option>
						<option value="2">未转会员</option>
					</select>
				</div>
			</div>
		</div>
		<div class="row newRow">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11" >开始时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<dPicker class="wd100" value-type="format" format="YYYY-MM-DD" v-model="begDate"></dPicker>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11" >结束时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<dPicker class="wd100" value-type="format" format="YYYY-MM-DD" v-model="endDate"></dPicker>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right nopad">
					<p class="end-aline col-md-11 col-lg-11" >生日</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<dPicker class="wd100" value-type="format" format="DD" v-model="birthday"></dPicker>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-12 col-lg-12">
					<button type="button" class="btn btn-warning pull-right" data-toggle="modal" v-on:click="selectRule('1')"
					 v-has="'SAMY:MP:Visitor:Add'">添加咨客
					</button>
					<button type="button" class="btn btn-primary pull-right margin-right-10"  data-toggle="modal"
					 v-on:click="checkVisitor(1)">查询
					</button>
				</div>
			</div>
		</div>
		<!-- <el-table :data="visitorList" style="width: 100%">
            <el-table-column prop="visId" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="visitorName" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="会员卡号">
            </el-table-column>
        </el-table> -->
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable">
					<table class="table table-bordered table-hover" id="datatable">
						<thead class="datathead">
							<tr>
								<th class="text-center">编辑</th>
								<th class="text-center">序号</th>
								<th class="text-center">姓名</th>
								<th class="text-center">性别</th>
								<th class="text-center">生日</th>
								<th class="text-center">店铺</th>
								<th class="text-center">渠道</th>
								<th class="text-center">咨询方向</th>
								<th class="text-center">接待人</th>
								<th class="text-center">访问类型</th>
								<th class="text-center">客户判定</th>
								<th class="text-center">续流状态</th>
								<th class="text-center">添加时间</th>
								<th class="text-center">是否转会员</th>
								<th class="text-center">联系电话</th>
								<th class="text-center" v-has="'SAMY:MP:Visitor:Update'">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in visitorList" :key="index" v-on:dblclick="selectRule('3',item)">
								<td class="text-center editradio-box" v-has="'SAMY:MP:Visitor:Update'">
									<input :id="'edit'+(index+1)" class="editradio" type="radio" name="复选框" :value="index"
									 v-model="checkedValue" />
									<label :for="'edit'+(index+1)" class="editlabel"></label>

								</td>
								<td class="text-center">{{item.visId}}</td>
								<td class="text-center">{{item.visitorName}}</td>
								<td class="text-center">{{item.sex==1? "男":"女"}}</td>
								<td class="text-center">{{item.birthday | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td class="text-center">{{item.storeName}}</td>
								<td class="text-center">{{item.channelName}}</td>
								<td class="text-center">{{item.dtName}}</td>
								<td class="text-center">{{item.empName}}</td>
								<td class="text-center">{{item.visType==1?'初访':'复访'}}</td>
								<td class="text-center">{{item.vsIdJudgeName}}</td>
								<td class="text-center">{{item.vsIdFlowName}}</td>
								<td class="text-center">{{item.createTime | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td class="text-center">
									<button type="button" class="btn" :class="item.isMem==1?'btn-success':'btn-warning'" v-on:click="updateVisitorShiftMember(item)">
										{{item.isMem==1?"已转会员":"未转会员"}}
									</button>
								</td>
								<td class="text-center" v-has="'SAMY:MP:Visitor:QueryPhone'">
									<button type="button" class="btn btn-warning" @click="queryPhone(item)">查询手机号码
									</button>
								</td>
								<td class="text-center" v-has="'SAMY:MP:Visitor:Update'">
									<button type="button" class="btn btn-warning" v-on:click="selectRule('3',item)">修改
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--分页插件-->
				<div class="page">
					<!-- 这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值 -->
					<paging ref="paging" @change="pageChange"></paging>
				</div>
			</div>
			<div class="col-md-12 col-lg-12 posAb">
				<p class="tips">* 双击单行，可对当前数据进行修改</p>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="visContent">
				<div class="modal-dialog wd1000">
					<subVis ref='subVis' @certainAction='feedBack6'></subVis>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="memContent">
				<div class="modal-dialog">
					<tm ref='tm' @closeCurrentPage='feedBack7'></tm>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="customContent">
				<div class="modal-dialog wd1000">
					<custom ref='custom' @closeCurrentPage='feedBack5'></custom>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="refundContent">
				<div class="modal-dialog wd1000">
					<refund ref='refund' @closeCurrentPage='feedBack4'></refund>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="rechargeContent">
				<div class="modal-dialog wd1000">
					<recharge ref='recharge' @closeCurrentPage='feedBack3'></recharge>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="addSubOrderContent">
				<div class="modal-dialog wd1000">
					<addSubOrder ref='addSubOrder' @closeCurrentPage='feedBack2'></addSubOrder>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="subCdContent">
				<div class="modal-dialog wd1000">
					<subCd ref='subCd' @certainAction='feedBack1'></subCd>
				</div>
			</div>
		</div>
		<div class="modal fade" id="showPhoneContent">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPhonePage()">×
						</button>
						<h4 id="myModalLabel" class="modal-title">电话</h4>
					</div>
					<div class="modal-body  pos_r">
						<div class="tab-pane fade in active martop" id="basic">
							<form action="" class="clearfix">
								<div class="col-md-12 form-group clearfix">
									<label class="col-md-3 control-label text-right nopad end-aline" >电话号</label><span
									 class="sign-left">:</span>
									<div class="col-md-8">
										<label class="form-control">{{phoneNoX}}</label>
									</div>
								</div>
								<div class="col-md-12 form-group clearfix">
									<label class="col-md-3 control-label text-right nopad end-aline" >分机号</label><span
									 class="sign-left">:</span>
									<div class="col-md-8">
										<label class="form-control">{{extension}}</label>
									</div>
								</div>
								<div class="col-md-12 form-group clearfix">
									<label class="col-md-3 control-label text-right nopad end-aline" >失效时间</label><span
									 class="sign-left">:</span>
									<div class="col-md-8">
										<label class="form-control">{{endUseDate}}</label>
									</div>
								</div>
                                <p class="tips col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left">
                                    注：拨打手机号，听到提示后输入分机号，按#号结束。<br>过了失效时间，通过这个手机号将无法联系到客户。
                                </p>

							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import subVis from '../MP/SubVis/SubVisitor.vue'
	import tm from '../MP/SubVis/TransferMember.vue'
	import Store from '../common/Store.vue'
	import emp from '../common/Employee.vue'
	import cha from '../common/Channel.vue'

	import custom from '../MP/SubRecharge/Custom.vue'
	import refund from '../MP/SubRecharge/Refund.vue'
	import recharge from '../MP/SubRecharge/SubRecharge.vue'
	import addSubOrder from '../MP/SubOrder/AddSubOrder.vue'
	import subCd from '../MP/SubCd/SubCd.vue'


	import dPicker from 'vue2-datepicker'
	import Paging from '../common/paging'
	import {
		init
	} from '@/../static/js/common.js'

	export default {
		components: {
			subVis,
			Store,
			Paging,
			tm,
			dPicker,
			emp,
			cha,
			custom,
			refund,
			recharge,
			addSubOrder,
			subCd,
		},
		data() {
			return {
				visitorList: [],
				isuse: '1',
				storeId: this.storeId(),
				memNum: '',
				visitorName: '',
				phone: '',
				visType: '',
				empId: '',
				chaId: '',
				isMem: '',
				begDate: '',
				endDate: '',
				birthday: '',
				fixedHeader: false,
				checkedValue: -1,
				accountType: this.accountType(),

				phoneNoX: '',
				extension: '',
				endUseDate: '',


				//分页需要的数据
				pages: '', //总页数
				current: 1, //当前页码
				pageSize: 10, //一页显示的数量
				total: '', //数据的数量

				objectContent: {},
			};
		},
		methods: {
			//子级传值到父级上来的动态拿去
			pageChange: function(page) {
				this.current = page
				this.checkVisitor(page);
			},
			selectRule(param, item) {
				if (param == 1) {
					this.$refs.subVis.initData('add', '')
					$("#visContent").modal('show')
				} else if (param == 3) {
					if (!this.has("SAMY:MP:Visitor:Update")) {
						alert("暂无权限!")
						return
					}
					this.$refs.subVis.initData('modify', item)
					$("#visContent").modal('show')
				}
			},

			//转会员
			tranferMember(item) {
				if (item.isMem == 1) {
					alert("已转会员")
					return
				} else {
					this.$refs.tm.initData(item)
					$("#memContent").modal('show')
				}
			},
			employeeChange(param) {
				if (this.isBlank(param)) {
					this.empId = ""
				} else {
					this.empId = param.empId
				}
			},
			chaChange(param) {
				if (this.isBlank(param)) {
					this.chaId = ""
				} else {
					this.chaId = param.chaId
				}
			},
			storeChange(param) {
				if (this.isBlank(param)) {
					this.storeId = ""
				} else {
					this.storeId = param.storeId
				}
			},
			feedBack1() {
				this.checkVisitor(1)
				$("#subCdContent").modal('hide')
			},
			feedBack2() {
				this.checkVisitor(1)
				$("#addSubOrderContent").modal('hide')
			},
			feedBack3() {
				this.checkVisitor(1)
				$("#rechargeContent").modal('hide')
			},
			feedBack4() {
				this.checkVisitor(1)
				$("#refundContent").modal('hide')
			},
			feedBack5() {
				this.checkVisitor(1)
				$("#customContent").modal('hide')
			},
			feedBack6() {
				this.checkVisitor(1)
				$("#visContent").modal('hide')
			},
			feedBack7() {
				this.checkVisitor(1)
				$("#memContent").modal('hide')
			},
			//check the list of member
			checkVisitor(page) {
				//console.log('checkMember')
				var url = this.url + '/visitorAction/queryVisitor'
				if (!this.isBlank(this.begDate)) {
					this.begDate = this.moment(this.begDate, "YYYY-MM-DD 00:00:00")
				}
				if (!this.isBlank(this.endDate)) {
					this.endDate = this.moment(this.endDate, "YYYY-MM-DD 23:59:59")
				}

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
						visitorName: this.visitorName,
						phone: this.phone,
						visType: this.visType,
						chaId: this.chaId,
						empId: this.empId,
						isMem: this.isMem,
						begDate: this.begDate,
						endDate: this.endDate,
						birthday: this.birthday,
						isHidePhone: '1',

						page: page.toString(),
						pageSize: this.pageSize
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
						this.visitorList = res.retData.records
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					//console.log('请求失败处理')
				});
			},
			//添加会员号
			updateVisitorShiftMember(item) {
				var url = this.url + '/visitorAction/updateVisitorShiftMember'
				if (this.isBlank(item.visitorName)) {
					alert('咨客姓名不能为空')
					return
				}
				if (this.isBlank(item.phone)) {
					alert('咨客手机号不能为空')
					return
				}
				if (this.isBlank(item.visId)) {
					alert('咨客ID不能为空')
					return
				}
				if (!this.isBlank(item.memNum)) {
					alert('会员号已存在，无需重复生成！')
					return
				}

				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: item,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.checkVisitor(1)
						alert(res.retMsg)
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					//console.log('转会员请求失败')
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
			},
			editorAction(item) {
				this.objectContent = item
			},
			editorClose() {
				$("#editorContent").modal('hide')
			},
			btnAction(index) {
				if (this.checkedValue > -1) {
					this.objectContent = this.visitorList[this.checkedValue]
				} else {
					alert("请选择咨客后再操作!");
					return
				}

				switch (index) {
					case '1':
						if (this.objectContent.isMem != 1) {
							alert('非会员不能进行套餐课程的购买，若要购买，请转成会员进行购买')
							return
						}
						this.$refs.recharge.initData('add', this.objectContent)
						$("#rechargeContent").modal('show')
						break;
					case '2':
						this.$refs.custom.initData(this.objectContent)
						// //console.log(JSON.stringify(this.objectContent))
						$("#customContent").modal('show')
						break;
					case '3':
						this.$refs.subCd.initData('add', this.objectContent)
						$("#subCdContent").modal('show')
						break;
					case '4':
						this.$refs.addSubOrder.initData('add', this.objectContent)
						$("#addSubOrderContent").modal('show')
						break;
					case '5':
						if (this.objectContent.isMem != 1) {
							alert('非会员不能进行套餐课程的购买，若要购买，请转成会员进行购买')
							return
						}
						this.$refs.refund.initData(this.objectContent)
						$("#refundContent").modal('show')
						break;
					default:
						break;
				}
			},
			queryPhone(item) {
			    var url = this.url + '/visitorAction/requirePhone'
			    this.$ajax({
			        method: 'POST',
			        url: url,
			        headers: {
			            'Content-Type': this.contentType,
			            'Access-Token': this.accessToken
			        },
			        data: {
			            visId: item.visId,
			            accId: this.accountId(),
						moduleId:'1',
			        },
			        dataType: 'json',
			    }).then((response) => {
			        var res = response.data
			        ////console.log(JSON.stringify(res))
			        if (res.retCode == '0000') {
			            this.phoneNoX = res.retData.phoneNoX
			            this.extension = res.retData.extension
			            this.endUseDate = res.retData.endDate
			            $("#showPhoneContent").modal('show')
			        } else {
			            alert(res.retMsg)
			        }

			    }).catch((error) => {
			        //console.log('请求失败处理')
			    });
			},
			closeCurrentPhonePage(){
				$("#showPhoneContent").modal('hide')
			},
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true);
			init();
		},
		created() {
			// this.checkVisitor(1);
		}
	}
</script>

<style>
    .editradio-box{position: relative;width: 50px;}
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

	/*设置选中的input的样式*/
	/* + 是兄弟选择器,获取选中后的label元素*/
	input.editradio:checked+label.editlabel {
		background-color: #3c86f1;
		border: 1px solid #3c86f1;
	}

	input.editradio:checked+label.editlabel::after {
		position: absolute;
		content: '';
		width: 5px;
		height: 10px;
		top: 3px;
		left: 6px;
		border: 2px solid #fff;
		border-top: none;
		border-left: none;
		transform: rotate(45deg);
	}


	/*分页需要的样式*/
	.page {
		width: 100%;
		min-width: 1068px;
		height: 36px;
		margin: 40px auto;
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

	@media print {
		#fHeader {
			display: none
		}
	}
    .visbtn-box{padding-left: 35px;}
    .visbtn-box button{margin-right:1.5%;width: 100px;}

</style>
<!-- feedBack() {
				this.checkVisitor(1)
				$("#subCdContent").modal('hide')
				$("#addSubOrderContent").modal('hide')
				$("#rechargeContent").modal('hide')
				$("#refundContent").modal('hide')
				$("#customContent").modal('hide')
				$("#visContent").modal('hide')
				$("#memContent").modal('hide')
			}, -->
