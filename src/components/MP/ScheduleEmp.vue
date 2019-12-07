<!-- the page of department management -->
<template>

	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">排班管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <dPicker style="width:100%" v-model="thisDate"></dPicker>
					<!--<store ref="store" @storeChange='storeChange'></store>-->
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">咨询师</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <!--<emp ref="emp" @employeeChange="counselorEmpChange"></emp>-->
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
		</div>
		<div class="row" style="padding-bottom:1.5%;">
			<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:2.5%;" data-toggle="modal"
			 v-on:click="selectRule('1')">添加排班</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="checkEmp()">查询</button>
		</div>
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px;">
					<table class="table table-bordered table-hover" id="datatable" style=" position:relative;">
						<thead>
							<tr>
								<th class="text-center">姓名</th>
                <template v-for="(value, key, index) in schedulingListTitle">
                  <template v-for='val,index in morningOrAfternoon'>
                    <th v-if="key=='schedulingDate1'" class="text-center">{{value}}{{val}}</th>
                  </template>
                  <template v-for='val,index in morningOrAfternoon'>
                    <th v-if="key=='schedulingDate2'" class="text-center">{{value}}{{val}}</th>
                  </template>
                  <template v-for='val,index in morningOrAfternoon'>
                    <th v-if="key=='schedulingDate3'" class="text-center">{{value}}{{val}}</th>
                  </template>
                  <template v-for='val,index in morningOrAfternoon'>
                    <th v-if="key=='schedulingDate4'" class="text-center">{{value}}{{val}}</th>
                  </template>
                  <template v-for='val,index in morningOrAfternoon'>
                    <th v-if="key=='schedulingDate5'" class="text-center">{{value}}{{val}}</th>
                  </template>
                  <template v-for='val,index in morningOrAfternoon'>
                    <th v-if="key=='schedulingDate6'" class="text-center">{{value}}{{val}}</th>
                  </template>
                  <template v-for='val,index in morningOrAfternoon'>
                    <th v-if="key=='schedulingDate7'" class="text-center">{{value}}{{val}}</th>
                  </template>
                </template>
								<!--<th class="text-center" v-if="has(2)">修改</th>-->
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in schedulingList" :key="index" v-on:dblclick="selectRule('3',item)">
								<td class="text-center">{{item.name}}</td>
								<td class="text-center">{{item.morning1=='0'?'歇班':'上班'}}</td>
								<td class="text-center">{{item.afternoon1=='0'?'歇班':'上班'}}</td>
								<td class="text-center">{{item.morning2=='0'?'歇班':'上班'}}</td>
								<td class="text-center">{{item.afternoon2=='0'?'歇班':'上班'}}</td>
								<td class="text-center">{{item.morning3=='0'?'歇班':'上班'}}</td>
								<td class="text-center">{{item.afternoon3=='0'?'歇班':'上班'}}</td>
                <td class="text-center">{{item.morning4=='0'?'歇班':'上班'}}</td>
                <td class="text-center">{{item.afternoon4=='0'?'歇班':'上班'}}</td>
                <td class="text-center">{{item.morning5=='0'?'歇班':'上班'}}</td>
                <td class="text-center">{{item.afternoon5=='0'?'歇班':'上班'}}</td>
                <td class="text-center">{{item.morning6=='0'?'歇班':'上班'}}</td>
                <td class="text-center">{{item.afternoon6=='0'?'歇班':'上班'}}</td>
                <td class="text-center">{{item.morning7=='0'?'歇班':'上班'}}</td>
                <td class="text-center">{{item.afternoon7=='0'?'歇班':'上班'}}</td>
								<!--<td class="text-center" v-if="has(2)"><button type="button" class="btn btn-warning" v-on:click="selectRule('3',item)">修改</button></td>-->
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="col-md-12 col-lg-12">
				<p class="tips">* 双击单行，可对当前数据进行修改</p>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="scheduleContent">
				<div class="modal-dialog">
					<schedule ref='schedule' @addEmp='feedBack'></schedule>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
	import schedule from '../MP/SubSm/Schedule.vue'
	import store from '../common/Store.vue'
	import pos from '../common/Position.vue'
  import dPicker from 'vue2-datepicker'
  // import emp from '../../common/Employee.vue'
	export default {
		components: {
			schedule,
			pos,
			store,
      dPicker,
      // emp,
		},
		data() {
			return {
        schedulingList: [],
				isuse: '1',
				empName: '',
				iphone:'',
				fixedHeader: false,
				posId:'',
				storeId:'',
        schedulingListTitle:{},
        morningOrAfternoon:['上午','下午'],
        thisDate:'',
         // empId:'',

			};
		},
		methods: {
			//modify the cotent of department
			
			addEmp() {
				console.log('modify the cotent of department')
				this.$refs.schedule.initData('add')
				$("#scheduleContent").modal('show')
			},
			//modify the cotent of department
			modifyEmp(item) {
				console.log('modify the cotent of department')
				this.$refs.schedule.initData('modify', item)
				$("#scheduleContent").modal('show')
			},
      //咨询师
      // counselorEmpChange: function(param) {
      //   if (this.isBlank(param)) {
      //     this.empId = ""
      //   } else {
      //     this.empId = param.empId
      //     this.$refs.emp.setEmp('咨询师')
      //
      //   }
      // },
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
						urlName:'/MP/Employee',
						operateType:param,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if(res.retData=='0010'){
							console.log('param:'+param)
							if(param==1){
								this.$refs.schedule.initData('add','')
								$("#scheduleContent").modal('show')
							}else if(param==3){
								this.$refs.schedule.initData('modify', item)
								$("#scheduleContent").modal('show')
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
				var url = this.url + '/schedulingAction/queryScheduling'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
            thisDate:this.thisDate
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						this.schedulingListTitle = res.retData[0];
						this.schedulingList=res.retData;
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
