<template>
	<div>
		<div class="col-md-12 col-lg-12 main-title">
				<h1 class="titleCss">消费汇总</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">会员卡号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8"><input class="form-control" type="text" value="" v-model="memNum"></div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8"><input class="form-control" type="text" value="" v-model="memName"></div>
			</div>

			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">手机号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" value="" v-model="phone">
				</div>
			</div>
		</div> 
		<div class="row"> 
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-left:10px;">
				<div class="col-md-2 col-lg-2 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:25px;">消费时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-4 col-lg-4" style="text-align:left;width:31.5%;">
					<dPicker style="width:100%" v-model="begCreateDate"></dPicker>
				</div>
				<div style="padding: 0; line-height: 34px; float:left">
					~
				</div>
				<div class="col-md-4 col-lg-4" style="text-align:left;width:31.5%;">
					<dPicker style="width:100%" v-model="endCreateDate"></dPicker>
				</div>
				
			</div>
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-right:30px; padding-bottom:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
				 v-on:click="conditionCheck()">查询</button>
			</div>
		</div>

		<div>
			<div class="col-md-12 col-lg-12">
				<nobr class="widthmax">
					<div class="table-responsive pre-scrollable" style=" max-height:464px">
						<table class="table table-bordered table-hover user-table" id="datatable">
							<thead class="datathead">
								<tr>
									<th class="text-center">会员卡号</th>
									<th class="text-center">姓名</th>
									<th class="text-center">手机号</th>
									<th class="text-center">项目</th>
									<th class="text-center">单价</th>
									<th class="text-center">课时（次）</th>
									<th class="text-center">折扣</th>
									<th class="text-center">赠送金额</th>
									<th class="text-center">赠送课时</th>
									<th class="text-center">总金额</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item2,index2) in consumeList" :key="index2">
									<td>{{item2.memNum}}</td>
									<td>{{item2.memName}}</td>
									<td>{{item2.phone}}</td>
									<td>{{item2.proName}}</td>
									<td>{{item2.disPrice}}</td>
									<td>{{item2.actualCount}}</td>
									<td>{{item2.discount}}</td>
									<td>{{item2.giveMoney}}</td>
									<td>{{item2.giveCount}}</td>
									<td>{{item2.realCross}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</nobr>
			</div>
			<div class="col-md-12 col-lg-12">
				<p class="tips">
          <!--* 双击单行，可查看会员详细的消费情况；非会员流水没有明细-->
        </p>
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
	export default {
		name: 'employee',
		components: {
			dPicker,
			SubConsume
		},
		data() {
			return {
				memNum: '',
				memName: '',
				phone:'',
				consumeList:[],
				hospTime: '',
				outHosp: '',
				singleData:{},	
				begCreateDate:'',
				endCreateDate:'',
			}
		},

		methods: {
			conditionCheck: function() {
				
				if(!this.isBlank(this.begCreateDate)){
					this.begCreateDate = this.moment(this.begCreateDate,'YYYY-MM-DD 00:00:00.000')
				}
				if(!this.isBlank(this.endCreateDate)){
					this.endCreateDate = this.moment(this.endCreateDate,'YYYY-MM-DD 23:59:00.000')
				}
				
				var url = this.url + '/accountRecordAction/consumptionSummary'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:{
						memName:this.memName,
						memNum:this.memNum,
						phone:this.phone,
						begCreateDate:this.begCreateDate,
						endCreateDate:this.endCreateDate,
						
						accountId: this.accountId(),
						modelGrade:'2',
						modelType:'',
						operateType:'',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res);
					if (res.retCode == '0000') {
						this.consumeList = res.retData;
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			viewDetails: function(item) {
				
				if(this.isBlank(item.MEM_NUM)){
					alert('非会员没有消费详情')
					return
				}
				this.$refs.consume.conditionCheck(item)
				$("#addConsume").modal('show');
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
			if (window.performance.navigation.type == 1) {
				console.log("页面被刷新")
			}else{
				console.log("首次被加载")
			}
		},
		created() {
			this.conditionCheck()
		},

	}
</script>


<style scoped="scoped">
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
	.pa-right{
		padding-right:0;
	}
	.pa-left{
		padding-left:0;
	}
	@media print {
		#fHeader {
			display: none
		}
	}
</style>
