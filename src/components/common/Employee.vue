<template>
    <select class="form-control" v-model="empId" v-on:change="employeeChange()">
        <option value="">--未选择--</option>
        <option v-for="(item,index) in employeeList" :key="index" v-bind:value="item.empId">
            {{item.empName}}
        </option>
    </select>
</template>

<script>
    import axios from "axios";

    export default {
        props: {
            pn: String
        },
        data() {
            return {
                empName: '',
                empId: '',
                posId: '',
                posName: '',
                leader: '',
                employeeList: [],
                empObj: {
                    empId: '0',
                    empName: '',
                },
                level: '',
                lessThenEqual: null
            };
        },
        methods: {
            //公共请求方法,返回响应数据
            requestData(url, rquestParam) {
                return new Promise((resolve, reject) => {
                    axios({
                        method: "post",
                        url: url,
                        headers: {
                            "Content-Type": this.contentType,
                            "Access-Token": ''
                        },
                        data: rquestParam,
                        dataType: "json"
                    }).then((response) => {
                        resolve(response.data);
                    }).catch(
                        function (error) {
                            reject(error)
                        }
                    );
                });
            },
            //员工列表
            employeeChange: function () {
                if (this.empId == '0') {
                    this.$emit('employeeChange', '')
                } else {
                    this.empObj = this.exchangeEmpName(this.empId)
                    this.$emit('employeeChange', this.empObj)
                }
            },
            setEmp: function (empId) {
                this.empId = empId
                this.employeeChange()
                //consolele.log('员工' + this.empId)
            },
            //添加前缀的部门名字兑换原来的名字
            exchangeEmpName: function (param) {
                var emp = {}
                for (var i = 0; i < this.employeeList.length; i++) {
                    emp = this.employeeList[i];
                    if (emp.empId == param) {
                        return emp
                    }
                }
            },

            setPosId(posId) {
                // //console.log('posId:'+posId)
                if (this.isBlank(posId)) {
                    this.posId = ''
                } else {
                    this.posId = posId
                }
                this.getEmployeeList()
            },
            setPosName(posName) {
                // //console.log('posName:'+posName)
                if (this.isBlank(posName)) {
                    this.posName = ''
                } else {
                    this.posName = posName
                }
                this.getEmployeeList()
            },
            setPosNameAndLeader(posName, leader) {
                // //console.log('posName:'+posName)
                if (this.isBlank(posName)) {
                    this.posName = ''
                } else {
                    this.posName = posName
                }
                if (this.isBlank(leader)) {
                    this.leader = ''
                } else {
                    this.leader = leader
                }
                this.getEmployeeList()
            },
            getEmployeeList() {
                var storeId = ''
                if (this.accountType() == false) {
                    storeId = this.storeId()
                } else {
                    storeId = ''
                }
                var p = ''
                if (!this.isBlank(this.posName)) {
                    p = this.posName;
                }
                if (!this.isBlank(this.pn)) {
                    p = this.pn
                }

                var url = this.url + '/employeeAction/queryEmp'
                var data = {
                    posId: this.posId,
                    posName: p,
                    leader: this.leader,
                    storeId: storeId,
                    isuse: '1',
                    level: this.level,
                    lessThenEqual: this.lessThenEqual,
                }
                this.requestData(url, data).then((response) => {
                    if (response.retCode == '0000') {
                        this.employeeList = response.retData
                    } else {
                        alert(response.retMsg)
                    }
                }, (error) => {
                    //console.log("请求失败处理");
                });
            },
            //设置查询条件[注:需要自己组装对象]
            setQueryParam(object) {
                if (!typeof Object){
                    alert("参数错误,仅接受参数对象!");
                    return
                }
                var url = this.url + '/employeeAction/queryEmp'
                this.requestData(url, object).then((response) => {
                    if (response.retCode == '0000') {
                        this.employeeList = response.retData
                    } else {
                        alert(response.retMsg)
                    }
                }, (error) => {
                    //console.log("请求失败处理");
                });
            }
        },
    }
</script>

<style>

</style>
