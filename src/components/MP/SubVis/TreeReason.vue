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
							<input type="text" class="form-control"  placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">产品</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.product"  disabled />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">课时</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.class_time" disabled  />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">类别</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="reasoner.operate_model" disabled>
								<option value="1">购买</option>
								<option value="2">消费</option>
								<option value="3">退费</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">访问类型</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.type" disabled />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">客户判定</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.vote" disabled />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">续流状态</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.vs_id_flow" disabled />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">咨询师</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.counselor" disabled />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">助理</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.assistant" disabled />
						</div>
					</div>
					<div class="col-md-6 form-group clearfix jh-wd-33">
						<label class="col-md-3 control-label text-right nopad end-aline jh-ad-1">跟进人</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="reasoner.follow_up" disabled />
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<label class="col-md-1 control-label text-right nopad end-aline jh-ad-1">原因</label><span class="sign-left">:</span>
						<div class="col-md-12 wd84">
							<input type="text" class="form-control" v-model="reasoner.reason" placeholder="">
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<label class="col-md-1 control-label text-right nopad end-aline jh-ad-1">备注</label><span class="sign-left">:</span>
						<div class="col-md-12 wd84">
							<input type="text" class="form-control" v-model="reasoner.remarks" placeholder="">
						</div>
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
				reasoner: {
					create_date:'',
					operate_model:'',
					product:'',
					class_time:'',
					type:'',
					vote:'',
					vs_id_flow:'',
					counselor:'',
					assistant:'',
					follow_up:'',
					reason:'',
					remarks:'',
				},
			};
		},
		methods: {
			initData(visitorContent) {
				console.log("=========reason=========");
				console.log(visitorContent);
				this.reasoner={
					create_date:'',
					operate_model:'',
					product:'',
					class_time:'',
					type:'',
					vote:'',
					vs_id_flow:'',
					counselor:'',
					assistant:'',
					follow_up:'',
					reason:'',
					remarks:'',
				}
				Object.assign(this.reasoner, visitorContent);
				
			},
			closeCurrentPage() {
				$("#treeson").hide();
			},

			//the event of addtional button
			certainAction() {
				//console.log('the event of addtional button')
				var reg =
					/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;

				if (this.isBlank(this.visitor.visitorName)) {
					alert("客户姓名不能为空")
					return
				}
				if (this.isBlank(this.visitor.phone)) {
					alert("联系人电话不能为空")
					return
				}else{
					if(this.visitor.phone.indexOf("****") !=-1){  //==-1不包含
						this.visitor.phone=null
					}else{
						if(reg.test(this.visitor.phone) == false){
							alert("不是完整的11位手机号或者正确的座机号！");
							return
						}
					}
				} 
				return
				if(this.isBlank(this.visitor.birthday)){
					this.visitor.birthday=null
				}
				if(this.isBlank(this.visitor.eduId)){
					this.visitor.eduId=null
				}
				if(this.isBlank(this.visitor.occId)){
					this.visitor.occId=null
				}
				if(this.isBlank(this.visitor.reId)){
					this.visitor.reId=null
				}
				if (this.isBlank(this.visitor.dtId)) {
					alert("客户的咨询方向不能为空")
					return
				}
				if (this.isBlank(this.visitor.chaId)) {
					alert("客户的来源渠道不能为空")
					return
				}
				if (this.isBlank(this.visitor.visType)) {
					alert("访问状态不能为空")
					return
				}
				if (this.isBlank(this.visitor.vsIdJudge) || this.visitor.vsIdJudge == '0') {
					alert("客户判定不能为空")
					return
				}
				if (this.isBlank(this.visitor.vsIdFlow) || this.visitor.vsIdFlow == '0') {
					alert("续流状态不能为空")
					return
				}
				if (this.isBlank(this.visitor.empId) || this.visitor.empId == 0) {
					alert("接待人不能为空")
					return
				}
				
				if (this.visitor.address.length > 100) {
					alert('地址的长度不能超过100个字')
					return
				}

				switch (this.title) {
					case '新增':
						var url = this.url + '/visitorAction/addVisitor';
						break;
					case '修改':
						var url = this.url + '/visitorAction/updateVisitor'
						break;
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.visitor,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
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
</style>
