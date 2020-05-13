<template>
    <select class="form-control" v-model="upId" v-on:change="umsPermissionChange()">
        <option value="0">--未选择--</option>
        <option v-for="(item,index) in umsPermissionList" :key="index" v-bind:value="item.upId">
            {{item.upName}}
        </option>
    </select>
</template>

<script>
    import axios from "axios";

    export default {
        name: "UmsPermission",
        props: {
            permisUpId: {
                type: Number,
                default: 0
            },
            permisStatus: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                upId: this.permisUpId,
                umsPermissionList: [],
                status: this.permisStatus
            }
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
            //查询权限
            queryUmsPermission() {
                var param = {}
                param.status = this.status;
                var url = this.url + '/umsPermissionAction/queryUmsPermission';
                this.requestData(url, param).then((responseData) => {
                    if (responseData.retCode == '0000') {
                        this.umsPermissionList = responseData.retData;
                    }
                }, (error) => {
                    console.log("请求失败处理");
                });
            },
            //切换权限
            umsPermissionChange() {
                if (this.upId == 0) {
                    this.$emit('umsPermissionChange', null)
                } else {
                    for (var i = 0; i < this.umsPermissionList.length; i++) {
                        var ums = this.umsPermissionList[i]
                        if (ums.upId == this.upId) {
                            this.$emit('umsPermissionChange', ums)
                            return
                        }
                    }
                }
            },
            //设置值
            setUpId(value) {
                this.upId = value
            }
        }, created() {
            this.queryUmsPermission()
        }, computed: {
            // updateUpId(){
            //     return this.permisUpId
            // }
        }
    }
</script>

<style scoped>

</style>
