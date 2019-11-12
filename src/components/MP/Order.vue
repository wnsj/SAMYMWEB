<!-- the page of department management -->
<template>

	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">预约管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">预约号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8"><input class="form-control" type="text" value="" v-model="memNum"></div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8"><input class="form-control" type="text" value="" v-model="appName"></div>
			</div>

			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">手机号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<input class="form-control" type="text" value="" v-model="phone">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4  text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">访问类型</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control" v-model="visitType">
						<option value="0">初访</option>
						<option value="1">再访</option>
					</select>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4  text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">是否到店</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control" v-model="arrival">
						<option value="">未选择</option>
						<option value="0">未到店</option>
						<option value="1">已到店</option>
					</select>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4  text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">是否取消</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control" v-model="state">
						<option value="">未选择</option>
						<option value="1">未取消</option>
						<option value="0">已取消</option>
					</select>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-left:0.8%;">
				<div class="col-md-2 col-lg-2 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:25px;">来电时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-4 col-lg-4">
					<dPicker style="width:100%" v-model="begCreateDate"></dPicker>
				</div>
				<div style="padding: 0; line-height: 34px; float:left">
					~
				</div>
				<div class="col-md-4 col-lg-4">
					<dPicker style="width:100%" v-model="endCreateDate"></dPicker>
				</div>
			</div>
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-left:0.8%;">
				<div class="col-md-2 col-lg-2 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:25px;">预约时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-4 col-lg-4">
					<dPicker style="width:100%" v-model="begAppDate" ></dPicker>
				</div>
				<div style="padding: 0; line-height: 34px; float:left">
					~
				</div>
				<div class="col-md-4 col-lg-4">
					<dPicker style="width:100%" v-model="endAppDate"></dPicker>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding-bottom:1.5%;">
			<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="addOrder()">添加预约</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="checkOrderList()">查询</button>
		</div>
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable" >
						<thead class="datathead">
							<tr>
								<th class="text-center">预约号</th>
								<th class="text-center">姓名</th>
								<th class="text-center">手机号</th>
								<th class="text-center">访问类型</th>
								<th class="text-center">来电时间</th>
								<th class="text-center">预约时间</th>
								<th class="text-center">是否到店</th>
								<th class="text-center">是否取消</th>
								<th class="text-center" v-if="has(2)">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in orderList" :key="index" v-on:dblclick="updateOrder(item)">
								<td class="text-center">{{item.memNum}}</td>
								<td class="text-center">{{item.appName}}</td>
								<td class="text-center">{{item.phone}}</td>
								<td class="text-center">{{item.visitType=='0' ? "初访" : "复访"}}</td>
								<td class="text-center">{{item.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td class="text-center">{{item.appDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td class="text-center">{{item.state=='0' ? '已取消' : '未取消'}}</td>
								<td class="text-center">{{item.arrival=='0' ? '未到店' : '已到店'}}</td>
								<td class="text-center" v-if="has(2)">
									<button type="button" class="btn btn-warning" v-on:click="updateOrder(item)">修改</button>
									<button type="button" class="btn btn-primary" v-on:click="caAction(item,'cancel')">{{item.state=='0' ? '已取消' : '点击取消'}}</button>
									<button type="button" class="btn btn-primary" v-on:click="caAction(item,'arrival')">{{item.arrival=='0' ? '点击到店' : '已到店'}}</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="orderContent">
				<div class="modal-dialog">
					<SubOrder ref='order' @addOrder='feedBack'></SubOrder>
				</div>
			</div>
		</div>
	</div>

</template>


<script>

	import SubOrder from '../MP/SubOrder/SubOrder.vue'
	import dPicker from 'vue2-datepicker'
	export default {
		components: {
			SubOrder,
			dPicker,
		},
		data() {
			return {
				memNum:"",
				appName:"",
				phone:"",
				visitType:"",
				begCreateDate:"",
				endCreateDate:"",
				begAppDate:"",
				endAppDate:"",
				orderList: ["",],
				arrival:'0',
				state:'1',
			};
		},
		methods: {
			//modify the cotent of orderContent
			addOrder() {
				this.$refs.order.initData('add')
				$("#orderContent").modal('show')
			},
			updateOrder(item) {
				if(item.state=='0' || item.arrival == '1'){
					alert("已取消或者已到店，不能进行修改")
				}else{
					this.$refs.order.initData('modify',item);
					$("#orderContent").modal('show');
				}
			},
			//feedback from adding and modifying view
			feedBack() {
				this.checkOrderList()
				$("#orderContent").modal('hide')
			},
			caAction(item,param){
				var url = this.url + '/appointmentAction/updateAppointment'
				
				if(param=='cancel'){
					if(item.arrival == '1'){
						alert("已到店，不能修改")
						return
					}else{
						if(item.state != '0'){
							if(confirm('是否确认取消')){
								item.state='0'
							}else{
								return
							}
						}else{
							alert("已取消,不能修改")
							return
						}
					}
				} else if(param=='arrival'){
					if(item.state == '1'){
						if(item.arrival != '1'){
							if(confirm('请确认到店后，点确定')){
								item.arrival='1'
							}else{
								return
							}
						}else{
							alert("已到店，不能修改")
							return
						}
					}else{
						alert("已取消,不能修改")
						return
					}
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:item,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					alert(res.retMsg)
				}).catch((error) => {
					console.log('预约相关提交请求失败')
				});
			},
			//check the list of orderContent
			checkOrderList() {
				var url = this.url + '/appointmentAction/queryAppointment'
				if(!this.isBlank(this.begCreateDate)){
					this.begCreateDate=this.moment(this.begCreateDate,'YYYY-MM-DD 00:00:00.000')
				}
				if(!this.isBlank(this.endCreateDate)){
					this.endCreateDate=this.moment(this.endCreateDate,'YYYY-MM-DD 00:00:00.000')
				}
				if(!this.isBlank(this.begAppDate)){
					this.begAppDate=this.moment(this.begAppDate,'YYYY-MM-DD 00:00:00.000')
				}
				if(!this.isBlank(this.endAppDate)){
					this.endAppDate=this.moment(this.endAppDate,'YYYY-MM-DD 00:00:00.000')
				}
				
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum:this.memNum,
						appName:this.appName,
						phone:this.phone,
						visitType:this.visitType,
						arrival:this.arrival,
						state:this.state,
						begCreateDate:this.begCreateDate,
						endCreateDate:this.endCreateDate,
						begAppDate:this.begAppDate,
						endAppDate:this.endAppDate,
						
						accountId: this.accountId(),
						modelGrade:'2',
						modelType:'',
						operateType:'',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					//console.log(JSON.stringify(res))
					if (res.retCode == '0000') {
						this.orderList = res.retData
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			handleScroll(e){
				var self=this
				var etop = e.target.scrollTop
				var fHeaderwidth = $("#fHeader").width($(".datathead").width())
				var fHeaderheight = $("#fHeader").height($(".datathead").height())
				var theadheight = $(".datathead").height()
				var thlength = $(".datathead tr th").length
				for (var i=0;i<thlength;i++)
				{
					$("#fHeader div").eq(i).width(
					$(".datathead tr th").eq(i).width()
					)
					$("#fHeader div").eq(i).height(
					$(".datathead tr th").eq(i).height()
					)
				}
				if(etop > 0){
					self.fixedHeader=true
					$("#fHeader").css("top",etop)
				}else{
					self.fixedHeader=false
				}
			}
		},
		mounted () {
			window.addEventListener('scroll',this.handleScroll,true)
		},
		created() {
		  this.checkOrderList()
		}
	}
</script>

<style>
  #datatable{position:relative;}
  #fHeader {
    position: absolute;
    top: 0;
    left: 0;
    background: #eeeeee;
    overflow: hidden;
  }
  #fHeader div.text-center{
    float: left;
    display: inline-block;
    padding:8px;
    border: 1px solid #ddd;
    font-weight: bold;
  }
  @media print {
    #fHeader{display:none}
  }
</style>
