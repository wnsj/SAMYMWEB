<!-- the page of department management -->
<template>

	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">定金管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8"><input class="form-control" type="text" value="" v-model="cashName"></div>
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
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">开始时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<dPicker style="width:100%" v-model="beginDate"></dPicker>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">结束时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<dPicker style="width:100%" v-model="endDate"></dPicker>
				</div>
			</div>
		</div>
		<div class="row" style="padding-bottom:1.5%;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<Store ref='store' @storeChange='storeChange'></Store>
				</div>
			</div>
			<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:2.5%;" data-toggle="modal"
			 v-on:click="addMember()">添加定金</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="checkMember()">查询</button>
		</div>
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable" >
						<thead class="datathead">
							<tr>
								<th class="text-center">门店</th>
								<th class="text-center">姓名</th>
								<th class="text-center">手机号</th>
								<th class="text-center">定金金额</th>
								<th class="text-center">交定金时间</th>
								<th class="text-center">操作人</th>
								<th class="text-center">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in cashList" :key="index" v-on:dblclick="modifyMember(item)">
								<td class="text-center">{{item.storeName}}</td>
								<td class="text-center">{{item.cashName}}</td>
								<td class="text-center">{{item.phone}}</td>
								<td class="text-center">{{item.money}}</td>
								<td class="text-center">{{item.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td class="text-center">{{item.operatorName}}</td>
								<td class="text-center">
									<button type="button" class="btn btn-warning" v-on:click="modifyMember(item)">修改</button>
									<button type="button" class="btn btn-default" v-on:click="cancelCush(item)">{{item.state==1 ? "已撤销" : "未撤销"}}</button>
								</td>
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
			<div class="modal fade" id="cdContent">
				<div class="modal-dialog">
					<SubCd ref='subCd' @certainAction='feedBack'></SubCd>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
	import dPicker from 'vue2-datepicker'
	import SubCd from '../MP/SubCd/SubCd.vue'
	import Store from '../common/Store.vue'
	export default {
		components: {
			dPicker,
			SubCd,
			Store,
		},
		data() {
			return {
				cashList:[],
				cashName: '',
				phone:'',
				beginDate:'',
				endDate: '',
				storeId:'0',
				state:'',
			};
		},
		methods: {
			//modify the cotent of member
			addMember() {
				console.log('modify the cotent of member')
				this.$refs.subCd.initData('add')
				$("#cdContent").modal('show')
			},
			//modify the cotent of member
			modifyMember(item) {
				if(item.state=='1'){
					alert("已经撤销，不能进行修改")
					return
				}
				this.$refs.subCd.initData('modify', item)
				$("#cdContent").modal('show')
			},
			storeChange(param){
				if(this.isBlank(param)){
					this.storeId=""
				}else{
					this.storeId=param.storeId
				}
			},
			feedBack(){
				this.checkMember()
				$("#cdContent").modal('hide')
			},
			//check the list of member
			checkMember() {
				console.log('checkMember')
				var url = this.url + '/cashAction/queryCash'
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						cashName:this.cashName,
						phone:this.phone,
						beginDate: this.beginDate,
						endDate: this.endDate,
						storeId:this.storeId,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {
						this.cashList = res.retData
					} else {
						alert(res.retMsg)
					}
			
				}).catch((error) => {
					console.log('定金查询失败')
				});
			},
			cancelCush(item){
				var url = this.url + '/cashAction/updateCash'
				if(item.state=='1'){
					alert("已经撤销，不能进行修改")
					return
				}
				
				item.updateDate=this.moment('','YYYY-MM-DD 00:00:00.000')
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:{
						state:'1',
						cashId:item.cashId,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {
						item.state = '1'
					}
							
				}).catch((error) => {
					console.log('定金查询失败')
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
		  this.checkMember()
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
