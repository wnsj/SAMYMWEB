<template>
	<select class="form-control" v-model="dtId" v-on:change="objectChange()">
		<option value="0">--未选择--</option>
		<option v-for="(item,index) in objList" :key="index" v-bind:value="item.dtId">
			{{item.dtName}}
		</option>
	</select>
</template>

<script>
	export default {
		name: 'department',
		data() {
			return {
				dtName: '',
				dtId: '0',
				objList: [],
				obj: {
					dtId: '',
					dtName: '',
				},
			};
		},
		methods: {
			objectChange: function() {
				this.obj = this.exchangeObjName(this.dtId)
				this.$emit('objectChange', this.obj)
			},
			setObj: function(dtId) {
				this.dtId = dtId
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeObjName: function(param) {
				var obj = {}
				for (var i = 0; i < this.objList.length; i++) {
					obj = this.objList[i];
					if (obj.dtId == param) {
						return obj
					}
				}
			},

			getObj() {
				var url = this.url + '/diseaseType/queryDiseaseType'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						isUse: '1'
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.retData.length > 0) {
							this.objList = res.retData
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('状态数据请求失败处理')
				});
			},
		},
		created() {
			this.getObj()
		},
	}
</script>

<style>

</style>
