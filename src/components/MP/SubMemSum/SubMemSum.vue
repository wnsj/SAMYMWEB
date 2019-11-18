<!-- add and modify patient -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel">会员列表</h4>
		</div>
		<div class="tableContent">
			<nobr class="widthmax">
				<div class="table-responsive pre-scrollable" style=" max-height:464px">
					<table class="table table-bordered table-hover user-table" id="datatable">
						<thead>
							<tr>
								<th class="text-center">会员卡号</th>
								<th class="text-center">所属门店</th>
								<th class="text-center">姓名</th>
								<th class="text-center">时间</th>
								<th class="text-center">费用类型</th>
								<th class="text-center">金额</th>
							</tr>
						</thead> 
						<tbody>
							<tr v-for="(item,index) in memberList" :key="index">
								<td>{{item.memNum}}</td>
								<td>{{item.storeName}}</td>
								<td>{{item.memName}}</td>
								<td>{{item.createDate | dateFormatFilter('YYYY-MM-DD')}}</td>
								<td v-if="item.costType=='1'">{{item.isfirst=='1'? '首充' : '续费'}}</td>
								<td v-else-if="item.costType=='2'">消费</td>
								<td v-else-if="item.costType=='3'">退费</td>
								<td>{{item.momey}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</nobr>
		</div>
		
	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	export default {
		components:{
			dPicker,
		},
		data() {
			return {
				memberList:["",],
			};
		},
		methods:{
			closeCurrentPage(){
				$("#detailMember").modal("hide")
				console.log('关闭添加患者界面')
			},
			//Query patient's information based on the hosNum
			conditionCheck(param){
				if(this.isBlank(param)){
					return
				}
				var url = this.url + '/accountRecordAction/queryAccountSummary'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum:param.MEM_NUM,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						if (res.retData != null) {
							this.memberList = res.retData
						}
					}else{
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('会员消费详细信息请求失败')
				});
			},
			
		}
		
	}
</script>

<style>

</style>
