<template>
	<select class="form-control" v-model="empId" v-on:change="employeeChange()">
		<option value="0">--未选择--</option>
		<option v-for="(item,index) in employeeList" :key="index" v-bind:value="item.empId">
			{{item.empName}}
		</option>
	</select>
</template>

<script>
	export default {
		data() {
			return {
				empName: '',
				empId: '0',
				posId:'',
				employeeList: [],
				empObj: {
					empId: '0',
					empName: '',
				},
			};
		},
		methods: {
			//员工列表
			employeeChange: function() {
				console.log('员工：' + this.empObj.empId)
				this.empObj = this.exchangeEmpName(this.empId)
				console.log('员工：' + this.empObj.empId)
				this.$emit('employeeChange', this.empObj)
			},
			setEmp: function(empId) {
				this.empId = empId
				console.log('员工' + this.empId)
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeEmpName: function(param) {
				var emp = {}
				for (var i = 0; i < this.employeeList.length; i++) {
					emp = this.employeeList[i];
					if (emp.empId == param) {
						return emp
					}
				}
			},
			setPosId(posId){
				if(this.isBlank(posId)){
					this.posId=''
				}else{
					this.posId=posId
				}
				this.getEmployeeList()
			},
			async getEmployeeList() {
				var url = this.url + '/employeeAction/queryEmp'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						posId:this.posId,
						isuse: '1'
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.retData.length > 0) {
							this.employeeList = res.retData
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('员工数据请求失败处理')
				});
			},

		},
		created() {
			this.getEmployeeList()
		},
	}
</script>

<style>

</style>
