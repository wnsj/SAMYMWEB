<!-- the page of department management -->
<template>

	<div>
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">会员管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">店铺</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8">
					<Store ref='store' @storeChange='storeChange'></Store>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-4 col-lg-4 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">会员卡号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-8 col-lg-8"><input class="form-control" type="text" value="" v-model="memNum" ></div>
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
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding-bottom:1.5%;">
			<button type="button" class="btn btn-warning pull-right m_r_10"  data-toggle="modal"
			 v-on:click="addMember()"  v-if="has(2)">添加会员</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="checkMember()">查询</button>
		</div>
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable" style="max-height:464px">
					<table class="table table-bordered table-hover" id="datatable" >
						<thead class="datathead">
							<tr>
								<th class="text-center">会员卡号</th>
								<th class="text-center">姓名</th>
								<th class="text-center">店铺名</th>
								<th class="text-center">是否实卡用户</th>
								<th class="text-center">手机号</th>
								<th class="text-center">性别</th>
								<th class="text-center">生日</th>
								<th class="text-center">是否停用</th>
								<th class="text-center">推荐人</th>
								<th class="text-center" v-if="has(2)">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in memberList" :key="index" v-on:dblclick="modifyMember(item)">
								<td class="text-center">{{item.memNum}}</td>
								<td class="text-center">{{item.memName}}</td>
								<td class="text-center">{{item.storeName}}</td>
								<td class="text-center">{{item.memType == 1 ? "是" : "否"}}</td>
								<td class="text-center">{{item.phone}}</td>
								<td class="text-center">{{item.sex}}</td>
								<td class="text-center">{{item.birthday}}</td>
								<td class="text-center">{{item.isuse==true ? "在用" : "停用"}}</td>
								<td class="text-center">{{item.empName}}</td>
								<td class="text-center" v-if="has(2)"><button type="button" class="btn btn-warning" v-on:click="modifyMember(item)">修改</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="memberContent">
				<div class="modal-dialog">
					<SubMemberRun ref='subMemR' @certainAction='feedBack'></SubMemberRun>
				</div>
			</div>
		</div>
	</div>

</template>


<script>

	import SubMem from '../MP/SubMem/SubMem.vue'
	import Store from '../common/Store.vue'
	export default {
		components: {
			SubMem,
			Store,
		},
		data() {
			return {
				memberList: [],
				isuse: '1',
				storeId:'',
				memNum:'',
				memName: '',
				phone:'',
				fixedHeader: false,
			};
		},
		methods: {
			//modify the cotent of member
			addMember() {
				console.log('modify the cotent of member')
				this.$refs.subMemR.initData('add')
				$("#memberContent").modal('show')
			},
			//modify the cotent of member
			modifyMember(item) {
				if(!this.has(2)){
				alert("暂无权限修改!");
				return;
				}
				console.log('modify the cotent of member')
				this.$refs.subMemR.initData('modify', item)
				$("#memberContent").modal('show')
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
				$("#memberContent").modal('hide')
			},
			//check the list of member
			checkMember() {
				console.log('checkMember')
				var url = this.url + '/memberAction/queryVagueMember'
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						storeId:this.storeId,
						memNum:this.memNum,
						memName: this.memName,
						isuse: this.isuse,
						phone:this.phone,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						this.memberList = res.retData
					} else {
						alert(res.retMsg)
					}
			
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			//check the list of department
			checkDepartment() {
				console.log('checkDepartment')
				var url = this.url + '/memberAction/queryDepartment'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						storeId:this.storeId,
						memNum:this.memNum,
						memName: this.memName,
						isuse: this.isuse,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						this.departmentList = res.retData
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
			this.checkMember();
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
