<template>

	<select class="form-control" v-model="payserviceId" v-on:change="projectChange()">
		<option value="0">--未选择--</option>
		<option v-for="(item, index) in projectList" :key="index" v-bind:value="item.payserviceId">{{item.name}}</option>
	</select>

</template>

<script>
	import axios from 'axios'
	export default {
		name: 'project',
		data() {
			return {
				payserviceId: '0',
				projectList: [],
				projectObj:{},
			};
		},
		methods: {
			//提交项目名称和ID
			projectChange: function() {
				this.projectObj = this.exchangeProjectName(this.projectId)
				this.$emit('projectChange', this.projectObj)
			},
			setProject:function(param){
				this.projectId = param
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeProjectName: function(param) {
				var project = {}

				for (var i = 0; i < this.projectList.length; i++) {
					project = this.projectList[i]
					if (project.projectID == param) {
						return project
					}
				}
			},
			// 获取所有项目
			getProject: function() {
				var url = this.url + '/payserviceAction/queryPayservice'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						if (res.retData.length > 0) {
							this.projectList = res.retData
						}
					} else {
						alert(res.retMsg)
					}
				
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
		},
		created() {
			this.getProject()
		}
	}
</script>

<style>

</style>

