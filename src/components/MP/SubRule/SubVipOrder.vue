<!-- add and modify FWRoyalty -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">预约人数提成规则</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">岗位</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<pos ref='pos' @positionChange='posChange'></pos>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">访问类型</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="FWRoyalty.consumeType">
								<option value="5">初访</option>
								<option value="6">再访</option>
							</select>
						</div>
					</div>
					<div class="col-md-9 form-group clearfix">
						<label for="cyname" class="col-md-2 control-label text-right nopad end-aline jh-ad-1">预约人数</label><span class="sign-left">:</span>
						<div class="col-md-4 pos-re">
							<input type="text" class="form-control" v-model="FWRoyalty.orderSmall" placeholder="">
							<span class="pos-ab pos-tr">人</span>
						</div> 
						<div class="jh-lh-34 jh-fl">~</div>
						<div class="col-md-4 pos-re">
							<input type="text" class="form-control" v-model="FWRoyalty.orderBig" placeholder="">
							<span class="pos-ab pos-tr">人</span>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline jh-ad-1">提成金额</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="FWRoyalty.visRoy" placeholder="">
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<button type="button" class="btn btn-warning pull-right m_r_10 jh-mr-1"  data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
						<button type="button" class="btn btn-primary pull-right m_r_10 jh-mr-1"  data-toggle="modal" v-on:click="certainAction(title)">确认</button>
					</div>
				</form>
			</div>
	
		</div>
		
	</div>
</template>

<script>
	import pos from '../../common/Position.vue'
	export default {
		components:{
			pos,
		},
		data() {
			return {
				FWRoyalty:{
					posId:'0',
					orderSmall:'0',
					orderBig:'0',
					visRoy:'0',
					consumeType:'5',
				},
				title:'新增',
			};
		},
		methods:{
			// Initialization FWRoyalty’s content
			initData(param,FWRoyalty) {
				if(param=='add'){
					console.log('Initialization FWRoyalty’s content, which adds FWRoyalty')
					this.title='新增'
					this.FWRoyalty={
						posId:'0',
						orderSmall:'0',
						orderBig:'0',
						visRoy:'0',
						consumeType:'5',
					}
					this.$refs.pos.setPosId('0')
				}else if(param=='modify'){
					console.log('Initialization FWRoyalty’s content, which modifies FWRoyalty')
					this.title='修改'
					Object.assign(this.FWRoyalty,FWRoyalty)
					this.$refs.pos.setPosId(FWRoyalty.posId)
					
				}
			},
			
			//feedback position information
			posChange:function(param){
				console.log('岗位3：'+JSON.stringify(param))
				if(this.isBlank(param)){
					this.FWRoyalty.posId=""
				}else{
					this.FWRoyalty.posId=param.posId
				}
				console.log('岗位4：'+this.FWRoyalty.posId)
			},
			
			//the event of addtional button
			certainAction(param){
				console.log('the event of addtional button')
				
				
				if(this.isBlank(this.FWRoyalty.posId) || this.FWRoyalty.posId=='0'){
					alert("岗位类型不能为空")
					return
				}
				if(this.isBlank(this.FWRoyalty.consumeType)){
					alert("访问类型不能为空")
					return
				}
				if(this.isBlank(this.FWRoyalty.visRoy)){
					alert("提成金额不能为空")
					return
				}
				switch(param){
					case '新增':
						var url = this.url + '/royaltyAction/addRoyalty';
						break;
					case '修改':
						var url = this.url + '/royaltyAction/updateRoyalty'
						break;	
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.FWRoyalty,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
					}
				}).catch((error) => {
					console.log('添加流水规则失败')
				});
			},
			closeCurrentPage(){
				$("#SubVipOrder").modal("hide")
				console.log('close the flowWater rule')
			},
		}
		
	}
</script>

<style>
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