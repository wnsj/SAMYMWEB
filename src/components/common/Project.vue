<template>
    <select class="form-control" v-model="proId" v-on:change="projectChange()">
        <option value="0">--未选择--</option>
        <option v-for="(item,index) in projectList" :key="index" v-bind:value="item.proId">
            {{item.proName}}
        </option>
    </select>
</template>

<script>
    export default {
        data() {
            return {
                proName: '',
                proId: '0',
                projectList: [],
                empId: '',
                proStyle: '',
				model:'',//课时数
                projectObj: {
                    proId: '0',
                    proName: '',
                },
            };
        },
        methods: {
            //提交岗位名称和ID
            projectChange: function () {
                this.projectObj = this.exchangeProjectName(this.proId)
                this.$emit('projectChange', this.projectObj)
            },
            setProject: function (proId) {
                this.proId = proId
            },
            //添加前缀的部门名字兑换原来的名字
            exchangeProjectName: function (param) {
                var project = {}
                for (var i = 0; i < this.projectList.length; i++) {
                    project = this.projectList[i];
                    if (project.proId == param) {
                        return project
                    }
                }
            },
			//model：1购买 2消费
            setEmpId: function (empId,model) {
				if(model==1){
					this.model='1'
				}else if(model==2){
					this.model='2'
				}
                this.empId = empId
                this.getProject()
            },

            setProStyle: function(proStyle,model,empId) {
                if(model==1){
                    this.model='1'
                }else if(model==2){
                    this.model='2'
                }
                this.empId = empId
                this.proStyle = proStyle
                this.getProject()
            },
            getProject() {
                var url = this.url + '/projects/queryAllByParams'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        proStyle: this.proStyle,
                        state: '1',
                        empId: this.empId,
                        storeId: this.storeId(),
						model:this.model,
                        //empIdOrNull:'ALL'
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.projectList = res.retData
                        this.projectObj = this.exchangeProjectName(this.proId)
                        this.$emit('mrprojectChange', this.projectObj)
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    //console.log('产品数据请求失败处理')
                });
            },
        },
        created() {
            this.getProject()
        },
    }
</script>

<style>

</style>
