<!-- add and modify FWRoyalty -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}定金</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" >姓名</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="cash.cashName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" >手机号</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="cash.phone" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" >定金金额</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="cash.money" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" >交费时间</label><span class="sign-left">:</span>
						<dPicker class="col-md-8 cash-h65" v-model="cash.createDate" v-on:click="dateAction()"></dPicker>
					</div>
					<div class="col-md-12 form-group clearfix">
							<button type="button" class="btn btn-warning pull-right m_r_10 margin-right-15" data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
							<button type="button" class="btn btn-primary pull-right m_r_10 margin-right-15" data-toggle="modal" v-on:click="certainAction()">确认</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import emp from '../../common/Employee.vue'
	export default {
		components:{
			dPicker,
			emp,
		},
		data() {
			return {
				cash:{
					cashId:'',
					cashName:'',
					phone:'',
					money:'',
					createDate:'',
					storeId:'',
					state:'',
					operatorId:'',
				},
				title:'新增',
			};
		},
		methods:{
			// Initialization FWRoyalty’s content
			initData(param,cash) {
				if(param=='add'){
					console.log('Initialization FWRoyalty’s content, which adds FWRoyalty')
					this.title='新增'
					this.cash={
					cashId:'',
					cashName:'',
					phone:'',
					money:'',
					storeId:this.storeId(),
					state:'0',
					operatorId:this.accountId(),
				}

				}else if(param=='modify'){
					console.log('Initialization FWRoyalty’s content, which modifies FWRoyalty')

					this.title='修改'
					Object.assign(this.cash,cash)
					this.cash.operatorId=this.accountId()
					// console.log(JSON.stringify(this.cash))

				}
			},
			dateAction(){
				if(this.isBlank(this.cash.createDate)){
					this.cash.createDate = this.moment(this.cash.createDate,"YYYY-MM-DD 00:00:00.000")
				}
			},

			//the event of addtional button
			certainAction(){
				console.log('the event of addtional button')
				var reg = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)|(^0{0,1}19[0-9]{9}$)/;

				if(this.isBlank(this.cash.cashName)){
					alert("姓名不能为空")
					return
				}
				if(this.isBlank(this.cash.phone)){
					alert("手机号不能为空")
					return
				}else if(reg.test(this.cash.phone)==false){
					alert("不是完整的11位手机号或者正确的座机号！");
					return
				}

				if(this.isBlank(this.cash.money)){
					alert("定金不能为空")
					return
				}

				if(!this.isBlank(this.cash.createDate)){
					this.cash.createDate=this.moment(this.cash.createDate,'YYYY-MM-DD 00:00:00.000')
				}else{
					alert("交定金时间不能为空")
					return
				}
				var url
				switch(this.title){
					case "新增":
						url = this.url + '/cashAction/addCash'
						break;
					case "修改":
						url = this.url + '/cashAction//updateCash'
						break;
				}

				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.cash,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
					}else{
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('会员相关操作失败')
				});
			},
			closeCurrentPage(){
				$("#crContent").modal("hide")
			},
		}

	}
</script>

<style>
    .cash-h65{width: 65%;}
	.pos-tr{
		top:0;
		right:20px;
		line-height:34px;
		-webkit-user-select:none;
    	-moz-user-select:none;
    	-ms-user-select:none;
    	user-select:none;
	}
</style>
