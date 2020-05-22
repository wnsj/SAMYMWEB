<template>
	<select class="form-control" v-model="urId" v-on:change="urChange()">
		<option value="0">--未选择--</option>
		<option v-for="(item,index) in objectList" :key="index" v-bind:value="item.urId">
			{{item.urName}}
		</option>
	</select>
</template>

<script>
	export default {
		name: 'department',
		data() {
			return {
				urName: '',
				urId: '0',
				objectList: [],
				Obj: {
					urId: '0',
					urName: '',
				},
			};
		},
		methods: {
			//提交角色名称和ID
			urChange: function() {
				this.Obj = this.exchangeUrName(this.urId)
				this.$emit('urChange', this.Obj)
			},
			setUr: function(urId) {
				this.urId = urId
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeUrName: function(param) {
				var ur = {}
				for (var i = 0; i < this.objectList.length; i++) {
					ur = this.objectList[i];
					if (ur.urId == param) {
						return ur
					}
				}
			},

			async getUrRole() {
				var url = this.url + '/umsRoleAction/queryUmsRole'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						isuse: '1',
						storeId:this.storeId(),
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.retData.length > 0) {
							this.objectList = res.retData
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('岗位数据请求失败处理')
				});
			},

		},
		created() {
			this.getUrRole()
		},
	}
</script>

<style>

</style>
