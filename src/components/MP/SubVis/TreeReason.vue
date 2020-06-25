<!-- add and modify visitor -->
<template>
	<div class="reason-content wd1000">
		<div class="reason-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">添加原因/备注</h4>
		</div>
		<div class="modal-body  pos_r jh-mh-sc">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">姓名</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control"  v-model="visitorName" disabled>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">产品</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.proName"  disabled />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">课时</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.totalCount" disabled  />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">类别</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.title" disabled  />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">访问类型</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.visitType" disabled />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">客户判定</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.isfirst" disabled />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">续流状态</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.continState" disabled />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">咨询师</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.counselorName" disabled />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">助理</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.empName" disabled />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">跟进人</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.followUpPerson" disabled />
						</div>
					</div>
					<div class="col-md-12 clearfix jh-mb-0"></div>
					<div class="col-md-6 clearfix jh-mb-0 jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">原因</label><span class="sign-left">:</span>
					</div>
					<div class="col-md-12 jh-mb-0 clearfix">
						<textarea class="reasonText" v-model="reasoner.reason"></textarea>
					</div>
					<div class="col-md-6 clearfix jh-wd-33 jh-mb-0">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">备注</label><span class="sign-left">:</span>
					</div>
					<div class="col-md-12 form-group clearfix">
						<textarea class="reasonText" v-model="reasoner.remark"></textarea>
					</div>
					<div class="col-md-12 form-group clearfix">
						<button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-1" data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
						<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-1" data-toggle="modal" v-on:click="certainAction()">确认</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {
		
		},
		data() {
			return {
				reasoner: {},
				visitorName:''
			};
		},
		methods: {
			initData(name,visitorContent) {
				this.reasoner = {};
				this.visitorName = name;
				Object.assign(this.reasoner, visitorContent);
				
			},
			closeCurrentPage() {
				$("#treeson").hide();
			},
			certainAction() {
				var url = this.url + '/consumAction/patchRemark';
				var json = {
					"id":this.reasoner.id,
					"title":this.reasoner.title,
					"reason":this.reasoner.reason,
					"followUpPerson":this.reasoner.followUpPerson,
					"remark":this.reasoner.remark
				}
				console.log(json);
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: json,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg);
						this.$emit('certainAction');
						this.closeCurrentPage();
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					//console.log('添加或者修改客户信息失败')
				});
			},

		},
		mounted(){
			this.initData(); 
		}
	}
</script>

<style>
	.reason-content{
		background: #fff;
	}
	.reason-content .reason-header{
		padding: 15px;
	}
	.reasonText{
		width:100%;
		height: 100px;
		padding: 5px;
		box-sizing: border-box;
		resize: none;
		font-size: 14px;
		line-height: 1.5em;
	}
</style>
