<template>
	<el-select v-model="productType" @change="getchannelId" clearable>
		<el-option v-for="(item, index) in channelOptions" :key="index" :label="item.typeName" :value="item.prtId"></el-option>
	</el-select>
</template>

<script>

	export default {
		data() {
			return {
				productType:'',
				channelOptions: []
			};
		},
		created() {
			this.getAllGaugeChannel()
		},
		methods: {
			// initData (val) {
			// 	if (val) {
			// 		this.channelId = val
			// 	}
			// },
			
			getchannelId(){
				this.$emit('sendChannelId',this.productType)
			},
			
			//获取产品分类
			getAllGaugeChannel(){
				var url = this.url + '/couponController/selectProductType'
				 this.$ajax({
				     method: 'GET',
				     url: url,
				     headers: {
				         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				         'Access-Token': this.accessToken
				     },
				     dataType: 'json',
				 }).then((response) => {
				     var res = response.data
				     if (res.retCode == '0000') {
						this.channelOptions = res.retData
				     } else {
				        this.$message.error(res.retMsg);
				     }
						
				 }).catch((error) => {
				     console.log('请求失败处理')
				 });
			},
			
		}
		
	};
</script>

<style>
</style>
